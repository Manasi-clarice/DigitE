define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/dashboard/myWorkItems.html',
    'util/Console',
    'util/JSHelper',
    'views/dashboard/MyWorkItemView',
    'collections/workItems/WorkItems'
], function ($, _, Backbone, GlobalEvent,a_workItemsTemplate, Console, JSHelper, MyWorkItemView, WorkItems) {

    var MyWorkItemsView = Backbone.View.extend({
    el : ".work-items",

    template : _.template(a_workItemsTemplate),
    initialize: function () {
    console.log("My Work Items");
    var me = this;
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


        //var w_container = this.$el.find(".my_workitems");
       /* var w_myWorkItems = new WorkItems();
        			var me = this;
        			w_myWorkItems.fetch();
*/
//        			_.forEach(w_myWorkItems,this.appendWorkItem,this);
            this.collection.each(this.appendWorkItem,this);

        return this;
    },

    appendWorkItem : function (workItem){
        console.log("Work Item Model ....");
        console.log(workItem);
        var workItemView = new MyWorkItemView({model : workItem});
        this.$el.find(".my_workitems").append(workItemView.el);
    }


    });

    return MyWorkItemsView;
});