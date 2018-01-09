/* --------------------------------DataTable Creation-------------------------------- */
var domainName = 'http://localhost:8090'; //url of backend domain for rest api
var rowClickedClass = 'table-primary';

function selectedRowId() {
  return $('tr.' + rowClickedClass).attr('id');
}

function createTable(tableData) {
  (function jsonData() {
    var url = tableData.getAjax[0];
    $.ajax({
      url: url,
      crossDomain: true,
      success: function(data, textStatus, req) {
        console.log(data)
        populateTable(data);
      }
    });
  })();
  //insert buttons before table
  (function insertCrudBtns() {

    $('#' + tableData.tableId).before(
      '<div class="bs-callout bs-callout-info alert alert-dismissable fade show">' +
      '<button type="button" class="close bg-light" data-dismiss="alert">&times;</button>'+
      '<p><span class="badge badge-secondary">1</span> Click on the <span class="text-primary">Add New</span> button to add a new record</p>' +
      '<p><span class="badge badge-secondary">2</span> Click on the table row to select / deselect a record</p>' +
      '<p><span class="badge badge-secondary">3</span> Only one record can be selected at a time to <span class="text-info">Edit</span> or <span class="text-danger">Delete</span></p>' +
      '<p><span class="badge badge-secondary">4</span> Click on the table headers to sort in Ascending / Descending order</p>' +
      '</div>'
    );
    $('#' + tableData.tableId).before(
      '<div id="crudBtns" class="sticky-top mb-4 text-center bg-light">' +
      '<button id="addBtn" class="btn btn-primary mr-1 " >Add New <i aria-hidden="true" class="fa fa-plus-circle"></i></button>' +
      '<button id="editBtn" class="btn btn-info mr-1 " disabled="disabled">Edit <i aria-hidden="true" class="fa fa-edit"></i></button>' +
      '<button id="deleteBtn" class="btn btn-danger mr-1 " disabled="disabled">Delete <i aria-hidden="true" class="fa fa-remove"></i></button>' +
      '</div>'
    );
  })();

  function populateTable(data) {
    //console.log(tableData)
    dataTableObj = $('#' + tableData.tableId).DataTable({
      destroy: true,
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
      ]
      // scrollY: '100vh',/* To scroll vertically */
      //scrollCollapse: true
    });
  }

  //Start of Events
  $('table tbody').off('click').on('click', 'tr', rowSelection);

  $('#addBtn').click(rowAdditionPopup);

  $('#editBtn').click(rowEditionPopup);

  $('#deleteBtn').click(rowDeletionPopup);

  $('#deleteSubmitBtn').off('click').on('click', deleteRecord);

  //On form submit do Ajax & close modal on success.
  $('#addSubmitBtn').off('click').on('click', addRecord);

  $('#editSubmitBtn').off('click').on('click', editRecord);


  //$('#'+tableData.formId).on('keyup keypress', preventFormSubmit);

  // addOrEditRecord('add', tableData.addAjax[1], tableData.addAjax[0], tableData.formId);
  //addOrEditRecord('edit', tableData.editAjax[1], tableData.editAjax[0], tableData.formId);


  //End of Events


  function rowSelection() {
    if (!($('td').hasClass('dataTables_empty'))) {
      if ($(this).hasClass(rowClickedClass)) {
        $(this).removeClass(rowClickedClass);
        $('#editBtn, #deleteBtn').attr('disabled', 'disabled');
        $('#addBtn').removeAttr('disabled');
      } else {
        $('tr.' + rowClickedClass).removeClass(rowClickedClass);
        $(this).addClass(rowClickedClass);
        $('#editBtn, #deleteBtn').removeAttr('disabled');
        $('#addBtn').attr('disabled', 'disabled');
      }
    }
  }

  function rowAdditionPopup() {
    $('#oprModalHeader').html('Add Record');
    $('#editSubmitBtn').hide(); //Hide edit btn
    $('#addSubmitBtn').show(); //Show add btn
    $('#' + tableData.formId + ' :input').val(''); //clear input values if any
    $('#oprModal').modal('show'); //Open modal to show form
  }

  function rowEditionPopup() {
    //Open modal, change modal header, hide one of submitBtn.
    $('#oprModalHeader').html('Edit Record');
    $('#addSubmitBtn').hide();
    $('#editSubmitBtn').show();
    fillFormFieldsToEdit();
    $('#oprModal').modal('show');
  }

  function rowDeletionPopup() {
    $('#deleteModal').modal('show');
  }

  function addRecord() {

    if (form.valid()) {
      currentBtnId = $(this).attr('id');
      addLoadingIcon(currentBtnId);

      var formData = $('#' + tableData.formId).serializeFormJSON();
      console.log('form data: ' + formData);

      $.ajax({
        url: tableData.addAjax[0],
        method: tableData.addAjax[1],
        contentType: "application/json; charset=utf-8",
        data: formData,
        success: function(data) {
          console.log('add success');
          var fData = JSON.parse(formData);
          var rId = tableData.recordId; //Get Record Id from tableData
          fData[rId] = data; //Set Record Id from response of rest api
          console.log(fData);
          $('#oprModal').modal('hide');
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
    if (form.valid()) {

      var formData = $('#' + tableData.formId).serializeFormJSON();
      console.log('form data: ' + formData);
      $.ajax({
        url: tableData.editAjax[0],
        method: tableData.editAjax[1],
        contentType: "application/json; charset=utf-8",
        data: formData,
        success: function() {
          console.log('edit success');
          $('#oprModal').modal('hide');
          dataTableObj.row('tr.' + rowClickedClass).data(JSON.parse(formData)).draw();
          $('tr.' + rowClickedClass)
            .css('color', 'green')
            .animate( {color: '#000'}, disableBtns);
        },
        error: function() {
          alert('Error occured');
        }
      });
    }
  }

  function deleteRecord() {
    currentBtnId = $(this).attr('id');
    addLoadingIcon(currentBtnId);
    $.ajax({
      url: tableData.deleteAjax[0] + selectedRowId(),
      method: tableData.deleteAjax[1],
      success: function() {
        //using dataTable API methods to delete row from table
        $('#deleteModal').modal('hide');
        $('tr.' + rowClickedClass)
          .css('color', 'red') //animate the row to idetify the user
          .animate({
            color: 'black'
          }, 'slow', function() {
            dataTableObj.row('.' + rowClickedClass).remove().draw();
            disableBtns();
          });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus + ' ' + errorThrown + ' ' + XMLHttpRequest);
        $('#deleteModal').modal('hide');
        alert(textStatus + ' occured ' + errorThrown);
      },
      complete: function() {
        removeLoadingIcon(currentBtnId);
      }
    });
  }

  //function is executed automatically, no need to call as enclosed with (fn)().
  var form = $('#' + tableData.formId);
  form.validate({
    // 	submitHandler: function() {
    //
    // },
    ignore: '*',
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

  // Used By Edit
  function fillFormFieldsToEdit() {
    var rowData = dataTableObj.row('tr.' + rowClickedClass).data();
    $('#' + tableData.formId + ' :input').each(function() {
      var ip = this;
      $(Object.entries(rowData)).each(function() {
        var ip1 = this;
        console.log(ip1);
        console.log($(ip).attr('name'));
        if (ip1[0] === $(ip).attr('name')) { //at index'0' get key & at index '1' get value
          console.log('done');
          $(ip).val(ip1[1]);
        }
      });
    });
  }

  function disableBtns() {
    $('#editBtn, #deleteBtn').attr('disabled', 'disabled');
    $('#addBtn').removeAttr('disabled');
    $('tr.' + rowClickedClass).removeClass(rowClickedClass);
  }

  //prevents form from being submitted by enter key
  function preventFormSubmit(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      //return false;
    }
  }

  function addLoadingIcon(id) {
    $('#'+id).attr('disabled','disabled');
    var _temp=$('#'+id).text();
    $('#'+id).html(_temp+' <img src="/img/loading2_circlefill.svg" height="20" id="loading_icon" class="m-0"/>');
  }

  function removeLoadingIcon(id) {
    $('#'+id).removeAttr('disabled');
    $('#loading_icon').remove();
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
