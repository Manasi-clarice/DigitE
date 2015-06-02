define([
	'jquery',
	'underscore',
	'Backbone',
	'overrides/GlobalEvent',
	'text!templates/navigationBar.html',
	'collections/menu/Menus',
	'views/menu/MenusView',
], function ($, _, Backbone, GlobalEvent, a_navigationBarTpl, Menus, MenusView) {
	
	var NavigationBarView = Backbone.View.extend({
		el: 'body',
		
		template: _.template(a_navigationBarTpl),
		
		events: {
			'mouseover #menuIcon': 'showMenus',
			'mouseout #menuIcon': 'hideMenus',
			'mouseover #userInfoIcon': 'showUserInfo',
			'mouseout #userInfoIcon': 'hideUserInfo',
			
		},
		
		initialize: function () {
			 console.log('loging template');
			 console.log(this.template);
		},
		
		showMenus: function () {
			this.expandItem('menuIcon');
		},
		
		hideMenus: function () {
			this.collapseItem('menuIcon');
		},
		
		showUserInfo: function () {
			this.expandItem('userInfoIcon');
		},
		
		hideUserInfo: function () {
			this.collapseItem('userInfoIcon');
		},
		
		expandItem: function (a_id) {
			$('#' + a_id).addClass('open');
		},
		
		collapseItem: function (a_id) {
			$('#' + a_id).removeClass('open');
		},
		
		render: function () {
			
			this.$el.prepend(this.template());
			
			this.setMenusView();
			
			return this;
		},
		
		setMenusView: function () {
			var w_menus = new Menus();
			this.menuContainer = $('#menuContainer');
			
			var me = this;
			w_menus.fetch({
				success: function (a_menus) {
					me.menusView = new MenusView({collection: a_menus}).render();
					me.menuContainer.append(me.menusView.el)
				}
			});
		}
	});
	
	return NavigationBarView;
})