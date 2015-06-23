    define([
        'underscore',
        'Backbone',
    ], function ( _, Backbone) {

        var SummaryItem = Backbone.Model.extend({
            defaults: {
                count: "",
                text : "to display",
                isActive : false
            }
        });

        return SummaryItem;
    })