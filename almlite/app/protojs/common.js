	$(document).click(function(event){
		

		if ($(event.target).is('.search_result_panel, .search_result_panel *') || $(event.target).parent().is(".inputbox")) {
			console.log("false");
            return;
        }
        else
        {
        	console.log("true");
        	$(".search_box").removeClass("active");
            $(".search_result_panel").fadeOut(300);
            //Perform your event operations
        }
	});
	$(document).ready(function(){
		$('[data-toggle="popover"]').popover();
		$("#popoverExampleTwo").popover({
			html : true, 
			content: function() {
			  return $('#popoverExampleTwoHiddenContent').html();
			}
		});
		$('body').on('click', function (e) {
			
			/************************** Route more click popover**************************/
			$('[data-toggle="popover"]').each(function () {
				//the 'is' for buttons that trigger popups
				//the 'has' for icons within a button that triggers a popup
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
					$(this).popover('hide');
				}
			});
			/**************************end of Route more click popover**************************/
			/**************close add-hashtag on outside click*********/
			$('.add_hashtag').each(function () {
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.add_hashtag').has(e.target).length === 0) {
					$(this).removeClass("open");
					$(this).siblings().show();
				}
			});
			/**************end of close addhashtag on outside click*********/
		});
		/**************Route Hashtag operation**************/
		$(".route_hashtag_items ul").on("click",'li.hashtag a.icon-Close',function(){
			var more=$(this).parent().siblings("li").last();
			var cnt=more.text();
			if(cnt.substring(0,cnt.indexOf(" "))-1>=0){
				more.find('span').text(cnt.substring(0,cnt.indexOf(" "))-1+" More");	
			}
			if(cnt.substring(0,cnt.indexOf(" "))-1==0){
				more.css("opacity","0");
			}
			var childs=$(this).closest("ul").children().length;
			if(childs>6){
				$(this).parent("li").siblings('.hidden').first().removeClass("hidden");
			}
			$(this).parent("li").remove();
		});
		$(".more_hashtag_items ul").on("click",'.hashtag span',function(event){
			var cout=$(this).parent(".hashtag").siblings("li").last().find("span").text();
			if(event.target.tagName!='A' && cout.substring(0,cout.indexOf(" "))>=-2){
				var add_to=$(this).parents(".more_hashtag_items").siblings(".route_hashtag_items");
				$(this).parent(".hashtag").siblings("li").last().find("a").text(cout.substring(0,cout.indexOf(" "))-1+" More");
				var my_array = ['Atul','Rakesh','Amol','Ajay','Pankaj','Feroj','Ganesh','Rajesh','Kunal','Yogesh','Rushi'];
				var ri = Math.floor(Math.random() * my_array.length); // Random Index position in the array
				var result = my_array[ri];
				if(cout.substring(0,cout.indexOf(" "))>0){
					$(this).parent(".hashtag").siblings(".hashtag").first().before('<li class="hashtag"><span>'+result+'</span></li>');	
				}
				if(cout.substring(0,cout.indexOf(" "))<=0){
					$(this).parent(".hashtag").siblings("li").last().find("a").text("0 More");
				}
				
				if(add_to.find("ul").children().length<=5){
					var new_hashtag='<li class="hashtag"><span>'+$(this).text()+'</span><a class="icons icon-Close" "></a></li>';
					add_to.find("li").last().before(new_hashtag);
				}
				else{
					var new_hashtag='<li class="hashtag hidden"><span>'+$(this).text()+'</span><a class="icons icon-Close" "></a></li>';
					var last_li_text=add_to.find("li").last().text();
					var last_li=add_to.find("li").last();
					last_li.css("opacity","1").before(new_hashtag);
					last_li.find("span").text(parseInt(last_li_text.substring(0,last_li_text.indexOf(" ")))+1+" More");
				}
				$(this).parent("li").remove();
			}
		});
		/**************End of Route Hashtag operation**************/
		
		/*****navigation's search operation*****/
		$(".search_box").hover(function(event){
			event.stopPropagation();
			$(this).addClass("active");
			//$(".nav.navbar-nav").animate({ 'marginLeft': '0'}, 500);
		});	
		$(".search_box").mouseout(function(event){
			event.stopPropagation();
			if(!$(this).find("input").is(":focus")){
				$(this).removeClass("active");
			}
		});
		$(".search_box").mouseleave(function(event){
			event.stopPropagation();
			//alert("hi");
			//$(".navbar-nav").animate({ 'marginLeft': '140'}, 500);
			
		});
		$(".search_box .icon-Search").click(function(event){
			event.stopPropagation();
			if($(this).siblings("input").is(":focus")){
				$(this).parent().addClass("active");
			}
		});
		
		$(".search_result_panel").click(function(event){
			event.stopPropagation();
		});
		$(".search_box .inputbox").click(function(){
			$(".search_result_panel").fadeIn(300);
		});
		
		$(".search_result .bottom_more_link span").on('click',function(){
			event.stopPropagation();
			//alert("hi");
		});
		
		$(".result_more_btn").click(function(){
			var ele = $(this);
			ele.parent().next().show();
			ele.parents(".search_result").find(".search_result_list").find(".hidden_content").addClass("show_hidden");
			ele.parent().hide();
		});
		$(".result_show_less_btn").click(function(){
			var ele = $(this);
			ele.parent().prev().show();
			ele.parents(".search_result").find(".search_result_list").find(".hidden_content").removeClass("show_hidden");
			ele.parent().hide();
			ele.parent().next().show();
		});
		$(".result_see_all_btn").click(function(){
			var ele = $(this);
			ele.parent().prev().show();
			ele.parents(".search_result").find(".search_result_list").find(".hidden_content").addClass("show_hidden");
			ele.parent().hide();
		});

		/*****end of navigation's search operation*****/
		/******height of chat window*******/
		var chat_window_height=($(".chat_window").height())-($(".container_class").height()+$(".member_count").height()+$(".chat_box_navbar").height()+$(".add_comment").height());
		$(".chat_list").height(chat_window_height);
		/******end of height of chat window*******/
		//The below tooltip function is call for to show tooltip on all work items
		$('.work_item_title').tooltip({
			trigger: 'hover',
			placement: "top",
			container: 'body'
		});
		$('.work-item-stat').tooltip({
			trigger: 'hover',
			placement: "top",
			container: 'body'
		});
		//The below circliful function is called for all donut chart on work items
		$('.work-item-stat').circliful();

		/**********************Status count clicck operation************************/
		$(".status_counts .status_count").on('click',function(){
			$(this).toggleClass("active");	
		});
		/**********************end of Status count click operation************************/
		/******* toggle inline action panel************/
		/******* click operation on inline_action_pannel left_arrow **********/
		var lastClicked = 0;
		$(".inline_action_pannel .left_arrow a").on('click',function(){
			var timeNow = (new Date()).getTime();
			if (timeNow > (lastClicked +1000)){
				if($(this).parents("li").siblings().hasClass("active")){
					$(this).parents("li").siblings(".active").find(".inline_action_tab_content").fadeOut();
					var active_li=$(this).parents("li").siblings(".active");
					setTimeout(function(){
						active_li.removeClass("active");
						active_li.width("auto");
						active_li.siblings("li").not("li:first").show("slow");
					},500);
					return;
				}
				if($(this).parents(".inline_action_row").css("display")=="block"){
					$(this).parents(".inline_action_row").slideToggle("slow");
				}
			}
		});
		/******* end of click operation on inline_action_pannel left_arrow **********/
		$('.inline_action_tab').on('click', function () {
			var timeNow = (new Date()).getTime();
			if (timeNow > (lastClicked +1000)) {
				var not_block=0;
				if($(this).next().css('display')== 'block'){
					$(this).next().css("display", "none");
					not_block=1;
				}
				$(this).parent().toggleClass("active");
				if(not_block==0){
					$(this).siblings().delay(350).fadeIn();

				}
				if($(this).parent().hasClass("active")){
					$(this).parent().siblings("li").not("li:first").hide(300);
					var that = $(this);
					setTimeout(function() {
						that.siblings(".inline_action_tab_content ").fadeIn();
						that.parent("li").width("96%");	
					}, 300);
				}else{
					$(this).siblings().delay(300).fadeOut();
					$(this).parent().siblings("li").not("li:first").show("slow");
					$(this).parent("li").delay(400).width("auto");
				}
			}
			lastClicked = timeNow;
		});
		/******* end of toggle inline action panel************/
		/************Apply-Cancel button checkbox conditions*************/
		$('.filter_apply').on('click', function () {
			alert("Filters are applied");
			$(this).parents(".tab-pane").hide(300);
			$(this).parents(".filter_panel_content").siblings(".filter_panel_tab").find("li").removeClass("active");
			$(this).parents(".filter_panel_content").animate({ 'height': '0'}, 400);
		});
		$('.cancel_button').on('click', function () {
			alert("Filters are not applied");
			$(this).parents(".tab-pane").hide(300);
			$(this).parents(".filter_panel_content").siblings(".filter_panel_tab").find("li").removeClass("active");
			$(this).parents(".filter_panel_content").siblings(".filter_panel_tab").find("li").find("a").removeClass("active");
			$(this).parents(".filter_panel_content").siblings(".filter_panel_tab").find("li").find("span").removeClass("active");
			$(this).parents(".filter_panel_content").animate({ 'height': '0'}, 400);

		});
		$('.filter_panel_tab ul li a').on('click', function () {
			var ele = $(this);
			ele.parents("li").siblings("li").find("a").removeClass("active");
			ele.parents("li").siblings("li").find(".arrow").removeClass("active");
			var tabcontent = ele.attr("filter-content");
			//alert(tabcontent)
			$("div[data-for-tab]").each(function(){
				$(this).removeClass("active")
				if($(this).attr("data-for-tab") == tabcontent){
					$(this).addClass("active");
				}
			});

			if(!ele.siblings(".arrow").hasClass("active")){
				ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find(".tab-pane").hide(300);
				ele.parents(".filter_panel_tab").siblings(".filter_panel_content").height("auto");	
			}
			$(this).addClass("active");
		});
		$('.filter_panel_tab ul li .arrow').on('click', function () {
			/***** remove animation on second click ***********/
			var ele = $(this);
			var id = ele.attr('tab-content');
			//$(id).siblings().removeClass("toggle_filter_panel");
			console.log(id)
			ele.parents("li").siblings("li").find(".arrow").removeClass("active");
			ele.parents("li").siblings("li").find("a").removeClass("active");
			ele.addClass("active");
			if (!$("#"+id).length ) {
				console.log("in")
				ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find(".tab-pane").hide();
				ele.parents(".filter_panel_tab").siblings(".filter_panel_content").height("auto");
			}else{
				ele.parents(".filter_panel_tab").siblings(".filter_panel_content").animate({ 'height': '185'}, 300);
			}
			ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).siblings().hide("slow");
			ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).slideDown("slow");
			ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).css("visibility","visible");
			ele.parents(".filter_panel_tab").siblings(".filter_panel_content").find("#"+id).animate({ 'height': '185'}, 300);


		});
		/************end of Apply-Cancel button checkbox conditions*************/
		$(window).bind("resize", function() {
			var height = $(window).height();
			var k = 100;
			$('.cocontainer').height(height - k);
			/*****chat_window's chat_list height *****/
			var comment_list_height=($(".chat_window").height())-($(".container_class").height()+$(".member_count").height()+$(".chat_box_navbar").height()+$(".add_comment").height());
			$(".comment_list").height(comment_list_height-k+30);
			/*****end of chat_window's chat_list height *****/
		}).trigger("resize");
		/************ Function for maximize the widget **************************/
		/********Chat window********/
		$(".chat_window .white_chat_box .chat_box_navbar ul li a").on('click',function(){
			$(this).parent().siblings().removeClass("active");
			$(this).parent().addClass("active");
		});
		/******** toggle chat window*********/
		$(".chat_window .open_chat_panel").toggle(function(){
			$(this).parents(".chat_window").animate({"left":"74%"}, "slow");
		}, function(){
			$(this).parents(".chat_window").animate({"left":"100%"}, "slow");
		});
		/******** end of toggle chat window*********/

		/********End of Chat window********/
		/********************Add hashtag*****************/
		$(".add_hashtag .btn.btn-default").on('click', function(){
			$(".add_hashtag").not($(this).parents('li')).removeClass("open").siblings().not("none").show();//close add-hashtag on outside click
			if($(this).parents("li").hasClass("open")){
				var hastagtext = $(this).parents("li").find("input").val();
				if(hastagtext != ""){
					var hashtag = '<li style="display:none;" class="hidden"><div  class="hashtag"><span>'+hastagtext+'</span><a class="icons icon-Close"></a></div></li>';
					var last_li=$(this).parents("li").siblings("li").last();
					last_li.before(hashtag);
					$(this).parents("li").find("input").val("");
					if($(this).closest("ul").children().length>4){
						last_li.css("opacity","1");
						var last_li_text=last_li.text();
						var cnt=parseInt(last_li_text.substring(0,last_li_text.indexOf(" ")))+1+" More";
						last_li.find("span").text(cnt);
					}
					else{
						last_li.prev('li').removeClass("hidden");
					}
				}
			}
			$(this).parents("li").toggleClass("open");
			$(this).parents("li").siblings().toggle();

		});
		/********************end of Add hashtag*****************/
		/***************************Attachment Upload File***************************/
		var li_index;	
		$(".upload input[type='file']").change(function() {
			var that=$(this);
			var file = this.files[0];
			fileName = file.name,
			fileSize = file.size;
			var fileSizeInMB = (fileSize / (1024*1024)).toFixed(2);
			that.parents('.attachment').find('.dd_container').hide("slow");
			var exist_file = false;
			setTimeout(function(){
				that.parents(".attachment").find('.upload_list').fadeIn(300);
				that.parents(".attachment").find(".upload_list .file_names_list li").each(function(){
					var li=$(this);
					$(this).find(".file_name").text();
					if($(this).find(".file_name").text() == fileName){
						li_index=li.index();
						that.parents('.attachment').find('.upload_list .error_msg').fadeIn(200);
						exist_file = true;
						var existing_file_name='<li><div class="file_details"><span class="file_name">'+fileName+'</span><span class="file_size">'+fileSizeInMB+' MB</span></div><p><a class="yes">Yes</a><a class="no">No</a><a class="keep_both">Keep Both</a></p></li>';
						that.parents(".attachment").find(".existing_file_names_list").append(existing_file_name);
					}
				});
				if(exist_file==false){					
					var filename_li = '<li><div class="file_details"><span class="file_name">'+fileName+'</span><span class="file_size">'+fileSizeInMB+' MB</span><a class="icons icon-Close"></a></div></li>';
					that.parents(".attachment").find(".file_names_list").append(filename_li);
				}else if(exist_file==true){
					that.parents(".attachment").find(".file_names_list").hide(300);
				}
				
			},0);
			$(this).attr("value", "");	
		});
		/***************************End of Attachment Upload File***************************/
		
		/********** Attachment 'Yes | No | Keep both' Clicked***********/	
		$(".error_msg .existing_file_names ul").on('click','li p a.yes',function(){
			$(this).parents(".error_msg").siblings("ul.file_names_list").find("li").eq(li_index).find(".file_name").text($(this).parent().prev(".file_details").find(".file_name").text()+" Replaced");
			$(this).parents(".error_msg").siblings("ul.file_names_list").find("li").eq(li_index).find(".file_size").text($(this).parent().prev(".file_details").find(".file_size").text());
			$(this).parents(".error_msg").fadeOut(300);
			$(this).parents(".upload_list").find(".file_names_list").fadeIn(1000);
			$(this).parent().parent().remove();
		});
		$(".error_msg .existing_file_names ul").on('click','li p a.no',function(){
			$(this).parents(".error_msg").fadeOut(300);
			$(this).parents(".upload_list").find(".file_names_list").fadeIn(1000);
			$(this).parent().parent().remove();
		});
		$(".error_msg .existing_file_names ul").on('click','li p a.keep_both',function(){
			var fileName=$(this).parent().prev(".file_details").find(".file_name").text()+" Keep Both";
			var fileSizeInMB=$(this).parent().prev(".file_details").find(".file_size").text();
			var filename_li = '<li><div class="file_details"><span class="file_name">'+fileName+'</span><span class="file_size">'+fileSizeInMB+'</span><a class="icons icon-Close"></a></div></li>';
			$(this).parents('.attachment').find(".file_names_list").append(filename_li);
			$(this).parents(".error_msg").fadeOut(300);
			$(this).parents(".upload_list").find(".file_names_list").fadeIn(1000);
			$(this).parent().parent().remove();
		});

		/********** End of Attachment 'Yes | No | Keep both' Clicked***********/	
});

