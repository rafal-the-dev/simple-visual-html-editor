var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * Edytor posiada projekty 
 * ==========
 */

var Project = new keystone.List('Project');

Project.add({
	name: { type: String, required: true, index: true },
	html: { type: Types.Html, initial: '' },
	author: { type: Types.Relationship, ref: 'User' },
	description: { type: Types.Textarea },
	status: { type: Types.Select, options: 'nowy, projektowanie, koniec', default: 'nowy', initial: 'nowy' },
	visible: { type: Types.Boolean, default: false, initial: false  },
	created: { type: Types.Datetime, default: Date.now }
});

Project.schema.virtual('canEditOwn').get(function() {
	return this.author;
});


/**
 * Registration
 */

Project.defaultColumns = 'name, html, author, description, status, visible';
Project.register();