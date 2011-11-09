$(function(){
	
	$("#salvar").click(function(){
		if($.trim($("[name=numero]").val()).length == 16 && !isNaN($("[name=numero]").val())){
			localStorage['cartao'] = $("[name=cartao]").val()
			localStorage['numero'] = $("[name=numero]").val()
			alert("Dados salvos com sucesso!");
		}else{
			alert("Por favor, preencher corretamente os campos do formulário!");
		}
	})
	
	$("[name=cartao]").val(localStorage['cartao'])
	$("[name=numero]").val(localStorage['numero'])

})
