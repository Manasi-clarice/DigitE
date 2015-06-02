define([
	'jquery',
	'underscore',
	'Backbone',
	'models/menu/Menu',
	'collections/menu/MenuItems',
	'util/JSHelper'
], function ($, _, Backbone, Menu, MenuItems, JSHelper) {
	
	var Menus = Backbone.Collection.extend({
		model: function (a_attribs, a_options) {
			
			//set the menuItems attribute of Menu to MenuItems collection instance
			a_attribs.menuItems = new MenuItems(a_attribs.menuItems);
			
			return new Menu(a_attribs);
		},
		
		url: JSHelper.getURL('menusURL'),
		
		parse: function (a_responseJSON) {
			return a_responseJSON.menus;
		}
	});
	
	return Menus;
})