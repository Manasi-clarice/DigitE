define([
	'jquery',
	'underscore',
	'Backbone',
	'util/JSHelper',
	'views/menu/MenuItemsView'
], function ($, _, Backbone, JSHelper, MenuItemsView) {
	
	var MenuView = Backbone.View.extend({
		tagName: 'div',
		
		className: 'col-md-3',
		
		initialize: function () {
			
		},
		
		render: function () {
			var w_menuItems = this.model.get('menuItems');
			
			this.menuItemsView = new MenuItemsView({
				collection: w_menuItems,
				ulClassName: this.model.get('ulClassName')
			});
			
			this.$el.addClass(this.model.get('className')).append(this.menuItemsView.render().el);
			
			return this;
		}
	});
	
	return MenuView;
})