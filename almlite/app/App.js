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
		
		new Router();
		
		Backbone.history.start();
		
		new LandingPageView().render();
	};
	
	return {
		initialize: initialize
	};
	
});