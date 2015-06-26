define ([
    'underscore',
    'Backbone',
    'models/workItem/AdvancedFilter',
    'util/JSHelper'
],function (_,Backbone, SummaryItem, JSHelper){

    var AdvancedFilter = Backbone.Collection.extend({
        model : SummaryItem,
        url: "",
        parse: function (a_responseJSON) {
            return a_responseJSON.inlineFilters;

        }
    });

    return AdvancedFilter;
});