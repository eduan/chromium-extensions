function TicketSource(){

	this.configurarSaldo = function(){
		$.ajax({
			url:"http://www.ticket.com.br/consultcard-web/consultCardGet?chkProduto=Ticket+Restaurante&txtNumeroCartao=" + localStorage['numero'] + "&txtOperacao=saldo_agendamentos&cardNumber=",
			dataType:"html",
			success:function(data){
				preencherSaldo(data.match(/[\d]{1,},[\d]{1,}/).toString());
			 	$("#informacoesSaldo").show();
			}
		})
	}
	
}

