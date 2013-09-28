// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/all.js#xfbml=1&appId=393816267411515";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
function initIframe(url){
    return  '<div id="facebook_comment_anywhere" style="position: fixed; top: 60%; height: 400px; width: 560px; margin-left:-275px; left: 50%; background-color: white; z-index: 100000000000; overflow: scroll !important; border: 1px solid #ccc;">' +
                '<a style="float:right; font-family: \\\'lucida grande\\\',tahoma,verdana,arial,sans-serif; font-size: 11px;" href="#" onclick="document.getElementById(\\\'facebook_comment_anywhere\\\').remove()">[x] Fechar</a>' +
                '<iframe' +
                    ' name="facebook_comment_anywhere"' +
                    ' scrolling="yes"' +
                    ' src="https://www.facebook.com/plugins/comments.php?api_key=113869198637480&amp;href=' + url + '&amp;locale=en_US&amp;numposts=3&amp;sdk=joey&amp;width=450"' +
                    ' style="border: none; overflow-x: hidden; height: 300px; width: 550px;"> </iframe>' + 
            '</div>';
}

var tabId = -1;
var tabUrl = '';

chrome.tabs.getSelected(null, function(tab){ 
    tabId = tab.id ;
    tabUrl = escape(tab.url);
    if(tabId){
        chrome.tabs.executeScript(tabId, { code: 
            "if(document.getElementById('facebook_comment_anywhere')){ " + 
            "   document.getElementById('facebook_comment_anywhere').remove() " +
            "}" + 
            "document.body.innerHTML += '" + initIframe(tabUrl) + "';"
        });    
    }

    $.getJSON('https://graph.facebook.com/?ids=' + tabUrl, function(data){
        if(data.length){
            chrome.browserAction.setBadgeText({text: data[tabUrl]['comments']})
        }
    });
})

