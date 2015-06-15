require.config({
	baseUrl: '/app',
	
	paths: {
		jquery: '../lib/jquery/dist/jquery',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
		underscore: '../lib/underscore/underscore',
		Backbone: '../lib/backbone/backbone',
		text: '../lib/text/text',
	}
});

require([
	'util/JSHelper',
    'jquery',
    'underscore',
    'Backbone',
    'App'
], function (JSHelper, $, _, Backbone, App) {
	
	//$.noConflict(); 	//NOTE: once the development completed uncomment this line	
	_.noConflict();
	Backbone.noConflict();
	
	App.initialize();
});