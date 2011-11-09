function abrirConfiguracoes(){
	chrome.tabs.create({
	  url: chrome.extension.getURL('options.html')
	})
}

function notificarMudancaSaldo(){
	var notification = webkitNotifications.createHTMLNotification(
	  'notificacaoMudancaoSaldo.html' 
	);
	notification.show();
}

function preencherSaldo(saldo){
	if(localStorage['saldo'] != saldo){
		localStorage['saldo'] = saldo
	 	$("#valor").html(saldo)
		chrome.browserAction.setBadgeText({text: saldo})
		notificarMudancaSaldo();
	}else{
	 	$("#valor").html(localStorage['saldo'])
	}
}
function periodoDeTransacoes(){
	if(localStorage['transacoes'] != $("#transacoes").val()){
		localStorage['transacoes'] = $("#transacoes").val();
		atualizarSaldo()
	}
} 

function atualizarSaldo(){
	
	$.ajax({
		url:"http://www.cbss.com.br/inst/convivencia/SaldoExtrato.jsp?numeroCartao="+localStorage['numero']+"&periodoSelecionado="+localStorage['transacoes'],
		dataType:"html",
		success:function(data){
			preencherSaldo($(data).find("table:last td:last").text().replace("R$ ", ""));
		 	$("#extrato-list").html($(data).find("table").eq(2).removeAttr('width'))
		}
	})

}

$(function(){

	if(!localStorage['transacoes'])
		localStorage['transacoes'] = 4;
	
	$("#transacoes").change(periodoDeTransacoes);
	
	
	if(!localStorage['numero'] || $.trim(localStorage['numero']) == "" || localStorage['numero'] < 8){

		abrirConfiguracoes()

	}else{
		
		atualizarSaldo();
		
		$("#abrirConfiguracoes").click(abrirConfiguracoes)
	
		$("#extrato").click(function(){	
			if($("#extrato-list:visible").length){
				$("#extrato-list").slideUp('slow') 
				$(".setinhas").attr("src","img/arrow_up.gif")
				$("html,body").css("height","80px")
			}else{
				$(".setinhas").attr("src","img/arrow_down.gif")
				$("#extrato-list").slideDown('slow')
			}
			
		})

		setTimeout(atualizarSaldo, 60000);
	
	}
	

})
