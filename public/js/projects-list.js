$('.deleteProject').click( function(e) {

	var elem = $(this);

	if ( confirm('Usunięcie jest nieodwracalne. Usunąć?') ){
		$.ajax( { 
            'url': '/edytor/'+$(this).attr('data-id'), 
            'method': 'POST',
            'data': { 'html': $('#editor-block').html(), 'action': 'deleteItem' }
        }).done(function( msg ) {
            console.log( msg.result );
            if(msg.result === true){
			   elem.parents("tr").fadeOut( 1600, "linear");
            } else {
                $('.saveAlert .alert-error').show();
            }
            //console.log( 'Data Saved: ' + msg );
        });
	}
    
});