/* used for the word_table in term_list: check/uncheck the row 
   it set the 'state' field for the Word in the database. It will be used later when exporting the data */
function ajax_select_rows(op, check_uncheck){
        	$.ajax({url: '/select_rows/', 
    			type: 'GET',
    			dataType: 'json',
    			data: 
    				{ 
    					'op': op, 'check_uncheck': check_uncheck
    				},
    			success: function(data){ 
    				if (op == 'all'){
						word_table.bootstrapTable('checkAll');
    				} else if (op == 'none'){
						word_table.bootstrapTable('uncheckAll');
    				}
    				var message = ''; 
    				if (data['total'] == 0){
    					message += gettext('Nothing to export...');
						$('button[type="submit"]').prop('disabled', true);
    				} else {
    					message += data['total']
    					message += data['total'] == 1? gettext(' word') : gettext(' words');
    					message += ' to export';
						$('button[type="submit"]').prop('disabled', false);
    				}
    				$('#selected_total').html(message);
    			}
    	});
	}
	
function termlist_filter() {
	/* dynamic filtering when check/unckeck the ckeckbox */
	// get the form
	var filterlangform = $('#filterlangform');
	var filtertextform = $('#filtertextform');
	var filterstatusform = $('#filterstatusform');
	var filterwordtagform = $('#filterwordtagform');
	var chosen_lang = [];
	// get the checkbox checked
	$.each($("#filterlangform input:checked"), function(){
		chosen_lang.push($(this).val());
	});
	var chosen_text = [];
	$.each($("#filtertextform").find("span").not(".hidden").find("input:checked"), function(){
		chosen_text.push($(this).val());
	});
	var chosen_status = [];
	$.each($("#filterstatusform").find("input:checked"), function(){
		chosen_status.push($(this).val());
	});
	var chosen_wordtag = [];
	$.each($("#filterwordtagform").find("input:checked"), function(){
		chosen_wordtag.push($(this).val());
	});
	// stringify them
	var chosen_lang_json = JSON.stringify(chosen_lang);
	var chosen_text_json = JSON.stringify(chosen_text);
	var chosen_status_json = JSON.stringify(chosen_status);
	var chosen_wordtag_json = JSON.stringify(chosen_wordtag);
	// get the options for the rows per page
	var word_table = $('#word_table');
	var options = word_table.bootstrapTable('getOptions'); // get the number of rows per page
	// get the csrf token
	var token =  filterlangform.find('input[name=csrfmiddlewaretoken]').val(); // Indispensable. Get the csrf already defined in the form
	// append the data
	var data_to_go = new FormData(); // indispensable to send by POST
	data_to_go.append('lang_filter', chosen_lang_json);
	data_to_go.append('text_filter', chosen_text_json);
	data_to_go.append('status_filter', chosen_status_json);
	data_to_go.append('wordtag_filter', chosen_wordtag_json);
	data_to_go.append('limit', options['pageSize']);
	data_to_go.append('csrfmiddlewaretoken', token);
	// and send it!
	$.ajax({url: '/termlist_filter/', 
	    type: 'POST',
		cache: false,
		processData: false,
		contentType: false,
		data:  data_to_go,
		success: function(data){ 
			word_table.bootstrapTable('load', data); 
			word_table.bootstrapTable('selectPage', 1); // go to first page
			$.each(filtertextform.find('span[language]'), function(){
				if ($.inArray($(this).attr('language'), chosen_lang) == -1){
					$(this).attr('class', 'hidden'); // hide the text which are not in the languages selected
				} else {
					$(this).attr('class', '');
				}
			});
		},
		error : function(data , status , xhr){ console.log('ERROR');//error console.log(data); console.log(status); console.log(xhr);
		}
});	
	
	
}