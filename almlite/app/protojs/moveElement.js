//function for shifting dom elements from one location to another

$(function () {
    $(".buzzing_workitems .pin_item .icon-Pin").click(function () {
		  var rowname = $(this).parents(".row");
       closeInlineActionMenu();
       var current = $(this).parents(".row_border");
       $(this).parents(".row_border").next().show("slow");
       $(this).parents(".row_border").next().removeClass("hide_show_content");    
       var prependToDiv = $('.my_workitems');
       $(this).parents(".row_border").css({background:"#edf0f0"});
       /*
       current.prependTo(prependToDiv);
       current.text('Moved');
      });*/
      $(this).parents(".row_border").css("position","absolute");
      current.animate({
        top: -300,
        left: 0     
      }, 800, function() {
          current.prependTo(prependToDiv).css({
             top: 'auto',
             left: 'auto',

      });        
      })
      $(this).parents(".row_border").removeClass("hide_show_content");
      $(this).parents(".row_border").css("position","relative");
      $(".my_workitems .row_border:first").next().addClass("hide_show_content").hide();
    });
    
});