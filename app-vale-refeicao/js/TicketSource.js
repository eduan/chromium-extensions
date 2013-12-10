function TicketSource(){

	this.configurarSaldo = function(){
		$.ajax({
			url:"http://www.ticket.com.br/portal-web/consult-card/balance/json?chkProduto=TR&card=" + localStorage['numero'] ,
			dataType:"json",
			success:function(data){
				
				preencherSaldo(data.card.balance.value);

			 	$("#informacoesSaldo").show();

			 	//site da ticket está com este recurso bugado - comentado temporariamente

/*				var listHtml = '';

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

*/			}
		})
	}
	
}
