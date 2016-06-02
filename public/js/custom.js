/*var socket = io();

socket.on('msg', function(message){
    console.log(message);
});*/

jQuery.fn.extend({
  removeClassRegEx: function( regex ) {
    return this.each(function()
    {
        var classes = $(this).attr('class');

        if(!classes || !regex) return false;

        var classArray = [];
        classes = classes.split(' ');

        for(var i=0, len=classes.length; i<len; i++){
            //console.log( classes[i] );
            if(!classes[i].match(regex)){
                classArray.push(classes[i]);
            }
        }

        $(this).attr('class', classArray.join(' '));
    });
  }
});

(function() {
  $(function() {
    var collapseMyMenu, expandMyMenu, hideMenuTexts, showMenuTexts;
    expandMyMenu = function() {
      return $('nav.sidebar').removeClass('sidebar-menu-collapsed').addClass('sidebar-menu-expanded').hide();
    };
    collapseMyMenu = function() {
      return $('nav.sidebar').removeClass('sidebar-menu-expanded').addClass('sidebar-menu-collapsed').show();
    };
    showMenuTexts = function() {
      return $('nav.sidebar ul a span.expanded-element').show();
    };
    hideMenuTexts = function() {
      return $('nav.sidebar ul a span.expanded-element').hide();
    };
    showMenuTools = function() {
      return $('nav.sidebar .tools-list').show();
    };
    hideMenuTools = function() {
      return $('nav.sidebar .tools-list').hide();
    };
    return $('.collapseBtn').click(function(e) {
      if ($(this).next('nav.sidebar').hasClass('sidebar-menu-collapsed')) {
        expandMyMenu();
        showMenuTexts();
        showMenuTools();
        $(this).css({
          color: '#41BB19'
        });
      } else if ($(this).next('nav.sidebar').hasClass('sidebar-menu-expanded')) {
        collapseMyMenu();
        hideMenuTexts();
        hideMenuTools();
        $(this).css({
          color: '#FFF'
        });
      }
      return false;
    });

  });

}).call(this);

function rgbToHex(rgb) {
	var result = /^rgb\(?([0-9]+)\,\s([0-9]+)\,\s([0-9]+)\)$/i.exec(rgb);

    if(result){
    	return '#' + parseInt(result[1], 10).toString(16) + parseInt(result[2], 10).toString(16) + parseInt(result[3], 10).toString(16);
    }
    return 'transparent';
}

