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
        containerClass : "",
        template : _.template(a_filterPanelTemplate),
        associatedSummaryItemsView : null,
        rendered : false,
        events : {
          "click li": "selectFilter"
        },
        initialize : function(a,containerName){
            //console.log(containerName);
            this.container = containerName;
            this.containerClass = containerName;
            this.filtersCollection = new Filters();
            var view = this;
            this.filtersCollection.fetch({
                success : function(){
                    view.render();
                }
            });
            GlobalEvent.on('updateFilterApplied',this.changeFilter,this);
            GlobalEvent.on('closeFilterPanel',this.closeFilterPanel,this);

        },

        closeFilterPanel : function(a_containerClass){
            if(this.containerClass!=a_containerClass){
                console.log(this.containerClass+":"+a_containerClass);
                var id = this.$el;
                if(this.$el.hasClass("active")){
                    $("."+this.containerClass).find(".icon-Filter").removeClass("active");
                    $("."+this.containerClass).find(".filter_panel").removeClass("active");
                    $(id).slideToggle("slow");
                }
            }
        },

        getSelectedFilter : function () {
          return this.selectedFilter;
        },

        setSelectedFilter : function (a_filter) {
            this.selectedFilter = a_filter;
        },

        changeFilter : function(eventOptions){
            if(this.container == eventOptions.container){
                this.filtersCollection.each(function(filter){
                    this.setSelectedFilter(filter);
                    if(filter.get('id') == eventOptions.selectedFilter.get('id')){
                        filter.set('isActive',true);
                    }else{
                        filter.set('isActive', false);
                    }
                },this);
                this.render();
            }
        },
        show :  function(event){
            var id = this.$el.selector;
            $(id).slideToggle("slow");
            $(id).toggleClass("active");
            $(event.target).toggleClass("active");
            var w_me = this;

            if(this.rendered == false){
                this.render();
            }
            this.rendered = true;
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
            var filterTab = new FilterTabView({el : this.$el.selector + " .filter_panel_tab .nav-tabs",model : filter},this.container);
        }
    });
    return FiltersView;
});