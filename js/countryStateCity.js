function populateCountryList(countryId) {
	var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia (Hrvatska)","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Isle of Man","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jersey","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","North Korea","South Korea","Kosovo","Kuwait","Kyrgyzstan","Lao","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Sri Lanka","St. Helena","St. Pierre and Miquelon","Sudan","Suriname","Svalbard and Jan Mayen Islands","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States minor outlying islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands (U.S.)","Wallis and Futuna Islands","Yemen","Zambia","Zimbabwe"];
	// console.log('countries list called');

	var option = '';
	for (var i=0; i<countries.length; i++){
	   option += '<option value="'+ countries[i] + '">' + countries[i] + '</option>';
	}
	$('#'+countryId).append(option);
};

function populateCallingCodeList(id) {
	var callingCodes = ["AF (+93)","AL (+355)","DZ (+213)","AD (+376)","AO (+244)","AI (+1264)","AG (+1268)","AR (+54)","AM (+374)","AU (+61)","AT (+43)","AZ (+994)","BS (+1242)","BH (+973)","BD (+880)","BB (+1246)","BY (+375)","BE (+32)","BZ (+501)","BJ (+229)","BM (+1441)","BT (+975)","BO (+591)","BA (+387)","BW (+267)","BR (+55)","BN (+673)","BG (+359)","BF (+226)","BI (+257)","KH (+855)","CM (+237)","CA (+1)","CV (+238)","KY (+1345)","CF (+236)","TD (+235)","CL (+56)","CN (+86)","CO (+57)","KM (+269)","CG (+242)","CR (+506)","HR (+385)","CU (+53)","CY (+357)","CZ (+420)","DK (+45)","DJ (+253)","DM (+1767)","DO (+1809)","DO (+1829)","DO (+1849)","EC (+593)","EG (+20)","SV (+503)","GQ (+240)","ER (+291)","EE (+372)","ET (+251)","FO (+298)","FJ (+679)","FI (+358)","FR (+33)","GF (+594)","PF (+689)","TF (+)","GA (+241)","GM (+220)","GE (+995)","DE (+49)","GH (+233)","GR (+30)","GL (+299)","GD (+1473)","GP (+590)","GU (+1671)","GT (+502)","GN (+224)","GW (+245)","GY (+592)","HT (+509)","HN (+504)","HK (+852)","HU (+36)","IS (+354)","IN (+91)","IM (+44)","ID (+62)","IR (+98)","IQ (+964)","IE (+353)","IL (+972)","IT (+39)","CI (+225)","JE (+44)","JM (+1876)","JP (+81)","JO (+962)","KZ (+76)","KZ (+77)","KE (+254)","KI (+686)","KP (+850)","KR (+82)","XK (+383)","KW (+965)","KG (+996)","LA (+856)","LV (+371)","LB (+961)","LS (+266)","LR (+231)","LY (+218)","LI (+423)","LT (+370)","LU (+352)","MK (+389)","MG (+261)","MW (+265)","MY (+60)","MV (+960)","ML (+223)","MT (+356)","MH (+692)","MQ (+596)","MR (+222)","MU (+230)","MX (+52)","FM (+691)","MD (+373)","MC (+377)","MN (+976)","ME (+382)","MS (+1664)","MA (+212)","MZ (+258)","MM (+95)","NA (+264)","NR (+674)","NP (+977)","NL (+31)","NC (+687)","NZ (+64)","NI (+505)","NE (+227)","NG (+234)","MP (+1670)","NO (+47)","OM (+968)","PK (+92)","PW (+680)","PS (+970)","PA (+507)","PG (+675)","PY (+595)","PE (+51)","PH (+63)","PL (+48)","PT (+351)","PR (+1787)","PR (+1939)","QA (+974)","RE (+262)","RO (+40)","RU (+7)","RW (+250)","KN (+1869)","LC (+1758)","VC (+1784)","WS (+685)","SM (+378)","ST (+239)","SA (+966)","SN (+221)","RS (+381)","SC (+248)","SL (+232)","SG (+65)","SK (+421)","SI (+386)","SB (+677)","SO (+252)","ZA (+27)","ES (+34)","LK (+94)","SH (+290)","PM (+508)","SD (+249)","SR (+597)","SJ (+4779)","SZ (+268)","SE (+46)","CH (+41)","SY (+963)","TW (+886)","TJ (+992)","TZ (+255)","TH (+66)","TG (+228)","TK (+690)","TO (+676)","TT (+1868)","TN (+216)","TR (+90)","TM (+993)","TV (+688)","UG (+256)","UA (+380)","AE (+971)","GB (+44)","US (+1)","UM (+)","UY (+598)","UZ (+998)","VU (+678)","VE (+58)","VN (+84)","VI (+1 340)","WF (+681)","YE (+967)","ZM (+260)","ZW (+263)"];

	var option = '';
	for (var i = 0; i < callingCodes.length; i++) {
		if( callingCodes[i].substring(5,(callingCodes[i].length-1))  ===  '' || callingCodes[i].substring(5,(callingCodes[i].length-1)).indexOf(' ')  > -1 )
			i++;
		// option += '<option value="' + callingCodes[i].substring(5,(callingCodes[i].length-1)) + '">' + callingCodes[i] + '</option>';
	  option += '<option value="' + callingCodes[i].substring(5,(callingCodes[i].length-1)) + '">' + callingCodes[i].substring(4,(callingCodes[i].length-1)) +' ('+ callingCodes[i].substring(0,2) +')</option>';
	}		$('#'+id).append(option);
}
/*
 function ajaxCall() {
    this.send = function(data, url, method, success, type) {
        type = type||'json';
        var successRes = function(data) {
            success(data);
        }

        var errorRes = function(e) {
            console.log(e);
            //alert("Error found \nError Code: "+e.status+" \nError Message: "+e.statusText);
            //jQuery('#loader').modal('hide');
        }
        jQuery.ajax({
            url: url,
            type: method,
            data: data,
            success: successRes,
            error: errorRes,
            dataType: type,
            timeout: 60000
        });

    }

}

function locationInfo() {
    var rootUrl = "//geodata.solutions/api/api.php";
    //set default values
    var username = 'demo';
    var ordering = 'name';
    //now check for set values
    var addParams = '';
    if(jQuery("#gds_appid").length > 0) {
        addParams += '&appid=' + jQuery("#gds_appid").val();
    }
    if(jQuery("#gds_hash").length > 0) {
        addParams += '&hash=' + jQuery("#gds_hash").val();
    }

    var call = new ajaxCall();

    this.confCity = function(id) {
     //   console.log(id);
     //   console.log('started');
        var url = rootUrl+'?type=confCity&countryId='+ jQuery('#countryId option:selected').attr('countryid') +'&stateId=' + jQuery

('#stateId option:selected').attr('stateid') + '&cityId=' + id;
        var method = "post";
        var data = {};
        call.send(data, url, method, function(data) {
            if(data){
                //    alert(data);
            }
            else{
                //   alert('No data');
            }
        });
    };


    this.getCities = function(id) {
        jQuery(".cities option:gt(0)").remove();
        //get additional fields
        var stateClasses = jQuery('#cityId').attr('class');

        var cC = stateClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }
        var url = rootUrl+'?type=getCities&countryId='+ jQuery('#countryId option:selected').attr('countryid') +'&stateId=' + id +

addParams + addClasses;
        var method = "post";
        var data = {};
        jQuery('.cities').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.cities').find("option:eq(0)").html("-Select-");
            if(data.tp == 1){

                var listlen = Object.keys(data['result']).length;

                if(listlen > 0)
                {
                    jQuery.each(data['result'], function(key, val) {

                        var option = jQuery('<option />');
                        option.attr('value', val).text(val);
                        jQuery('.cities').append(option);
                    });
                }
                else
                {
                    var usestate = jQuery('#stateId option:selected').val();
                    var option = jQuery('<option />');
                    option.attr('value', usestate).text(usestate);
                    option.attr('selected', 'selected');
                    jQuery('.cities').append(option);
                }

                jQuery(".cities").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

    this.getStates = function(id) {
        jQuery(".states option:gt(0)").remove();
        jQuery(".cities option:gt(0)").remove();
        //get additional fields
        var stateClasses = jQuery('#stateId').attr('class');

        var cC = stateClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }
        var url = rootUrl+'?type=getStates&countryId=' + id + addParams  + addClasses;
        var method = "post";
        var data = {};
        jQuery('.states').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.states').find("option:eq(0)").html("-Select-");
            if(data.tp == 1){
                jQuery.each(data['result'], function(key, val) {
                    var option = jQuery('<option />');
                    option.attr('value', val).text(val);
                    option.attr('stateid', key);
                    jQuery('.states').append(option);
                });
                jQuery(".states").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

    this.getCountries = function() {
        //get additional fields
        var countryClasses = jQuery('#countryId').attr('class');

        var cC = countryClasses.split(" ");
        cC.shift();
        var addClasses = '';
        if(cC.length > 0)
        {
            acC = cC.join();
            addClasses = '&addClasses=' + encodeURIComponent(acC);
        }

        var presel = false;
        var iip = 'N';
        jQuery.each(cC, function( index, value ) {
            if (value.match("^presel-")) {
                presel = value.substring(7);

            }
            if(value.match("^presel-byi"))
            {
                var iip = 'Y';
            }
        });


        var url = rootUrl+'?type=getCountries' + addParams + addClasses;
        var method = "post";
        var data = {};
        jQuery('.countries').find("option:eq(0)").html("Please wait..");
        call.send(data, url, method, function(data) {
            jQuery('.countries').find("option:eq(0)").html("-Select-");

            if(data.tp == 1){
            	if(presel == 'byip')
                {
                    presel = data['presel'];
                    console.log('2 presel is set as ' + presel);
                }


                if(jQuery.inArray("group-continents",cC) > -1)
                {
                    var $select = jQuery('.countries');
                    console.log(data['result']);
                    jQuery.each(data['result'], function(i, optgroups) {
                        var $optgroup = jQuery("<optgroup>", {label: i});
                        if(optgroups.length > 0)
                        {
                            $optgroup.appendTo($select);
                        }

                        jQuery.each(optgroups, function(groupName, options) {
                            var coption = jQuery('<option />');
                            coption.attr('value', options.name).text(options.name);
                            coption.attr('countryid', options.id);
                            if(presel) {
                                if (presel.toUpperCase() == options.id) {
                                    coption.attr('selected', 'selected');
                                }
                            }
                            coption.appendTo($optgroup);
                        });
                    });
                }
                else
                {
                    jQuery.each(data['result'], function(key, val) {
                        var option = jQuery('<option />');
                        option.attr('value', val).text(val);
                        option.attr('countryid', key);
                        if(presel)
                        {
                            if(presel.toUpperCase() ==  key)
                            {
                                option.attr('selected', 'selected');
                            }
                        }
                        jQuery('.countries').append(option);
                    });
                }
                if(presel)
                {
                    jQuery('.countries').trigger('change');
                }
                jQuery(".countries").prop("disabled",false);
            }
            else{
                alert(data.msg);
            }
        });
    };

}

jQuery(function() {
    var loc = new locationInfo();
    loc.getCountries();
    jQuery(".countries").on("change", function(ev) {
        var countryId = jQuery("option:selected", this).attr('countryid');
        if(countryId != ''){
            loc.getStates(countryId);
        }
        else{
            jQuery(".states option:gt(0)").remove();
        }
    });
    jQuery(".states").on("change", function(ev) {
        var stateId = jQuery("option:selected", this).attr('stateid');
        if(stateId != ''){
            loc.getCities(stateId);
        }
        else{
            jQuery(".cities option:gt(0)").remove();
        }
    });

    jQuery(".cities").on("change", function(ev) {
        var cityId = jQuery("option:selected", this).val();
        if(cityId != ''){
            loc.confCity(cityId);
        }
    });
});
*/
