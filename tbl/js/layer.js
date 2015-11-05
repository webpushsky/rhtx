function showLayer(left,top, id,a){
	return;
	a.className = "mouseover-color";	
	$("#"+id).css({left:left,top:top})
		.show().find("a").bind("blur",function(){
			var self = this;
			setTimeout(function(){
				var $a = $(self);
				if($a.data("focus")){
					$a.removeData("focus");
					return;
				}
				a.className = "";
				$a.unbind().parent().hide();
			},200);			
			
		}).focus();
Scroll.refreshHeight(id);
}

var Scroll = {
	init:function(conf){
		var $panel = $("#"+conf.id);

		if($panel.find("div.big-scroll").length == 0){
			var $scrollBar = $(this.createDom());
			$panel.append($scrollBar);
			$scrollBar.children().bind("mousedown",this._mouseDown).bind("mouseup",{$scrollBar:$scrollBar},this._mouseUp);
		}
	},
	createDom:function(){
		var dom  = [];
		dom.push('<div class="big-scroll">');
			dom.push('<div class="scroll-bar-top">');
				dom.push('<div class="scroll-bar-bottom">');
					dom.push('<div class="scroll-bar-middle" style="height:0px;"></div>');
				dom.push('</div>');
			dom.push('</div>');
		dom.push('</div>');
		return dom.join("");
	},
	refreshHeight:function(id){
		var $panel = $("#"+id);

		var scrollTop = $panel.children(":eq(0)").children().height() - $panel.height();
		var scrollBarHeight = $panel.height()-scrollTop - 32;
		$panel.find("div.scroll-bar-middle").height(scrollBarHeight<0 ? 10 :scrollBarHeight);
	},
	_mouseDown:function(event){
		var $scrollBar = $(this);		
		$(document.body).bind("mousemove",{$scrollBar:$scrollBar},Scroll._mouseMove).bind("mouseup",{$scrollBar:$scrollBar},Scroll._mouseUp);
		$scrollBar.parent().parent().find("a").data("focus","true");
	},
	_mouseMove:function(event){
		var $scrollBar = event.data.$scrollBar;
		var y = $scrollBar.data("y");
		if(y){
			y = event.pageY - parseInt(y);
			var top  = $scrollBar.position().top + y;
			top = top < 0 ? 0 : top;
			var scrollHeight = $scrollBar.parent().height();			
			var scrollBarHeight = $scrollBar.children().children().height() + 16;			
			top = top + scrollBarHeight > scrollHeight ?  scrollHeight - scrollBarHeight : top;



			$scrollBar.css({top:top}).data("y",y);


			var scrollPrecent = scrollHeight/top/100;

			var $panel = $scrollBar.parent().parent().children(":eq(0)");
			var $content = $panel.children();

			var marginTop = parseInt($content.css("marginTop"));
			marginTop = marginTop + y*-1 > 0 ? 0  : marginTop + y*-1;

			var scrollTop = $panel.height() - $content.height();



			marginTop = marginTop + y*-1 < scrollTop ? scrollTop: marginTop +y*-1 ;
			$content.css("marginTop",marginTop);

		}
		$scrollBar.data("y",event.pageY);				
		return false;

	},
	_mouseUp:function(event){
		var $scrollBar = event.data.$scrollBar;
		$scrollBar.removeData("y");
		$(document.body).unbind("mousemove",Scroll._mouseMove);
		$scrollBar.parent().parent().find("a").focus();
	}

}