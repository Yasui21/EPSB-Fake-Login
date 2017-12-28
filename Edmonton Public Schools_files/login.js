/*
  login.js

  Originated by Stoneware, Inc.  http://www.stone-ware.com

  The enclosed material is Stoneware Confidential and is the sole
  property of Stoneware, Inc.  Unauthorized disclosure, distribution
  or other use of this material is expressly prohibited.

  (c) Copyright 1999-2009 Stoneware, Inc.  All rights reserved.
*/
var taskBarHeight = 0;

//preload mouseover images to ensure transition is smooth
var cachedImage = new Image();
var img = new Array();
var cachedImages = new Array();
cachedImages[0] = "images/WebOSGlossyButtonHover.png";

for (var imgStart = 0; imgStart < cachedImages.length; imgStart++){
    img[imgStart] = new Image();
    img[imgStart].src = cachedImages[imgStart];
}

function setFocus() {
    // Set focus to the first element on the first form that matches the type(s) specified as an argument.
    if ( document.forms.length > 0 ) {
        var element, type, i = 0, j, elements = document.forms[0].elements;
        while ( element = elements[i++]) {
            j = 0;
            while ( type = arguments[j++] ) {
                var re = new RegExp( type, "i" );
                if ( element.type.match( re ) && element.name != "foilautofill" ) {
                    return element.focus();
                }
            }
        }
    }
}

function focus() {
    if (window.setFocus) {
        setFocus( 'TEXT', 'PASSWORD' );
    } else if (window.bpSetFocus) {
        bpSetFocus( "BPLoginFlash" );
    }
}

function toggleHover(element) {
    //if (window.isLoggingIn) return;
    if (element.className.indexOf("Disabled") == -1) {
        if (element.className.indexOf("Hover") == -1) {
            element.className = "WebOSButtonHover WebOSButton";
        } else {
            element.className = "WebOSButton";
        }
    }
}

function focusStyle(element) {
    element.className = "loginForm-text-input-hover loginForm-text-input";
}

function blurStyle(element) {
    element.className = "loginForm-text-input";                
}

if (window.dojo) {
    dojo.addOnLoad( focus );  
    dojo.addOnLoad( checkSystemLanuch );     
    dojo.addOnLoad( checkLoginBoxHeight );
    dojo.addOnLoad( autoCenter );
    dojo.addOnLoad( updatePrivacyPolicyLink );
    dojo.addOnLoad( updateTermsOfServiceLink );
} else {
    if (window.attachEvent) {
        window.attachEvent("onload", nodojo_init);
    } else {
        window.addEventListener("load", nodojo_init, false);
    }
}

function nodojo_init() {
    setFocus( 'TEXT', 'PASSWORD' );
    updatePrivacyPolicyLink();
    updateTermsOfServiceLink();
    //addBrowserClasses();
}

function addBrowserClasses() {
    var bodyClass = document.body.className;
    if (navigator.userAgent.indexOf("AppleWebKit") != -1) {
        document.body.className = (bodyClass.length > 0 ? " " : "") + "webkit";
    }
}


function checkWidth( width ) {
    if ( width > document.body.clientWidth ) {
        width = document.body.clientWidth;
    } else if ( width == 0 ) {
        width = dojo.html.getViewport().width;
    }
    return width;
}

function checkHeight( height ) {
    if ( height > document.body.clientHeight ) {
        height = document.body.clientHeight;
    } else if ( height == 0 ) {
        height = dojo.html.getViewport().height;
    }
    return height;
}



function getLeft( windowWidth ) {
    var cW = document.body.clientWidth;
    return ( cW - windowWidth ) / 2;
}
function getTop( windowHeight ) {
    var cH = document.body.clientHeight;
    return ( cH - windowHeight ) / 2;
}

