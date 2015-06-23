define ([
   'underscore',
   'Backbone',
   'models/workItem/SummaryItem',
   	'util/JSHelper'
],function (_,Backbone, SummaryItem, JSHelper){

    var SummaryItems = Backbone.Collection.extend({
        model : SummaryItem,
        url: "",
        parse: function (a_responseJSON) {
        			return a_responseJSON.summary;

        		}
    });

    return SummaryItems;
});