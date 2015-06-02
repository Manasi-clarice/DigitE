define([
    'underscore',
    'Backbone'
], function (_, Backbone) {
	var GlobalEvent = _.extend({}, Backbone.Events);
	
	return GlobalEvent;
});