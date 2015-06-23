define([
	'jquery',
	'underscore',
	'Backbone',
	'overrides/GlobalEvent',
	'util/Console',
	'util/JSHelper',
	'views/NavigationBarView',
	'views/FooterView',
	'views/Landing/MainContainerView'
	//'view/MainContainerView'
], function ($, _, Backbone, GlobalEvent, Console, JSHelper, NavigationBarView, FooterView, MainContainerView) {
	
	var LandingPageView = Backbone.View.extend({
		el: 'body',
		
		initialize: function () {
			GlobalEvent.on('show:LandingPage', this.show, this);
		},
		
		show: function () {
			this.render();
		},
		
		render: function () {
			//alert("This is landing");
			this.navigationBarView = new NavigationBarView().render();
			this.mainContainerView = new MainContainerView();
			this.footerView = new FooterView().render();
			
			return this;
		}
	});
	
	return LandingPageView;
})