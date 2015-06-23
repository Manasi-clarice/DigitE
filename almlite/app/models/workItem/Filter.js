    define([
        'underscore',
        'Backbone',
    ], function ( _, Backbone) {

        var Filter = Backbone.Model.extend({
            defaults: {
                id: "",
                text : "to display",
                name : "for internal use",
                hasAdvancedFilter : false,
                isActive : false
            }
        });

        return Filter;
    })