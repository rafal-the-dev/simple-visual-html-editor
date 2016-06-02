var keystone = require('keystone');
var Types = keystone.Field.Types;

var Template = new keystone.List('Template');

Template.add({
	name: { type: String, required: true, index: true },
	html: { type: Types.Html, initial: true },
	created: { type: Types.Datetime, default: Date.now },
	preview: { 
		type: Types.LocalFile,
		dest: './public/files',
		prefix: '/files/',
		filename: function(item, file){
			return item.id + '.' + file.extension
		},
		format: function(item, file){
			return '<img src="/files/'+ item.preview.filename +'" style="max-width: 300px">';
		}
	}
});

Template.defaultColumns = 'name, html, preview';
Template.register();