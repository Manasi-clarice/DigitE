define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/dashboard/singleWorkItem.html',
    'util/Console',
    'util/JSHelper',
    'models/workItem/WorkItem'
], function ($, _, Backbone, GlobalEvent,a_workItemTemplate, Console, JSHelper, WorkItem) {

    var WorkItemView = Backbone.View.extend({
            el :"",
            template : _.template(a_workItemTemplate),
            initialize : function(){
            //this.model = new WorkItem();
                this.render();
            },
            render : function(){
                this.$el.html(this.template(this.model.toJSON()));
            }
    });

   return WorkItemView;
});
