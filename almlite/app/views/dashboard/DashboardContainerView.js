define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/dashboard/dashboard.html',
    'util/Console',
    'util/JSHelper',
    'views/dashboard/MyWorkItemsView',
    'collections/workItems/WorkItems'
], function ($, _, Backbone, GlobalEvent,a_dashboardTemplate, Console, JSHelper, MyWorkItemsView, WorkItems) {

    var DashboardContainerView = Backbone.View.extend({
    el : ".dashboard-container",

    template : _.template(a_dashboardTemplate),
    myWorkItemsList : null,
    initialize: function () {
    this.myWorkItemsList = new WorkItems();
    //this.myWorkItemsList.fetch();
    this.render();
    		},
    render : function(){
        this.$el.html(this.template);
        new MyWorkItemsView({collection: this.myWorkItemsList});
        return this;
    }

    });

    return DashboardContainerView;
});