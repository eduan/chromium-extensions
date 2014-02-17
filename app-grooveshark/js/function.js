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

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if(tabId == groovesharkTab){
    groovesharkTab = -1;
  }
})

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
        for(var i = 0; i < lista.length; i++){
            var musicatr = lista[i].replace('\'','\\\'');
            searchAndPlay( musicatr, 4000 * i);
        }
    });
})

function search(music){
    if(!music.length){
      return false;
    }
    console.log("Searching for: " + music);
    if(groovesharkTab > 0){
      chrome.tabs.executeScript(groovesharkTab, { code: 
        " document.getElementsByClassName('search')[0].value = '" + music + "'; " +
        " document.getElementsByClassName('icon-search-gray')[0].click();"
      });
    }else{
      chrome.tabs.create({ url: 'http://grooveshark.com/#!/search?q=' + music }, function(tab){
        groovesharkTab = tab.id;
      });
    }
}

function playFirst(delay){
    chrome.tabs.executeScript(groovesharkTab, { code: 
      " if(document.getElementsByClassName('play-or-add').length > 0){ " +
        " setTimeout( function(){ " +
        " console.log('Playing the first music: ' + document.getElementsByClassName('tooltip-for-full-text')[0].innerHTML ); " + 
        " document.getElementsByClassName('play-or-add')[0].click(); " +
        " }, " + delay + " ); " +
      " } "
    });
}

function searchAndPlay(music, delay){
  search(music),
  playFirst(delay);
}