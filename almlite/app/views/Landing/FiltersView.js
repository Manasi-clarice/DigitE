define([
    "jquery",
    "underscore",
    "Backbone",
    'overrides/GlobalEvent',
    'text!templates/Landing/filterPanel.html',
    'views/Landing/FilterTabView',
    'collections/workItems/Filters'
],function($,_,Backbone,GlobalEvent,a_filterPanelTemplate,FilterTabView, Filters){

    var FiltersView = Backbone.View.extend({
        el:"",
        container : "",
        template : _.template(a_filterPanelTemplate),
        associatedSummaryItemsView : null,

        events : {
          "click li": "selectFilter"
        },
        initialize : function(a,containerName){
                this.container =    containerName;
            this.filtersCollection = new Filters();
            var view = this;
            this.filtersCollection.fetch({
                success : function(){
                    view.render();
                }
            });
            GlobalEvent.on('updateFilterApplied',this.changeFilter,this);
        },

        getSelectedFilter : function () {
          return this.selectedFilter;
        },

        setSelectedFilter : function (a_filter) {
            this.selectedFilter = a_filter;
        },

        changeFilter : function(eventOptions){
            this.filtersCollection.each(function(filter){
                this.setSelectedFilter(filter);
                if(filter.get('id') == eventOptions.selectedFilter.get('id')){
                    filter.set('isActive',true);
                }else{
                    filter.set('isActive', false);
                }
            },this);
            this.render();
        },
        show :  function(event){
            var id = this.$el.selector;
            $(id).addClass("toggled").slideToggle("slow");
            $(event.target).toggleClass("active");
            if(!$(id).hasClass("active")){
                $(id).addClass("active");
            }
            this.render();
        },

        render : function(){
            this.$el.html(this.template);
            this.filtersCollection.each(this.appendFilter,this);
            var activeFilters = this.filtersCollection.where({isActive : true});
            if(activeFilters.length == 1){
                this.setSelectedFilter(activeFilters[0]);
                var optionsForEvent = {container:this.container, selectedFilter : activeFilters[0]};
                GlobalEvent.trigger("fetch:WorkItemsSummary",optionsForEvent);
            }
            return  this;
        },

        appendFilter : function(filter){
            //var ul = this.$el.find(".filter_panel_tab .nav-tabs");
            console.log(" selector "+this.$el.selector);
            var filterTab = new FilterTabView({el : this.$el.selector + " .filter_panel_tab .nav-tabs",model : filter},this.container);

        }
    });
    return FiltersView;
});