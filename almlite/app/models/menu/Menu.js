define([
	'jquery',
	'underscore',
	'Backbone',
], function ($, _, Backbone) {
	
	var Menu = Backbone.Model.extend({
		defaults: {
			className: undefined,
			ulClassName: undefined,
			menuItems: undefined
		}
	});
	
	return Menu;
})