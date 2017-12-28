
if (window.addEventListener) {
    window.addEventListener("load", delayedloadUPDojo, false);
}

function delayedloadUPDojo() {
    setTimeout("loadUPDojo()", 100);
}

function loadUPDojo() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("tabindex", "-1");
    with (iframe.style) {
        borderSize = "0px";
        width = "1px";
        height = "1px";
        position = "absolute";
        bottom =  "0px";
        left = "0px"
    }
    iframe.frameBorder = 0;
    iframe.src = "/util/cacheDojo.jsp";
    document.body.appendChild(iframe);
}