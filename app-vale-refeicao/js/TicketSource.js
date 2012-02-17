function TicketSource(){

	this.configurarSaldo = function(){
		$.ajax({
			url:"http://www.ticket.com.br/portal/portalcorporativo/dpages/service/consulteseusaldo/seeBalance.jsp?chkProduto=Ticket+Restaurante&txtNumeroCartao=" + localStorage['numero'] + "&txtOperacao=saldo_agendamentos&cardNumber=&Consultar.x=908&Consultar.y=368",
			dataType:"html",
			success:function(data){
				preencherSaldo(data.match(/((\b[0-9]+)?\,)[0-9]+\b/g).toString());
			 	$("#informacoesSaldo").show();
			}
		})
	}
	
}

