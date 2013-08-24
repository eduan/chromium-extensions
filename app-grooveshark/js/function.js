var groovesharkTab = -1;
var musicasDetectadas = new Array();

chrome.tabs.getSelected(null, function(tab){

    if(tab.url.search('grooveshark.com')){
        groovesharkTab = tab.id;
    }

});

$(function() {

    $('#lista').on('keypress keydown keyup',function(){
        var lista = $.trim($(this).val());
        var musicasDetectadas = lista.split('\n').length
        $('#musicas-encontradas').text(musicasDetectadas);    
    })

    $(".player").click(function(){
        chrome.tabs.executeScript(groovesharkTab, {file: "js/e.js"}, function(){       
            chrome.tabs.sendRequest(groovesharkTab, {scriptOptions: {musicasDetectadas:'musicasDetectadas'}});
        });
    })
})