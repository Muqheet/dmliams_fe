
/* --------------------------------DataTable Creation-------------------------------- */
var rowClickedClass = 'table-primary';
var addBtn = '#addBtn';
var editBtn = '#editBtn';
var deleteBtn = '#deleteBtn';
var addSubmitBtn = '#addSubmitBtn';
var editSubmitBtn = '#editSubmitBtn';
var deleteSubmitBtn = '#deleteSubmitBtn';
var deleteModal = '#deleteModal';
var oprModal = '#oprModal';
var oprModalHeader = '#oprModalHeader';

var headers = {"Authorization": getJwtHeader()}

function selectedRowId() {
  return $('tr.' + rowClickedClass).attr('id');
}

function createTable(tableData) {
  $(document).off('click');//Removing any previous click handlers

  var tid = '#' + tableData.tableId;
  var fid = '#' + tableData.formId;
  var gAjax = tableData.getAjax;
  var aAjax = tableData.addAjax;/*0:url, 1:method*/
  var eAjax = tableData.editAjax;
  var dAjax = tableData.deleteAjax;

  (function jsonData() {
    var url = gAjax[0];
    $.ajax({
      url: url,
      headers : headers,
      success: function(data, textStatus, req) {
        $(tid).removeClass('d-none');//To show table on ajax success
        console.log(data)
        populateTable(data);
      },
      error: function() {
        $(tid).html('<div class="text-danger">Error occured, unable to load data.</div>');
        // alert('Error occured, unable to load data.');
      }
    });
  })();

  function populateTable(data) {

    //insert buttons before table
    (function insertCrudBtns() {

      $(tid).before(
        '<div class="d-none bs-callout bs-callout-info alert alert-dismissable fade show">' +
        '<button type="button" class="close bg-light" data-dismiss="alert">&times;</button>'+
        '<p><span class="badge badge-secondary">1</span> Click on the <span class="text-primary">Add New</span> button to add a new record</p>' +
        '<p><span class="badge badge-secondary">2</span> Click on the table row to select / deselect a record</p>' +
        '<p><span class="badge badge-secondary">3</span> Only one record can be selected at a time to <span class="text-info">Edit</span> or <span class="text-danger">Delete</span></p>' +
        '<p><span class="badge badge-secondary">4</span> Click on the table headers to sort in Ascending / Descending order</p>' +
        '</div>'
      );
      $(tid).before(
        '<div id="crudBtns" class="sticky-top mb-4 text-center bg-light">' +
        '<button id="addBtn" class="btn btn-primary mr-1 " >Add New <i aria-hidden="true" class="fa fa-plus-circle"></i></button>' +
        '<button id="editBtn" class="btn btn-info mr-1 " disabled="disabled">Edit <i aria-hidden="true" class="fa fa-edit"></i></button>' +
        '<button id="deleteBtn" class="btn btn-danger mr-1 " disabled="disabled">Delete <i aria-hidden="true" class="fa fa-remove"></i></button>' +
        '</div>'
      );
      //load modals
      $(tid).before('<div id="modal1"></div><div id="modal2"></div>');
      $('#modal1').load(tableData.oprModalPath);
      $('#modal2').load(tableData.deleteModalPath);

    })();



    //console.log(tableData)
    dataTableObj = $(tid).DataTable({
      data: data,
      columns: tableData.columns,
      createdRow: tableData.createdRow,
      order: [
        [0, "desc"]
      ],
      scrollX: true,
      /* To scroll horizontally */
      lengthMenu: [
        [10, 20, 50, 100, -1],
        [10, 20, 50, 100, 'All']
      ],
      destroy: true,
      /* scrollY: '100vh',/* To scroll vertically */
      /*scrollCollapse: true*/
    });
  }

  //Start of Events
  $('table tbody').off('click').on('click', 'tr', rowSelection);

  $('body').on('click', addBtn, rowAdditionPopup);
  $('body').on('click', editBtn, rowEditionPopup);
  $('body').on('click', deleteBtn, rowDeletionPopup);

  $(document).on('click', deleteSubmitBtn, deleteRecord);
  $(document).on('click', addSubmitBtn, addRecord);
  $(document).on('click', editSubmitBtn, editRecord);

  $(document).on('shown.bs.modal', oprModal, function() {
    console.log('modal opened');
    $(fid+' input').eq(0).focus();
  });

  //End of Events


  function rowSelection() {
    if (!($('td').hasClass('dataTables_empty'))) {
      if ($(this).hasClass(rowClickedClass)) {
        $(this).removeClass(rowClickedClass);
        $(editBtn +','+ deleteBtn).attr('disabled', 'disabled');
        $(addBtn).removeAttr('disabled');
      } else {
        $('tr.' + rowClickedClass).removeClass(rowClickedClass);
        $(this).addClass(rowClickedClass);
        $(editBtn +','+ deleteBtn).removeAttr('disabled');
        $(addBtn).attr('disabled', 'disabled');
      }
    }
  }

  function rowAdditionPopup() {

    $(oprModalHeader).html('Add Record');
    $(editSubmitBtn).hide(); //Hide edit btn
    $(addSubmitBtn).show(); //Show add btn
    $(fid + ' :input').val(''); //clear input values if any
    $(oprModal).modal('show'); //Open modal to show form
  }

  function rowEditionPopup() {
    //Open modal, change modal header, hide one of submitBtn.

    $(oprModalHeader).html('Edit Record');
    $(addSubmitBtn).hide();
    $(editSubmitBtn).show();
    fillFormFieldsToEdit();
    $(oprModal).modal('show');
  }

  function rowDeletionPopup() {
    $(deleteModal).modal('show');
  }

  function addRecord() {

    /* if (form.valid()) */ {
      currentBtnId = $(this).attr('id');
      addLoadingIcon(currentBtnId);

      var formData = $(fid).serializeFormJSON();
      console.log('form data: ' + formData);

      $.ajax({
        url: aAjax[0],
        method: aAjax[1],
        headers : headers,
        contentType: "application/json; charset=utf-8",
        data: formData,
        success: function(data) {
          console.log('add success');
          var fData = JSON.parse(formData);
          var rId = tableData.recordId; //Get Record Id from tableData
          fData[rId] = data; //Set Record Id from response of rest api
          console.log(fData);
          $(oprModal).modal('hide');
          dataTableObj.row.add(fData).draw();
        },
        error: function() {
          alert('Error occured');
        },
        complete: function() {
          removeLoadingIcon(currentBtnId);
        }
      });
    }
  }

  function editRecord() {
    currentBtnId = $(this).attr('id');
    addLoadingIcon(currentBtnId);
    /* if (form.valid()) */{

      var formData = $(fid).serializeFormJSON();
      console.log('form data: ' + formData);
      $.ajax({
        url: eAjax[0],
        method: eAjax[1],
        headers : headers,
        contentType: "application/json; charset=utf-8",
        data: formData,
        success: function() {
          console.log('edit success');
          $(oprModal).modal('hide');
          dataTableObj.row('tr.' + rowClickedClass).data(JSON.parse(formData)).draw();
          $('tr.' + rowClickedClass)
            .css('color', 'green')
            .animate( {color: '#000'}, disableBtns);
        },
        error: function() {
          alert('Error occured');
        },
        complete: function() {
          removeLoadingIcon(currentBtnId);
        }
      });
    }
  }

  function deleteRecord() {
    currentBtnId = $(this).attr('id');
    addLoadingIcon(currentBtnId);
    $.ajax({
      url: dAjax[0] + selectedRowId(),
      method: dAjax[1],
      headers : headers,
      success: function(jqXhr) {
        console.log(jqXhr.status);
        //using dataTable API methods to delete row from table
        $(deleteModal).modal('hide');
        $('tr.' + rowClickedClass)
          .css('color', 'red') //animate the row to idetify the user
          .animate({
            color: '#000'
          }, 'slow', function() {
            dataTableObj.row('.' + rowClickedClass).remove().draw();
            disableBtns();
          });
      },
      error: function(jqXhr) {
        console.log();
        $(deleteModal).modal('hide');
        alert('Error occured ' + jqXhr.status);
      },
      complete: function() {
        removeLoadingIcon(currentBtnId);
      }
    });
  }

  //function is executed automatically, no need to call as enclosed with (fn)().
  var form = $(fid);
  form.validate({
    // 	submitHandler: function() {
    //
    // },
    // ignore: '*',
    errorClass: "invalid-feedback row col-md-12 pt-0",
    validClass: "valid-feedback row col-md-12 pt-0",
    highlight: function(element, errorClass, validClass) {
      return false; // ensure this function stops, to prevent applying error classes to other sibling input elements
    },
    unhighlight: function(element, errorClass, validClass) {
      return false; // ensure this function stops
    },
    /*errorPlacement: function(error, element) {
    			error.appendTo( element.siblings('label').next('label') );
    	},*/
    rules: tableData.validationRules
  });

  /* Used By Edit */
  function fillFormFieldsToEdit() {
    var rowData = dataTableObj.row('tr.' + rowClickedClass).data();
    $(fid + ' :input').each(function() {
      var ip = this;
      $(Object.entries(rowData)).each(function() {
        var ip1 = this;
        console.log(ip1);
        console.log($(ip).attr('name'));
        if (ip1[0] === $(ip).attr('name')) { /*at index'0' get key & at index '1' get value*/
          console.log('done');
          $(ip).val(ip1[1]);
        }
      });
    });
  }

  function disableBtns() {
    $(editBtn +','+ deleteBtn).attr('disabled', 'disabled');
    $(addBtn).removeAttr('disabled');
    $('tr.' + rowClickedClass).removeClass(rowClickedClass);
  }

  //End of createTable
}

(function($) {
  $.fn.serializeFormJSON = function() {

    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.id]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return JSON.stringify(o);
  };
})(jQuery);
