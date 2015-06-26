define([
    "jquery",
    "underscore",
    "Backbone",
    "bootstrap",
    'overrides/GlobalEvent',
    'text!templates/Landing/inlineFilterPanel.html',
    'text!templates/Landing/singleInlineFilter.html'
],function($,_,Backbone, Bootstrap, GlobalEvent,a_inlineFiltersTemplate, a_singleInlineFilter){
    var AdvancedFilterContentView = Backbone.View.extend({
        container : "",
        template : _.template(a_inlineFiltersTemplate),
        singleInlineFilter : _.template(a_singleInlineFilter),
        events :{
        },
        initialize : function(overrides,containerName){
            this.container = containerName;
            //this.render();
        },
        render :function (){
            this.$el.parents(".filter_panel_tab").siblings(".filter_panel_content").html(this.template(this.model.toJSON()));
            var w_me = this;
            var w_flag = 0;
            this.collection.each(function(a_inilefilter){

                w_me.$el.parents(".filter_panel_tab").siblings(".filter_panel_content").find(".col-md-3").eq(w_flag).append(w_me.singleInlineFilter(a_inilefilter.toJSON()));
                if(++w_flag==4){
                    w_flag = 0;
                }
            },this);
            return this;
        }
    });

    return AdvancedFilterContentView;

});
