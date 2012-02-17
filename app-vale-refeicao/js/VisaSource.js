function VisaSource(){

	this.configurarSaldo = function(){

		if(!localStorage['transacoes'])
			localStorage['transacoes'] = 4;

		$("#transacoes").change(periodoDeTransacoes);

		$.ajax({
			url:"http://www.cbss.com.br/inst/convivencia/SaldoExtrato.jsp?numeroCartao="+localStorage['numero']+"&periodoSelecionado="+localStorage['transacoes'],
			dataType:"html",
			success:function(data){
			
				preencherSaldo($(data).find("table:last td:last").text().replace("R$ ", ""));
				
			 	$("#extrato-list").html($(data).find("table").eq(2).removeAttr('width'))
			 	
			 	$("#menuDeTransacoes, #informacoesSaldo").show();
			 	
			}
		})
	}
	
}
