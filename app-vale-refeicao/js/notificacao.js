$(function(){	
	
	$("#valor").text(localStorage['saldo'])
	
	setTimeout(
		function(){
			window.close()
		}, 
		6000
	)

})