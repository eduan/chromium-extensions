var groovesharkTab = -1;
var lista = new Array();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if ((tab != null) && (tab.url.search("grooveshark.com") >= 0)) {
    groovesharkTab = tabId;
    $('#groovesharck-status').text(' v Aberto');
    chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
      if (tabId == groovesharkTab)
        $('#groovesharck-status').text('x Fechado');
        groovesharkTab = -1;
    });
  }
});

chrome.tabs.getSelected(null, function(tab){
    if(tab.url.search('grooveshark.com')){
        $('#groovesharck-status').text('v Aberto');
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
        
        $(".msg").hide();

        if(!lista.length){
          $(".msg").fadeIn('slow');
          return;
        }

        if(groovesharkTab < 0){
            chrome.tabs.create({'url': 'http://grooveshark.com'}, function(tab) {
              groovesharkTab = tab.id;
            });
        }

        for(var i = 0; i < lista.length; i++){
            var musicatr = lista[i].replace('\'','\\\'');
            //var musicatr = lista[i];

            chrome.tabs.executeScript(groovesharkTab, { code: 
                "setTimeout(\"" +
                   " console.log('" + musicatr + "'); " +
                   " document.getElementsByClassName('search')[0].value = '" + musicatr + "'; " +
                   " document.getElementsByClassName('icon-search-gray')[0].click(); " +
                   " document.getElementsByClassName('play-or-add')[0].click(); \", " +
                    ( 4000 * i ) +
                ");"
            });
        }
    });

})


