define([
    'jquery',
    'bootstrap',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
    'circliful',
	'text!templates/Landing/singleWorkItem.html',
    'util/Console',
    'util/JSHelper',
    'models/workItem/WorkItem'
], function ($, bootstrap, _, Backbone, GlobalEvent, circliful, a_workItemTemplate, Console, JSHelper, WorkItem) {

    var WorkItemView = Backbone.View.extend({
            el :"",
            template : _.template(a_workItemTemplate),
            initialize : function(){
            //this.model = new WorkItem();
                this.render();
                GlobalEvent.on('Hide:InlinePanel', this.Hide, this);
            },
            flag : false,
            events :{
              "mouseover .heading" : "onHeadingHover",
              "click .work_item_title .heading" : "show_inline_pannel",
            },
            show_inline_pannel  : function(e){
                var w_inline_row = $(e.target).parents(".row_border").find(".row:first-child").siblings(".inline_action_row");
                w_inline_row.toggleClass("active");
                w_inline_row.slideToggle("slow");
                if(w_inline_row.hasClass("active")){
                    this.flag = true;
                }
                else{
                    this.flag = false;
                }

                GlobalEvent.trigger("Hide:InlinePanel",this.$el);
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
            Hide : function(a_el){
                if(this.$el != a_el && this.flag == true ){
                    this.$el.find('.inline_action_row').slideToggle("slow");
                    this.$el.find('.inline_action_row').toggleClass("active");
                    this.flag = false;
                }
            },
            render : function(){
                var me = this;
                this.$el.html(this.template(this.model.toJSON()));
                this.$el.find('.work-item-stat').circliful({});

            },
    });

   return WorkItemView;
});
