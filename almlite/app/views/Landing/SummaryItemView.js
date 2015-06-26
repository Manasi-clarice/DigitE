define([
    "jquery",
    "underscore",
    "Backbone",
    'overrides/GlobalEvent',
    'text!templates/Landing/summaryItem.html'
],function($,_,Backbone,GlobalEvent,a_summaryItemTemplate){
    var SummaryItemView = Backbone.View.extend({
        template : _.template(a_summaryItemTemplate),
        container : '',
        events :{
            "click .status_count" : "fetchWorkItems",
        },
        initialize : function(overrides,containerName){
            this.container = containerName;
            //_.bindAll(this,'selectFilter');
            this.render();
        },
        render :function (){
            this.$el.append(this.template(_.extend({containerName : this.container},this.model.toJSON())));
            if(this.model.get('isActive') == true){
                var eventOptions = {container : this.container, model : this.model};
               // GlobalEvent.trigger("updateSummaryApplied",eventOptions);
                GlobalEvent.trigger("ChangeWorkItems",eventOptions);
            }
            return this;
        },
        fetchWorkItems : function(e){
            var eventOptions = {container : this.container, model : this.model};
            var targetHtml =  $(e.target).parent(".status_count").find("p").text();
            var temp = $(e.target).parent(".status_count")[0].getAttribute("name");

            var compareToInnerHtml = this.model.get('text');
            if(this.container == temp && targetHtml == compareToInnerHtml) {

                GlobalEvent.trigger("ChangeWorkItems",eventOptions);
                GlobalEvent.trigger("updateSummaryApplied",eventOptions);
                e.stopPropagation();

            }
            e.stopPropagation();

        },


    });

    return SummaryItemView;

});
