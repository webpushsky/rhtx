
$(function(){
	
	var $rollImgs = $("#rollAD span");
	
	for(var i=0,len = $rollImgs.length;i<len;i++){	
		$("#rollBtns").append("<a></a>");
	}
	var $rollBtns = $("#rollBtns a");
	var widthBtns = len * (12 + 20);
	$("#rollBtns").css({width:widthBtns,left:$("#rollAD").width()/2 - widthBtns/2});
	var interval = null;
	var $rollAD = $("#rollAD");

	var $adbg = $rollAD.children("div.roll-ad-bg");
	$adbg.fadeOut();
	
	$rollBtns.bind("click",function(event){

		var index = $rollBtns.index(this);
		$adbg.fadeOut(function(){
			$adbg.css("backgroundImage","url(images/temp/"+$($rollImgs[index]).attr("src")+")").fadeIn();
		});
		
		
		$rollBtns.removeClass("on");
		$(this).addClass("on");
					
		
		if(event.pageX){
			clearInterval(interval);
			round();
		}
		
					
	}).filter(":eq(0)").click();
		
	function round(){
		interval = setInterval(function(){

			var $on = $rollBtns.filter(".on");
			var index = $rollBtns.index($on[0]);

			if(index + 1 == $rollBtns.length){
				index = 0;
			}else{
				index++;
			}
		
			var $btn = $rollBtns.filter(":eq("+index+")");
			$btn.click();
		},5000);	
	}			
round();
});