function createIframe( url, name ) {
    var iframe;
    if (dojo.render.html.ie) {
        iframe = document.createElement("<IFRAME name='" + name + "'>"); //IE 'name property' bug workaround
    } else {
        iframe = document.createElement("IFRAME");
        iframe.name = name;
    }

    iframe.style.height = "100%";
    iframe.style.display = "block";
    iframe.style.width = "100%";
    iframe.style.backgroundColor = "#fff";
    iframe.style.overflow = "auto";
    if (dojo.render.html.mozilla) {
        iframe.src = "about:blank"; //if we load a url, dojo will load it 2-4 times during widget constuction.
    } else {
        iframe.src = url;
    }

    iframe.frameBorder=0;

    return iframe;
}


function _launchSystemCheck(){  
   if (!dojo.render.html.ie && typeof BPLoginFlash_DoFSCommand != 'undefined') {
        return true;
   }
    
   var url = "/apps/systemCheck/systemCheck.jsp";
   var name = "SystemCheck";
   var id = "SystemCheck";
   var title = "System Check";
   iconSrc = "/images/tool.png";

   var srcNode = createIframe( url, name );
   srcNode.widgetID = id;
   srcNode.scrolling = "yes";

   var div = document.createElement("div");
   div.appendChild(srcNode);
   document.body.appendChild(div);

   var width = 800;
   var height = 600;
   width = checkWidth( width );
   height = checkHeight( height );

   var left = getLeft(width);
   var top = getTop(height);

   div.style.height = "100%"
   div.style.width = "100%";
   div.style.padding = "0px";
   div.style.margin = "0px";
   var tempWin;

   var floatWin = dojo.widget.createWidget("swdojo:FloatingPaneWebOS", {  id : id,
                                                                title : title,
                                                                iconSrc : iconSrc,
                                                                toggle : "explode",
                                                                executeScripts : true,
                                                                hasShadow : true,
                                                                resizable : true,
                                                                windowState : "normal", 
                                                                url : url,
                                                                constrainToContainer: false,
                                                                iframeName : name,
                                                                displayRefreshAction : true,
                                                                displayCloseAction : true,
                                                                displayMinimizeAction : false, 
                                                                displayMaximizeAction : true},
                                                                div);
   dojo.html.setStyleAttributes(floatWin.domNode,"position:absolute;top:" + top + "px;left:" + left + "px;width: " + width + "px; height: " + height + "px;z-index:1005");

   floatWin.onShow();
   document.body.appendChild(floatWin.domNode);
   if (window.fixPngs) {
        fixPngs(); //for tools.png
   }
   return false;
}

function checkSystemLanuch() {
    if (document.cookie) {
        //alert(document.cookie);
        var startIndex = document.cookie.indexOf("systemcheck=");
        if (startIndex > -1) {
            var endIndex = document.cookie.indexOf(";", startIndex);
            //alert(startIndex);
            //alert(endIndex);
            if (endIndex == -1) {
                endIndex = document.cookie.length;
            }
            var shouldLauchSystemCheck = document.cookie.substring(startIndex + 12,endIndex);
            //alert("shouldLauchSystemCheck: " + shouldLauchSystemCheck);
            if (shouldLauchSystemCheck == 1) {
                var lastYear = new Date();
                lastYear.setFullYear(lastYear.getFullYear() - 1);
                document.cookie = "systemcheck=0;expires=" + lastYear.toGMTString();
                setTimeout("launchSystemCheck();", 1000);
            }
        }
    }
}

function checkLoginBoxHeight() {
    var availHeight = document.body.clientHeight;
    if (isOldDojo() && availHeight > 0) { //6745 - not sure client height is sometimes 0, but when it is, we can't fix the login box height

        var loginWidget = dojo.widget.getWidgetById("LoginBox");
        var mb = dojo.html.getMarginBox(loginWidget.domNode);
        if (mb.height > availHeight) {
            //find space between links and footer
            var linksContainer = loginWidget.domNode.getElementsByTagName("P");
            if (linksContainer != null && linksContainer.length > 0) {
                if (linksContainer[0].className == "loginBlock") {
                    var offsetHeight = linksContainer[0].offsetTop + linksContainer[0].offsetHeight;
                    var footer = document.getElementById("loginFooter");
                    if (footer) {
                        var shrink = footer.offsetTop - offsetHeight;
                        if (shrink > 15) {
                            loginWidget.resizeTo(mb.width,mb.height - shrink + 15);
                            loginWidget.center();
                        }
                    }
                }
            }
        }
    }
}

