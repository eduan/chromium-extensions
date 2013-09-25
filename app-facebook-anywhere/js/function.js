// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/all.js#xfbml=1&appId=393816267411515";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
var comments = '<div style="position: fixed; top: 80%; height: 230px; width: 560px; margin-left:-275px; left: 50%; background-color: white; z-index: 100000000000; overflow: auto !important;"><iframe id="f3bafd5014" name="f2a2e64b7c" scrolling="no" title="Facebook Social Plugin" class="fb_ltr" src="https://www.facebook.com/plugins/comments.php?api_key=113869198637480&amp;channel_url=https%3A%2F%2Fs-static.ak.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D27%23cb%3Df27009498%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff3490537a4%26relation%3Dparent.parent&amp;href=http%3A%2F%2Fg1.globo.com&amp;locale=en_US&amp;numposts=3&amp;sdk=joey&amp;width=470" style="border: none; overflow: hidden; height: 200px; width: 550px;"></iframe></div>';

chrome.tabs.getCurrent(function(tab){
	chrome.tabs.executeScript(tab.id, { code: 
	    "document.body.innerHTML += '" + comments + "';";
	});	
})
