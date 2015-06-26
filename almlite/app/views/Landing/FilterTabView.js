define([
    "jquery",
    "underscore",
    "Backbone",
    "bootstrap",
    'overrides/GlobalEvent',
    'text!templates/Landing/filter.html',
    'collections/workItems/AdvancedFilter',
    'views/Landing/AdvancedFilterContentView'

],function($,_,Backbone, Bootstrap, GlobalEvent,a_filterPanelTemplate, AdvancedFilter, AdvancedFilterContentView){
       var FilterTabView = Backbone.View.extend({
            container : "",
           advancedFilterContentView : '',
            template : _.template(a_filterPanelTemplate),
            events :{
                "click a" : "selectFilter",
                "click span.arrow" : "openAdvancedFilter"
            },
            initialize : function(overrides,containerName){
                this.container = containerName;
                _.bindAll(this,'selectFilter');
                this.collection = new AdvancedFilter();
                var w_model = this.model.toJSON();
                if(w_model.hasAdvancedFilter == true){
                    var me = this;
                    var w_url = "app/data/"+this.model.get('name')+"-inline-filters.json";
                    this.collection.fetch({
                        success : function(){
                            me.advancedFilterContentView = new AdvancedFilterContentView({el : me.$el.selector ,model : me.model,collection : me.collection});
                        },
                        url:w_url
                    });
                }
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
           openAdvancedFilter : function(event){
               var targetHtml = $.trim($(event.target).siblings("a").html());
               var compareToInnerHtml = this.model.get('text');
               if(targetHtml == compareToInnerHtml){
                   this.advancedFilterContentView.render();
                   var ele = $(event.target);
                   var id = ele.attr('tab-content');
                   ele.parents("li").siblings("li").find(".arrow").removeClass("active");
                   ele.parents("li").siblings("li").find("a").removeClass("active");
                   ele.addClass("active");
                   if (!$("#"+id).length ) {
                       ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find(".tab-pane").hide();
                       ele.parents(".filter_panel_tab").siblings(".filter_panel_content").height("auto");
                   }else{
                       ele.parents(".filter_panel_tab").siblings(".filter_panel_content").animate({ 'height': '235'}, 300);
                   }
                   ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).siblings().hide("slow");
                   ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).slideDown("slow");
                   ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).css("visibility","visible");
                   ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).animate({ 'height': '235'}, 300);
               }
           },
            render :function (){
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
       });

       return FilterTabView;

});
