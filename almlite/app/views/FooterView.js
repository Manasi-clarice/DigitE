define([
    'jquery',
    'underscore',
    'Backbone',
    'overrides/GlobalEvent',
    'text!templates/footer.html',
], function ($, _, Backbone, GlobalEvent, a_footerTpl) {

    var FooterView = Backbone.View.extend({
        el: '.footer',

        template: _.template(a_footerTpl),

        events: {

        },

        initialize: function () {
        },

        render: function () {

            this.$el.html(this.template());

            return this;
        },

 });

    return FooterView;
})