/***********function for opening the buzzing work item list****************************/
function status_hide_show(event){
    $(".more_button_container .arrow_button a").toggleClass("open");
    if($(".more_button_container .arrow_button a").hasClass("open")){
        $(".first_half_container").slideToggle(300);
        $(".row_border").width("100%")
        setTimeout(function() {
            $(".buzzing_workitems").css("overflow-y","scroll");
            $(".buzzing_workitems").css("overflow-x","hidden");
            $(".buzzing_workitems").height($(window).height() - 320);
            $("."+event).find(".hide_show_content").slideToggle("slow");
        }, 300);
    }else{
        $("."+event).find(".hide_show_content").slideToggle(300);
        setTimeout(function() {
            $(".buzzing_workitems").css("overflow-y","visible");
            $(".buzzing_workitems").css("overflow-x","visible");
            $(".buzzing_workitems").height("auto");
            
            $(".first_half_container").slideToggle(300);
        }, 300);
    }
}

/***********function for opening the My work item list****************************/
function my_workitemslist_show_hide(event){
    $(".more_button_container .arrow_button a").toggleClass("open");

    if($(".more_button_container .arrow_button a").hasClass("open")){
        $(".white-container").slideToggle(300);
        setTimeout(function() {
            $(".my_workitems").css("overflow-y","scroll");
            $(".my_workitems").css("overflow-x","hidden");
            $(".my_workitems").height($(window).height() - 320);
            $("."+event).find(".hide_show_content").slideToggle("slow");
            $(".my_workitems .row_border").width("100%");
            $(".more_button_container").css("margin-bottom", "40");
            $(".static_info").hide();
        }, 300);
        
    }else{
        $("."+event).find(".hide_show_content").slideToggle(300);
        setTimeout(function() {
            $(".my_workitems").css("overflow-y","visible");
            $(".my_workitems").css("overflow-x","visible");
            $(".my_workitems").height("auto");
            
            $(".white-container").slideToggle(300);
            $(".my_workitems .row_border").width("auto");
            $(".static_info").show();
        }, 300);
    }
        
}

