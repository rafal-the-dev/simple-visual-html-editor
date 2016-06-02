define(['jquery'], function($) {

	// Obiekt menu definicje bloków i przycisków

	var Menu = function() {
		// Bloki głowne
		this.menuName = 'nav.sidebar';
		this.editorBlock = '#editor-block';

		// podstawowa część projektu
		this.oneCol = '.one-col';

		// klasy elementów
		this.newBlockButton = this.menuName + ' .first-tools-list .add-another';
		this.newRowButton = this.menuName + ' .first-tools-list .add-row';
		this.templateList = this.menuName + ' .tools-template-list';
		this.template = this.editorBlock + ' .template';
		this.toolObjectList = this.menuName + ' .tools-object-list';
		this.elemPaddingTextSize = '.changePaddingTextSize';
		this.inputColor = this.menuName + '.changeColor input';
		this.inputGroupColor = this.menuName + ' .changeColor .input-group-addon i';
		this.backgroundInputGroupColor = this.menuName + ' .changeBackground .input-group-addon i';

		// zaznaczenia w projekcie
		this.templateChecked = 'template-checked';
		this.rowChecked = 'row-checked';

		// kod wstrzykiwany przy tworzeniu kolejnego wiersza
		this.contentRow = '<div class="row"><div data-cols="12" class="one-col col-md-12 col-lg-12"><div class="rowText">Example text</div></div></div>';
	};

	Menu.prototype.changeRowButton = function( type ) {
	  	
	  	if(type == 'hide'){
	  		$(this.newRowButton).hide();
	  	} else {
	  		$(this.newRowButton).show();
	  	}
	};

	Menu.prototype.changeBlockButton = function( type ) {
	  	
	  	if(type == 'hide'){
	  		$(this.newBlockButton).hide();
	  	} else {
	  		$(this.newBlockButton).show();
	  	}
	};

	Menu.prototype.hideTemplateList = function() {
	  
		$(this.templateList).hide();
	  
	};

	Menu.prototype.removeTemplateChcecked = function() {

		$(this.template).removeClass(this.templateChecked);
	  
	};

	Menu.prototype.removeTemplateChcecked = function() {

		$(this.template).removeClass(this.templateChecked);
	  
	};

	Menu.prototype.removeOneCol = function() {

		$(this.oneCol).removeClass(this.rowChecked);
	  
	};

	Menu.prototype.hideToolObjectList = function() {

		$(this.toolObjectList).hide();

	}

	Menu.prototype.addRow = function() {

		$(this.editorBlock).append(this.contentRow);

	}

	Menu.prototype.changePaddingTextSize = function( elem, side ) {

		$(this.elemPaddingTextSize).find('input[name="' + side + '"]').val( parseInt($(elem).find('.rowText').css('padding-'+side), 10) );

	}

	Menu.prototype.changeColor = function( color ){
		$(this.inputColor).val( color );
	}

	Menu.prototype.changeInputGroupColor = function( elem ){
		$(this.inputGroupColor).css('color', $(elem).css('color') );
	}

	Menu.prototype.changeBackgroundInputGroupColor = function( elem ){
		$(this.backgroundInputGroupColor).css('background-color', $(elem).css('background-color'));
	}

	var menu = new Menu();

	return menu;

});