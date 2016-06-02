
define(['jquery'], function($) {

    $.fn.extend({
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

});