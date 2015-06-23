define ([
   'underscore',
   'Backbone',
   'models/workItem/Filter',
   	'util/JSHelper'
],function (_,Backbone, Filter, JSHelper){

    var Filters = Backbone.Collection.extend({
        model : Filter,
        url: JSHelper.getURL('filtersURL'),
        parse: function (a_responseJSON) {
        			return a_responseJSON.filters;

        		}
    });

    return Filters;
});