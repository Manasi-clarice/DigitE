define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/Landing/dashboard.html',
    'util/Console',
    'util/JSHelper',
    'views/Landing/WorkItemsView',
    'collections/workItems/WorkItems'
], function ($, _, Backbone, GlobalEvent,a_dashboardTemplate, Console, JSHelper, WorkItemsView, WorkItems) {

    var MainContainerView = Backbone.View.extend({
    el : ".dashboard-container",

    template : _.template(a_dashboardTemplate),
    myWorkItemsList : null,
    initialize: function () {
    _.bindAll(this,'render');
        this.myWorkItemsList = new WorkItems();
        //this.myWorkItemsList.fetch();
        this.render();
    },
    render : function(){
        this.$el.html(this.template);
        var workItems = this.myWorkItemsList;
        new WorkItemsView({collection: workItems, el:".work-items"},"inbox-items");
        return this;
    }

    });

    return MainContainerView;
});