function autoCenter() {
    if (!isOldDojo()) {
        centerBox();
        dojo.connect(window, "onresize", centerBox);
    }
}

function centerBox() {
    if (!isOldDojo() && window.dijit && dijit.byId) {
        var lb = dijit.byId("LoginBox");
        if (lb) {
            var t = (document.body.clientHeight - parseInt(lb.domNode.style.height)) / 2;
            var l = (document.body.clientWidth - parseInt(lb.domNode.style.width)) / 2;
            lb._naturalState.t = t;
            lb._naturalState.l = l;
            lb.domNode.style.top = t + "px";
            lb.domNode.style.left = l + "px";
        }
    }
}

function isOldDojo() {
    return dojo.widget != undefined;
}

function _launchOpenIDLogin(dest_url){  
   if (!dojo.render.html.ie && typeof BPLoginFlash_DoFSCommand != 'undefined') {
        return true;
   }
    
   var url = dest_url;
   var name = "OpenIDLogin";
   var id = "OpenIDLogin";
   var title = "OpenID Login";
   iconSrc = "/images/openid/openid.ico.png";

   var srcNode = createIframe( url, name );
   srcNode.widgetID = id;
   srcNode.scrolling = "yes";

   var div = document.createElement("div");
   div.appendChild(srcNode);
   document.body.appendChild(div);

   var width = 450;
   var height = 350;
   width = checkWidth( width );
   height = checkHeight( height );

   var left = getLeft(width);
   var top = getTop(height);

   div.style.height = "100%"
   div.style.width = "100%";
   div.style.padding = "0px";
   div.style.margin = "0px";
   var tempWin;

   var floatWin = dojo.widget.createWidget("swdojo:FloatingPaneWebOS", {  id : id,
                                                                title : title,
                                                                iconSrc : iconSrc,
                                                                toggle : "explode",
                                                                executeScripts : true,
                                                                hasShadow : true,
                                                                resizable : true,
                                                                windowState : "normal", 
                                                                url : url,
                                                                constrainToContainer: false,
                                                                iframeName : name,
                                                                displayRefreshAction : true,
                                                                displayCloseAction : true,
                                                                displayMinimizeAction : false, 
                                                                displayMaximizeAction : true},
                                                                div);
   dojo.html.setStyleAttributes(floatWin.domNode,"position:absolute;top:" + top + "px;left:" + left + "px;width: " + width + "px; height: " + height + "px;z-index:1005");

   floatWin.onShow();
   document.body.appendChild(floatWin.domNode);
   if (window.fixPngs) {
        fixPngs(); //for tools.png
   }
   return false;
}

function _launchOpenIDClaim(dest_url){  
   if (!dojo.render.html.ie && typeof BPLoginFlash_DoFSCommand != 'undefined') {
        return true;
   }
    
   var url = dest_url;
   var name = "OpenIDLogin";
   var id = "OpenIDLogin";
   var title = "OpenID Login";
   iconSrc = "/images/openid/openid.ico.png";

   var srcNode = createIframe( url, name );
   srcNode.widgetID = id;
   srcNode.scrolling = "yes";

   var div = document.createElement("div");
   div.appendChild(srcNode);
   document.body.appendChild(div);

   var width = 450;
   var height = 350;
   width = checkWidth( width );
   height = checkHeight( height );

   var left = getLeft(width);
   var top = getTop(height);

   div.style.height = "100%"
   div.style.width = "100%";
   div.style.padding = "0px";
   div.style.margin = "0px";
   var tempWin;

   var floatWin = dojo.widget.createWidget("swdojo:FloatingPaneWebOS", {  id : id,
                                                                title : title,
                                                                iconSrc : iconSrc,
                                                                toggle : "explode",
                                                                executeScripts : true,
                                                                hasShadow : true,
                                                                resizable : true,
                                                                windowState : "normal", 
                                                                url : url,
                                                                constrainToContainer: false,
                                                                iframeName : name,
                                                                displayRefreshAction : true,
                                                                displayCloseAction : true,
                                                                displayMinimizeAction : false, 
                                                                displayMaximizeAction : true},
                                                                div);
   dojo.html.setStyleAttributes(floatWin.domNode,"position:absolute;top:" + top + "px;left:" + left + "px;width: " + width + "px; height: " + height + "px;z-index:1005");

   floatWin.onShow();
   document.body.appendChild(floatWin.domNode);
   if (window.fixPngs) {
        fixPngs(); //for tools.png
   }
   return false;
}

