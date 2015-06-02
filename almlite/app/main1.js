/*global require*/
'use strict';

require.config({
    baseUrl: 'app',
    shim: {
    },
    paths: {
        jquery: '../lib/jquery/dist/jquery',
        backbone: '../lib/backbone/backbone',
        underscore: '../lib/underscore/underscore',
        views: 'views'
    }
});

require([
    'backbone','underscore','views/NavigationBarView'
], function (Backbone,_) {
    Backbone.history.start();
    alert("Hi");
var view = Backbone.View.extend({
  // tagName :"h1",
  template : _.template("Hello <%-who %>"),
     initialize : function(){
          //alert("Hi");
          this.render();
     },
     render : function(){
        console.log(this);
       this.$el.html(this.template({who: "Manasi"}));
       return this;
     }
   });

var element = $("#container");
   var myView = new view({el: element});

console.log(element);
});
//function getApp(){

//};


