define([
	'jquery',
	'underscore',
	'Backbone'
], function ($, _, Backbone) {
	
	var MenuItemView = Backbone.View.extend({
		tagName: 'li',
		
		template: _.template('<a><span class="<%=className%>"></span><%=text%></a>'),
		
		initialize: function () {
			
		},
		
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			
			return this;
		}
	});
	
	return MenuItemView;
})