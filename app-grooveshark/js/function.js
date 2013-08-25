var groovesharkTab = -1;
var lista = new Array();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if ((tab != null) && (tab.url.search("grooveshark.com") >= 0)) {
    groovesharkTab = tabId;
    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
      if (tabId == groovesharkTab)
        groovesharkTab = -1;
    });
  }
});

chrome.tabs.getSelected(null, function(tab){
    if(tab.url.search('grooveshark.com')){
        groovesharkTab = tab.id;
    }
});

$(function() {

    $('#lista').on('keypress keydown keyup',function(){
        lista = $.trim($(this).val());
        lista = lista.split('\n');
        $('#musicas-encontradas').text(lista.length);    
    });

    $(".player").click(function(){
        for(var i=0; i < lista.length; i++){
            chrome.tabs.executeScript(groovesharkTab, { code: 
                "setTimeout(\"" +
                   " document.getElementsByClassName('search')[0].value = '" + lista[i] + "'; " +
                   " document.getElementsByClassName('icon-search-gray')[0].click(); " +
                   " document.getElementsByClassName('play-or-add')[0].click(); \", " +
                    ( 2000 * i ) +
                ");"
            });
        }
    });

})