/***********function for opening the buzzing work item list****************************/
function status_hide_show(event){
    $(".more_button_container .arrow_button a").toggleClass("open");
    if($(".more_button_container .arrow_button a").hasClass("open")){
        $(".first_half_container").slideToggle(300);
        setTimeout(function() {
            $(".buzzing_workitems").css("overflow-y","scroll");
            $(".buzzing_workitems").css("overflow-x","hidden");
            $(".buzzing_workitems").height($(window).height() - 330);
            $("."+event).find(".hide_show_content").slideToggle("slow");
            $(".buzzing_workitems .row_border").width("100%");
        }, 300);
    }else{
        $("."+event).find(".hide_show_content").slideToggle(300);
        setTimeout(function() {
            $(".buzzing_workitems").css("overflow-y","visible");
            $(".buzzing_workitems").css("overflow-x","visible");
            $(".buzzing_workitems").height("auto");
            
            $(".first_half_container").slideToggle(300);
            $(".buzzing_workitems .row_border").width("auto");
        }, 300);
    }
}

/************Toggle selection of the status/filter selection counts**********************************/



/******* toggle inline panel of row ************/
function show_inline_pannel(id){
	/* Following each() function hide prevous open pannel and aslo clears inline active item*/
	var rowname = $(id).parents(".row");
	closeInlineActionMenu(rowname);
	$(id).parents(".row").next(".inline_action_row").toggleClass("active");
	$(id).parents(".row").next(".inline_action_row").slideToggle("slow");		
}
/******* end of toggle inline panel of row ************/

