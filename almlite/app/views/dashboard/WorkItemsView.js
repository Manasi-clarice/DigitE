define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/dashboard/myWorkItems.html',
    'util/Console',
    'util/JSHelper',
    'views/dashboard/WorkItemView',
    'collections/workItems/WorkItems'
], function ($, _, Backbone, GlobalEvent,a_workItemsTemplate, Console, JSHelper, WorkItemView, WorkItems) {

    var WorkItemsView = Backbone.View.extend({
    el : ".work-items",

    template : _.template(a_workItemsTemplate),
    initialize: function () {
        console.log("My Work Items");
        var me = this;
        //ToDo: Filters to be fetched
        this.collection.fetch({
            success : function(){
                me.render();
            }
        });
        console.log(this.collection);
            //this.render();
    },
    render : function(){
        this.$el.html(this.template);
        // First fetch
        this.collection.each(this.appendWorkItem,this);

        return this;
    },

    appendWorkItem : function (workItem){
        console.log("Work Item Model ....");
        console.log(workItem);
        var workItemView = new WorkItemView({model : workItem});
        this.$el.find(".my_workitems").append(workItemView.el);
    }


    });

    return WorkItemsView;
});