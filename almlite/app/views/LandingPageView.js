define([
	'jquery',
	'underscore',
	'Backbone',
	'overrides/GlobalEvent',
	'util/Console',
	'util/JSHelper',
	'views/NavigationBarView',
	'views/dashboard/MyWorkitems'
	//'view/MainContainerView'
], function ($, _, Backbone, GlobalEvent, Console, JSHelper, NavigationBarView, MainContainerView) {
	
	var LandingPageView = Backbone.View.extend({
		el: 'body',
		
		initialize: function () {
			GlobalEvent.on('show:LandingPage', this.show, this);
		},
		
		show: function () {
			this.render();
		},
		
		render: function () {
			alert("This is landing");
			this.navigationBarView = new NavigationBarView().render();
			//this.mainContainerView = new MainContainerView().render();
			
			return this;
		}
	});
	
	return LandingPageView;
})