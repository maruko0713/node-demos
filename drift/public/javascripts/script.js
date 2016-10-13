'use strict'

// 捞瓶子
$(".pick").on("click",function(){
	var modal = $("#pick-modal");
	modal.modal("show");
	$(".btn-primary",modal).off("click").on("click",function(){
		var user = $("form",modal).serialize();
		$.getJSON("/pick",user,function(data) {
			if(typeof data.msg === "object") {
				$(".bottle-user span").text(data.msg.owner);
				$(".bottle-content span").text(data.msg.content);
			} else {
				// 没有捞到 就显示提示信息
				showMsg(data);
			}
			modal.modal("hide");
		})
	});
});

$(".throw").on("click",function() {
	var modal = $("#throw-modal");
	modal.modal("show");
	$(".btn-primary",modal).off("click").on("click",function(){
		var bottle = $("form",modal).serialize();
		$.post("/throw",bottle,function(data){
			// 显示提示信息
			showMsg(data);
			modal.modal("hide");
		});
	});
});

/**
 * 显示提示信息
 * @param { object } [data] [数据对象]
 */
function showMsg(data) {
	// 只显示简单的信息
	if(typeof data.msg === "object") {
		return false;
	}
	var dataClass = data.code ===  0 ? "danger":"success";
	var box = $("<div class='alert' alert-"+dataClass+"'></div>");

	box.text(data.msg);
	$(".show-msg").html(box);

	// 5秒后信息自动消失
	setTimeout(function(){
		$(".show-msg").html("");
	},5000);
}