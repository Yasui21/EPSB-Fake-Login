/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/touch",["./_base/kernel","./on","./has","./mouse"],function(_1,on,_2,_3){
function _4(_5){
return function(_6,_7){
return on(_6,_5,_7);
};
};
var _8=_2("touch");
_1.touch={press:_4(dojo.isIE == 10 ? "MSPointerDown" : (_8?"touchstart":"mousedown")),move:_4(dojo.isIE == 10 ? "MSPointerMove" : (_8?"touchmove":"mousemove")),release:_4(dojo.isIE == 10 ? "MSPointerUp" : (_8?"touchend":"mouseup")),cancel:_8?_4("touchcancel"):_3.leave};
return _1.touch;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/string",["./_base/kernel","./_base/lang"],function(_1,_2){
_2.getObject("string",true,_1);
_1.string.rep=function(_3,_4){
if(_4<=0||!_3){
return "";
}
var _5=[];
for(;;){
if(_4&1){
_5.push(_3);
}
if(!(_4>>=1)){
break;
}
_3+=_3;
}
return _5.join("");
};
_1.string.pad=function(_6,_7,ch,_8){
if(!ch){
ch="0";
}
var _9=String(_6),_a=_1.string.rep(ch,Math.ceil((_7-_9.length)/ch.length));
return _8?_9+_a:_a+_9;
};
_1.string.substitute=function(_b,_c,_d,_e){
_e=_e||_1.global;
_d=_d?_2.hitch(_e,_d):function(v){
return v;
};
return _b.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_f,key,_10){
var _11=_2.getObject(key,false,_c);
if(_10){
_11=_2.getObject(_10,false,_e).call(_e,_11,key);
}
return _d(_11,key).toString();
});
};
_1.string.trim=String.prototype.trim?_2.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
return _1.string;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/window",["./_base/kernel","./_base/lang","./_base/sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(_1,_2,_3,_4,_5,_6,_7){
_2.getObject("window",true,_1);
_1.window.getBox=function(){
var _8=(_4.doc.compatMode=="BackCompat")?_4.body():_4.doc.documentElement;
var _9=_6.docScroll();
var _a=_4.doc.parentWindow||_4.doc.defaultView;
return {l:_9.x,t:_9.y,w:_a.innerWidth||_8.clientWidth,h:_a.innerHeight||_8.clientHeight};
};
_1.window.get=function(_b){
if(_3("ie")&&window!==document.parentWindow){
_b.parentWindow.execScript("document._parentWindow = window;","Javascript");
var _c=_b._parentWindow;
_b._parentWindow=null;
return _c;
}
return _b.parentWindow||_b.defaultView;
};
_1.window.scrollIntoView=function(_d,_e){
try{
_d=_5.byId(_d);
var _f=_d.ownerDocument||_4.doc,_10=_f.body||_4.body(),_11=_f.documentElement||_10.parentNode,_12=_3("ie"),_13=_3("webkit");
if((!(_3("mozilla")||_12||_13||_3("opera"))||_d==_10||_d==_11)&&(typeof _d.scrollIntoView!="undefined")){
_d.scrollIntoView(false);
return;
}
var _14=_f.compatMode=="BackCompat",_15=(_12>=9&&_d.ownerDocument.parentWindow.frameElement)?((_11.clientHeight>0&&_11.clientWidth>0&&(_10.clientHeight==0||_10.clientWidth==0||_10.clientHeight>_11.clientHeight||_10.clientWidth>_11.clientWidth))?_11:_10):(_14?_10:_11),_16=_13?_10:_15,_17=_15.clientWidth,_18=_15.clientHeight,rtl=!_6.isBodyLtr(),_19=_e||_6.position(_d),el=_d.parentNode,_1a=function(el){
return ((_12<=6||(_12&&_14))?false:(_7.get(el,"position").toLowerCase()=="fixed"));
};
if(_1a(_d)){
return;
}
while(el){
if(el==_10){
el=_16;
}
var _1b=_6.position(el),_1c=_1a(el);
if(el==_16){
_1b.w=_17;
_1b.h=_18;
if(_16==_11&&_12&&rtl){
_1b.x+=_16.offsetWidth-_1b.w;
}
if(_1b.x<0||!_12){
_1b.x=0;
}
if(_1b.y<0||!_12){
_1b.y=0;
}
}else{
var pb=_6.getPadBorderExtents(el);
_1b.w-=pb.w;
_1b.h-=pb.h;
_1b.x+=pb.l;
_1b.y+=pb.t;
var _1d=el.clientWidth,_1e=_1b.w-_1d;
if(_1d>0&&_1e>0){
_1b.w=_1d;
_1b.x+=(rtl&&(_12||el.clientLeft>pb.l))?_1e:0;
}
_1d=el.clientHeight;
_1e=_1b.h-_1d;
if(_1d>0&&_1e>0){
_1b.h=_1d;
}
}
if(_1c){
if(_1b.y<0){
_1b.h+=_1b.y;
_1b.y=0;
}
if(_1b.x<0){
_1b.w+=_1b.x;
_1b.x=0;
}
if(_1b.y+_1b.h>_18){
_1b.h=_18-_1b.y;
}
if(_1b.x+_1b.w>_17){
_1b.w=_17-_1b.x;
}
}
var l=_19.x-_1b.x,t=_19.y-Math.max(_1b.y,0),r=l+_19.w-_1b.w,bot=t+_19.h-_1b.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((_12==8&&!_14)||_12>=9)){
s=-s;
}
_19.x+=el.scrollLeft;
el.scrollLeft+=s;
_19.x-=el.scrollLeft;
}
if(bot*t>0){
_19.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_19.y-=el.scrollTop;
}
el=(el!=_16)&&!_1c&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
_d.scrollIntoView(false);
}
};
return _1.window;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./query","./on","./ready"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
new Date("X");
var _c={"dom-attributes-explicit":document.createElement("div").attributes.length<40};
function _d(_e){
return _c[_e];
};
_1.parser=new function(){
var _f={};
function _10(_11){
var map={};
for(var _12 in _11){
if(_12.charAt(0)=="_"){
continue;
}
map[_12.toLowerCase()]=_12;
}
return map;
};
_8.after(_2,"extend",function(){
_f={};
},true);
var _13={};
this._functionFromScript=function(_14,_15){
var _16="";
var _17="";
var _18=(_14.getAttribute(_15+"args")||_14.getAttribute("args"));
if(_18){
_3.forEach(_18.split(/\s*,\s*/),function(_19,idx){
_16+="var "+_19+" = arguments["+idx+"]; ";
});
}
var _1a=_14.getAttribute("with");
if(_1a&&_1a.length){
_3.forEach(_1a.split(/\s*,\s*/),function(_1b){
_16+="with("+_1b+"){";
_17+="}";
});
}
return new Function(_16+_14.innerHTML+_17);
};
this.instantiate=function(_1c,_1d,_1e){
var _1f=[],_1d=_1d||{};
_1e=_1e||{};
var _20=(_1e.scope||_1._scopeName)+"Type",_21="data-"+(_1e.scope||_1._scopeName)+"-",_22=_21+"type",_23=_21+"props",_24=_21+"attach-point",_25=_21+"attach-event",_26=_21+"id";
var _27={};
_3.forEach([_23,_22,_20,_26,"jsId",_24,_25,"dojoAttachPoint","dojoAttachEvent","class","style"],function(_28){
_27[_28.toLowerCase()]=_28.replace(_1e.scope,"dojo");
});
_3.forEach(_1c,function(obj){
if(!obj){
return;
}
var _29=obj.node||obj,_2a=_20 in _1d?_1d[_20]:obj.node?obj.type:(_29.getAttribute(_22)||_29.getAttribute(_20)),_2b=_13[_2a]||(_13[_2a]=_2.getObject(_2a)),_2c=_2b&&_2b.prototype;
if(!_2b){
throw new Error("Could not load class '"+_2a);
}
var _2d={};
if(_1e.defaults){
_2.mixin(_2d,_1e.defaults);
}
if(obj.inherited){
_2.mixin(_2d,obj.inherited);
}
var _2e;
if(_d("dom-attributes-explicit")){
_2e=_29.attributes;
}else{
var _2f=/^input$|^img$/i.test(_29.nodeName)?_29:_29.cloneNode(false),_30=_2f.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*/,"").replace(/>.*$/,"");
_2e=_3.map(_30.split(/\s+/),function(_31){
var _32=_31.toLowerCase();
return {name:_31,value:(_29.nodeName=="LI"&&_31=="value")||_32=="enctype"?_29.getAttribute(_32):_29.getAttributeNode(_32).value,specified:true};
});
}
var i=0,_33;
while(_33=_2e[i++]){
if(!_33||!_33.specified){
continue;
}
var _34=_33.name,_35=_34.toLowerCase(),_36=_33.value;
if(_35 in _27){
switch(_27[_35]){
case "data-dojo-props":
var _37=_36;
break;
case "data-dojo-id":
case "jsId":
var _38=_36;
break;
case "data-dojo-attach-point":
case "dojoAttachPoint":
_2d.dojoAttachPoint=_36;
break;
case "data-dojo-attach-event":
case "dojoAttachEvent":
_2d.dojoAttachEvent=_36;
break;
case "class":
_2d["class"]=_29.className;
break;
case "style":
_2d["style"]=_29.style&&_29.style.cssText;
break;
}
}else{
if(!(_34 in _2c)){
var map=(_f[_2a]||(_f[_2a]=_10(_2c)));
_34=map[_35]||_34;
}
if(_34 in _2c){
switch(typeof _2c[_34]){
case "string":
_2d[_34]=_36;
break;
case "number":
_2d[_34]=_36.length?Number(_36):NaN;
break;
case "boolean":
_2d[_34]=_36.toLowerCase()!="false";
break;
case "function":
if(_36===""||_36.search(/[^\w\.]+/i)!=-1){
_2d[_34]=new Function(_36);
}else{
_2d[_34]=_2.getObject(_36,false)||new Function(_36);
}
break;
default:
var _39=_2c[_34];
_2d[_34]=(_39&&"length" in _39)?(_36?_36.split(/\s*,\s*/):[]):(_39 instanceof Date)?(_36==""?new Date(""):_36=="now"?new Date():_9.fromISOString(_36)):(_39 instanceof _1._Url)?(_1.baseUrl+_36):_7.fromJson(_36);
}
}else{
_2d[_34]=_36;
}
}
}
if(_37){
try{
_37=_7.fromJson.call(_1e.propsThis,"{"+_37+"}");
_2.mixin(_2d,_37);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_37+"'");
}
}
_2.mixin(_2d,_1d);
var _3a=obj.node?obj.scripts:(_2b&&(_2b._noScript||_2c._noScript)?[]:_a("> script[type^='dojo/']",_29));
var _3b=[],_3c=[],_3d=[],on=[];
if(_3a){
for(i=0;i<_3a.length;i++){
var _3e=_3a[i];
_29.removeChild(_3e);
var _3f=(_3e.getAttribute(_21+"event")||_3e.getAttribute("event")),_40=_3e.getAttribute(_21+"prop"),_2a=_3e.getAttribute("type"),nf=this._functionFromScript(_3e,_21);
if(_3f){
if(_2a=="dojo/connect"){
_3b.push({event:_3f,func:nf});
}else{
if(_2a=="dojo/on"){
on.push({event:_3f,func:nf});
}else{
_2d[_3f]=nf;
}
}
}else{
if(_2a=="dojo/watch"){
_3d.push({prop:_40,func:nf});
}else{
_3c.push(nf);
}
}
}
}
var _41=_2b.markupFactory||_2c.markupFactory;
var _42=_41?_41(_2d,_29,_2b):new _2b(_2d,_29);
_1f.push(_42);
if(_38){
_2.setObject(_38,_42);
}
for(i=0;i<_3b.length;i++){
_8.after(_42,_3b[i].event,_1.hitch(_42,_3b[i].func),true);
}
for(i=0;i<_3c.length;i++){
_3c[i].call(_42);
}
for(i=0;i<_3d.length;i++){
_42.watch(_3d[i].prop,_3d[i].func);
}
for(i=0;i<on.length;i++){
_b(_42,on[i].event,on[i].func);
}
},this);
if(!_1d._started){
_3.forEach(_1f,function(_43){
if(!_1e.noStart&&_43&&_2.isFunction(_43.startup)&&!_43._started){
_43.startup();
}
});
}
return _1f;
};
this.parse=function(_44,_45){
var _46;
if(!_45&&_44&&_44.rootNode){
_45=_44;
_46=_45.rootNode;
}else{
_46=_44;
}
_46=_46?_4.byId(_46):_5.body();
_45=_45||{};
var _47=(_45.scope||_1._scopeName)+"Type",_48="data-"+(_45.scope||_1._scopeName)+"-",_49=_48+"type",_4a=_48+"textdir";
var _4b=[];
var _4c=_46.firstChild;
var _4d=_45&&_45.inherited;
if(!_4d){
function _4e(_4f,_50){
return (_4f.getAttribute&&_4f.getAttribute(_50))||(_4f!==_5.doc&&_4f!==_5.doc.documentElement&&_4f.parentNode?_4e(_4f.parentNode,_50):null);
};
_4d={dir:_4e(_46,"dir"),lang:_4e(_46,"lang"),textDir:_4e(_46,_4a)};
for(var key in _4d){
if(!_4d[key]){
delete _4d[key];
}
}
}
var _51={inherited:_4d};
var _52;
var _53;
function _54(_55){
if(!_55.inherited){
_55.inherited={};
var _56=_55.node,_57=_54(_55.parent);
var _58={dir:_56.getAttribute("dir")||_57.dir,lang:_56.getAttribute("lang")||_57.lang,textDir:_56.getAttribute(_4a)||_57.textDir};
for(var key in _58){
if(_58[key]){
_55.inherited[key]=_58[key];
}
}
}
return _55.inherited;
};
while(true){
if(!_4c){
if(!_51||!_51.node){
break;
}
_4c=_51.node.nextSibling;
_52=_51.scripts;
_53=false;
_51=_51.parent;
continue;
}
if(_4c.nodeType!=1){
_4c=_4c.nextSibling;
continue;
}
if(_52&&_4c.nodeName.toLowerCase()=="script"){
_59=_4c.getAttribute("type");
if(_59&&/^dojo\/\w/i.test(_59)){
_52.push(_4c);
}
_4c=_4c.nextSibling;
continue;
}
if(_53){
_4c=_4c.nextSibling;
continue;
}
var _59=_4c.getAttribute(_49)||_4c.getAttribute(_47);
var _5a=_4c.firstChild;
if(!_59&&(!_5a||(_5a.nodeType==3&&!_5a.nextSibling))){
_4c=_4c.nextSibling;
continue;
}
var _5b={node:_4c,scripts:_52,parent:_51};
var _5c=_59&&(_13[_59]||(_13[_59]=_2.getObject(_59))),_5d=_5c&&!_5c.prototype._noScript?[]:null;
if(_59){
_4b.push({"type":_59,node:_4c,scripts:_5d,inherited:_54(_5b)});
}
_4c=_5a;
_52=_5d;
_53=_5c&&_5c.prototype.stopParser&&!(_45&&_45.template);
_51=_5b;
}
var _5e=_45&&_45.template?{template:true}:null;
return this.instantiate(_4b,_5e,_45);
};
}();
if(_1.config.parseOnLoad){
_1.ready(100,_1.parser,"parse");
}
return _1.parser;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/cookie",["./_base/kernel","./regexp"],function(_1,_2){
_1.cookie=function(_3,_4,_5){
var c=document.cookie,_6;
if(arguments.length==1){
var _7=c.match(new RegExp("(?:^|; )"+_2.escapeString(_3)+"=([^;]*)"));
_6=_7?decodeURIComponent(_7[1]):undefined;
}else{
_5=_5||{};
var _8=_5.expires;
if(typeof _8=="number"){
var d=new Date();
d.setTime(d.getTime()+_8*24*60*60*1000);
_8=_5.expires=d;
}
if(_8&&_8.toUTCString){
_5.expires=_8.toUTCString();
}
_4=encodeURIComponent(_4);
var _9=_3+"="+_4,_a;
for(_a in _5){
_9+="; "+_a;
var _b=_5[_a];
if(_b!==true){
_9+="="+_b;
}
}
document.cookie=_9;
}
return _6;
};
_1.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
return _1.cookie;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/regexp",["./_base/kernel","./_base/lang"],function(_1,_2){
_2.getObject("regexp",true,_1);
_1.regexp.escapeString=function(_3,_4){
return _3.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_4&&_4.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
_1.regexp.buildGroupRE=function(_5,re,_6){
if(!(_5 instanceof Array)){
return re(_5);
}
var b=[];
for(var i=0;i<_5.length;i++){
b.push(re(_5[i]));
}
return _1.regexp.group(b.join("|"),_6);
};
_1.regexp.group=function(_7,_8){
return "("+(_8?"?:":"")+_7+")";
};
return _1.regexp;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/date/stamp",["../_base/kernel","../_base/lang","../_base/array"],function(_1,_2,_3){
_2.getObject("date.stamp",true,_1);
_1.date.stamp.fromISOString=function(_4,_5){
if(!_1.date.stamp._isoRegExp){
_1.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _6=_1.date.stamp._isoRegExp.exec(_4),_7=null;
if(_6){
_6.shift();
if(_6[1]){
_6[1]--;
}
if(_6[6]){
_6[6]*=1000;
}
if(_5){
_5=new Date(_5);
_3.forEach(_3.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(_8){
return _5["get"+_8]();
}),function(_9,_a){
_6[_a]=_6[_a]||_9;
});
}
_7=new Date(_6[0]||1970,_6[1]||0,_6[2]||1,_6[3]||0,_6[4]||0,_6[5]||0,_6[6]||0);
if(_6[0]<100){
_7.setFullYear(_6[0]||1970);
}
var _b=0,_c=_6[7]&&_6[7].charAt(0);
if(_c!="Z"){
_b=((_6[8]||0)*60)+(Number(_6[9])||0);
if(_c!="-"){
_b*=-1;
}
}
if(_c){
_b-=_7.getTimezoneOffset();
}
if(_b){
_7.setTime(_7.getTime()+_b*60000);
}
}
return _7;
};
_1.date.stamp.toISOString=function(_d,_e){
var _f=function(n){
return (n<10)?"0"+n:n;
};
_e=_e||{};
var _10=[],_11=_e.zulu?"getUTC":"get",_12="";
if(_e.selector!="time"){
var _13=_d[_11+"FullYear"]();
_12=["0000".substr((_13+"").length)+_13,_f(_d[_11+"Month"]()+1),_f(_d[_11+"Date"]())].join("-");
}
_10.push(_12);
if(_e.selector!="date"){
var _14=[_f(_d[_11+"Hours"]()),_f(_d[_11+"Minutes"]()),_f(_d[_11+"Seconds"]())].join(":");
var _15=_d[_11+"Milliseconds"]();
if(_e.milliseconds){
_14+="."+(_15<100?"0":"")+_f(_15);
}
if(_e.zulu){
_14+="Z";
}else{
if(_e.selector!="time"){
var _16=_d.getTimezoneOffset();
var _17=Math.abs(_16);
_14+=(_16>0?"-":"+")+_f(Math.floor(_17/60))+":"+_f(_17%60);
}
}
_10.push(_14);
}
return _10.join("T");
};
return _1.date.stamp;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/url",["./kernel"],function(_1){
var _2=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),_3=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),_4=function(){
var n=null,_5=arguments,_6=[_5[0]];
for(var i=1;i<_5.length;i++){
if(!_5[i]){
continue;
}
var _7=new _4(_5[i]+""),_8=new _4(_6[0]+"");
if(_7.path==""&&!_7.scheme&&!_7.authority&&!_7.query){
if(_7.fragment!=n){
_8.fragment=_7.fragment;
}
_7=_8;
}else{
if(!_7.scheme){
_7.scheme=_8.scheme;
if(!_7.authority){
_7.authority=_8.authority;
if(_7.path.charAt(0)!="/"){
var _9=_8.path.substring(0,_8.path.lastIndexOf("/")+1)+_7.path;
var _a=_9.split("/");
for(var j=0;j<_a.length;j++){
if(_a[j]=="."){
if(j==_a.length-1){
_a[j]="";
}else{
_a.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_a[0]=="")&&_a[j]==".."&&_a[j-1]!=".."){
if(j==(_a.length-1)){
_a.splice(j,1);
_a[j-1]="";
}else{
_a.splice(j-1,2);
j-=2;
}
}
}
}
_7.path=_a.join("/");
}
}
}
}
_6=[];
if(_7.scheme){
_6.push(_7.scheme,":");
}
if(_7.authority){
_6.push("//",_7.authority);
}
_6.push(_7.path);
if(_7.query){
_6.push("?",_7.query);
}
if(_7.fragment){
_6.push("#",_7.fragment);
}
}
this.uri=_6.join("");
var r=this.uri.match(_2);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(_3);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
_4.prototype.toString=function(){
return this.uri;
};
return _1._Url=_4;
});
//>>built
define("dojox/fx",["./fx/_base"],function(_1){
return _1;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/fx/Toggler",["../_base/lang","../_base/declare","../_base/fx","../_base/connect"],function(_1,_2,_3,_4){
return _2("dojo.fx.Toggler",null,{node:null,showFunc:_3.fadeIn,hideFunc:_3.fadeOut,showDuration:200,hideDuration:200,constructor:function(_5){
var _6=this;
_1.mixin(_6,_5);
_6.node=_5.node;
_6._showArgs=_1.mixin({},_5);
_6._showArgs.node=_6.node;
_6._showArgs.duration=_6.showDuration;
_6.showAnim=_6.showFunc(_6._showArgs);
_6._hideArgs=_1.mixin({},_5);
_6._hideArgs.node=_6.node;
_6._hideArgs.duration=_6.hideDuration;
_6.hideAnim=_6.hideFunc(_6._hideArgs);
_4.connect(_6.showAnim,"beforeBegin",_1.hitch(_6.hideAnim,"stop",true));
_4.connect(_6.hideAnim,"beforeBegin",_1.hitch(_6.showAnim,"stop",true));
},show:function(_7){
return this.showAnim.play(_7||0);
},hide:function(_8){
return this.hideAnim.play(_8||0);
}});
});
//>>built
define("dojox/fx/_base",["dojo/_base/array","dojo/_base/lang","dojo/_base/fx","dojo/fx","dojo/dom","dojo/dom-style","dojo/dom-geometry","dojo/_base/connect","dojo/_base/html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var _a=_2.getObject("dojox.fx",true);
_a.sizeTo=function(_b){
var _c=_b.node=_5.byId(_b.node),_d="absolute";
var _e=_b.method||"chain";
if(!_b.duration){
_b.duration=500;
}
if(_e=="chain"){
_b.duration=Math.floor(_b.duration/2);
}
var _f,_10,_11,_12,_13,_14=null;
var _15=(function(n){
return function(){
var cs=_6.getComputedStyle(n),pos=cs.position,w=cs.width,h=cs.height;
_f=(pos==_d?n.offsetTop:parseInt(cs.top)||0);
_11=(pos==_d?n.offsetLeft:parseInt(cs.left)||0);
_13=(w=="auto"?0:parseInt(w));
_14=(h=="auto"?0:parseInt(h));
_12=_11-Math.floor((_b.width-_13)/2);
_10=_f-Math.floor((_b.height-_14)/2);
if(pos!=_d&&pos!="relative"){
var ret=_6.coords(n,true);
_f=ret.y;
_11=ret.x;
n.style.position=_d;
n.style.top=_f+"px";
n.style.left=_11+"px";
}
};
})(_c);
var _16=_3.animateProperty(_2.mixin({properties:{height:function(){
_15();
return {end:_b.height||0,start:_14};
},top:function(){
return {start:_f,end:_10};
}}},_b));
var _17=_3.animateProperty(_2.mixin({properties:{width:function(){
return {start:_13,end:_b.width||0};
},left:function(){
return {start:_11,end:_12};
}}},_b));
var _18=_4[(_b.method=="combine"?"combine":"chain")]([_16,_17]);
return _18;
};
_a.slideBy=function(_19){
var _1a=_19.node=_5.byId(_19.node),top,_1b;
var _1c=(function(n){
return function(){
var cs=_6.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_1b=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=_7.coords(n,true);
top=ret.y;
_1b=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_1b+"px";
}
};
})(_1a);
_1c();
var _1d=_3.animateProperty(_2.mixin({properties:{top:top+(_19.top||0),left:_1b+(_19.left||0)}},_19));
_8.connect(_1d,"beforeBegin",_1d,_1c);
return _1d;
};
_a.crossFade=function(_1e){
var _1f=_1e.nodes[0]=_5.byId(_1e.nodes[0]),op1=_9.style(_1f,"opacity"),_20=_1e.nodes[1]=_5.byId(_1e.nodes[1]),op2=_9.style(_20,"opacity");
var _21=_4.combine([_3[(op1==0?"fadeIn":"fadeOut")](_2.mixin({node:_1f},_1e)),_3[(op1==0?"fadeOut":"fadeIn")](_2.mixin({node:_20},_1e))]);
return _21;
};
_a.highlight=function(_22){
var _23=_22.node=_5.byId(_22.node);
_22.duration=_22.duration||400;
var _24=_22.color||"#ffff99",_25=_9.style(_23,"backgroundColor");
if(_25=="rgba(0, 0, 0, 0)"){
_25="transparent";
}
var _26=_3.animateProperty(_2.mixin({properties:{backgroundColor:{start:_24,end:_25}}},_22));
if(_25=="transparent"){
_8.connect(_26,"onEnd",_26,function(){
_23.style.backgroundColor=_25;
});
}
return _26;
};
_a.wipeTo=function(_27){
_27.node=_5.byId(_27.node);
var _28=_27.node,s=_28.style;
var dir=(_27.width?"width":"height"),_29=_27[dir],_2a={};
_2a[dir]={start:function(){
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s[dir]="1px";
s.display="";
s.visibility="";
return 1;
}else{
var now=_9.style(_28,dir);
return Math.max(now,1);
}
},end:_29};
var _2b=_3.animateProperty(_2.mixin({properties:_2a},_27));
return _2b;
};
return _a;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/fx/easing",["../_base/lang"],function(_1){
var _2={linear:function(n){
return n;
},quadIn:function(n){
return Math.pow(n,2);
},quadOut:function(n){
return n*(n-2)*-1;
},quadInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,2)/2;
}
return -1*((--n)*(n-2)-1)/2;
},cubicIn:function(n){
return Math.pow(n,3);
},cubicOut:function(n){
return Math.pow(n-1,3)+1;
},cubicInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,3)/2;
}
n-=2;
return (Math.pow(n,3)+2)/2;
},quartIn:function(n){
return Math.pow(n,4);
},quartOut:function(n){
return -1*(Math.pow(n-1,4)-1);
},quartInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,4)/2;
}
n-=2;
return -1/2*(Math.pow(n,4)-2);
},quintIn:function(n){
return Math.pow(n,5);
},quintOut:function(n){
return Math.pow(n-1,5)+1;
},quintInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,5)/2;
}
n-=2;
return (Math.pow(n,5)+2)/2;
},sineIn:function(n){
return -1*Math.cos(n*(Math.PI/2))+1;
},sineOut:function(n){
return Math.sin(n*(Math.PI/2));
},sineInOut:function(n){
return -1*(Math.cos(Math.PI*n)-1)/2;
},expoIn:function(n){
return (n==0)?0:Math.pow(2,10*(n-1));
},expoOut:function(n){
return (n==1)?1:(-1*Math.pow(2,-10*n)+1);
},expoInOut:function(n){
if(n==0){
return 0;
}
if(n==1){
return 1;
}
n=n*2;
if(n<1){
return Math.pow(2,10*(n-1))/2;
}
--n;
return (-1*Math.pow(2,-10*n)+2)/2;
},circIn:function(n){
return -1*(Math.sqrt(1-Math.pow(n,2))-1);
},circOut:function(n){
n=n-1;
return Math.sqrt(1-Math.pow(n,2));
},circInOut:function(n){
n=n*2;
if(n<1){
return -1/2*(Math.sqrt(1-Math.pow(n,2))-1);
}
n-=2;
return 1/2*(Math.sqrt(1-Math.pow(n,2))+1);
},backIn:function(n){
var s=1.70158;
return Math.pow(n,2)*((s+1)*n-s);
},backOut:function(n){
n=n-1;
var s=1.70158;
return Math.pow(n,2)*((s+1)*n+s)+1;
},backInOut:function(n){
var s=1.70158*1.525;
n=n*2;
if(n<1){
return (Math.pow(n,2)*((s+1)*n-s))/2;
}
n-=2;
return (Math.pow(n,2)*((s+1)*n+s)+2)/2;
},elasticIn:function(n){
if(n==0||n==1){
return n;
}
var p=0.3;
var s=p/4;
n=n-1;
return -1*Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p);
},elasticOut:function(n){
if(n==0||n==1){
return n;
}
var p=0.3;
var s=p/4;
return Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p)+1;
},elasticInOut:function(n){
if(n==0){
return 0;
}
n=n*2;
if(n==2){
return 1;
}
var p=0.3*1.5;
var s=p/4;
if(n<1){
n-=1;
return -0.5*(Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p));
}
n-=1;
return 0.5*(Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p))+1;
},bounceIn:function(n){
return (1-_2.bounceOut(1-n));
},bounceOut:function(n){
var s=7.5625;
var p=2.75;
var l;
if(n<(1/p)){
l=s*Math.pow(n,2);
}else{
if(n<(2/p)){
n-=(1.5/p);
l=s*Math.pow(n,2)+0.75;
}else{
if(n<(2.5/p)){
n-=(2.25/p);
l=s*Math.pow(n,2)+0.9375;
}else{
n-=(2.625/p);
l=s*Math.pow(n,2)+0.984375;
}
}
}
return l;
},bounceInOut:function(n){
if(n<0.5){
return _2.bounceIn(n*2)/2;
}
return (_2.bounceOut(n*2-1)/2)+0.5;
}};
_1.setObject("dojo.fx.easing",_2);
return _2;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dnd/Container",["../main","../Evented","./common","../parser"],function(_1,_2){
_1.declare("dojo.dnd.Container",_2,{skipForm:false,constructor:function(_3,_4){
this.node=_1.byId(_3);
if(!_4){
_4={};
}
this.creator=_4.creator||null;
this.skipForm=_4.skipForm;
this.parent=_4.dropParent&&_1.byId(_4.dropParent);
this.map={};
this.current=null;
this.containerState="";
_1.addClass(this.node,"dojoDndContainer");
if(!(_4&&_4._skipStartup)){
this.startup();
}
this.events=[_1.connect(this.node,"onmouseover",this,"onMouseOver"),_1.connect(this.node,"onmouseout",this,"onMouseOut"),_1.connect(this.node,"ondragstart",this,"onSelectStart"),_1.connect(this.node,"onselectstart",this,"onSelectStart")];
},creator:function(){
},getItem:function(_5){
return this.map[_5];
},setItem:function(_6,_7){
this.map[_6]=_7;
},delItem:function(_8){
delete this.map[_8];
},forInItems:function(f,o){
o=o||_1.global;
var m=this.map,e=_1.dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return _1.query("> .dojoDndItem",this.parent);
},sync:function(){
var _9={};
this.getAllNodes().forEach(function(_a){
if(_a.id){
var _b=this.getItem(_a.id);
if(_b){
_9[_a.id]=_b;
return;
}
}else{
_a.id=_1.dnd.getUniqueId();
}
var _c=_a.getAttribute("dndType"),_d=_a.getAttribute("dndData");
_9[_a.id]={data:_d||_a.innerHTML,type:_c?_c.split(/\s*,\s*/):["text"]};
},this);
this.map=_9;
return this;
},insertNodes:function(_e,_f,_10){
if(!this.parent.firstChild){
_10=null;
}else{
if(_f){
if(!_10){
_10=this.parent.firstChild;
}
}else{
if(_10){
_10=_10.nextSibling;
}
}
}
if(_10){
for(var i=0;i<_e.length;++i){
var t=this._normalizedCreator(_e[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.insertBefore(t.node,_10);
}
}else{
for(var i=0;i<_e.length;++i){
var t=this._normalizedCreator(_e[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
_1.forEach(this.events,_1.disconnect);
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_11,_12,_13){
_11._skipStartup=true;
return new _13(_12,_11);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=_1.dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!_1.dnd.isFormElement(e)){
_1.stopEvent(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(_14,_15){
var _16="dojoDnd"+_14;
var _17=_14.toLowerCase()+"State";
_1.replaceClass(this.node,_16+_15,_16+this[_17]);
this[_17]=_15;
},_addItemClass:function(_18,_19){
_1.addClass(_18,"dojoDndItem"+_19);
},_removeItemClass:function(_1a,_1b){
_1.removeClass(_1a,"dojoDndItem"+_1b);
},_getChildByEvent:function(e){
var _1c=e.target;
if(_1c){
for(var _1d=_1c.parentNode;_1d;_1c=_1d,_1d=_1c.parentNode){
if(_1d==this.parent&&_1.hasClass(_1c,"dojoDndItem")){
return _1c;
}
}
}
return null;
},_normalizedCreator:function(_1e,_1f){
var t=(this.creator||this.defaultCreator).call(this,_1e,_1f);
if(!_1.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=_1.dnd.getUniqueId();
}
_1.addClass(t.node,"dojoDndItem");
return t;
}});
_1.dnd._createNode=function(tag){
if(!tag){
return _1.dnd._createSpan;
}
return function(_20){
return _1.create(tag,{innerHTML:_20});
};
};
_1.dnd._createTrTd=function(_21){
var tr=_1.create("tr");
_1.create("td",{innerHTML:_21},tr);
return tr;
};
_1.dnd._createSpan=function(_22){
return _1.create("span",{innerHTML:_22});
};
_1.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
_1.dnd._defaultCreator=function(_23){
var tag=_23.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?_1.dnd._createTrTd:_1.dnd._createNode(_1.dnd._defaultCreatorNodes[tag]);
return function(_24,_25){
var _26=_24&&_1.isObject(_24),_27,_28,n;
if(_26&&_24.tagName&&_24.nodeType&&_24.getAttribute){
_27=_24.getAttribute("dndData")||_24.innerHTML;
_28=_24.getAttribute("dndType");
_28=_28?_28.split(/\s*,\s*/):["text"];
n=_24;
}else{
_27=(_26&&_24.data)?_24.data:_24;
_28=(_26&&_24.type)?_24.type:["text"];
n=(_25=="avatar"?_1.dnd._createSpan:c)(String(_27));
}
if(!n.id){
n.id=_1.dnd.getUniqueId();
}
return {node:n,data:_27,type:_28};
};
};
return _1.dnd.Container;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dnd/common",["../main"],function(_1){
_1.getObject("dnd",true,_1);
_1.dnd.getCopyKeyState=_1.isCopyKey;
_1.dnd._uniqueId=0;
_1.dnd.getUniqueId=function(){
var id;
do{
id=_1._scopeName+"Unique"+(++_1.dnd._uniqueId);
}while(_1.byId(id));
return id;
};
_1.dnd._empty={};
_1.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
return _1.dnd;
});
//>>built
define("dojox/mobile/SwapView",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-class","dijit/registry","./View","./_ScrollableMixin"],function(_1,_2,_3,_4,_5,_6,_7,_8){
return _3("dojox.mobile.SwapView",[_7,_8],{scrollDir:"f",weight:1.2,buildRendering:function(){
this.inherited(arguments);
_5.add(this.domNode,"mblSwapView");
this.setSelectable(this.domNode,false);
this.containerNode=this.domNode;
_2.subscribe("/dojox/mobile/nextPage",this,"handleNextPage");
_2.subscribe("/dojox/mobile/prevPage",this,"handlePrevPage");
this.findAppBars();
},resize:function(){
this.inherited(arguments);
_1.forEach(this.getChildren(),function(_9){
if(_9.resize){
_9.resize();
}
});
},onTouchStart:function(e){
var _a=this.domNode.offsetTop;
var _b=this.nextView(this.domNode);
if(_b){
_b.stopAnimation();
_5.add(_b.domNode,"mblIn");
_b.containerNode.style.paddingTop=_a+"px";
}
var _c=this.previousView(this.domNode);
if(_c){
_c.stopAnimation();
_5.add(_c.domNode,"mblIn");
_c.containerNode.style.paddingTop=_a+"px";
}
this.inherited(arguments);
},handleNextPage:function(w){
var _d=w.refId&&_4.byId(w.refId)||w.domNode;
if(this.domNode.parentNode!==_d.parentNode){
return;
}
if(this.getShowingView()!==this){
return;
}
this.goTo(1);
},handlePrevPage:function(w){
var _e=w.refId&&_4.byId(w.refId)||w.domNode;
if(this.domNode.parentNode!==_e.parentNode){
return;
}
if(this.getShowingView()!==this){
return;
}
this.goTo(-1);
},goTo:function(_f){
var w=this.domNode.offsetWidth;
var _10=(_f==1)?this.nextView(this.domNode):this.previousView(this.domNode);
if(!_10){
return;
}
_10._beingFlipped=true;
_10.scrollTo({x:w*_f});
_10._beingFlipped=false;
_10.domNode.style.display="";
_5.add(_10.domNode,"mblIn");
this.slideTo({x:0},0.5,"ease-out",{x:-w*_f});
},isSwapView:function(_11){
return (_11&&_11.nodeType===1&&_5.contains(_11,"mblSwapView"));
},nextView:function(_12){
for(var n=_12.nextSibling;n;n=n.nextSibling){
if(this.isSwapView(n)){
return _6.byNode(n);
}
}
return null;
},previousView:function(_13){
for(var n=_13.previousSibling;n;n=n.previousSibling){
if(this.isSwapView(n)){
return _6.byNode(n);
}
}
return null;
},scrollTo:function(to){
if(!this._beingFlipped){
var _14,x;
if(to.x<0){
_14=this.nextView(this.domNode);
x=to.x+this.domNode.offsetWidth;
}else{
_14=this.previousView(this.domNode);
x=to.x-this.domNode.offsetWidth;
}
if(_14){
_14.domNode.style.display="";
_14._beingFlipped=true;
_14.scrollTo({x:x});
_14._beingFlipped=false;
}
}
this.inherited(arguments);
},slideTo:function(to,_15,_16,_17){
if(!this._beingFlipped){
var w=this.domNode.offsetWidth;
var pos=_17||this.getPos();
var _18,_19;
if(pos.x<0){
_18=this.nextView(this.domNode);
if(pos.x<-w/4){
if(_18){
to.x=-w;
_19=0;
}
}else{
if(_18){
_19=w;
}
}
}else{
_18=this.previousView(this.domNode);
if(pos.x>w/4){
if(_18){
to.x=w;
_19=0;
}
}else{
if(_18){
_19=-w;
}
}
}
if(_18){
_18._beingFlipped=true;
_18.slideTo({x:_19},_15,_16);
_18._beingFlipped=false;
if(_19===0){
dojox.mobile.currentView=_18;
}
_18.domNode._isShowing=(_18&&_19===0);
}
this.domNode._isShowing=!(_18&&_19===0);
}
this.inherited(arguments);
},onFlickAnimationEnd:function(e){
if(e&&e.animationName&&e.animationName!=="scrollableViewScroll2"){
return;
}
var _1a=this.domNode.parentNode.childNodes;
for(var i=0;i<_1a.length;i++){
var c=_1a[i];
if(this.isSwapView(c)){
_5.remove(c,"mblIn");
if(!c._isShowing){
c.style.display="none";
}
}
}
this.inherited(arguments);
if(this.getShowingView()===this){
_2.publish("/dojox/mobile/viewChanged",[this]);
this.containerNode.style.paddingTop="";
}
}});
});
//>>built
define("dojox/mobile/_ScrollableMixin",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/dom","dojo/dom-class","dijit/registry","./scrollable"],function(_1,_2,_3,_4,_5,_6,_7,_8){
var _9=_2("dojox.mobile._ScrollableMixin",null,{fixedHeader:"",fixedFooter:"",scrollableParams:null,allowNestedScrolls:true,constructor:function(){
this.scrollableParams={};
},destroy:function(){
this.cleanup();
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
var _a;
var _b=this.scrollableParams;
if(this.fixedHeader){
_a=_5.byId(this.fixedHeader);
if(_a.parentNode==this.domNode){
this.isLocalHeader=true;
}
_b.fixedHeaderHeight=_a.offsetHeight;
}
if(this.fixedFooter){
_a=_5.byId(this.fixedFooter);
if(_a.parentNode==this.domNode){
this.isLocalFooter=true;
_a.style.bottom="0px";
}
_b.fixedFooterHeight=_a.offsetHeight;
}
this.init(_b);
if(this.allowNestedScrolls){
for(var p=this.getParent();p;p=p.getParent()){
if(p&&p.scrollableParams){
this.isNested=true;
this.dirLock=true;
p.dirLock=true;
break;
}
}
}
this.inherited(arguments);
},findAppBars:function(){
var i,_c,c;
for(i=0,_c=_4.body().childNodes.length;i<_c;i++){
c=_4.body().childNodes[i];
this.checkFixedBar(c,false);
}
if(this.domNode.parentNode){
for(i=0,_c=this.domNode.parentNode.childNodes.length;i<_c;i++){
c=this.domNode.parentNode.childNodes[i];
this.checkFixedBar(c,false);
}
}
this.fixedFooterHeight=this.fixedFooter?this.fixedFooter.offsetHeight:0;
},checkFixedBar:function(_d,_e){
if(_d.nodeType===1){
var _f=_d.getAttribute("fixed")||(_7.byNode(_d)&&_7.byNode(_d).fixed);
if(_f==="top"){
_6.add(_d,"mblFixedHeaderBar");
if(_e){
_d.style.top="0px";
this.fixedHeader=_d;
}
return _f;
}else{
if(_f==="bottom"){
_6.add(_d,"mblFixedBottomBar");
this.fixedFooter=_d;
return _f;
}
}
}
return null;
}});
_3.extend(_9,new _8(_1,dojox));
return _9;
});
//>>built
define("dojox/mobile/scrollable",["dojo/_base/kernel","dojo/_base/connect","dojo/_base/event","dojo/_base/lang","dojo/_base/window","dojo/dom-class","dojo/dom-construct","dojo/dom-style","./sniff"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var dm=_4.getObject("dojox.mobile",true);
var _a=function(_b,_c){
this.fixedHeaderHeight=0;
this.fixedFooterHeight=0;
this.isLocalFooter=false;
this.scrollBar=true;
this.scrollDir="v";
this.weight=0.6;
this.fadeScrollBar=true;
this.disableFlashScrollBar=false;
this.threshold=4;
this.constraint=true;
this.touchNode=null;
this.isNested=false;
this.dirLock=false;
this.height="";
this.androidWorkaroud=true;
this.init=function(_d){
if(_d){
for(var p in _d){
if(_d.hasOwnProperty(p)){
this[p]=((p=="domNode"||p=="containerNode")&&typeof _d[p]=="string")?_5.doc.getElementById(_d[p]):_d[p];
}
}
}
this.touchNode=this.touchNode||this.containerNode;
this._v=(this.scrollDir.indexOf("v")!=-1);
this._h=(this.scrollDir.indexOf("h")!=-1);
this._f=(this.scrollDir=="f");
this._ch=[];
//Case 4344 - support multiple types of input in IE
var touchStart = dojo.isIE == 10 ? "MSPointerDown" : (_9('touch') ? "touchstart" : "onmousedown");
this._ch.push(_2.connect(this.touchNode,touchStart,this,"onTouchStart"));
if(_9("webkit") && window.useFXAnimations !== true){
//Case 4346 - to support dragging with finger on windows 8
if (!_9('touch')) {
    this._ch.push(_2.connect(this.touchNode, "touchstart", this, "onTouchStart"));
}
this._ch.push(_2.connect(this.domNode,"webkitAnimationEnd",this,"onFlickAnimationEnd"));
this._ch.push(_2.connect(this.domNode,"webkitAnimationStart",this,"onFlickAnimationStart"));
this._aw=this.androidWorkaroud&&_9("android")>=2.2&&_9("android")<3;
if(this._aw){
this._ch.push(_2.connect(_5.global,"onresize",this,"onScreenSizeChanged"));
this._ch.push(_2.connect(_5.global,"onfocus",this,function(e){
if(this.containerNode.style.webkitTransform){
this.stopAnimation();
this.toTopLeft();
}
}));
this._sz=this.getScreenSize();
}
for(var i=0;i<3;i++){
this.setKeyframes(null,null,i);
}
}
if(_9("iphone")){
_8.set(this.containerNode,"webkitTransform","translate3d(0,0,0)");
}
this._speed={x:0,y:0};
this._appFooterHeight=0;
if(this.isTopLevel()&&!this.noResize){
this.resize();
}
var _e=this;
setTimeout(function(){
_e.flashScrollBar();
},600);
};
this.isTopLevel=function(){
return true;
};
this.cleanup=function(){
if(this._ch){
for(var i=0;i<this._ch.length;i++){
_2.disconnect(this._ch[i]);
}
this._ch=null;
}
};
this.findDisp=function(_f){
if(!_f.parentNode){
return null;
}
var _10=_f.parentNode.childNodes;
for(var i=0;i<_10.length;i++){
var n=_10[i];
if(n.nodeType===1&&_6.contains(n,"mblView")&&n.style.display!=="none"){
return n;
}
}
return _f;
};
this.getScreenSize=function(){
return {h:_5.global.innerHeight||_5.doc.documentElement.clientHeight||_5.doc.documentElement.offsetHeight,w:_5.global.innerWidth||_5.doc.documentElement.clientWidth||_5.doc.documentElement.offsetWidth};
};
this.isKeyboardShown=function(e){
if(!this._sz){
return false;
}
var sz=this.getScreenSize();
return (sz.w*sz.h)/(this._sz.w*this._sz.h)<0.8;
};
this.disableScroll=function(v){
if(this.disableTouchScroll===v||this.domNode.style.display==="none"){
return;
}
this.disableTouchScroll=v;
this.scrollBar=!v;
dm.disableHideAddressBar=dm.disableResizeAll=v;
var of=v?"visible":"hidden";
_8.set(this.domNode,"overflow",of);
_8.set(_5.doc.documentElement,"overflow",of);
_8.set(_5.body(),"overflow",of);
var c=this.containerNode;
if(v){
if(!c.style.webkitTransform){
this.stopAnimation();
this.toTopLeft();
}
var mt=parseInt(c.style.marginTop)||0;
var h=c.offsetHeight+mt+this.fixedFooterHeight-this._appFooterHeight;
_8.set(this.domNode,"height",h+"px");
this._cPos={x:parseInt(c.style.left)||0,y:parseInt(c.style.top)||0};
_8.set(c,{top:"0px",left:"0px"});
var a=_5.doc.activeElement;
if(a){
var at=0;
for(var n=a;n.tagName!="BODY";n=n.offsetParent){
at+=n.offsetTop;
}
var st=at+a.clientHeight+10-this.getScreenSize().h;
if(st>0){
_5.body().scrollTop=st;
}
}
}else{
if(this._cPos){
_8.set(c,{top:this._cPos.y+"px",left:this._cPos.x+"px"});
this._cPos=null;
}
var _11=this.domNode.getElementsByTagName("*");
for(var i=0;i<_11.length;i++){
_11[i].blur&&_11[i].blur();
}
dm.resizeAll&&dm.resizeAll();
}
};
this.onScreenSizeChanged=function(e){
var sz=this.getScreenSize();
if(sz.w*sz.h>this._sz.w*this._sz.h){
this._sz=sz;
}
this.disableScroll(this.isKeyboardShown());
};
this.toTransform=function(e){
var c=this.containerNode;
if(c.offsetTop===0&&c.offsetLeft===0||!c._webkitTransform){
return;
}
_8.set(c,{webkitTransform:c._webkitTransform,top:"0px",left:"0px"});
c._webkitTransform=null;
};
this.toTopLeft=function(){
var c=this.containerNode;
if(!c.style.webkitTransform){
return;
}
c._webkitTransform=c.style.webkitTransform;
var pos=this.getPos();
_8.set(c,{webkitTransform:"",top:pos.y+"px",left:pos.x+"px"});
};
this.resize=function(e){
this._appFooterHeight=(this.fixedFooterHeight&&!this.isLocalFooter)?this.fixedFooterHeight:0;
if(this.isLocalHeader){
this.containerNode.style.marginTop=this.fixedHeaderHeight+"px";
}
var top=0;
for(var n=this.domNode;n&&n.tagName!="BODY";n=n.offsetParent){
n=this.findDisp(n);
if(!n){
break;
}
top+=n.offsetTop;
}
var h,_12=this.getScreenSize().h,dh=_12-top-this._appFooterHeight;
if(this.height==="inherit"){
if(this.domNode.offsetParent){
h=this.domNode.offsetParent.offsetHeight+"px";
}
}else{
if(this.height==="auto"){
var _13=this.domNode.offsetParent;
if(_13){
this.domNode.style.height="0px";
var _14=_13.getBoundingClientRect(),_15=this.domNode.getBoundingClientRect(),_16=_14.bottom-this._appFooterHeight;
if(_15.bottom>=_16){
dh=_12-(_15.top-_14.top)-this._appFooterHeight;
}else{
dh=_16-_15.bottom;
}
}
var _17=Math.max(this.domNode.scrollHeight,this.containerNode.scrollHeight);
h=(_17?Math.min(_17,dh):dh)+"px";
}else{
if(this.height){
h=this.height;
}
}
}
if(!h){
h=dh+"px";
}
if(h && h.charAt && h.charAt(0)!=="-"&&h!=="default"){ //changed by Tim to prevent bad value for h
this.domNode.style.height=h;
}
this.onTouchEnd();
};
this.onFlickAnimationStart=function(e){
_3.stop(e);
};
this.onFlickAnimationEnd=function(e){
var an=e&&e.animationName;
if(an&&an.indexOf("scrollableViewScroll2")===-1){
if(an.indexOf("scrollableViewScroll0")!==-1){
_6.remove(this._scrollBarNodeV,"mblScrollableScrollTo0");
}else{
if(an.indexOf("scrollableViewScroll1")!==-1){
_6.remove(this._scrollBarNodeH,"mblScrollableScrollTo1");
}else{
if(this._scrollBarNodeV){
this._scrollBarNodeV.className="";
}
if(this._scrollBarNodeH){
this._scrollBarNodeH.className="";
}
}
}
return;
}
if(e&&e.srcElement){
_3.stop(e);
}
this.stopAnimation();
if(this._bounce){
var _18=this;
var _19=_18._bounce;
setTimeout(function(){
_18.slideTo(_19,0.3,"ease-out");
},0);
_18._bounce=undefined;
}else{
this.hideScrollBar();
this.removeCover();
if(this._aw){
this.toTopLeft();
}
}
};
this.isFormElement=function(_1a){
if(_1a&&_1a.nodeType!==1){
_1a=_1a.parentNode;
}
if(!_1a||_1a.nodeType!==1){
return false;
}
var t=_1a.tagName;
return (t==="SELECT"||t==="INPUT"||t==="TEXTAREA"||t==="BUTTON");
};
this.onTouchStart=function(e){
if (e.button == 2 || window.scrollingDisabled) { //added by Tim - case 2329 - so right click can't be used for dragging
return;
}
if(this.disableTouchScroll){
return;
}
if(this._conn&&(new Date()).getTime()-this.startTime<500){
return;
}
if(!this._conn){
this._conn=[];
//Case 4344 - support multiple types of input in IE
var touchMove = dojo.isIE == 10 ? "MSPointerMove" : (_9('touch') ? "touchmove" : "onmousemove");
var touchEnd = dojo.isIE == 10 ? "MSPointerUp" : (_9('touch') ? "touchend" : "onmouseup");
this._conn.push(_2.connect(_5.doc,touchMove,this,"onTouchMove"));
this._conn.push(_2.connect(_5.doc,touchEnd,this,"onTouchEnd"));
//Case 4346 - to support dragging with finger on windows 8
if (_9("webkit") && window.useFXAnimations !== true && !_9('touch')) {
    this._conn.push(_2.connect(_5.doc, "touchmove", this, "onTouchMove"));
    this._conn.push(_2.connect(_5.doc, "touchend", this, "onTouchEnd"));
}
}
this._aborted=false;
if(_6.contains(this.containerNode,"mblScrollableScrollTo2")){
this.abort();
}else{
if(this._scrollBarNodeV){
this._scrollBarNodeV.className="";
}
if(this._scrollBarNodeH){
this._scrollBarNodeH.className="";
}
}
if(this._aw){
this.toTransform(e);
}
this.touchStartX=e.touches?e.touches[0].pageX:e.clientX;
this.touchStartY=e.touches?e.touches[0].pageY:e.clientY;
this.startTime=(new Date()).getTime();
this.startPos=this.getPos();
this._dim=this.getDim();
this._time=[0];
this._posX=[this.touchStartX];
this._posY=[this.touchStartY];
this._locked=false;
if(!this.isFormElement(e.target)&&!this.isNested && !(window.navigator.msPointerEnabled)){ //Added by Tim - last part was needed because event wasn't bubbling on ie 10 on tablet
//if (dojo.isChrome) {
    dojo.publish("/environment/squelchedTouchStart", e); //Added by Tim - on chrome, the event.stop below will prevent touchstart event from reaching document, where it is used in Reach File Services to open context menu
//}
_3.stop(e);
}
};
this.onTouchMove=function(e){
e.preventDefault(); //4962
if(this._locked){
return;
}
var x=e.touches?e.touches[0].pageX:e.clientX;
var y=e.touches?e.touches[0].pageY:e.clientY;
var dx=x-this.touchStartX;
var dy=y-this.touchStartY;
var to={x:this.startPos.x+dx,y:this.startPos.y+dy};
var dim=this._dim;
dx=Math.abs(dx);
dy=Math.abs(dy);
if(this._time.length==1){
if(this.dirLock){
if(this._v&&!this._h&&dx>=this.threshold&&dx>=dy||(this._h||this._f)&&!this._v&&dy>=this.threshold&&dy>=dx){
this._locked=true;
return;
}
}
if(this._v&&Math.abs(dy)<this.threshold||(this._h||this._f)&&Math.abs(dx)<this.threshold){
return;
}
this.addCover();
this.showScrollBar();
}
var _1b=this.weight;
if(this._v&&this.constraint){
if(to.y>0){
to.y=Math.round(to.y*_1b);
}else{
if(to.y<-dim.o.h){
if(dim.c.h<dim.d.h){
to.y=Math.round(to.y*_1b);
}else{
to.y=-dim.o.h-Math.round((-dim.o.h-to.y)*_1b);
}
}
}
}
if((this._h||this._f)&&this.constraint){
if(to.x>0){
to.x=Math.round(to.x*_1b);
}else{
if(to.x<-dim.o.w){
if(dim.c.w<dim.d.w){
to.x=Math.round(to.x*_1b);
}else{
to.x=-dim.o.w-Math.round((-dim.o.w-to.x)*_1b);
}
}
}
}
this.scrollTo(to);
var max=10;
var n=this._time.length;
if(n>=2){
var d0,d1;
if(this._v&&!this._h){
d0=this._posY[n-1]-this._posY[n-2];
d1=y-this._posY[n-1];
}else{
if(!this._v&&this._h){
d0=this._posX[n-1]-this._posX[n-2];
d1=x-this._posX[n-1];
}
}
if(d0*d1<0){
this._time=[this._time[n-1]];
this._posX=[this._posX[n-1]];
this._posY=[this._posY[n-1]];
n=1;
}
}
if(n==max){
this._time.shift();
this._posX.shift();
this._posY.shift();
}
this._time.push((new Date()).getTime()-this.startTime);
this._posX.push(x);
this._posY.push(y);
};
this.onTouchEnd=function(e){
if(this._locked){
return;
}
var _1c=this._speed={x:0,y:0};
var dim=this._dim;
var pos=this.getPos();
var to={};
if(e){
if(!this._conn){
return;
}
for(var i=0;i<this._conn.length;i++){
_2.disconnect(this._conn[i]);
}
this._conn=null;
var n=this._time.length;
var _1d=false;
if(!this._aborted){
if(n<=1){
_1d=true;
}else{
if(n==2&&Math.abs(this._posY[1]-this._posY[0])<4&&_9("touch")){
_1d=true;
}
}
}
var _1e=this.isFormElement(e.target);
if(_1d&&!_1e){
this.hideScrollBar();
this.removeCover();
if(_9("touch")){
var _1f=e.target;
if(_1f.nodeType!=1){
_1f=_1f.parentNode;
}
var ev=_5.doc.createEvent("MouseEvents");
ev.initMouseEvent("click",true,true,_5.global,1,e.screenX,e.screenY,e.clientX,e.clientY);
setTimeout(function(){
_1f.dispatchEvent(ev);
},0);
}
return;
}else{
if(this._aw&&_1d&&_1e){
this.hideScrollBar();
this.toTopLeft();
return;
}
}
_1c=this._speed=this.getSpeed();
}else{
if(pos.x==0&&pos.y==0){
return;
}
dim=this.getDim();
}
if(this._v){
to.y=pos.y+_1c.y;
}
if(this._h||this._f){
to.x=pos.x+_1c.x;
}
this.adjustDestination(to,pos);
if(this.scrollDir=="v"&&dim.c.h<dim.d.h){
this.slideTo({y:0},0.3,"ease-out");
return;
}else{
if(this.scrollDir=="h"&&dim.c.w<dim.d.w){
this.slideTo({x:0},0.3,"ease-out");
return;
}else{
if(this._v&&this._h&&dim.c.h<dim.d.h&&dim.c.w<dim.d.w){
this.slideTo({x:0,y:0},0.3,"ease-out");
return;
}
}
}
var _20,_21="ease-out";
var _22={};
if(this._v&&this.constraint){
if(to.y>0){
if(pos.y>0){
_20=0.3;
to.y=0;
}else{
to.y=Math.min(to.y,20);
_21="linear";
_22.y=0;
}
}else{
if(-_1c.y>dim.o.h-(-pos.y)){
if(pos.y<-dim.o.h){
_20=0.3;
to.y=dim.c.h<=dim.d.h?0:-dim.o.h;
}else{
to.y=Math.max(to.y,-dim.o.h-20);
_21="linear";
_22.y=-dim.o.h;
}
}
}
}
if((this._h||this._f)&&this.constraint){
if(to.x>0){
if(pos.x>0){
_20=0.3;
to.x=0;
}else{
to.x=Math.min(to.x,20);
_21="linear";
_22.x=0;
}
}else{
if(-_1c.x>dim.o.w-(-pos.x)){
if(pos.x<-dim.o.w){
_20=0.3;
to.x=dim.c.w<=dim.d.w?0:-dim.o.w;
}else{
to.x=Math.max(to.x,-dim.o.w-20);
_21="linear";
_22.x=-dim.o.w;
}
}
}
}
this._bounce=(_22.x!==undefined||_22.y!==undefined)?_22:undefined;
if(_20===undefined){
var _23,_24;
if(this._v&&this._h){
_24=Math.sqrt(_1c.x+_1c.x+_1c.y*_1c.y);
_23=Math.sqrt(Math.pow(to.y-pos.y,2)+Math.pow(to.x-pos.x,2));
}else{
if(this._v){
_24=_1c.y;
_23=to.y-pos.y;
}else{
if(this._h){
_24=_1c.x;
_23=to.x-pos.x;
}
}
}
if(_23===0&&!e){
return;
}
_20=_24!==0?Math.abs(_23/_24):0.01;
}
this.slideTo(to,_20,_21);
};
this.adjustDestination=function(to,pos){
};
this.abort=function(){
this.scrollTo(this.getPos());
this.stopAnimation();
this._aborted=true;
};
this.stopAnimation=function(){
_6.remove(this.containerNode,"mblScrollableScrollTo2");
if(_9("android")){
_8.set(this.containerNode,"webkitAnimationDuration","0s");
}
if(this._scrollBarV){
this._scrollBarV.className="";
}
if(this._scrollBarH){
this._scrollBarH.className="";
}
};
this.getSpeed=function(){
var x=0,y=0,n=this._time.length;
if(n>=2&&(new Date()).getTime()-this.startTime-this._time[n-1]<500){
var dy=this._posY[n-(n>3?2:1)]-this._posY[(n-6)>=0?n-6:0];
var dx=this._posX[n-(n>3?2:1)]-this._posX[(n-6)>=0?n-6:0];
var dt=this._time[n-(n>3?2:1)]-this._time[(n-6)>=0?n-6:0];
y=this.calcSpeed(dy,dt);
x=this.calcSpeed(dx,dt);
}
return {x:x,y:y};
};
this.calcSpeed=function(d,t){
return Math.round(d/t*100)*4;
};
this.scrollTo=function(to,_25,_26){
var s=(_26||this.containerNode).style;
if(_9("webkit") && window.useFXAnimations !== true){
s.webkitTransform=this.makeTranslateStr(to);
}else{
if(this._v){
s.top=to.y+"px";
}
if(this._h||this._f){
s.left=to.x+"px";
}
}
 if (window.publishScrollData) { //added by Tim - need to know scroll amout to load images in app selector
    dojo.publish("/environment/scrollChanged", [to.y]); 
}
if(!_25){
this.scrollScrollBarTo(this.calcScrollBarPos(to));
}
};
this.slideTo=function(to,_27,_28){
this._runSlideAnimation(this.getPos(),to,_27,_28,this.containerNode,2);
this.slideScrollBarTo(to,_27,_28);
};
this.makeTranslateStr=function(to){
var y=this._v&&typeof to.y=="number"?to.y+"px":"0px";
var x=(this._h||this._f)&&typeof to.x=="number"?to.x+"px":"0px";
return dm.hasTranslate3d?"translate3d("+x+","+y+",0px)":"translate("+x+","+y+")";
};
this.getPos=function(){
if(_9("webkit") && window.useFXAnimations !== true){
var m=_5.doc.defaultView.getComputedStyle(this.containerNode,"")["-webkit-transform"];
if(m&&m.indexOf("matrix")===0){
var arr=m.split(/[,\s\)]+/);
return {y:arr[5]-0,x:arr[4]-0};
}
return {x:0,y:0};
}else{
var y=parseInt(this.containerNode.style.top)||0;
return {y:y,x:this.containerNode.offsetLeft};
}
};
this.getDim=function(){
var d={};
d.c={h:this.containerNode.offsetHeight,w:this.containerNode.offsetWidth};
d.v={h:this.domNode.offsetHeight+this._appFooterHeight,w:this.domNode.offsetWidth};
d.d={h:d.v.h-this.fixedHeaderHeight-this.fixedFooterHeight,w:d.v.w};
d.o={h:d.c.h-d.v.h+this.fixedHeaderHeight+this.fixedFooterHeight,w:d.c.w-d.v.w};
return d;
};
this.showScrollBar=function(){
if(!this.scrollBar){
return;
}
var dim=this._dim;
if(!dim || (this.scrollDir=="v"&&dim.c.h<=dim.d.h)){ //changed by Tim - dim is undefined sometimes on ipad ios 7
return;
}
if(this.scrollDir=="h"&&dim.c.w<=dim.d.w){
return;
}
if(this._v&&this._h&&dim.c.h<=dim.d.h&&dim.c.w<=dim.d.w){
return;
}
var _29=function(_2a,dir){
var bar=_2a["_scrollBarNode"+dir];
if(!bar){
var _2b=_7.create("div",null,_2a.domNode);
var _2c={position:"absolute",overflow:"hidden"};
if(dir=="V"){
_2c.right="2px";
_2c.width="5px";
}else{
_2c.bottom=(_2a.isLocalFooter?_2a.fixedFooterHeight:0)+2+"px";
_2c.height="5px";
}
_8.set(_2b,_2c);
_2b.className="mblScrollBarWrapper";
_2a["_scrollBarWrapper"+dir]=_2b;
bar=_7.create("div",null,_2b);
_8.set(bar,{opacity:0.6,position:"absolute",backgroundColor:"#606060",fontSize:"1px",webkitBorderRadius:"2px",MozBorderRadius:"2px",webkitTransformOrigin:"0 0",zIndex:2147483647});
_8.set(bar,dir=="V"?{width:"5px"}:{height:"5px"});
_2a["_scrollBarNode"+dir]=bar;
_2.connect(bar, "mousedown", _2a, "onBarTouchStart");
}
return bar;
};
if(this._v&&!this._scrollBarV){
this._scrollBarV=_29(this,"V");
}
if(this._h&&!this._scrollBarH){
this._scrollBarH=_29(this,"H");
}
this.resetScrollBar();
};

/* 5837 - Following methods added by Tim to allow scrolling by dragging the indicator */
this.onBarTouchStart = function(evt) {
    this.barTouchStart = evt.clientY;
    this.startPos = this.getPos();
    this.barMoveEvent = _2.connect(_5.doc, "mousemove", this, "onBarTouchMove");
    this.barStopEvent = _2.connect(_5.doc, "mouseup", this, "onBarTouchEnd");            
}

this.onBarTouchMove = function(evt) {
    var dim = this._dim;
    var dy = -1 * (evt.clientY - this.barTouchStart);
    var to = {x: 0, y: this.startPos.y + dy};
    if (to.y < 0 && to.y >= -dim.o.h) {
        this.scrollTo({x:0, y: to.y});
    }            
}

this.onBarTouchEnd = function(evt) {
    _2.disconnect(this.barMoveEvent);
    _2.disconnect(this.barStopEvent);
}
        
this.hideScrollBar=function(){
if (window.disableScrollBarFade) return; //added by Tim
var _2d;
if(this.fadeScrollBar&&_9("webkit") && window.useFXAnimations !== true){
if(!dm._fadeRule){
var _2e=_7.create("style",null,_5.doc.getElementsByTagName("head")[0]);
_2e.textContent=".mblScrollableFadeScrollBar{"+"  -webkit-animation-duration: 1s;"+"  -webkit-animation-name: scrollableViewFadeScrollBar;}"+"@-webkit-keyframes scrollableViewFadeScrollBar{"+"  from { opacity: 0.6; }"+"  to { opacity: 0; }}";
dm._fadeRule=_2e.sheet.cssRules[1];
}
_2d=dm._fadeRule;
}
if(!this.scrollBar){
return;
}
var f=function(bar,_2f){
_8.set(bar,{opacity:0,webkitAnimationDuration:""});
if(_2f._aw){
bar.style.webkitTransform="";
}else{
if (!window.disableScrollBarFade) //added by Tim, b/c i could not figure out how to override with css or to disable the fade
bar.className="mblScrollableFadeScrollBar";
}
};
if(this._scrollBarV){
f(this._scrollBarV,this);
this._scrollBarV=null;
}
if(this._scrollBarH){
f(this._scrollBarH,this);
this._scrollBarH=null;
}
};
this.calcScrollBarPos=function(to){
var pos={};
var dim=this._dim;
var f=function(_30,_31,t,d,c){
var y=Math.round((d-_31-8)/(d-c)*t);
if(y<-_31+5){
y=-_31+5;
}
if(y>_30-5){
y=_30-5;
}
return y;
};
if(typeof to.y=="number"&&this._scrollBarV){
pos.y=f(this._scrollBarWrapperV.offsetHeight,this._scrollBarV.offsetHeight,to.y,dim.d.h,dim.c.h);
}
if(typeof to.x=="number"&&this._scrollBarH){
pos.x=f(this._scrollBarWrapperH.offsetWidth,this._scrollBarH.offsetWidth,to.x,dim.d.w,dim.c.w);
}
return pos;
};
this.scrollScrollBarTo=function(to){
if(!this.scrollBar){
return;
}
if(this._v&&this._scrollBarV&&typeof to.y=="number"){
if(_9("webkit") && window.useFXAnimations !== true){
this._scrollBarV.style.webkitTransform=this.makeTranslateStr({y:to.y});
}else{
this._scrollBarV.style.top=to.y+"px";
}
}
if(this._h&&this._scrollBarH&&typeof to.x=="number"){
if(_9("webkit") && window.useFXAnimations !== true){
this._scrollBarH.style.webkitTransform=this.makeTranslateStr({x:to.x});
}else{
this._scrollBarH.style.left=to.x+"px";
}
}
};
this.slideScrollBarTo=function(to,_32,_33){
if(!this.scrollBar){
return;
}
var _34=this.calcScrollBarPos(this.getPos());
var _35=this.calcScrollBarPos(to);
if(this._v&&this._scrollBarV){
this._runSlideAnimation({y:_34.y},{y:_35.y},_32,_33,this._scrollBarV,0);
}
if(this._h&&this._scrollBarH){
this._runSlideAnimation({x:_34.x},{x:_35.x},_32,_33,this._scrollBarH,1);
}
};
this._runSlideAnimation=function(_36,to,_37,_38,_39,idx){
if(_9("webkit") && window.useFXAnimations !== true){
this.setKeyframes(_36,to,idx);
_8.set(_39,{webkitAnimationDuration:_37+"s",webkitAnimationTimingFunction:_38});
_6.add(_39,"mblScrollableScrollTo"+idx);
if(idx==2){
this.scrollTo(to,true,_39);
}else{
this.scrollScrollBarTo(to);
}
}else{
if(_b.fx&&_b.fx.easing&&_37){
var s=_b.fx.slideTo({node:_39,duration:_37*1000,left:to.x,top:to.y,easing:(_38=="ease-out")?_b.fx.easing.quadOut:_b.fx.easing.linear}).play();
if(idx==2){
_2.connect(s,"onEnd",this,"onFlickAnimationEnd");
}
}else{
if(idx==2){
this.scrollTo(to,false,_39);
this.onFlickAnimationEnd();
}else{
this.scrollScrollBarTo(to);
}
}
}
};
this.resetScrollBar=function(){
var f=function(_3a,bar,d,c,hd,v){
if(!bar){
return;
}
var _3b={};
_3b[v?"top":"left"]=hd+4+"px";
var t=(d-8)<=0?1:d-8;
_3b[v?"height":"width"]=t+"px";
_8.set(_3a,_3b);
var l=Math.round(d*d/c);
l=Math.min(Math.max(l-8,5),t);
bar.style[v?"height":"width"]=l+"px";
_8.set(bar,{"opacity":0.6});
};
var dim=this.getDim();
f(this._scrollBarWrapperV,this._scrollBarV,dim.d.h,dim.c.h,this.fixedHeaderHeight,true);
f(this._scrollBarWrapperH,this._scrollBarH,dim.d.w,dim.c.w,0);
this.createMask();
};
this.createMask=function(){
if(!_9("webkit") && window.useFXAnimations !== true){
return;
}
var ctx;
if(this._scrollBarWrapperV){
var h=this._scrollBarWrapperV.offsetHeight;
ctx=_5.doc.getCSSCanvasContext("2d","scrollBarMaskV",5,h);
ctx.fillStyle="rgba(0,0,0,0.5)";
ctx.fillRect(1,0,3,2);
ctx.fillRect(0,1,5,1);
ctx.fillRect(0,h-2,5,1);
ctx.fillRect(1,h-1,3,2);
ctx.fillStyle="rgb(0,0,0)";
ctx.fillRect(0,2,5,h-4);
this._scrollBarWrapperV.style.webkitMaskImage="-webkit-canvas(scrollBarMaskV)";
}
if(this._scrollBarWrapperH){
var w=this._scrollBarWrapperH.offsetWidth;
ctx=_5.doc.getCSSCanvasContext("2d","scrollBarMaskH",w,5);
ctx.fillStyle="rgba(0,0,0,0.5)";
ctx.fillRect(0,1,2,3);
ctx.fillRect(1,0,1,5);
ctx.fillRect(w-2,0,1,5);
ctx.fillRect(w-1,1,2,3);
ctx.fillStyle="rgb(0,0,0)";
ctx.fillRect(2,0,w-4,5);
this._scrollBarWrapperH.style.webkitMaskImage="-webkit-canvas(scrollBarMaskH)";
}
};
this.flashScrollBar=function(){
if(this.disableFlashScrollBar||!this.domNode){
return;
}
this._dim=this.getDim();
if(this._dim.d.h<=0){
return;
}
this.showScrollBar();
var _3c=this;
setTimeout(function(){
_3c.hideScrollBar();
},300);
};
this.addCover=function(){
if(!_9("touch")&&!this.noCover){
var coverContext = dojo.isIE || navigator.userAgent.indexOf("Trident/7") !== -1 ? this : window; //9763 - 7733 caused regression in ie, so we must use 'this'
if(!coverContext._cover){
coverContext._cover=_7.create("div",null,_5.doc.body); //7733 - fixed by Tim - switch to a single cover for all SwapViews, due to unreliability of onFlickAnimationEnd event
_8.set(coverContext._cover,{backgroundColor:"#ffff00",opacity:0,position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",zIndex:2147483647});
coverContext._cover.style.opacity = 0; //added by Tim - above line to set opacity doesn't work in IE 10, so I do it here instead
this._ch.push(_2.connect(coverContext._cover,_9("touch")?"touchstart":"onmousedown",this,"onTouchEnd"));
}else{
coverContext._cover.style.display="";
}
this.setSelectable(coverContext._cover,false);
this.setSelectable(this.domNode,false);
}
};
this.removeCover=function(){
var coverContext = dojo.isIE || navigator.userAgent.indexOf("Trident/7") !== -1 ? this : window; //9763 - 7733 caused regression in ie, so we must use 'this'
if(!_9("touch")&&coverContext._cover){
coverContext._cover.style.display="none";
this.setSelectable(coverContext._cover,true);
this.setSelectable(this.domNode,true);
}
};
this.setKeyframes=function(_3d,to,idx){
if(!dm._rule){
dm._rule=[];
}
if(!dm._rule[idx]){
var _3e=_7.create("style",null,_5.doc.getElementsByTagName("head")[0]);
_3e.textContent=".mblScrollableScrollTo"+idx+"{-webkit-animation-name: scrollableViewScroll"+idx+";}"+"@-webkit-keyframes scrollableViewScroll"+idx+"{}";
dm._rule[idx]=_3e.sheet.cssRules[1];
}
var _3f=dm._rule[idx];
if(_3f){
if(_3d){
_3f.deleteRule("from");
_3f.insertRule("from { -webkit-transform: "+this.makeTranslateStr(_3d)+"; }");
}
if(to){
if(to.x===undefined){
to.x=_3d.x;
}
if(to.y===undefined){
to.y=_3d.y;
}
_3f.deleteRule("to");
_3f.insertRule("to { -webkit-transform: "+this.makeTranslateStr(to)+"; }");
}
}
};
this.setSelectable=function(_40,_41){
_40.style.KhtmlUserSelect=_41?"auto":"none";
_40.style.MozUserSelect=_41?"":"none";
_40.onselectstart=_41?null:function(){
return false;
};
if(_9("ie")){
_40.unselectable=_41?"":"on";
var _42=_40.getElementsByTagName("*");
for(var i=0;i<_42.length;i++){
_42[i].unselectable=_41?"":"on";
}
}
};
if(_9("webkit") && window.useFXAnimations !== true){
var _43=_5.doc.createElement("div");
_43.style.webkitTransform="translate3d(0px,1px,0px)";
_5.doc.documentElement.appendChild(_43);
var v=_5.doc.defaultView.getComputedStyle(_43,"")["-webkit-transform"];
dm.hasTranslate3d=v&&v.indexOf("matrix")===0;
_5.doc.documentElement.removeChild(_43);
}
};
dm.scrollable=_a;
return _a;
});
//>>built
define("dijit/_base/manager",["dojo/_base/array","dojo/_base/config","../registry",".."],function(_1,_2,_3,_4){
_1.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(_5){
_4[_5]=_3[_5];
});
_4.defaultDuration=_2["defaultDuration"]||200;
return _4;
});
dojo.provide("swdojo1.dojox.fx.explodemove");
dojo.require("dojo.fx");
dojo.mixin(dojox.fx,{explodemove:function(args){var start=(args.node=dojo.byId(args.node));
var endNode=(args.end=dojo.byId(args.end));
var startCoords=args.startCoords?args.startCoords:dojo.coords(start,true);
var outline=dojo.doc.createElement("div");
if(start.explodeClassName){outline.className=start.explodeClassName
}else{with(outline.style){position="absolute";
border="1px solid #424242";
MozBorderRadius="5px";
var backgroundStyle=dojo.style(start,"backgroundColor");
backgroundColor=backgroundStyle?backgroundStyle.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
zIndex=202
}}args.node=outline;
dojo.body().appendChild(outline);
var endCoords=args.endCoords?args.endCoords:dojo.coords(endNode,true);
var props={opacity:args.opacProps?args.opacProps:{start:0.5,end:1},height:{start:startCoords.h,end:endCoords.h},width:{start:startCoords.w,end:endCoords.w},top:{start:startCoords.y,end:endCoords.y},left:{start:startCoords.x,end:endCoords.x}};
var anim=new dojo.animateProperty(dojo.mixin({properties:props},args));
dojo.connect(anim,"beforeBegin",function(){dojo.style(outline,"dislay","block")
});
dojo.connect(anim,"onEnd",function(){if(endNode){dojo.style(endNode,"display","block")
}outline.parentNode.removeChild(outline)
});
return anim
}});