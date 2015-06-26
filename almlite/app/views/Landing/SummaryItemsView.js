define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
	'text!templates/Landing/summaryItems.html',
	'text!templates/Landing/summaryItem.html',
    'collections/workItems/SummaryItems',
    'views/Landing/SummaryItemView'
], function ($, _, Backbone, GlobalEvent,a_summaryItemsTemplate,a_singleItemTemplate, SummaryItems, SummaryItemView) {

    var SummaryItemsView = Backbone.View.extend({
        el : "",
        container : "",
        associatedFilterModel : null,
        summaryItemsTemplate : _.template(a_summaryItemsTemplate),
        summaryItemTemplate : _.template(a_singleItemTemplate),

        initialize :function(overrides,containerName){
            this.container = containerName;
            GlobalEvent.on("fetch:WorkItemsSummary",this.fetchSummary,this);
            GlobalEvent.on("updateSummaryApplied",this.updateSummary,this);

            this.collection = new SummaryItems();
        },

        events :{
            "click .status_count" : "fetchWorkItems",
        },
        fetchSummary : function(eventOptions){
            if(eventOptions){
                if(eventOptions.container == this.container){
                    var me = this;
                    this.collection.fetch({
                        url : "app/data/" + eventOptions.selectedFilter.get('name')  + "-summary.json",
                        success : function(){
                            me.render();
                        }
                    });
                }
            }

        },

        updateSummary : function(eventOptions){
            if(this.container == eventOptions.container){
                this.collection.each(function(a_summaryItem){
                    if(a_summaryItem.get('name') == eventOptions.model.get('name')){
                        a_summaryItem.set('isActive',true);
                    }else{
                        a_summaryItem.set('isActive', false);
                    }

                },this);
                this.$el.html('').unbind();
                this.render();
            }
        },
        render : function(){
            this.$el.html(this.summaryItemsTemplate);
            this.collection.each(this.appendSummaryItem, this);
            return this;
        },

        appendSummaryItem : function(summaryItem){
            this.$el.append(new SummaryItemView({el : this.$el, model : summaryItem, container : this.container},this.container));
        }
    });
    return SummaryItemsView;
});