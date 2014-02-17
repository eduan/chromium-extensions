var contexto = ["selection"];

var mnuCPF = {
    "id" : "ctxGrooveShark",
    "type" : "normal",
    "title" : "Tocar música no Grooveshark",
    //"onclick":clickCPF,
    "contexts" : contexto 
};

chrome.contextMenus.onClicked.addListener(function(info, tab){
    alert('existe' + groovesharkTab);
    if(info.menuItemId == 'ctxGrooveShark'){
        searchAndPlay(info.selectionText, 4000);
    }
});

var menuCPF = chrome.contextMenus.create(mnuCPF);