$(function() {

	$('.removeChecked').click(function() {
    	$('.one-col').removeClass('row-checked');
        $('#editor-block .template').removeClass('template-checked');
    	$('nav.sidebar .tools-object-list').hide();
        $('nav.sidebar .tools-list .add-another').hide();
        $('nav.sidebar .tools-template-list').hide();
	});

	$('.add-row').click( function(e) {
    	$('#editor-block').append( '<div class="row"><div data-cols="12" class="one-col col-md-12 col-lg-12"><div class="rowText">Example text</div></div></div>' );
    });

    $('.add-another').click( function(e) {
        console.log('tu ?');
        $('#editor-block .row-checked').parent().append( '<div data-cols="12" class="one-col col-md-12 col-lg-12"><div class="rowText">Example text</div></div>' );
    });

    $('#editor-block').on( 'click', '.row .one-col', function(e) {
    	e.stopPropagation();
    	$('#editor-block .row-checked').removeClass('row-checked');
        $('#editor-block .template').removeClass('template-checked');
        $('nav.sidebar .tools-template-list').hide();
    	$(this).addClass('row-checked');
    	$('nav.sidebar .tools-object-list').show();
    	$('.changeText textarea').val( $(this).find('.rowText').text() );
    	$('.changeHeight input').val( parseInt($(this).css('height'), 10) );
        $('.changeTextSize input').val( parseInt($(this).find('.rowText').css('font-size'), 10) );
    	$('.changeCol input').val( $(this).attr('data-cols') );
    	backgroundColor = rgbToHex($(this).css('background-color'));
    	$('.changeBackground input').val( backgroundColor );
    	textColor = rgbToHex($(this).css('color'));
    	$('.changeBackground .input-group-addon i').css('background-color', $(this).css('background-color'));
    	$('.changeColor .input-group-addon i').css('color', $(this).css('color'));
    	$('.changeColor input').val( textColor );
        $('nav.sidebar .tools-list .add-another').show();
        $('.changePaddingTextSize').find('input[name="top"]').val( parseInt($(this).find('.rowText').css('padding-top'), 10) );
        $('.changePaddingTextSize').find('input[name="right"]').val( parseInt($(this).find('.rowText').css('padding-right'), 10) );
        $('.changePaddingTextSize').find('input[name="bottom"]').val( parseInt($(this).find('.rowText').css('padding-bottom'), 10) );
        $('.changePaddingTextSize').find('input[name="left"]').val( parseInt($(this).find('.rowText').css('padding-left'), 10) );
    });

    $('#editor-block').on( 'click', '.row .template', function(e) {
        e.stopPropagation();
        $('.removeChecked').click();
        $('#editor-block .template-checked').removeClass('template-checked');
        $(this).addClass('template-checked');
        $('nav.sidebar .tools-template-list').show();
        $('.changePaddingSize').find('input[name="top"]').val( parseInt($(this).css('padding-top'), 10) );
        $('.changePaddingSize').find('input[name="right"]').val( parseInt($(this).css('padding-right'), 10) );
        $('.changePaddingSize').find('input[name="bottom"]').val( parseInt($(this).css('padding-bottom'), 10) );
        $('.changePaddingSize').find('input[name="left"]').val( parseInt($(this).css('padding-left'), 10) );
    });

    $('.changeCol').submit( function(e) {
    	numCols = $(this).find('input.cols-number').val();
    	$('.row-checked').removeClassRegEx('col\-([a-z]+)\-([0-9]+)').addClass('col-md-'+numCols).addClass('col-lg-'+numCols).attr('data-cols', numCols);
    });

    $('.changeText').submit( function(e) {
    	text = $(this).find('textarea').val();
    	$('.row-checked .rowText').text( text );
    	e.preventDefault();
    });

    $('.changeTextSize').submit( function(e) {
        textSize = $(this).find('input').val();
        $('.row-checked .rowText').css( 'font-size', textSize+'px' );
        e.preventDefault();
    });

    $('.changeTextFont').submit( function(e) {
        textFont = $(this).find('select').val();
        $('.row-checked .rowText').css( 'font-family', '"'+textFont+'"' );
        e.preventDefault();
    });

    $('.changeHeight').submit( function(e) {
    	heightVal = $(this).find('input').val();
    	$('.row-checked').css('height', heightVal+'px');
    	e.preventDefault();
    });

    $('.changeBackground').submit( function(e) {
    	backgroundColor = $(this).find('input').val();
    	$('.row-checked').css('background-color', backgroundColor);
    	e.preventDefault();
    });

    $('.changeColor').submit( function(e) {
    	textColor = $(this).find('input').val();
    	$('.row-checked').css('color', textColor);
    	e.preventDefault();
    });

    $('.changeBackgroundImage').submit( function(e) {
        backgroundImage = $(this).find('input').val();
        console.log(backgroundImage);
        $('.row-checked').css('background-image', 'url("'+backgroundImage+'")');
        e.preventDefault();
    });

    $('.changePaddingSize').submit( function(e) {
        paddingTop = $(this).find('input[name="top"]').val();
        paddingRight = $(this).find('input[name="right"]').val();
        paddingBottom = $(this).find('input[name="bottom"]').val();
        paddingLeft = $(this).find('input[name="left"]').val();
        $('.template-checked').css('padding-top', paddingTop+'px');
        $('.template-checked').css('padding-right', paddingRight+'px');
        $('.template-checked').css('padding-bottom', paddingBottom+'px');
        $('.template-checked').css('padding-left', paddingLeft+'px');
        e.preventDefault();
    });

    $('.changePaddingTextSize').submit( function(e) {
        paddingTop = $(this).find('input[name="top"]').val();
        paddingRight = $(this).find('input[name="right"]').val();
        paddingBottom = $(this).find('input[name="bottom"]').val();
        paddingLeft = $(this).find('input[name="left"]').val();
        $('.row-checked').find('.rowText').css('padding-top', paddingTop+'px');
        $('.row-checked').find('.rowText').css('padding-right', paddingRight+'px');
        $('.row-checked').find('.rowText').css('padding-bottom', paddingBottom+'px');
        $('.row-checked').find('.rowText').css('padding-left', paddingLeft+'px');
        e.preventDefault();
    });

    $('.colorpicker-component').colorpicker({
    	format: 'hex',
    	colorSelectors: {
			'default': '#777777',
			'primary': '#337ab7',
			'success': '#5cb85c',
			'info': '#5bc0de',
			'warning': '#f0ad4e',
			'danger': '#d9534f'
		}
    });

    $('nav.sidebar').on( 'click', '.removeButton', function(e) {
        elem = $('.row-checked');
        $('.one-col').removeClass('row-checked');
        $('nav.sidebar .tools-object-list').hide();
        $('nav.sidebar .tools-list .add-another').hide();
        elem.remove();
    });

    $('nav.sidebar').on( 'click', '.removeTemplateButton', function(e) {
        elem = $('.template-checked');
        $('.template').removeClass('template-checked');
        $('nav.sidebar .tools-template-list').hide();
        elem.remove();
    });

    /*console.log( $("#editor-number").text() );

    console.log( $.cookie('XSRF-TOKEN') );

    $(".saveProject").click( function(e) {
    	var request = new XMLHttpRequest();
		request.open('PATCH', '/api/projects/'+$(".editor-number").text(), false);
		request.setRequestHeader("Content-type","application/json");
		request.send('{"html": "'+$("#editor-block").html()+'", "XSRF-TOKEN": "'+ $.cookie('XSRF-TOKEN') +'"}');
    });*/

    $('#editor-block').on( 'click', '.textChange', function(e){
        actText = $(this).text();
        $('.template .textChange').removeClass('textChangeInProgress');
        $(this).addClass('textChangeInProgress');
        $('nav.sidebar ul.superMenu .template-section .tmpForm textarea').val( actText );
        $('nav.sidebar ul.superMenu .template-section .tmpForm').show();
    });

    $('#editor-block').on( 'click', '.canRepeat', function(e){
        $(this).addClass('repeatInProgress');
        $('nav.sidebar ul.superMenu .template-section .repeatItem').show();
    });

    $('nav.sidebar').on( 'submit', '.templateTextChange', function(e) {
        actText = $(this).find('textarea').val();
        $('.textChangeInProgress').text(actText);
        $('.template .textChange').removeClass('textChangeInProgress');
        $('nav.sidebar ul.superMenu .template-section .tmpForm').hide();
        e.preventDefault();
    });

    $('nav.sidebar').on( 'click', '.repeatItem', function(e) {
        elem = $('.repeatInProgress');
        elem.parent().append( elem.clone() );
        $('.template .canRepeat').removeClass('repeatInProgress');
        $('nav.sidebar ul.superMenu .template-section .repeatItem').hide();
        e.preventDefault();
    });

    $('.updateProject').click( function(e) {
        $.ajax( { 
            'url': '/edytor/'+$('.editor-number').text(), 
            'method': 'POST',
            'data': { 'html': $('#editor-block').html(), 'action': 'updateItem' }
        }).done(function( msg ) {
            //console.log( msg.result );
            if(msg.result === true){
                $('.saveAlert .alert-success').fadeIn( 3000, function() {
                    $(this).fadeOut(3000, function() {

                    });
                });
            } else {
                $('.saveAlert .alert-error').show();
            }
            console.log( 'Data Saved: ' + msg );
        });
        
    });

    $('.templates').on( 'click', '.list-group-item' ,function(e){
        //console.log(  );
        if ( $('.row-checked').length > 0 ) {
            console.log( $(this).find('.contentHtml') );
            var templateNum = $('.template').length + 1;
            $( '<div id="template-' + templateNum + '" class="template">' +$(this).find('.contentHtml').html() + '</div>' ).appendTo( '.row-checked' );
        }
        
    });

    $.get( '/api/templates/', function( data ) {
          if(data.templates.length > 0){
            $.each(data.templates, function( index, value ) {
              //console.log( value );

              $('li .templates').append('<div class="list-group-item"><h4 class="list-group-item-heading">'+value.name+'</h4><div class="contentHtml" style="display:none;">'+value.html+'</div></div>');
            });
          }
    }, 'json' );

});