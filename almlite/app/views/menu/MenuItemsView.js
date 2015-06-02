define([
	'jquery',
	'underscore',
	'Backbone',
	'views/menu/MenuItemView'
], function ($, _, Backbone, MenuItemView) {
	
	var MenuItemsView = Backbone.View.extend({
		tagName: 'ul',
		
		className: 'menu_items',
		
		initialize: function (a_config) {
			this.ulClassName = a_config.ulClassName;
		},
		
		render: function () {
			this.$el.addClass(this.ulClassName);
			this.collection.each(this.addSingleMenuItem, this);
			
			return this;
		},
		
		addSingleMenuItem: function (a_menuItemModel) {
			this.$el.append(new MenuItemView({model: a_menuItemModel}).render().el);
		}
	});
	
	return MenuItemsView;
})