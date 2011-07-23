$(function(){
	$("#encurtar").click(function(){
		chrome.tabs.getSelected(null,function(tab) {
			$.ajax({
				url:"http://cachor.ro/url.php",
				data:"url="+tab.url,
				type:"POST",
				dataType:"html",
				success:function(data){
				   $("input[name=url]").val($(data).find("input.short").val());
				}
			})
		});
	});
	
	$(document).ajaxStart(function(){
		$('.ajax').show();
	})

	$(document).ajaxStop(function(){
		$('.ajax').hide();
	})

})
