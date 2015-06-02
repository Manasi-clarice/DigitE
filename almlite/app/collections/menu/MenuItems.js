define([
	'jquery',
	'underscore',
	'Backbone',
	'models/menu/MenuItem'
], function ($, _, Backbone, MenuItem) {
	
	var MenuItems = Backbone.Collection.extend({
		model: MenuItem
	});
	
	return MenuItems;
})