function setCredentialsFromWebAgent(username) {
    var inputs = document.getElementsByClassName("loginForm-text-input");
    for (var a = 0; a < inputs.length; a++) {
        if (inputs[a].type == "text" && inputs[a].value.length == 0) {
            inputs[a].value = username;
            break;
        }
    }
}

function updatePrivacyPolicyLink () {
  localizeLink('privacy-policy','http://www.lenovo.com/privacy/');
}

function updateTermsOfServiceLink () {
  localizeLink('terms-of-service','http://www.lenovo.com/legal/');
}

function localizeLink(link_id,link_href){
    var link = document.getElementById(link_id);
    if (!link) return;
    var userLang = navigator.language || navigator.userLanguage;
    var href = link_href;
    var country = 'us';
    var language = 'en';

    userLang = userLang.toLowerCase();

    if(userLang.indexOf('-') > -1){
      var langArray = userLang.split('-');
      language = langArray[0];
      country = langArray[1];
    }else{
      switch(userLang)
      {
        case 'cs':
          language = userLang;
          country = 'cz';
          break;
        case 'de':
          language = userLang;
          country = 'de';
          break;
        case 'da':
          language = userLang;
          country = 'dk';
          break;
        case 'el':
          language = userLang;
          country = 'gr';
          break;
        case 'es':
          language = userLang;
          country = 'es';
          break;
        case 'fi':
          language = 'en';
          country = 'fi';
          break;
        case 'fr':
          language = userLang;
          country = 'fr';
          break;
        case 'he':
          language = 'en';
          country = 'il';
          break;
        case 'hr':
          language = userLang;
          country = 'hr';
          break;
        case 'hu':
          language = userLang;
          country = 'hu';
          break;
        case 'it':
          language = userLang;
          country = 'it';
          break;
        case 'ko':
          language = userLang;
          country = 'kr';
          break;
        case 'jp':
          language = userLang;
          country = 'ja';
          break;
        case 'nl':
          language = 'en';
          country = 'nl';
          break;
        case 'no':
          language = userLang;
          country = 'no';
          break;
        case 'pl':
          language = userLang;
          country = 'pl';
          break;
        case 'ro':
          language = userLang;
          country = 'ro';
          break;
        case 'ru':
          language = userLang;
          country = 'ru';
          break;
        case 'sk':
          language = userLang;
          country = 'sk';
          break;
        case 'tr':
          language = userLang;
          country = 'tr';
          break;
        case 'uk':
          language = country = 'ua';
          break;
        default:
          country = 'us';
          language = 'en';
      }
    }
    
    switch(country)
    {
        case 'gb':
            country = 'uk';
            break;
        default:
    }

    link.href = href + country + "/" + language;
}

function revealAnswer(index) {
    var input = document.getElementById("Answer" + index);
    var icon = document.getElementById("AnswerReveal" + index);
    if (input.type == "password") {
        input.type = "text";
        icon.src = "/swAdmin/images/SSO_hide.png";
    } else {
        input.type = "password";
        icon.src = "/swAdmin/images/SSO_show.png";
    }     
}