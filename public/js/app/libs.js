define(['jquery'], function($) {

	var Libs = function() {

		

	};

	Libs.prototype.rgbToHex = function (rgb) {
	    var result = /^rgb\(?([0-9]+)\,\s([0-9]+)\,\s([0-9]+)\)$/i.exec(rgb);

	    if(result){
	        return '#' + parseInt(result[1], 10).toString(16) + parseInt(result[2], 10).toString(16) + parseInt(result[3], 10).toString(16);
	    }
	    return 'transparent';
	}

	var libs = new Libs();

	return libs;

});