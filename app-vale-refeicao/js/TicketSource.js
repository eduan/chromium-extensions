function TicketSource(){

	this.configurarSaldo = function(){
		$.ajax({
			url:"http://www.ticket.com.br/ticket-corporativo-web/ticket-consultcard?chkProduto=Ticket+Restaurante&txtNumeroCartao=" + localStorage['numero'] + "&txtOperacao=saldo_agendamentos&cardNumber=",
			dataType:"json",
			success:function(data){
				
				preencherSaldo(data.seeBalance);

			 	$("#informacoesSaldo").show();

				var listHtml = '';

 			 	if(localStorage['historico'] == undefined || localStorage['ultimaConsulta'] != data.consultDate){
				 	$.getJSON("http://www.ticket.com.br/ticket-corporativo-web/ticket-consultcard?txtOperacao=lancamentos&token=" + data.token + "&txtNumeroCartao=" + localStorage['numero'], function(historico){
						$.each(historico.releases, function(key, val) {
							if(key < 90)
								listHtml += "<tr><td width='70%'>" + val.description + "</td><td>" + val.date + "</td><td>R$ " + val.value + "</td></tr>";						
						});
						localStorage['historico'] = listHtml;
				 	});

				 	localStorage['ultimaConsulta'] = data.consultDate;
			 	}

				$("#extrato-list").append("<table>"+localStorage['historico']+"</table>");
			
				$("#menuDeTransacoes, #informacoesSaldo").show();
			
				$("#transacoes").val(4).attr('disabled','disabled');

			}
		})
	}
	
}
