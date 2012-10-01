function TicketSource(){

	this.configurarSaldo = function(){
		$.ajax({
			url:"http://www.ticket.com.br/ticket-corporativo-web/ticket-consultcard?chkProduto=Ticket+Restaurante&txtNumeroCartao=" + localStorage['numero'] + "&txtOperacao=saldo_agendamentos&cardNumber=",
			dataType:"json",
			success:function(data){
				preencherSaldo(data.seeBalance);
			 	$("#informacoesSaldo").show();
			}
		})
	}
	
}

