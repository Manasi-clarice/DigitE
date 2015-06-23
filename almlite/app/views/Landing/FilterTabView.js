define([
    "jquery",
    "underscore",
    "Backbone",
    'overrides/GlobalEvent',
    'text!templates/Landing/filter.html'
],function($,_,Backbone,GlobalEvent,a_filterPanelTemplate){
       var FilterTabView = Backbone.View.extend({
            container : "",
            template : _.template(a_filterPanelTemplate),
            events :{
                "click a" : "selectFilter"
            },
            initialize : function(overrides,containerName){
                this.container = containerName;
                _.bindAll(this,'selectFilter');
                this.render();
            },
            selectFilter : function(event){
                var targetHtml = event.target.innerText;
                var compareToInnerHtml = this.model.get('text');
                //console.log( compareToInnerHtml);
                if(targetHtml == compareToInnerHtml){
                        var eventOptions = {container : this.container,selectedFilter : this.model};
                        GlobalEvent.trigger('updateFilterApplied' , eventOptions);
                        GlobalEvent.trigger('fetch:WorkItemsSummary',eventOptions);
                }
            },
            render :function (){
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
       });

       return FilterTabView;

});
