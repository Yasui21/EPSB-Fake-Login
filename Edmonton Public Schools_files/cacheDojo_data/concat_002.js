/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/lang","./_base/xhr"],function(_1,_2,_3,_4,_5){
var _6=_1.i18n={},_7=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_8=function(_9,_a,_b,_c){
for(var _d=[_b+_c],_e=_a.split("-"),_f="",i=0;i<_e.length;i++){
_f+=(_f?"-":"")+_e[i];
if(!_9||_9[_f]){
_d.push(_b+_f+"/"+_c);
}
}
return _d;
},_10={},_11=_1.getL10nName=function(_12,_13,_14){
_14=_14?_14.toLowerCase():_1.locale;
_12="dojo/i18n!"+_12.replace(/\./g,"/");
_13=_13.replace(/\./g,"/");
return (/root/i.test(_14))?(_12+"/nls/"+_13):(_12+"/nls/"+_14+"/"+_13);
},_15=function(_16,_17,_18,_19,_1a,_1b){
_16([_17],function(_1c){
var _1d=_10[_17+"/"]=_5.clone(_1c.root),_1e=_8(!_1c._v1x&&_1c,_1a,_18,_19);
_16(_1e,function(){
for(var i=1;i<_1e.length;i++){
_10[_1e[i]]=_1d=_5.mixin(_5.clone(_1d),arguments[i]);
}
var _1f=_17+"/"+_1a;
_10[_1f]=_1d;
_1b&&_1b(_5.delegate(_1d));
});
});
},_20=function(id,_21){
var _22=_7.exec(id),_23=_22[1];
return /^\./.test(_23)?_21(_23)+"/"+id.substring(_23.length):id;
};
load=function(id,_24,_25){
var _26=_7.exec(id),_27=_26[1]+"/",_28=_26[5]||_26[4],_29=_27+_28,_2a=(_26[5]&&_26[4]),_2b=_2a||_1.locale,_2c=_29+"/"+_2b;
if(_2a){
if(_10[_2c]){
_25(_10[_2c]);
}else{
_15(_24,_29,_27,_28,_2b,_25);
}
return;
}
var _2d=_1.config.extraLocale||[];
_2d=_5.isArray(_2d)?_2d:[_2d];
_2d.push(_2b);
_4.forEach(_2d,function(_2e){
_15(_24,_29,_27,_28,_2e,_2e==_2b&&_25);
});
};
true||_3.add("dojo-v1x-i18n-Api",1);
if(1){
var _2f=new Function("bundle","var __preAmdResult, __amdResult; function define(bundle){__amdResult= bundle;} __preAmdResult= eval(bundle); return [__preAmdResult, __amdResult];"),_30=function(url,_31,_32){
return _31?(/nls\/[^\/]+\/[^\/]+$/.test(url)?_31:{root:_31,_v1x:1}):_32;
},_33=function(_34,_35){
var _36=[];
_1.forEach(_34,function(mid){
var url=_2.toUrl(mid+".js");
if(_10[url]){
_36.push(_10[url]);
}else{
try{
var _37=_2(mid);
if(_37){
_36.push(_37);
return;
}
}
catch(e){
}
_1.xhrGet({url:url,sync:true,load:function(_38){
var _39=_2f(_38);
_36.push(_10[url]=_30(url,_39[0],_39[1]));
},error:function(){
_36.push(_10[url]={});
}});
}
});
_35.apply(null,_36);
};
_6.getLocalization=function(_3a,_3b,_3c){
var _3d,_3e=_11(_3a,_3b,_3c).substring(10);
load(_3e,(1&&!_2.isXdUrl(_2.toUrl(_3e+".js"))?_33:_2),function(_3f){
_3d=_3f;
});
return _3d;
};
_6.normalizeLocale=function(_40){
var _41=_40?_40.toLowerCase():_1.locale;
if(_41=="root"){
_41="ROOT";
}
return _41;
};
}
return _5.mixin(_6,{dynamic:true,normalize:_20,load:load,cache:function(mid,_42){
_10[mid]=_42;
}});
});
//>>built
require({cache:{"url:dijit/form/templates/TextBox.html":"<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n"}});
define("dijit/form/TextBox",["dojo/_base/declare","dojo/dom-construct","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_FormValueWidget","./_TextBoxMixin","dojo/text!./templates/TextBox.html",".."],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=_1([_8,_9],{templateString:_a,_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:_6("ie")?"disabled":"",baseClass:"dijitTextBox",postMixInProperties:function(){
var _d=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((_d=="hidden"||_d=="file")&&this.templateString==this.constructor.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_onInput:function(e){
this.inherited(arguments);
if(this.intermediateChanges){
var _e=this;
setTimeout(function(){
_e._handleOnChange(_e.get("value"),false);
},0);
}
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=_2.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
}
},_setValueAttr:function(_f,_10,_11){
this.inherited(arguments);
this._updatePlaceHolder();
},getDisplayedValue:function(){
_4.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},setDisplayedValue:function(_12){
_4.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_12);
},_onBlur:function(e){
if(this.disabled){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
this.inherited(arguments);
this._updatePlaceHolder();
}});
if(_6("ie")){
_c=_1(_c,{declaredClass:"dijit.form.TextBox",_isTextSelected:function(){
var _13=_7.doc.selection.createRange();
var _14=_13.parentElement();
return _14==this.textbox&&_13.text.length==0;
},postCreate:function(){
this.inherited(arguments);
setTimeout(_5.hitch(this,function(){
try{
var s=_3.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _15=this.domNode.getElementsByTagName("INPUT");
if(_15){
for(var i=0;i<_15.length;i++){
_15[i].style.fontFamily=ff;
}
}
}
}
}
catch(e){
}
}),0);
}});
_b._setSelectionRange=_9._setSelectionRange=function(_16,_17,_18){
if(_16.createTextRange){
var r=_16.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_17);
r.moveEnd("character",_18-_17);
r.select();
}
};
}else{
if(_6("mozilla")){
_c=_1(_c,{declaredClass:"dijit.form.TextBox",_onBlur:function(e){
this.inherited(arguments);
if(this.selectOnClick){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
}});
}else{
_c.prototype.declaredClass="dijit.form.TextBox";
}
}
_5.setObject("dijit.form.TextBox",_c);
return _c;
});
//>>built
define("dijit/form/_FormValueWidget",["dojo/_base/declare","dojo/_base/sniff","./_FormWidget","./_FormValueMixin"],function(_1,_2,_3,_4){
return _1("dijit.form._FormValueWidget",[_3,_4],{_layoutHackIE7:function(){
if(_2("ie")==7){
var _5=this.domNode;
var _6=_5.parentNode;
var _7=_5.firstChild||_5;
var _8=_7.style.filter;
var _9=this;
while(_6&&_6.clientHeight==0){
(function ping(){
var _a=_9.connect(_6,"onscroll",function(){
_9.disconnect(_a);
_7.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_7.style.filter=_8;
},0);
});
})();
_6=_6.parentNode;
}
}
}});
});
//>>built
define("dijit/_Widget",["dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/_base/kernel","dojo/_base/lang","dojo/query","dojo/ready","./registry","./_WidgetBase","./_OnDijitClickMixin","./_FocusMixin","dojo/uacss","./hccss"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){
function _d(){
};
function _e(_f){
return function(obj,_10,_11,_12){
if(obj&&typeof _10=="string"&&obj[_10]==_d){
return obj.on(_10.substring(2).toLowerCase(),_6.hitch(_11,_12));
}
return _f.apply(_3,arguments);
};
};
_1.around(_3,"connect",_e);
if(_5.connect){
_1.around(_5,"connect",_e);
}
var _13=_4("dijit._Widget",[_a,_b,_c],{onClick:_d,onDblClick:_d,onKeyDown:_d,onKeyPress:_d,onKeyUp:_d,onMouseDown:_d,onMouseMove:_d,onMouseOut:_d,onMouseOver:_d,onMouseLeave:_d,onMouseEnter:_d,onMouseUp:_d,constructor:function(_14){
this._toConnect={};
for(var _15 in _14){
if(this[_15]===_d){
this._toConnect[_15.replace(/^on/,"").toLowerCase()]=_14[_15];
delete _14[_15];
}
}
},postCreate:function(){
this.inherited(arguments);
for(var _16 in this._toConnect){
this.on(_16,this._toConnect[_16]);
}
delete this._toConnect;
},on:function(_17,_18){
if(this[this._onMap(_17)]===_d){
return _3.connect(this.domNode,_17.toLowerCase(),this,_18);
}
return this.inherited(arguments);
},_setFocusedAttr:function(val){
this._focused=val;
this._set("focused",val);
},setAttribute:function(_19,_1a){
_5.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(_19,_1a);
},attr:function(_1b,_1c){
if(_2.isDebug){
var _1d=arguments.callee._ach||(arguments.callee._ach={}),_1e=(arguments.callee.caller||"unknown caller").toString();
if(!_1d[_1e]){
_5.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_1e,"","2.0");
_1d[_1e]=true;
}
}
var _1f=arguments.length;
if(_1f>=2||typeof _1b==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(_1b);
}
},getDescendants:function(){
_5.deprecated(this.declaredClass+"::getDescendants() is deprecated. Use getChildren() instead.","","2.0");
return this.containerNode?_7("[widgetId]",this.containerNode).map(_9.byNode):[];
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
if(!_5.isAsync){
_8(0,function(){
var _20=["dijit/_base"];
require(_20);
});
}
return _13;
});
//>>built
define("dijit/registry",["dojo/_base/array","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window","."],function(_1,_2,_3,_4,_5){
var _6={},_7={};
var _8={length:0,add:function(_9){
if(_7[_9.id]){
throw new Error("Tried to register widget with id=="+_9.id+" but that id is already registered");
}
_7[_9.id]=_9;
this.length++;
},remove:function(id){
if(_7[id]){
delete _7[id];
this.length--;
}
},byId:function(id){
return typeof id=="string"?_7[id]:id;
},byNode:function(_a){
return _7[_a.getAttribute("widgetId")];
},toArray:function(){
var ar=[];
for(var id in _7){
ar.push(_7[id]);
}
return ar;
},getUniqueId:function(_b){
var id;
do{
id=_b+"_"+(_b in _6?++_6[_b]:_6[_b]=0);
}while(_7[id]);
return _5._scopeName=="dijit"?id:_5._scopeName+"_"+id;
},findWidgets:function(_c){
var _d=[];
function _e(_f){
for(var _10=_f.firstChild;_10;_10=_10.nextSibling){
if(_10.nodeType==1){
var _11=_10.getAttribute("widgetId");
if(_11){
var _12=_7[_11];
if(_12){
_d.push(_12);
}
}else{
_e(_10);
}
}
}
};
_e(_c);
return _d;
},_destroyAll:function(){
_5._curFocus=null;
_5._prevFocus=null;
_5._activeStack=[];
_1.forEach(_8.findWidgets(_4.body()),function(_13){
if(!_13._destroyed){
if(_13.destroyRecursive){
_13.destroyRecursive();
}else{
if(_13.destroy){
_13.destroy();
}
}
}
});
},getEnclosingWidget:function(_14){
while(_14){
var id=_14.getAttribute&&_14.getAttribute("widgetId");
if(id){
return _7[id];
}
_14=_14.parentNode;
}
return null;
},_hash:_7};
if(_2("ie")){
_3.addOnWindowUnload(function(){
_8._destroyAll();
});
}
_5.registry=_8;
return _8;
});
//>>built
define("dijit/main",["dojo/_base/kernel"],function(_1){
return _1.dijit;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/Stateful",["./_base/kernel","./_base/declare","./_base/lang","./_base/array"],function(_1,_2,_3,_4){
return _1.declare("dojo.Stateful",null,{postscript:function(_5){
if(_5){
_3.mixin(this,_5);
}
},get:function(_6){
return this[_6];
},set:function(_7,_8){
if(typeof _7==="object"){
for(var x in _7){
this.set(x,_7[x]);
}
return this;
}
var _9=this[_7];
this[_7]=_8;
if(this._watchCallbacks){
this._watchCallbacks(_7,_9,_8);
}
return this;
},watch:function(_a,_b){
var _c=this._watchCallbacks;
if(!_c){
var _d=this;
_c=this._watchCallbacks=function(_e,_f,_10,_11){
var _12=function(_13){
if(_13){
_13=_13.slice();
for(var i=0,l=_13.length;i<l;i++){
try{
_13[i].call(_d,_e,_f,_10);
}
catch(e){
console.error(e);
}
}
}
};
_12(_c["_"+_e]);
if(!_11){
_12(_c["*"]);
}
};
}
if(!_b&&typeof _a==="function"){
_b=_a;
_a="*";
}else{
_a="_"+_a;
}
var _14=_c[_a];
if(typeof _14!=="object"){
_14=_c[_a]=[];
}
_14.push(_b);
return {unwatch:function(){
_14.splice(_4.indexOf(_14,_b),1);
}};
}});
});
//>>built
define("dijit/_OnDijitClickMixin",["dojo/on","dojo/_base/array","dojo/keys","dojo/_base/declare","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(on,_1,_2,_3,_4,_5,_6){
var _7=null;
if(_4("ie")){
(function(){
var _8=function(_9){
_7=_9.srcElement;
};
_6.doc.attachEvent("onkeydown",_8);
_5.addOnWindowUnload(function(){
_6.doc.detachEvent("onkeydown",_8);
});
})();
}else{
_6.doc.addEventListener("keydown",function(_a){
_7=_a.target;
},true);
}
var _b=function(_c,_d){
if(/input|button/i.test(_c.nodeName)){
return on(_c,"click",_d);
}else{
function _e(e){
return (e.keyCode==_2.ENTER||e.keyCode==_2.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey;
};
var _f=[on(_c,"keypress",function(e){
if(_e(e)){
_7=e.target;
e.preventDefault();
}
}),on(_c,"keyup",function(e){
if(_e(e)&&e.target==_7){
_7=null;
_d.call(this,e);
}
}),on(_c,"click",function(e){
_d.call(this,e);
})];
return {remove:function(){
_1.forEach(_f,function(h){
h.remove();
});
}};
}
};
return _3("dijit._OnDijitClickMixin",null,{connect:function(obj,_10,_11){
if (window.isTouchSupported != undefined && window.isTouchSupported() && !window.navigator.msPointerEnabled) {
    if (_10 == "ondijitclick") {
        _10 = dojo.touch.release;//added by Tim - add mobile support for ondijitclick, which is used by MenuItems for one
    }
}
return this.inherited(arguments,[obj,_10=="ondijitclick"?_b:_10,_11]);
}});
});
//>>built
define("dijit/_FocusMixin",["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(_1,_2,_3,_4){
_4.extend(_2,{focused:false,onFocus:function(){
},onBlur:function(){
},_onFocus:function(){
this.onFocus();
},_onBlur:function(){
this.onBlur();
}});
return _3("dijit._FocusMixin",null,{_focusManager:_1});
});
//>>built
define("dijit/focus",["dojo/aspect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/_base/lang","dojo/on","dojo/ready","dojo/_base/sniff","dojo/Stateful","dojo/_base/unload","dojo/_base/window","dojo/window","./a11y","./registry","."],function(_1,_2,_3,_4,_5,_6,_7,on,_8,_9,_a,_b,_c,_d,_e,_f,_10){
var _11=_2([_a,_6],{curNode:null,activeStack:[],constructor:function(){
var _12=_7.hitch(this,function(_13){
if(_3.isDescendant(this.curNode,_13)){
this.set("curNode",null);
}
if(_3.isDescendant(this.prevNode,_13)){
this.set("prevNode",null);
}
});
_1.before(_5,"empty",_12);
_1.before(_5,"destroy",_12);
},registerIframe:function(_14){
return this.registerWin(_14.contentWindow,_14);
},registerWin:function(_15,_16){
var _17=this;
var _18=function(evt){
_17._justMouseDowned=true;
setTimeout(function(){
_17._justMouseDowned=false;
},0);
if(_9("ie")&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
_17._onTouchNode(_16||evt.target||evt.srcElement,"mouse");
};
var doc=_9("ie")?_15.document.documentElement:_15.document;
if(doc){
if(_9("ie")){
_15.document.body.attachEvent("onmousedown",_18);
var _19=function(evt){
var tag=evt.srcElement.tagName.toLowerCase();
if(tag=="#document"||tag=="body"){
return;
}
if(_e.isTabNavigable(evt.srcElement)){
_17._onFocusNode(_16||evt.srcElement);
}else{
_17._onTouchNode(_16||evt.srcElement);
}
};
doc.attachEvent("onactivate",_19);
var _1a=function(evt){
_17._onBlurNode(_16||evt.srcElement);
};
doc.attachEvent("ondeactivate",_1a);
return {remove:function(){
_15.document.detachEvent("onmousedown",_18);
doc.detachEvent("onactivate",_19);
doc.detachEvent("ondeactivate",_1a);
doc=null;
}};
}else{
doc.body.addEventListener("mousedown",_18,true);
doc.body.addEventListener("touchstart",_18,true);
var _1b=function(evt){
_17._onFocusNode(_16||evt.target);
};
doc.addEventListener("focus",_1b,true);
var _1c=function(evt){
_17._onBlurNode(_16||evt.target);
};
doc.addEventListener("blur",_1c,true);
return {remove:function(){
doc.body.removeEventListener("mousedown",_18,true);
doc.body.removeEventListener("touchstart",_18,true);
doc.removeEventListener("focus",_1b,true);
doc.removeEventListener("blur",_1c,true);
doc=null;
}};
}
}
},_onBlurNode:function(){
this.set("prevNode",this.curNode);
this.set("curNode",null);
if(this._justMouseDowned){
return;
}
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
}
this._clearActiveWidgetsTimer=setTimeout(_7.hitch(this,function(){
delete this._clearActiveWidgetsTimer;
this._setStack([]);
this.prevNode=null;
}),100);
},_onTouchNode:function(_1d,by){
if(this._clearActiveWidgetsTimer){
clearTimeout(this._clearActiveWidgetsTimer);
delete this._clearActiveWidgetsTimer;
}
var _1e=[];
try{
while(_1d){
var _1f=_4.get(_1d,"dijitPopupParent");
if(_1f){
_1d=_f.byId(_1f).domNode;
}else{
if(_1d.tagName&&_1d.tagName.toLowerCase()=="body"){
if(_1d===_c.body()){
break;
}
_1d=_d.get(_1d.ownerDocument).frameElement;
}else{
var id=_1d.getAttribute&&_1d.getAttribute("widgetId"),_20=id&&_f.byId(id);
if(_20&&!(by=="mouse"&&_20.get("disabled"))){
_1e.unshift(id);
}
_1d=_1d.parentNode;
}
}
}
}
catch(e){
}
this._setStack(_1e,by);
},_onFocusNode:function(_21){
if(!_21){
return;
}
if(_21.nodeType==9){
return;
}
this._onTouchNode(_21);
if(_21==this.curNode){
return;
}
this.set("curNode",_21);
},_setStack:function(_22,by){
var _23=this.activeStack;
this.set("activeStack",_22);
for(var _24=0;_24<Math.min(_23.length,_22.length);_24++){
if(_23[_24]!=_22[_24]){
break;
}
}
var _25;
for(var i=_23.length-1;i>=_24;i--){
_25=_f.byId(_23[i]);
if(_25){
_25._hasBeenBlurred=true;
_25.set("focused",false);
if(_25._focusManager==this){
_25._onBlur(by);
}
this.emit("widget-blur",_25,by);
}
}
for(i=_24;i<_22.length;i++){
_25=_f.byId(_22[i]);
if(_25){
_25.set("focused",true);
if(_25._focusManager==this){
_25._onFocus(by);
}
this.emit("widget-focus",_25,by);
}
}
},focus:function(_26){
if(_26){
try{
_26.focus();
}
catch(e){
}
}
}});
var _27=new _11();
_8(function(){
var _28=_27.registerWin(_c.doc.parentWindow||_c.doc.defaultView);
if(_9("ie")){
_b.addOnWindowUnload(function(){
_28.remove();
_28=null;
});
}
});
_10.focus=function(_29){
_27.focus(_29);
};
for(var _2a in _27){
if(!/^_/.test(_2a)){
_10.focus[_2a]=typeof _27[_2a]=="function"?_7.hitch(_27,_2a):_27[_2a];
}
}
_27.watch(function(_2b,_2c,_2d){
_10.focus[_2b]=_2d;
});
return _27;
});
//>>built
define("dijit/a11y",["dojo/_base/array","dojo/_base/config","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-style","dojo/_base/sniff","./_base/manager","."],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
var _a=(_9._isElementShown=function(_b){
var s=_6.get(_b);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(_5.get(_b,"type")!="hidden");
});
_9.hasDefaultTabStop=function(_c){
switch(_c.nodeName.toLowerCase()){
case "a":
return _5.has(_c,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var _d;
try{
var _e=_c.contentDocument;
if("designMode" in _e&&_e.designMode=="on"){
return true;
}
_d=_e.body;
}
catch(e1){
try{
_d=_c.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return _d&&(_d.contentEditable=="true"||(_d.firstChild&&_d.firstChild.contentEditable=="true"));
default:
return _c.contentEditable=="true";
}
};
var _f=(_9.isTabNavigable=function(_10){
if(_5.get(_10,"disabled")){
return false;
}else{
if(_5.has(_10,"tabIndex")){
return _5.get(_10,"tabIndex")>=0;
}else{
return _9.hasDefaultTabStop(_10);
}
}
});
_9._getTabNavigable=function(_11){
var _12,_13,_14,_15,_16,_17,_18={};
function _19(_1a){
return _1a&&_1a.tagName.toLowerCase()=="input"&&_1a.type&&_1a.type.toLowerCase()=="radio"&&_1a.name&&_1a.name.toLowerCase();
};
var _1b=function(_1c){
for(var _1d=_1c.firstChild;_1d;_1d=_1d.nextSibling){
if(_1d.nodeType!=1||(_7("ie")&&_1d.scopeName!=="HTML")||!_a(_1d)){
continue;
}
if(_f(_1d)){
var _1e=_5.get(_1d,"tabIndex");
if(!_5.has(_1d,"tabIndex")||_1e==0){
if(!_12){
_12=_1d;
}
_13=_1d;
}else{
if(_1e>0){
if(!_14||_1e<_15){
_15=_1e;
_14=_1d;
}
if(!_16||_1e>=_17){
_17=_1e;
_16=_1d;
}
}
}
var rn=_19(_1d);
if(_5.get(_1d,"checked")&&rn){
_18[rn]=_1d;
}
}
if(_1d.nodeName.toUpperCase()!="SELECT"){
_1b(_1d);
}
}
};
if(_a(_11)){
_1b(_11);
}
function rs(_1f){
return _18[_19(_1f)]||_1f;
};
return {first:rs(_12),last:rs(_13),lowest:rs(_14),highest:rs(_16)};
};
_9.getFirstInTabbingOrder=function(_20){
var _21=_9._getTabNavigable(_4.byId(_20));
return _21.lowest?_21.lowest:_21.first;
};
_9.getLastInTabbingOrder=function(_22){
var _23=_9._getTabNavigable(_4.byId(_22));
return _23.last?_23.last:_23.highest;
};
return {hasDefaultTabStop:_9.hasDefaultTabStop,isTabNavigable:_9.isTabNavigable,_getTabNavigable:_9._getTabNavigable,getFirstInTabbingOrder:_9.getFirstInTabbingOrder,getLastInTabbingOrder:_9.getLastInTabbingOrder};
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/uacss",["./dom-geometry","./_base/lang","./ready","./_base/sniff","./_base/window"],function(_1,_2,_3,_4,_5){
var _6=_5.doc.documentElement,ie=_4("ie"),_7=_4("opera"),_8=Math.floor,ff=_4("ff"),_9=_1.boxModel.replace(/-/,""),_a={"dj_ie":ie,"dj_ie6":_8(ie)==6,"dj_ie7":_8(ie)==7,"dj_ie8":_8(ie)==8,"dj_ie9":_8(ie)==9,"dj_quirks":_4("quirks"),"dj_iequirks":ie&&_4("quirks"),"dj_opera":_7,"dj_khtml":_4("khtml"),"dj_webkit":_4("webkit"),"dj_safari":_4("safari"),"dj_chrome":_4("chrome"),"dj_gecko":_4("mozilla"),"dj_ff3":_8(ff)==3};
_a["dj_"+_9]=true;
var _b="";
for(var _c in _a){
if(_a[_c]){
_b+=_c+" ";
}
}
_6.className=_2.trim(_6.className+" "+_b);
_3(90,function(){
if(!_1.isBodyLtr()){
var _d="dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl ");
_6.className=_2.trim(_6.className+" "+_d+"dj_rtl dijitRtl "+_b.replace(/ /g,"-rtl "));
}
});
return _4;
});
//>>built
define("dijit/hccss",["require","dojo/_base/config","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/ready","dojo/_base/sniff","dojo/_base/window"],function(_1,_2,_3,_4,_5,_6,_7,_8){
if(_7("ie")||_7("mozilla")){
_6(90,function(){
var _9=_4.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(_2.blankGif||_1.toUrl("dojo/resources/blank.gif"))+"\");"}},_8.body());
var cs=_5.getComputedStyle(_9);
if(cs){
var _a=cs.backgroundImage;
var _b=(cs.borderTopColor==cs.borderRightColor)||(_a!=null&&(_a=="none"||_a=="url(invalid-url:)"));
if(_b){
_3.add(_8.body(),"dijit_a11y");
}
if(_7("ie")){
_9.outerHTML="";
}else{
_8.body().removeChild(_9);
}
}
});
}
});
//>>built
define("dijit/_CssStateMixin",["dojo/touch","dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/_base/window"],function(_1,_2,_3,_4,_5,_6){
return _3("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
_2.forEach(["onmouseenter","onmouseleave",_1.press],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
_2.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(_7){
this.watch(_7,_5.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_8){
if(!this.disabled){
switch(_8.type){
case "mouseenter":
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseleave":
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
case "touchpress":
this._set("active",true);
this._mouseDown=true;
var _9=this.connect(_6.body(),_1.release,function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_9);
});
break;
}
}
},_setStateClass:function(){
var _a=this.baseClass.split(" ");
function _b(_c){
_a=_a.concat(_2.map(_a,function(c){
return c+_c;
}),"dijit"+_c);
};
if(!this.isLeftToRight()){
_b("Rtl");
}
var _d=this.checked=="mixed"?"Mixed":(this.checked?"Checked":"");
if(this.checked){
_b(_d);
}
if(this.state){
_b(this.state);
}
if(this.selected){
_b("Selected");
}
if(this.disabled){
_b("Disabled");
}else{
if(this.readOnly){
_b("ReadOnly");
}else{
if(this.active){
_b("Active");
}else{
if(this.hovering){
_b("Hover");
}
}
}
}
if(this.focused){
_b("Focused");
}
var tn=this.stateNode||this.domNode,_e={};
_2.forEach(tn.className.split(" "),function(c){
_e[c]=true;
});
if("_stateClasses" in this){
_2.forEach(this._stateClasses,function(c){
delete _e[c];
});
}
_2.forEach(_a,function(c){
_e[c]=true;
});
var _f=[];
for(var c in _e){
_f.push(c);
}
tn.className=_f.join(" ");
this._stateClasses=_a;
},_trackMouseState:function(_10,_11){
var _12=false,_13=false,_14=false;
var _15=this,cn=_5.hitch(this,"connect",_10);
function _16(){
var _17=("disabled" in _15&&_15.disabled)||("readonly" in _15&&_15.readonly);
_4.toggle(_10,_11+"Hover",_12&&!_13&&!_17);
_4.toggle(_10,_11+"Active",_13&&!_17);
_4.toggle(_10,_11+"Focused",_14&&!_17);
};
cn("onmouseenter",function(){
_12=true;
_16();
});
cn("onmouseleave",function(){
_12=false;
_13=false;
_16();
});
cn(_1.press,function(){
_13=true;
_16();
});
cn(_1.release,function(){
_13=false;
_16();
});
cn("onfocus",function(){
_14=true;
_16();
});
cn("onblur",function(){
_14=false;
_16();
});
this.watch("disabled",_16);
this.watch("readOnly",_16);
}});
});
//>>built
define("dijit/_TemplatedMixin",["dojo/_base/lang","dojo/touch","./_WidgetBase","dojo/string","dojo/cache","dojo/_base/array","dojo/_base/declare","dojo/dom-construct","dojo/_base/sniff","dojo/_base/unload","dojo/_base/window"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){
var _c=_7("dijit._TemplatedMixin",null,{templateString:null,templatePath:null,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(_d){
var _e=this.declaredClass,_f=this;
return _4.substitute(_d,this,function(_10,key){
if(key.charAt(0)=="!"){
_10=_1.getObject(key.substr(1),false,_f);
}
if(typeof _10=="undefined"){
throw new Error(_e+" template:"+key);
}
if(_10==null){
return "";
}
return key.charAt(0)=="!"?_10:_10.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
if(!this.templateString){
this.templateString=_5(this.templatePath,{sanitize:true});
}
var _11=_c.getCachedTemplate(this.templateString,this._skipNodeCache);
var _12;
if(_1.isString(_11)){
_12=_8.toDom(this._stringRepl(_11));
if(_12.nodeType!=1){
throw new Error("Invalid template: "+_11);
}
}else{
_12=_11.cloneNode(true);
}
this.domNode=_12;
this.inherited(arguments);
this._attachTemplateNodes(_12,function(n,p){
return n.getAttribute(p);
});
this._beforeFillContent();
this._fillContent(this.srcNodeRef);
},_beforeFillContent:function(){
},_fillContent:function(_13){
var _14=this.containerNode;
if(_13&&_14){
while(_13.hasChildNodes()){
_14.appendChild(_13.firstChild);
}
}
},_attachTemplateNodes:function(_15,_16){
var _17=_1.isArray(_15)?_15:(_15.all||_15.getElementsByTagName("*"));
var x=_1.isArray(_15)?0:-1;
for(;x<_17.length;x++){
var _18=(x==-1)?_15:_17[x];
if(this.widgetsInTemplate&&(_16(_18,"dojoType")||_16(_18,"data-dojo-type"))){
continue;
}
var _19=_16(_18,"dojoAttachPoint")||_16(_18,"data-dojo-attach-point");
if(_19){
var _1a,_1b=_19.split(/\s*,\s*/);
while((_1a=_1b.shift())){
if(_1.isArray(this[_1a])){
this[_1a].push(_18);
}else{
this[_1a]=_18;
}
this._attachPoints.push(_1a);
}
}
var _1c=_16(_18,"dojoAttachEvent")||_16(_18,"data-dojo-attach-event");
if(_1c){
var _1d,_1e=_1c.split(/\s*,\s*/);
var _1f=_1.trim;
while((_1d=_1e.shift())){
if(_1d){
var _20=null;
if(_1d.indexOf(":")!=-1){
var _21=_1d.split(":");
_1d=_1f(_21[0]);
_20=_1f(_21[1]);
}else{
_1d=_1f(_1d);
}
if(!_20){
_20=_1d;
}
this._attachEvents.push(this.connect(_18,_2[_1d]||_1d,_20));
}
}
}
}
},destroyRendering:function(){
_6.forEach(this._attachPoints,function(_22){
delete this[_22];
},this);
this._attachPoints=[];
_6.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
_c._templateCache={};
_c.getCachedTemplate=function(_23,_24){
var _25=_c._templateCache;
var key=_23;
var _26=_25[key];
if(_26){
try{
if(!_26.ownerDocument||_26.ownerDocument==_b.doc){
return _26;
}
}
catch(e){
}
_8.destroy(_26);
}
_23=_4.trim(_23);
if(_24||_23.match(/\$\{([^\}]+)\}/g)){
return (_25[key]=_23);
}else{
var _27=_8.toDom(_23);
if(_27.nodeType!=1){
throw new Error("Invalid template: "+_23);
}
return (_25[key]=_27);
}
};
if(_9("ie")){
_a.addOnWindowUnload(function(){
var _28=_c._templateCache;
for(var key in _28){
var _29=_28[key];
if(typeof _29=="object"){
_8.destroy(_29);
}
delete _28[key];
}
});
}
_1.extend(_3,{dojoAttachEvent:"",dojoAttachPoint:""});
return _c;
});
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/cache",["./_base/kernel","./text"],function(_1,_2){
return _1.cache;
});
//>>built
define("dijit/form/_FormWidgetMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-style","dojo/_base/lang","dojo/mouse","dojo/_base/sniff","dojo/_base/window","dojo/window","../a11y"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){
return _2("dijit.form._FormWidgetMixin",null,{name:"",alt:"",value:"",type:"text",tabIndex:"0",_setTabIndexAttr:"focusNode",disabled:false,intermediateChanges:false,scrollOnFocus:true,_setIdAttr:"focusNode",postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousedown","_onMouseDown");
},_setDisabledAttr:function(_b){
this._set("disabled",_b);
_3.set(this.focusNode,"disabled",_b);
if(this.valueNode){
_3.set(this.valueNode,"disabled",_b);
}
this.focusNode.setAttribute("aria-disabled",_b);
if(_b){
this._set("hovering",false);
this._set("active",false);
var _c="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:("_setTabIndexAttr" in this)?this._setTabIndexAttr:"focusNode";
_1.forEach(_5.isArray(_c)?_c:[_c],function(_d){
var _e=this[_d];
if(_7("webkit")||_a.hasDefaultTabStop(_e)){
_e.setAttribute("tabIndex","-1");
}else{
_e.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.set("tabIndex",this.tabIndex);
}
}
},_onFocus:function(e){
if(this.scrollOnFocus){
_9.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(_4.get(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled&&this.focusNode.focus){
try{
this.focusNode.focus();
}
catch(e){
}
}
},compare:function(_f,_10){
if(typeof _f=="number"&&typeof _10=="number"){
return (isNaN(_f)&&isNaN(_10))?0:_f-_10;
}else{
if(_f>_10){
return 1;
}else{
if(_f<_10){
return -1;
}else{
return 0;
}
}
}
},onChange:function(){
},_onChangeActive:false,_handleOnChange:function(_11,_12){
if(this._lastValueReported==undefined&&(_12===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_11;
}
this._pendingOnChange=this._pendingOnChange||(typeof _11!=typeof this._lastValueReported)||(this.compare(_11,this._lastValueReported)!=0);
if((this.intermediateChanges||_12||_12===undefined)&&this._pendingOnChange){
this._lastValueReported=_11;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
this._onChangeHandle=setTimeout(_5.hitch(this,function(){
this._onChangeHandle=null;
this.onChange(_11);
}),0);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
},_onMouseDown:function(e){
if((!this.focused||!_7("ie"))&&!e.ctrlKey&&_6.isLeft(e)&&this.isFocusable()){
var _13=this.connect(_8.body(),"onmouseup",function(){
if(this.isFocusable()){
this.focus();
}
this.disconnect(_13);
});
}
}});
});
//>>built
define("dijit/form/_TextBoxMixin",["dojo/_base/array","dojo/_base/declare","dojo/dom","dojo/_base/event","dojo/keys","dojo/_base/lang",".."],function(_1,_2,_3,_4,_5,_6,_7){
var _8=_2("dijit.form._TextBoxMixin",null,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_9,_a,_b){
var _c;
if(_9!==undefined){
_c=this.filter(_9);
if(typeof _b!="string"){
if(_c!==null&&((typeof _c!="number")||!isNaN(_c))){
_b=this.filter(this.format(_c,this.constraints));
}else{
_b="";
}
}
}
if(_b!=null&&_b!=undefined&&((typeof _b)!="number"||!isNaN(_b))&&this.textbox.value!=_b){
this.textbox.value=_b;
this._set("displayedValue",this.get("displayedValue"));
}
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_b);
}
this.inherited(arguments,[_c,_a]);
},displayedValue:"",_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},_setDisplayedValueAttr:function(_d){
if(_d===null||_d===undefined){
_d="";
}else{
if(typeof _d!="string"){
_d=String(_d);
}
}
this.textbox.value=_d;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,_d);
}
},format:function(_e){
return ((_e==null||_e==undefined)?"":(_e.toString?_e.toString():_e));
},parse:function(_f){
return _f;
},_refreshState:function(){
},onInput:function(){
},__skipInputEvent:false,_onInput:function(){
if(this.textDir=="auto"){
this.applyTextDir(this.focusNode,this.focusNode.value);
}
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
var _10=function(e){
var _11=e.charOrCode||e.keyCode||229;
if(e.type=="keydown"){
switch(_11){
case _5.SHIFT:
case _5.ALT:
case _5.CTRL:
case _5.META:
case _5.CAPS_LOCK:
return;
default:
if(_11>=65&&_11<=90){
return;
}
}
}
if(e.type=="keypress"&&typeof _11!="string"){
return;
}
if(e.type=="input"){
if(this.__skipInputEvent){
this.__skipInputEvent=false;
return;
}
}else{
this.__skipInputEvent=true;
}
var _12=_6.mixin({},e,{charOrCode:_11,wasConsumed:false,preventDefault:function(){
_12.wasConsumed=true;
e.preventDefault();
},stopPropagation:function(){
e.stopPropagation();
}});
if(this.onInput(_12)===false){
_4.stop(_12);
}
if(_12.wasConsumed){
return;
}
setTimeout(_6.hitch(this,"_onInput",_12),0);
};
_1.forEach(["onkeydown","onkeypress","onpaste","oncut","oninput"],function(_13){
this.connect(this.textbox,_13,_10);
},this);
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=_6.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(_14){
return _14.substring(0,1).toUpperCase()+_14.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
}
},_isTextSelected:function(){
return this.textbox.selectionStart==this.textbox.selectionEnd;
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
if(this._isTextSelected()){
_8.selectInputText(this.textbox);
}
});
}
this.inherited(arguments);
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
},_setTextDirAttr:function(_15){
if(!this._created||this.textDir!=_15){
this._set("textDir",_15);
this.applyTextDir(this.focusNode,this.focusNode.value);
}
}});
_8._setSelectionRange=_7._setSelectionRange=function(_16,_17,_18){
if(_16.setSelectionRange){
_16.setSelectionRange(_17,_18);
}
};
_8.selectInputText=_7.selectInputText=function(_19,_1a,_1b){
_19=_3.byId(_19);
if(isNaN(_1a)){
_1a=0;
}
if(isNaN(_1b)){
_1b=_19.value?_19.value.length:0;
}
try{
_19.focus();
_8._setSelectionRange(_19,_1a,_1b);
}
catch(e){
}
};
return _8;
});
//>>built
require({cache:{"url:dijit/templates/Tooltip.html":"<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>\n"}});
define("dijit/Tooltip",["dojo/_base/array","dojo/_base/declare","dojo/_base/fx","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/lang","dojo/_base/sniff","dojo/_base/window","./_base/manager","./place","./_Widget","./_TemplatedMixin","./BackgroundIframe","dojo/text!./templates/Tooltip.html","."],function(_1,_2,fx,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10){
var _11=_2("dijit._MasterTooltip",[_c,_d],{duration:_a.defaultDuration,templateString:_f,postCreate:function(){
_9.body().appendChild(this.domNode);
this.bgIframe=new _e(this.domNode);
this.fadeIn=fx.fadeIn({node:this.domNode,duration:this.duration,onEnd:_7.hitch(this,"_onShow")});
this.fadeOut=fx.fadeOut({node:this.domNode,duration:this.duration,onEnd:_7.hitch(this,"_onHide")});
},show:function(_12,_13,_14,rtl,_15){
if(this.aroundNode&&this.aroundNode===_13&&this.containerNode.innerHTML==_12){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_12;
this.set("textDir",_15);
this.containerNode.align=rtl?"right":"left";
var pos=_b.around(this.domNode,_13,_14&&_14.length?_14:_16.defaultPosition,!rtl,_7.hitch(this,"orient"));
var _17=pos.aroundNodePos;
if(pos.corner.charAt(0)=="M"&&pos.aroundCorner.charAt(0)=="M"){
this.connectorNode.style.top=_17.y+((_17.h-this.connectorNode.offsetHeight)>>1)-pos.y+"px";
this.connectorNode.style.left="";
}else{
if(pos.corner.charAt(1)=="M"&&pos.aroundCorner.charAt(1)=="M"){
this.connectorNode.style.left=_17.x+((_17.w-this.connectorNode.offsetWidth)>>1)-pos.x+"px";
}
}
_6.set(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_13;
},orient:function(_18,_19,_1a,_1b,_1c){
this.connectorNode.style.top="";
var _1d=_1b.w-this.connectorNode.offsetWidth;
_18.className="dijitTooltip "+{"MR-ML":"dijitTooltipRight","ML-MR":"dijitTooltipLeft","TM-BM":"dijitTooltipAbove","BM-TM":"dijitTooltipBelow","BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_19+"-"+_1a];
this.domNode.style.width="auto";
var _1e=_5.getContentBox(this.domNode);
var _1f=Math.min((Math.max(_1d,1)),_1e.w);
var _20=_1f<_1e.w;
this.domNode.style.width=_1f+"px";
if(_20){
this.containerNode.style.overflow="auto";
var _21=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_21>_1f){
_21=_21+_6.get(this.domNode,"paddingLeft")+_6.get(this.domNode,"paddingRight");
this.domNode.style.width=_21+"px";
}
}
if(_1a.charAt(0)=="B"&&_19.charAt(0)=="B"){
var mb=_5.getMarginBox(_18);
var _22=this.connectorNode.offsetHeight;
if(mb.h>_1b.h){
var _23=_1b.h-((_1c.h+_22)>>1);
this.connectorNode.style.top=_23+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_1c.h/2-_22/2,0),mb.h-_22)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,_1e.w-_1d);
},_onShow:function(){
if(_8("ie")){
this.domNode.style.filter="";
}
},hide:function(_24){
if(this._onDeck&&this._onDeck[1]==_24){
this._onDeck=null;
}else{
if(this.aroundNode===_24){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
},_setAutoTextDir:function(_25){
this.applyTextDir(_25,_8("ie")?_25.outerText:_25.textContent);
_1.forEach(_25.children,function(_26){
this._setAutoTextDir(_26);
},this);
},_setTextDirAttr:function(_27){
this._set("textDir",typeof _27!="undefined"?_27:"");
if(_27=="auto"){
this._setAutoTextDir(this.containerNode);
}else{
this.containerNode.dir=this.textDir;
}
}});
_10.showTooltip=function(_28,_29,_2a,rtl,_2b){
if(!_16._masterTT){
_10._masterTT=_16._masterTT=new _11();
}
return _16._masterTT.show(_28,_29,_2a,rtl,_2b);
};
_10.hideTooltip=function(_2c){
return _16._masterTT&&_16._masterTT.hide(_2c);
};
var _16=_2("dijit.Tooltip",_c,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_2d){
_1.forEach(this._connections||[],function(_2e){
_1.forEach(_2e,_7.hitch(this,"disconnect"));
},this);
this._connectIds=_1.filter(_7.isArrayLike(_2d)?_2d:(_2d?[_2d]:[]),function(id){
return _3.byId(id);
});
this._connections=_1.map(this._connectIds,function(id){
var _2f=_3.byId(id);
return [this.connect(_2f,"onmouseenter","_onHover"),this.connect(_2f,"onmouseleave","_onUnHover"),this.connect(_2f,"onfocus","_onHover"),this.connect(_2f,"onblur","_onUnHover")];
},this);
this._set("connectId",_2d);
},addTarget:function(_30){
var id=_30.id||_30;
if(_1.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(_31){
var id=_31.id||_31,idx=_1.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
_4.add(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
_1.forEach(_7.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onHover:function(e){
if(!this._showTimer){
var _32=e.target;
this._showTimer=setTimeout(_7.hitch(this,function(){
this.open(_32);
}),this.showDelay);
}
},_onUnHover:function(){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_33){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
_16.show(this.label||this.domNode.innerHTML,_33,this.position,!this.isLeftToRight(),this.textDir);
this._connectNode=_33;
this.onShow(_33,this.position);
},close:function(){
if(this._connectNode){
_16.hide(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
_16._MasterTooltip=_11;
_16.show=_10.showTooltip;
_16.hide=_10.hideTooltip;
_16.defaultPosition=["after","before"];
return _16;
});
//>>built
define("dijit/place",["dojo/_base/array","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/window","dojo/window","."],function(_1,_2,_3,_4,_5,_6,_7){
function _8(_9,_a,_b,_c){
var _d=_6.getBox();
if(!_9.parentNode||String(_9.parentNode.tagName).toLowerCase()!="body"){
_5.body().appendChild(_9);
}
var _e=null;
_1.some(_a,function(_f){
var _10=_f.corner;
var pos=_f.pos;
var _11=0;
var _12={w:{"L":_d.l+_d.w-pos.x,"R":pos.x-_d.l,"M":_d.w}[_10.charAt(1)],h:{"T":_d.t+_d.h-pos.y,"B":pos.y-_d.t,"M":_d.h}[_10.charAt(0)]};
if(_b){
var res=_b(_9,_f.aroundCorner,_10,_12,_c);
_11=typeof res=="undefined"?0:res;
}
var _13=_9.style;
var _14=_13.display;
var _15=_13.visibility;
if(_13.display=="none"){
_13.visibility="hidden";
_13.display="";
}
var mb=_2.getMarginBox(_9);
_13.display=_14;
_13.visibility=_15;
var _16={"L":pos.x,"R":pos.x-mb.w,"M":Math.max(_d.l,Math.min(_d.l+_d.w,pos.x+(mb.w>>1))-mb.w)}[_10.charAt(1)],_17={"T":pos.y,"B":pos.y-mb.h,"M":Math.max(_d.t,Math.min(_d.t+_d.h,pos.y+(mb.h>>1))-mb.h)}[_10.charAt(0)],_18=Math.max(_d.l,_16),_19=Math.max(_d.t,_17),_1a=Math.min(_d.l+_d.w,_16+mb.w),_1b=Math.min(_d.t+_d.h,_17+mb.h),_1c=_1a-_18,_1d=_1b-_19;
_11+=(mb.w-_1c)+(mb.h-_1d);

//added by Tim - add horizontal space for a scrollbar
//I am only applying this to teamPages, because it has hard to fix side-effects in file services and the time drop-down in calendars
if (mb.h - _1d > 0 && document.location.href.indexOf("teamPages.jsp") != -1) {
    _18 -= 15;
}
                        
if(_e==null||_11<_e.overflow){
_e={corner:_10,aroundCorner:_f.aroundCorner,x:_18,y:_19,w:_1c,h:_1d,overflow:_11,spaceAvailable:_12};
}
return !_11;
});
if(_e.overflow&&_b){
_b(_9,_e.aroundCorner,_e.corner,_e.spaceAvailable,_c);
}
//added by Tim to prevent menu from going offscreen when menu is going down in webStorage
if (_e.corner.indexOf("T") != -1 && _e.overflow > 0 && location.href.indexOf('reach') != -1) {
    _e.y = Math.max(_e.y - _e.overflow, 0);
}
//added by Tim.  on Linux, the oncontextmenu fires on mouse press instead of release, which as a side effect can cause the mouse release to happen on top of this
//context menu, making it not fire at all in webStorage.  This workaround is to make sure the mouse is not on top of the context menu.  It only applies to the menu when
//it's going to the left.  When going to the right, this fix is applied in Menu.js
if ( _e.corner.indexOf("R") != -1 && navigator.userAgent.toLowerCase().indexOf("linux") != -1) {
     _e.x -= 20;
}
var l=_2.isBodyLtr(),s=_9.style;
s.top=_e.y+"px";
s[l?"left":"right"]=(l?_e.x:_d.w-_e.x-_e.w)+"px";
s[l?"right":"left"]="auto";
return _e;
};
return (_7.place={at:function(_1e,pos,_1f,_20){
var _21=_1.map(_1f,function(_22){
var c={corner:_22,pos:{x:pos.x,y:pos.y}};
if(_20){
c.pos.x+=_22.charAt(1)=="L"?_20.x:-_20.x;
c.pos.y+=_22.charAt(0)=="T"?_20.y:-_20.y;
}
return c;
});
return _8(_1e,_21);
},around:function(_23,_24,_25,_26,_27){
var _28=(typeof _24=="string"||"offsetWidth" in _24)?_2.position(_24,true):_24;
if(_24.parentNode){
var _29=_24.parentNode;
while(_29&&_29.nodeType==1&&_29.nodeName!="BODY"){
var _2a=_2.position(_29,true);
var _2b=_3.getComputedStyle(_29).overflow;
if(_2b=="hidden"||_2b=="auto"||_2b=="scroll"){
var _2c=Math.min(_28.y+_28.h,_2a.y+_2a.h);
var _2d=Math.min(_28.x+_28.w,_2a.x+_2a.w);
_28.x=Math.max(_28.x,_2a.x);
_28.y=Math.max(_28.y,_2a.y);
_28.h=_2c-_28.y;
_28.w=_2d-_28.x;
}
_29=_29.parentNode;
}
}
var x=_28.x,y=_28.y,_2e="w" in _28?_28.w:(_28.w=_28.width),_2f="h" in _28?_28.h:(_4.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+_28.height+", width:"+_2e+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+_28.height+", w:"+_2e+" }","","2.0"),_28.h=_28.height);
var _30=[];
function _31(_32,_33){
_30.push({aroundCorner:_32,corner:_33,pos:{x:{"L":x,"R":x+_2e,"M":x+(_2e>>1)}[_32.charAt(1)],y:{"T":y,"B":y+_2f,"M":y+(_2f>>1)}[_32.charAt(0)]}});
};
_1.forEach(_25,function(pos){
var ltr=_26;
switch(pos){
case "above-centered":
_31("TM","BM");
break;
case "below-centered":
_31("BM","TM");
break;
case "after":
ltr=!ltr;
case "before":
_31(ltr?"ML":"MR",ltr?"MR":"ML");
break;
case "below-alt":
ltr=!ltr;
case "below":
_31(ltr?"BL":"BR",ltr?"TL":"TR");
_31(ltr?"BR":"BL",ltr?"TR":"TL");
break;
case "above-alt":
ltr=!ltr;
case "above":
_31(ltr?"TL":"TR",ltr?"BL":"BR");
_31(ltr?"TR":"TL",ltr?"BR":"BL");
break;
default:
_31(pos.aroundCorner,pos.corner);
}
});
var _34=_8(_23,_30,_27,{w:_2e,h:_2f});
_34.aroundNodePos=_28;
return _34;
}});
});
//>>built
define("dijit/popup",["dojo/_base/array","dojo/aspect","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","./place","./BackgroundIframe","."],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,on,_d,_e,_f,_10,_11){
var _12=_4(null,{_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_13){
var _14=_13._popupWrapper,_15=_13.domNode;
if(!_14){
_14=_7.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},_e.body());
_14.appendChild(_15);
var s=_15.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
_13._popupWrapper=_14;
_2.after(_13,"destroy",function(){
_7.destroy(_14);
delete _13._popupWrapper;
});
}
return _14;
},moveOffScreen:function(_16){
var _17=this._createWrapper(_16);
_9.set(_17,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_18){
var _19=this._createWrapper(_18);
_9.set(_19,"display","none");
},getTopPopup:function(){
var _1a=this._stack;
for(var pi=_1a.length-1;pi>0&&_1a[pi].parent===_1a[pi-1].widget;pi--){
}
return _1a[pi];
},open:function(_1b){
var _1c=this._stack,_1d=_1b.popup,_1e=_1b.orient||["below","below-alt","above","above-alt"],ltr=_1b.parent?_1b.parent.isLeftToRight():_8.isBodyLtr(),_1f=_1b.around,id=(_1b.around&&_1b.around.id)?(_1b.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_1c.length&&(!_1b.parent||!_5.isDescendant(_1b.parent.domNode,_1c[_1c.length-1].widget.domNode))){
this.close(_1c[_1c.length-1].widget);
}
var _20=this._createWrapper(_1d);
_6.set(_20,{id:id,style:{zIndex:this._beginZIndex+_1c.length},"class":"dijitPopup "+(_1d.baseClass||_1d["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:_1b.parent?_1b.parent.id:""});
if(_d("ie")||_d("mozilla")){
if(!_1d.bgIframe){
_1d.bgIframe=new _10(_20);
}
}
var _21=_1f?_f.around(_20,_1f,_1e,ltr,_1d.orient?_c.hitch(_1d,"orient"):null):_f.at(_20,_1b,_1e=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],_1b.padding);
_20.style.display="";

//added by Tim - this will add scrollbars to the menu when necessary
//I am only applying this to teamPages, because it has hard to fix side-effects in file services and the time drop-down in calendars
if (_21.overflow > 0 && document.location.href.indexOf("teamPages.jsp") != -1) {
    _20.style.height = (_20.clientHeight - _21.overflow) + "px";
    _20.style.width = (_20.clientWidth + 16) + "px";
    _20.style.overflowY = "auto";
    _20.style.overflowX = "hidden";
}
                        
_20.style.visibility="visible";
_1d.domNode.style.visibility="visible";
var _22=[];
_22.push(on(_20,_3._keypress,_c.hitch(this,function(evt){
if(evt.charOrCode==_b.ESCAPE&&_1b.onCancel){
_a.stop(evt);
_1b.onCancel();
}else{
if(evt.charOrCode===_b.TAB){
_a.stop(evt);
var _23=this.getTopPopup();
if(_23&&_23.onCancel){
_23.onCancel();
}
}
}
})));
if(_1d.onCancel&&_1b.onCancel){
_22.push(_1d.on("cancel",_1b.onCancel));
}
_22.push(_1d.on(_1d.onExecute?"execute":"change",_c.hitch(this,function(){
var _24=this.getTopPopup();
if(_24&&_24.onExecute){
_24.onExecute();
}
})));
_1c.push({widget:_1d,parent:_1b.parent,onExecute:_1b.onExecute,onCancel:_1b.onCancel,onClose:_1b.onClose,handlers:_22});
if(_1d.onOpen){
_1d.onOpen(_21);
}
return _21;
},close:function(_25){
var _26=this._stack;
while((_25&&_1.some(_26,function(_27){
return _27.widget==_25;
}))||(!_25&&_26.length)){
var top=_26.pop(),_28=top.widget,_29=top.onClose;
if(_28.onClose){
_28.onClose();
}
var h;
while(h=top.handlers.pop()){
h.remove();
}
if(_28&&_28.domNode){
this.hide(_28);
}
if(_29){
_29();
}
}
}});
return (_11.popup=new _12());
});
dojo.provide("swdojo1.dijit.form.Button");
dojo.require("dijit.form._FormWidget");
dojo.declare("swdojo1.dijit.form.Button",[dijit.form._FormWidget,dijit.form._ButtonMixin],{showLabel:true,iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},baseClass:"dijitButton",templateString:'<span class="dijit dijitReset dijitInline" role="presentation"\n\t><span class="dijitReset dijitInline dijitButtonNode"\n\t\tdata-dojo-attach-event="ondijitclick:_onClick" role="presentation"\n\t\t><span class="dijitReset dijitStretch dijitButtonContents"\n\t\t\tdata-dojo-attach-point="titleNode,focusNode"\n\t\t\trole="button" aria-labelledby="${id}_label"\n\t\t\t><span class="dijitReset dijitInline dijitIcon" data-dojo-attach-point="iconNode"></span\n\t\t\t><span class="dijitReset dijitToggleButtonIconChar">&#x25CF;</span\n\t\t\t><span class="dijitReset dijitInline dijitButtonText"\n\t\t\t\tid="${id}_label"\n\t\t\t\tdata-dojo-attach-point="containerNode"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type="${type}" value="${value}" class="dijitOffScreen"\n\t\ttabIndex="-1" role="presentation" data-dojo-attach-point="valueNode"\n/></span>\n',_setValueAttr:"valueNode",_onClick:function(e){var ok=this.inherited(arguments);
if(ok){if(this.valueNode){this.valueNode.click();
e.preventDefault()
}}return ok
},_fillContent:function(source){if(source&&(!this.params||!("label" in this.params))){var sourceLabel=dojo.string.trim(source.innerHTML);
if(sourceLabel){this.label=sourceLabel
}}},_setShowLabelAttr:function(val){if(this.containerNode){dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val)
}this._set("showLabel",val)
},setLabel:function(content){dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",content)
},_setLabelAttr:function(content){this.inherited(arguments);
if(!this.showLabel&&!("title" in this.params)){this.titleNode.title=dojo.string.trim(this.containerNode.innerText||this.containerNode.textContent||"")
}}});