define([
	'jquery',
	'underscore',
	'Backbone',
], function ($, _, Backbone) {
	
	var MenuItem = Backbone.Model.extend({
		defaults: {
			className: undefined,
			text: undefined
		}
	});
	
	return MenuItem;
})