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
		notificarMudancaSaldo();
	}
	
	chrome.browserAction.setBadgeText({text: saldo})
	$("#valor").html(saldo)

}

function periodoDeTransacoes(){
	if(localStorage['transacoes'] != $("#transacoes").val()){
		localStorage['transacoes'] = $("#transacoes").val();
		atualizarSaldo()
	}
} 

function atualizarSaldo(){
	var saldoSource = new SourceFactory();
	var empresa = saldoSource.getSource(localStorage['cartao']);
	empresa.configurarSaldo();
}

$(function(){

	if(!localStorage['numero'] || $.trim(localStorage['numero']) == "" || localStorage['numero'] < 8){

		abrirConfiguracoes()
		
	}else{
		
		$("#mensagemConfiguracao").hide();
		
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

		setInterval(atualizarSaldo, 60000);
	
	}
	
	$(document).ajaxStart(function(){
		$('#ajaxLoader').show();
		$("#informacoesSaldo").hide();
	})

	$(document).ajaxStop(function(){
		$('#ajaxLoader').hide();
		$("#informacoesSaldo").show();
	})
	
})
