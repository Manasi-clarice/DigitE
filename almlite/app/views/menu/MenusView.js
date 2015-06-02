define([
	'jquery',
	'underscore',
	'Backbone',
	'util/JSHelper',
	'views/menu/MenuView'
], function ($, _, Backbone, JSHelper, MenuView) {
	
	var MenusView = Backbone.View.extend({
		tagName: 'div',
		
		className: 'row',
		
		initialize: function () {
			
		},
		
		render: function () {
			this.collection.each(this.addSingleMenuView, this);
			
			return this;
		},
		
		addSingleMenuView: function (a_menuModel) {
			var w_menuView = new MenuView({model: a_menuModel});
			
			this.$el.append(w_menuView.render().el);
		}
	});
	
	return MenusView;
})