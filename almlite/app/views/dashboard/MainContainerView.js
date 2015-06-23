define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/dashboard/dashboard.html',
    'util/Console',
    'util/JSHelper',
    'views/dashboard/WorkItemsView',
    'collections/workItems/WorkItems'
], function ($, _, Backbone, GlobalEvent,a_dashboardTemplate, Console, JSHelper, WorkItemsView, WorkItems) {

    var MainContainerView = Backbone.View.extend({
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
        //Load the filters section for inbox.
        // then
        new WorkItemsView({collection: this.myWorkItemsList});
        return this;
    }

    });

    return MainContainerView;
});