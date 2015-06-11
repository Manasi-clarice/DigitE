define ([
   'jquery',
   'underscore',
   'Backbone',
   'models/workItem/WorkItem',
   	'util/JSHelper'
],function ($,_,Backbone, WorkItem, JSHelper){

    var WorkItems = Backbone.Collection.extend({
        model : WorkItem,
        url: JSHelper.getURL('inboxURL'),
        parse: function (a_responseJSON) {
        			return a_responseJSON.myWorkItems;
        		}
    });

    return WorkItems;
});