// // Copyright (c) 2010 André L. Santos (andrelimasantos@gmail.com)
// function clickCPF(){
//     chrome.tabs.executeScript(null,{"file":"colarcpf.js"});
// }

// function clickCNPJ(){
//     chrome.tabs.executeScript(null,{"file":"colarcnpj.js"});
// }

var contexto = ["selection"];

var mnuCPF = {
    "id":"ctxGrooveShark",
    "type":"normal",
    "title":"Tocar música no Grooveshark",
    //"onclick":clickCPF,
    "contexts":contexto 
};

chrome.contextMenus.onClicked.addListener(function(info, tab){

        if(info.menuItemId == 'ctxGrooveShark' && info.selectionText.length > 1){
            chrome.tabs.create({ url: 'http://grooveshark.com/#!/search?q=' + info.selectionText}, function(tab){
                
                alert(tab.id);

            });
        }
    }
);

var menuCPF = chrome.contextMenus.create(mnuCPF);
