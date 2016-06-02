requirejs.config({
    baseUrl: '/js',
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        jquery: 'jquery/jquery-1.11.2.min',
        bootstrap :'bootstrap/bootstrap-3.3.4.min',
        colorpicker: 'bootstrap/bootstrap-colorpicker',
        jqueryCookie: 'jquery.cookie',
        ext: 'app/ext',
        menu: 'app/menu',
        libs: 'app/libs'
    }
});

define(['jquery', 'bootstrap', 'colorpicker', 'ext', 'menu', 'libs'], function($, bootstrap, colorpicker, ext, menu, libs) {

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

    $(function() {

        $('.removeChecked').click(function() {
            menu.removeOneCol();
            menu.removeTemplateChcecked();
            menu.hideToolObjectList();
            menu.changeBlockButton('hide');
            menu.hideTemplateList();
        });

        $('.add-row').click( function(e) {
            menu.addRow();
        });

        $('.add-another').click( function(e) {
            $('#editor-block .row-checked').parent().append( '<div data-cols="12" class="one-col col-md-12 col-lg-12"><div class="rowText">Example text</div></div>' );
        });

        $('#editor-block').on( 'click', '.row .one-col', function(e) {
            e.stopPropagation();
            $('#editor-block .row-checked').removeClass('row-checked');
            $('#editor-block .template').removeClass('template-checked');
            menu.hideTemplateList();
            //$('nav.sidebar .tools-template-list').hide();
            $(this).addClass('row-checked');
            $('nav.sidebar .tools-object-list').show();
            $('.changeText textarea').val( $(this).find('.rowText').text() );
            $('.changeHeight input').val( parseInt($(this).css('height'), 10) );
            $('.changeTextSize input').val( parseInt($(this).find('.rowText').css('font-size'), 10) );
            $('.changeCol input').val( $(this).attr('data-cols') );
            backgroundColor = libs.rgbToHex($(this).css('background-color'));
            $('.changeBackground input').val( backgroundColor );
            textColor = libs.rgbToHex($(this).css('color'));
            
            menu.changeBackgroundInputGroupColor( this );
            //$('.changeBackground .input-group-addon i').css('background-color', $(this).css('background-color'));
            menu.changeColor(textColor);
            //$('.changeColor .input-group-addon i').css('color', );
            menu.changeInputGroupColor( this );
            //$('.changeColor input').val( textColor );
            menu.changeBlockButton('show');
            //$('nav.sidebar .first-tools-list .add-another').show();
            menu.changePaddingTextSize(this, 'top');
            menu.changePaddingTextSize(this, 'right');
            menu.changePaddingTextSize(this, 'bottom');
            menu.changePaddingTextSize(this, 'left');
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
            $('nav.sidebar .first-tools-list .add-another').hide();
            elem.remove();
        });

        $('nav.sidebar').on( 'click', '.removeTemplateButton', function(e) {
            elem = $('.template-checked');
            $('.template').removeClass('template-checked');
            $('nav.sidebar .tools-template-list').hide();
            elem.remove();
        });

        $('#editor-block').on( 'click', '.textChange', function(e){
            actText = $(this).text();
            $('.template .textChange').removeClass('textChangeInProgress');
            $(this).addClass('textChangeInProgress');
            $('nav.sidebar ul.superMenu .template-section .tmpForm textarea').val( actText );
            $('nav.sidebar ul.superMenu .template-section .tmpForm').show();
        });

        $('#editor-block').on( 'click', '.canRepeat', function(e){
            $('.canRepeat').removeClass('repeatInProgress');
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
            elem = $('.repeatInProgress').first();
            var newElem = elem.parent().append( elem.clone() );
            $( ".textChangeInProgress" ).last().removeClass('textChangeInProgress');
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

        $('.saveDesc').click( function(e) {
            $('#descForm').submit();
        });

        $('#descForm').submit( function(e) {

            
            var dataSplit =  $(this).serialize().split('&');
            var data = {};
            var tmp;
            for(var i = 0; i < dataSplit.length; i++){
                tmp = dataSplit[i].split('='); 
                data[tmp[0]] = tmp[1];
            }
            if(data.description.length > 0){
                data.description = data.description.replace(/\+/g,' ');
            }

            $.ajax( { 
                'url': '/edytor/'+$('.editor-number').text(), 
                'method': 'POST',
                'data': data
            }).done(function( msg ) {
                //console.log( msg.result );
                if(msg.result === true){
                    $('.saveAlert .alert-success').fadeIn( 3000, function() {
                        $(this).fadeOut(3000, function() {

                        });
                    });
                    $('#saveDescModal').modal('hide');
                } else {
                    $('.saveAlert .alert-error').show();
                }

            });


        });
        

        $('.templates').on( 'click', '.list-group-item' ,function(e){
            if ( $('.row-checked').length > 0 ) {
                console.log( $(this).find('.contentHtml') );
                var templateNum = $('.template').length + 1;
                $( '<div id="template-' + templateNum + '" class="template">' +$(this).find('.contentHtml').html() + '</div>' ).appendTo( '.row-checked' );
            }
            
        });

        $('.backgrounds').on( 'click', '.list-group-item', function(e){
            console.log( 'tu ?' );
            $('.changeBackgroundImage input').val( $(this).find('img').attr('src') );
            
        });

        $.get( '/api/templates/', function( data ) {
              if(data.templates.length > 0){
                $.each(data.templates, function( index, value ) {
                  console.log( value );
                  var imagePreview = null;
                  if( value.preview ){
                    imagePreview = '<img style="max-width:40px;" src="/files/'+ value.preview.filename +'" class="img-responsive" alt="Responsive image" />';
                  }
                  $('.templates .list-group').append('<div class="list-group-item"><h4 class="list-group-item-heading">'+value.name+'</h4>'+ imagePreview +'<div class="contentHtml" style="display:none;">'+value.html+'</div></div>');
                });
              }
        }, 'json' );

    });

});