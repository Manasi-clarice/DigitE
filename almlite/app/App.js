define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
    'routes/Router',
    'util/Console',
    'views/LandingPageView'
], function ($, _, Backbone, GlobalEvent, Router, Console, LandingPageView) {
	
	var initialize = function () {
		Console.log('Application initialized.');
		new LandingPageView();
		new Router();
		
		Backbone.history.start();
		

	};
	
	return {
		initialize: initialize
	};
	
});