/******check whether the any inline action menu is open then close it ******/
function closeInlineActionMenu(id){
	$(".inline_action_row").each(function(){
		var same_row_clicked=0;
		if($(this).css('display')== 'block'){
			if($(id).next(".inline_action_row").css('display')== 'block'){
				same_row_clicked=1;
				$(id).next(".inline_action_row").find("li").width("auto");
			}
			if(same_row_clicked==0){
				$(this).slideToggle("slow");
			}	
			$(this).find("li").width("auto");
			$(this).find("li").show("slow");
			$(this).find("li").find(".inline_action_tab_content").hide("slow");
			$(this).find("li").removeClass("active");
		}
	});
}
/******end of check whether the any inline action menu is open then close it ******/

/******** toggle filter panel  *********/
function toggleFilterPanel(id){
	$(id).parents(".row").siblings(".filter_panel").addClass("toggled").slideToggle("slow");
	if(!$(id).hasClass("active")){
		$(id).addClass("active");
	}
	else{
		$(id).removeClass("active");
		$(id).parents(".row").siblings(".filter_panel").find("li").find("a").removeClass("active").first().addClass("active");
		$(id).parents(".row").siblings(".filter_panel").find("li").find(".arrow").removeClass("active");
		$(id).parents(".row").siblings(".filter_panel").find(".tab-pane").removeClass("toggle_filter_panel_up");
		setTimeout(function(){
			$(id).parents(".row").siblings(".filter_panel").find(".tab-pane").removeClass("active").removeAttr("style").parent().removeAttr("style");
			}, 1000);
	}
	$(".filter_panel").each(function(){
			if(($(this).css('display')=='block') && !$(this).hasClass("toggled")){
				$(this).prev(".row").find(".icon-Filter").removeClass("active");
				$(this).find(".tab-pane").removeAttr("style");
				var FP=$(this);
				FP.slideToggle("slow");
				setTimeout(function(){
					FP.find(".tab-pane").removeClass("active").removeAttr("style").parent().removeAttr("style");
				},300);
				$(this).find("li").find("a").removeClass("active").first().addClass("active");
				$(this).find("li").find(".arrow").removeClass("active");

			}
	});
	$(id).parents(".row").siblings(".filter_panel").removeClass("toggled");
}
/******** end toggle filter panel  *********/



/**************Mouse Up for click outside event******************/

