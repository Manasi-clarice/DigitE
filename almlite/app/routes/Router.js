define([    
    'Backbone',
    'overrides/GlobalEvent',
    'views/LandingPageView'
], function (Backbone, GlobalEvent, LandingPageView) {
	
	var Router = Backbone.Router.extend({
		routes: {
			'': 'showLandingPage', 
			'showLandingPage': 'showLandingPage'
		},
		
		showLandingPage: function () {
			GlobalEvent.trigger('show:LandingPage');
		}
	});
	
	return Router;
})