define([
    'jquery',
    'bootstrap',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/dashboard/singleWorkItem.html',
    'util/Console',
    'util/JSHelper',
    'models/workItem/WorkItem'
], function ($, bootstrap, _, Backbone, GlobalEvent,a_workItemTemplate, Console, JSHelper, WorkItem) {

    var WorkItemView = Backbone.View.extend({
            el :"",
            template : _.template(a_workItemTemplate),
            initialize : function(){
            //this.model = new WorkItem();
                this.render();
            },
            events :{
              "mouseover .heading" : "onHeadingHover",
            },
            onHeadingHover : function(e) {
                var hoverEl = $(e.target);
                e.preventDefault();
                hoverEl.parent().tooltip({
                    trigger: 'hover',
                    placement: "top",
                    container: 'body'
                });

                e.stopPropagation();
            },
            render : function(){
                this.$el.html(this.template(this.model.toJSON()));
            }
    });

   return WorkItemView;
});
