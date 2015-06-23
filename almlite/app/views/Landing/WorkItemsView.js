define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/Landing/myWorkItems.html',
    'views/Landing/WorkItemView',
    'views/Landing/FiltersView',
    'collections/workItems/WorkItems',
    'views/Landing/SummaryItemsView',
    'util/JSHelper',
], function ($, _, Backbone, GlobalEvent,a_workItemsTemplate, WorkItemView,FiltersView, WorkItems, SummaryItemsView, JSHelper) {

var WorkItemsView = Backbone.View.extend({
    el : "",
    name : "",
    container : "",
    events : {
        'click .filter-button' :  "showFilterPanel"
    },
    template : _.template(a_workItemsTemplate),
    filtersView : null,
    summaryItemsView : null,
    selectedFilter : null,
    initialize: function (overrides,name) {
        this.name = name;
        var me = this;
       /* var datasource = 'inboxURL';
        this.collection.fetch({
            success : function(){
                me.render();
            },
            url: JSHelper.getURL(datasource)
        });*/
        me.render();
        GlobalEvent.on("ChangeWorkItems",this.summaryClickWorkItems, this);
        GlobalEvent.on("setSelectedFilter",this.setSelectedFilter, this);
    },
    showFilterPanel : function(event){
        if(this.filtersView){
            this.filtersView.show(event);
        }
    },

    summaryClickWorkItems : function(eventOptions){
        if(eventOptions.container == this.name){
            var me = this;
            var w_url = "app/data/" + this.filtersView.getSelectedFilter().get('name')  +"-"+ eventOptions.model.get('name') +"-workitems.json" ;
            this.collection.fetch({
                success : function(){
                    me.$el.html(this.template);
                    me.$el.find(".my_workitems").html('').unbind();
                    me.collection.each(me.appendWorkItem,me);
                },
                url:w_url
            });
        }

    },
    render : function(){
        this.$el.html(this.template);
        this.summaryItemsView = new SummaryItemsView({el: this.$el.selector + " .summary_items"},this.name);
        this.filtersView = new FiltersView({el: this.$el.selector + " .filter_panel"}, this.name);
        this.collection.each(this.appendWorkItem,this);
        return this;
    },

    appendWorkItem : function (workItem){
        var workItemView = new WorkItemView({model : workItem});
        this.$el.find(".my_workitems").append(workItemView.el);
    }


    });

    return WorkItemsView;
});