"use strict";var _getOwnPropertyDescriptor=require("babel-runtime/core-js/object/get-own-property-descriptor");var _getOwnPropertyDescriptor2=_interopRequireDefault(_getOwnPropertyDescriptor);var _isExtensible=require("babel-runtime/core-js/object/is-extensible");var _isExtensible2=_interopRequireDefault(_isExtensible);var _getOwnPropertyNames=require("babel-runtime/core-js/object/get-own-property-names");var _getOwnPropertyNames2=_interopRequireDefault(_getOwnPropertyNames);var _set=require("babel-runtime/core-js/set");var _set2=_interopRequireDefault(_set);var _ownKeys=require("babel-runtime/core-js/reflect/own-keys");var _ownKeys2=_interopRequireDefault(_ownKeys);var _symbol=require("babel-runtime/core-js/symbol");var _symbol2=_interopRequireDefault(_symbol);var _defineProperty=require("babel-runtime/core-js/object/define-property");var _defineProperty2=_interopRequireDefault(_defineProperty);var _freeze=require("babel-runtime/core-js/object/freeze");var _freeze2=_interopRequireDefault(_freeze);var _defineProperties=require("babel-runtime/core-js/object/define-properties");var _defineProperties2=_interopRequireDefault(_defineProperties);var _stringify=require("babel-runtime/core-js/json/stringify");var _stringify2=_interopRequireDefault(_stringify);var _getPrototypeOf=require("babel-runtime/core-js/object/get-prototype-of");var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _promise=require("babel-runtime/core-js/promise");var _promise2=_interopRequireDefault(_promise);var _typeof2=require("babel-runtime/helpers/typeof");var _typeof3=_interopRequireDefault(_typeof2);var _create=require("babel-runtime/core-js/object/create");var _create2=_interopRequireDefault(_create);var _keys=require("babel-runtime/core-js/object/keys");var _keys2=_interopRequireDefault(_keys);var _assign2=require("babel-runtime/core-js/object/assign");var _assign3=_interopRequireDefault(_assign2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}require=function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(require,module,exports){},{}],2:[function(require,module,exports){/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */(function(window,document,exportName,undefined){'use strict';var VENDOR_PREFIXES=['','webkit','Moz','MS','ms','o'];var TEST_ELEMENT=document.createElement('div');var TYPE_FUNCTION='function';var round=Math.round;var abs=Math.abs;var now=Date.now;/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */function setTimeoutContext(fn,timeout,context){return setTimeout(bindFn(fn,context),timeout);}/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */function invokeArrayArg(arg,fn,context){if(Array.isArray(arg)){each(arg,context[fn],context);return true;}return false;}/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */function each(obj,iterator,context){var i;if(!obj){return;}if(obj.forEach){obj.forEach(iterator,context);}else if(obj.length!==undefined){i=0;while(i<obj.length){iterator.call(context,obj[i],i,obj);i++;}}else{for(i in obj){obj.hasOwnProperty(i)&&iterator.call(context,obj[i],i,obj);}}}/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */function deprecate(method,name,message){var deprecationMessage='DEPRECATED METHOD: '+name+'\n'+message+' AT \n';return function(){var e=new Error('get-stack-trace');var stack=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,'').replace(/^\s+at\s+/gm,'').replace(/^Object.<anonymous>\s*\(/gm,'{anonymous}()@'):'Unknown Stack Trace';var log=window.console&&(window.console.warn||window.console.log);if(log){log.call(window.console,deprecationMessage,stack);}return method.apply(this,arguments);};}/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */var assign;if(typeof _assign3.default!=='function'){assign=function assign(target){if(target===undefined||target===null){throw new TypeError('Cannot convert undefined or null to object');}var output=Object(target);for(var index=1;index<arguments.length;index++){var source=arguments[index];if(source!==undefined&&source!==null){for(var nextKey in source){if(source.hasOwnProperty(nextKey)){output[nextKey]=source[nextKey];}}}}return output;};}else{assign=_assign3.default;}/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */var extend=deprecate(function extend(dest,src,merge){var keys=(0,_keys2.default)(src);var i=0;while(i<keys.length){if(!merge||merge&&dest[keys[i]]===undefined){dest[keys[i]]=src[keys[i]];}i++;}return dest;},'extend','Use `assign`.');/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */var merge=deprecate(function merge(dest,src){return extend(dest,src,true);},'merge','Use `assign`.');/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */function inherit(child,base,properties){var baseP=base.prototype,childP;childP=child.prototype=(0,_create2.default)(baseP);childP.constructor=child;childP._super=baseP;if(properties){assign(childP,properties);}}/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */function bindFn(fn,context){return function boundFn(){return fn.apply(context,arguments);};}/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */function boolOrFn(val,args){if((typeof val==="undefined"?"undefined":(0,_typeof3.default)(val))==TYPE_FUNCTION){return val.apply(args?args[0]||undefined:undefined,args);}return val;}/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */function ifUndefined(val1,val2){return val1===undefined?val2:val1;}/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */function addEventListeners(target,types,handler){each(splitStr(types),function(type){target.addEventListener(type,handler,false);});}/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */function removeEventListeners(target,types,handler){each(splitStr(types),function(type){target.removeEventListener(type,handler,false);});}/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */function hasParent(node,parent){while(node){if(node==parent){return true;}node=node.parentNode;}return false;}/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */function inStr(str,find){return str.indexOf(find)>-1;}/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */function splitStr(str){return str.trim().split(/\s+/g);}/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */function inArray(src,find,findByKey){if(src.indexOf&&!findByKey){return src.indexOf(find);}else{var i=0;while(i<src.length){if(findByKey&&src[i][findByKey]==find||!findByKey&&src[i]===find){return i;}i++;}return-1;}}/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */function toArray(obj){return Array.prototype.slice.call(obj,0);}/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */function uniqueArray(src,key,sort){var results=[];var values=[];var i=0;while(i<src.length){var val=key?src[i][key]:src[i];if(inArray(values,val)<0){results.push(src[i]);}values[i]=val;i++;}if(sort){if(!key){results=results.sort();}else{results=results.sort(function sortUniqueArray(a,b){return a[key]>b[key];});}}return results;}/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */function prefixed(obj,property){var prefix,prop;var camelProp=property[0].toUpperCase()+property.slice(1);var i=0;while(i<VENDOR_PREFIXES.length){prefix=VENDOR_PREFIXES[i];prop=prefix?prefix+camelProp:property;if(prop in obj){return prop;}i++;}return undefined;}/**
 * get a unique id
 * @returns {number} uniqueId
 */var _uniqueId=1;function uniqueId(){return _uniqueId++;}/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */function getWindowForElement(element){var doc=element.ownerDocument||element;return doc.defaultView||doc.parentWindow||window;}var MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i;var SUPPORT_TOUCH='ontouchstart'in window;var SUPPORT_POINTER_EVENTS=prefixed(window,'PointerEvent')!==undefined;var SUPPORT_ONLY_TOUCH=SUPPORT_TOUCH&&MOBILE_REGEX.test(navigator.userAgent);var INPUT_TYPE_TOUCH='touch';var INPUT_TYPE_PEN='pen';var INPUT_TYPE_MOUSE='mouse';var INPUT_TYPE_KINECT='kinect';var COMPUTE_INTERVAL=25;var INPUT_START=1;var INPUT_MOVE=2;var INPUT_END=4;var INPUT_CANCEL=8;var DIRECTION_NONE=1;var DIRECTION_LEFT=2;var DIRECTION_RIGHT=4;var DIRECTION_UP=8;var DIRECTION_DOWN=16;var DIRECTION_HORIZONTAL=DIRECTION_LEFT|DIRECTION_RIGHT;var DIRECTION_VERTICAL=DIRECTION_UP|DIRECTION_DOWN;var DIRECTION_ALL=DIRECTION_HORIZONTAL|DIRECTION_VERTICAL;var PROPS_XY=['x','y'];var PROPS_CLIENT_XY=['clientX','clientY'];/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */function Input(manager,callback){var self=this;this.manager=manager;this.callback=callback;this.element=manager.element;this.target=manager.options.inputTarget;// smaller wrapper around the handler, for the scope and the enabled state of the manager,
// so when disabled the input events are completely bypassed.
this.domHandler=function(ev){if(boolOrFn(manager.options.enable,[manager])){self.handler(ev);}};this.init();}Input.prototype={/**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */handler:function handler(){},/**
     * bind the events
     */init:function init(){this.evEl&&addEventListeners(this.element,this.evEl,this.domHandler);this.evTarget&&addEventListeners(this.target,this.evTarget,this.domHandler);this.evWin&&addEventListeners(getWindowForElement(this.element),this.evWin,this.domHandler);},/**
     * unbind the events
     */destroy:function destroy(){this.evEl&&removeEventListeners(this.element,this.evEl,this.domHandler);this.evTarget&&removeEventListeners(this.target,this.evTarget,this.domHandler);this.evWin&&removeEventListeners(getWindowForElement(this.element),this.evWin,this.domHandler);}};/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */function createInputInstance(manager){var Type;var inputClass=manager.options.inputClass;if(inputClass){Type=inputClass;}else if(SUPPORT_POINTER_EVENTS){Type=PointerEventInput;}else if(SUPPORT_ONLY_TOUCH){Type=TouchInput;}else if(!SUPPORT_TOUCH){Type=MouseInput;}else{Type=TouchMouseInput;}return new Type(manager,inputHandler);}/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */function inputHandler(manager,eventType,input){var pointersLen=input.pointers.length;var changedPointersLen=input.changedPointers.length;var isFirst=eventType&INPUT_START&&pointersLen-changedPointersLen===0;var isFinal=eventType&(INPUT_END|INPUT_CANCEL)&&pointersLen-changedPointersLen===0;input.isFirst=!!isFirst;input.isFinal=!!isFinal;if(isFirst){manager.session={};}// source event is the normalized value of the domEvents
// like 'touchstart, mouseup, pointerdown'
input.eventType=eventType;// compute scale, rotation etc
computeInputData(manager,input);// emit secret event
manager.emit('hammer.input',input);manager.recognize(input);manager.session.prevInput=input;}/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */function computeInputData(manager,input){var session=manager.session;var pointers=input.pointers;var pointersLength=pointers.length;// store the first input to calculate the distance and direction
if(!session.firstInput){session.firstInput=simpleCloneInputData(input);}// to compute scale and rotation we need to store the multiple touches
if(pointersLength>1&&!session.firstMultiple){session.firstMultiple=simpleCloneInputData(input);}else if(pointersLength===1){session.firstMultiple=false;}var firstInput=session.firstInput;var firstMultiple=session.firstMultiple;var offsetCenter=firstMultiple?firstMultiple.center:firstInput.center;var center=input.center=getCenter(pointers);input.timeStamp=now();input.deltaTime=input.timeStamp-firstInput.timeStamp;input.angle=getAngle(offsetCenter,center);input.distance=getDistance(offsetCenter,center);computeDeltaXY(session,input);input.offsetDirection=getDirection(input.deltaX,input.deltaY);var overallVelocity=getVelocity(input.deltaTime,input.deltaX,input.deltaY);input.overallVelocityX=overallVelocity.x;input.overallVelocityY=overallVelocity.y;input.overallVelocity=abs(overallVelocity.x)>abs(overallVelocity.y)?overallVelocity.x:overallVelocity.y;input.scale=firstMultiple?getScale(firstMultiple.pointers,pointers):1;input.rotation=firstMultiple?getRotation(firstMultiple.pointers,pointers):0;input.maxPointers=!session.prevInput?input.pointers.length:input.pointers.length>session.prevInput.maxPointers?input.pointers.length:session.prevInput.maxPointers;computeIntervalInputData(session,input);// find the correct target
var target=manager.element;if(hasParent(input.srcEvent.target,target)){target=input.srcEvent.target;}input.target=target;}function computeDeltaXY(session,input){var center=input.center;var offset=session.offsetDelta||{};var prevDelta=session.prevDelta||{};var prevInput=session.prevInput||{};if(input.eventType===INPUT_START||prevInput.eventType===INPUT_END){prevDelta=session.prevDelta={x:prevInput.deltaX||0,y:prevInput.deltaY||0};offset=session.offsetDelta={x:center.x,y:center.y};}input.deltaX=prevDelta.x+(center.x-offset.x);input.deltaY=prevDelta.y+(center.y-offset.y);}/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */function computeIntervalInputData(session,input){var last=session.lastInterval||input,deltaTime=input.timeStamp-last.timeStamp,velocity,velocityX,velocityY,direction;if(input.eventType!=INPUT_CANCEL&&(deltaTime>COMPUTE_INTERVAL||last.velocity===undefined)){var deltaX=input.deltaX-last.deltaX;var deltaY=input.deltaY-last.deltaY;var v=getVelocity(deltaTime,deltaX,deltaY);velocityX=v.x;velocityY=v.y;velocity=abs(v.x)>abs(v.y)?v.x:v.y;direction=getDirection(deltaX,deltaY);session.lastInterval=input;}else{// use latest velocity info if it doesn't overtake a minimum period
velocity=last.velocity;velocityX=last.velocityX;velocityY=last.velocityY;direction=last.direction;}input.velocity=velocity;input.velocityX=velocityX;input.velocityY=velocityY;input.direction=direction;}/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */function simpleCloneInputData(input){// make a simple copy of the pointers because we will get a reference if we don't
// we only need clientXY for the calculations
var pointers=[];var i=0;while(i<input.pointers.length){pointers[i]={clientX:round(input.pointers[i].clientX),clientY:round(input.pointers[i].clientY)};i++;}return{timeStamp:now(),pointers:pointers,center:getCenter(pointers),deltaX:input.deltaX,deltaY:input.deltaY};}/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */function getCenter(pointers){var pointersLength=pointers.length;// no need to loop when only one touch
if(pointersLength===1){return{x:round(pointers[0].clientX),y:round(pointers[0].clientY)};}var x=0,y=0,i=0;while(i<pointersLength){x+=pointers[i].clientX;y+=pointers[i].clientY;i++;}return{x:round(x/pointersLength),y:round(y/pointersLength)};}/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */function getVelocity(deltaTime,x,y){return{x:x/deltaTime||0,y:y/deltaTime||0};}/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */function getDirection(x,y){if(x===y){return DIRECTION_NONE;}if(abs(x)>=abs(y)){return x<0?DIRECTION_LEFT:DIRECTION_RIGHT;}return y<0?DIRECTION_UP:DIRECTION_DOWN;}/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */function getDistance(p1,p2,props){if(!props){props=PROPS_XY;}var x=p2[props[0]]-p1[props[0]],y=p2[props[1]]-p1[props[1]];return Math.sqrt(x*x+y*y);}/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */function getAngle(p1,p2,props){if(!props){props=PROPS_XY;}var x=p2[props[0]]-p1[props[0]],y=p2[props[1]]-p1[props[1]];return Math.atan2(y,x)*180/Math.PI;}/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */function getRotation(start,end){return getAngle(end[1],end[0],PROPS_CLIENT_XY)+getAngle(start[1],start[0],PROPS_CLIENT_XY);}/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */function getScale(start,end){return getDistance(end[0],end[1],PROPS_CLIENT_XY)/getDistance(start[0],start[1],PROPS_CLIENT_XY);}var MOUSE_INPUT_MAP={mousedown:INPUT_START,mousemove:INPUT_MOVE,mouseup:INPUT_END};var MOUSE_ELEMENT_EVENTS='mousedown';var MOUSE_WINDOW_EVENTS='mousemove mouseup';/**
 * Mouse events input
 * @constructor
 * @extends Input
 */function MouseInput(){this.evEl=MOUSE_ELEMENT_EVENTS;this.evWin=MOUSE_WINDOW_EVENTS;this.pressed=false;// mousedown state
Input.apply(this,arguments);}inherit(MouseInput,Input,{/**
     * handle mouse events
     * @param {Object} ev
     */handler:function MEhandler(ev){var eventType=MOUSE_INPUT_MAP[ev.type];// on start we want to have the left mouse button down
if(eventType&INPUT_START&&ev.button===0){this.pressed=true;}if(eventType&INPUT_MOVE&&ev.which!==1){eventType=INPUT_END;}// mouse must be down
if(!this.pressed){return;}if(eventType&INPUT_END){this.pressed=false;}this.callback(this.manager,eventType,{pointers:[ev],changedPointers:[ev],pointerType:INPUT_TYPE_MOUSE,srcEvent:ev});}});var POINTER_INPUT_MAP={pointerdown:INPUT_START,pointermove:INPUT_MOVE,pointerup:INPUT_END,pointercancel:INPUT_CANCEL,pointerout:INPUT_CANCEL};// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM={2:INPUT_TYPE_TOUCH,3:INPUT_TYPE_PEN,4:INPUT_TYPE_MOUSE,5:INPUT_TYPE_KINECT// see https://twitter.com/jacobrossi/status/480596438489890816
};var POINTER_ELEMENT_EVENTS='pointerdown';var POINTER_WINDOW_EVENTS='pointermove pointerup pointercancel';// IE10 has prefixed support, and case-sensitive
if(window.MSPointerEvent&&!window.PointerEvent){POINTER_ELEMENT_EVENTS='MSPointerDown';POINTER_WINDOW_EVENTS='MSPointerMove MSPointerUp MSPointerCancel';}/**
 * Pointer events input
 * @constructor
 * @extends Input
 */function PointerEventInput(){this.evEl=POINTER_ELEMENT_EVENTS;this.evWin=POINTER_WINDOW_EVENTS;Input.apply(this,arguments);this.store=this.manager.session.pointerEvents=[];}inherit(PointerEventInput,Input,{/**
     * handle mouse events
     * @param {Object} ev
     */handler:function PEhandler(ev){var store=this.store;var removePointer=false;var eventTypeNormalized=ev.type.toLowerCase().replace('ms','');var eventType=POINTER_INPUT_MAP[eventTypeNormalized];var pointerType=IE10_POINTER_TYPE_ENUM[ev.pointerType]||ev.pointerType;var isTouch=pointerType==INPUT_TYPE_TOUCH;// get index of the event in the store
var storeIndex=inArray(store,ev.pointerId,'pointerId');// start and mouse must be down
if(eventType&INPUT_START&&(ev.button===0||isTouch)){if(storeIndex<0){store.push(ev);storeIndex=store.length-1;}}else if(eventType&(INPUT_END|INPUT_CANCEL)){removePointer=true;}// it not found, so the pointer hasn't been down (so it's probably a hover)
if(storeIndex<0){return;}// update the event in the store
store[storeIndex]=ev;this.callback(this.manager,eventType,{pointers:store,changedPointers:[ev],pointerType:pointerType,srcEvent:ev});if(removePointer){// remove from the store
store.splice(storeIndex,1);}}});var SINGLE_TOUCH_INPUT_MAP={touchstart:INPUT_START,touchmove:INPUT_MOVE,touchend:INPUT_END,touchcancel:INPUT_CANCEL};var SINGLE_TOUCH_TARGET_EVENTS='touchstart';var SINGLE_TOUCH_WINDOW_EVENTS='touchstart touchmove touchend touchcancel';/**
 * Touch events input
 * @constructor
 * @extends Input
 */function SingleTouchInput(){this.evTarget=SINGLE_TOUCH_TARGET_EVENTS;this.evWin=SINGLE_TOUCH_WINDOW_EVENTS;this.started=false;Input.apply(this,arguments);}inherit(SingleTouchInput,Input,{handler:function TEhandler(ev){var type=SINGLE_TOUCH_INPUT_MAP[ev.type];// should we handle the touch events?
if(type===INPUT_START){this.started=true;}if(!this.started){return;}var touches=normalizeSingleTouches.call(this,ev,type);// when done, reset the started state
if(type&(INPUT_END|INPUT_CANCEL)&&touches[0].length-touches[1].length===0){this.started=false;}this.callback(this.manager,type,{pointers:touches[0],changedPointers:touches[1],pointerType:INPUT_TYPE_TOUCH,srcEvent:ev});}});/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */function normalizeSingleTouches(ev,type){var all=toArray(ev.touches);var changed=toArray(ev.changedTouches);if(type&(INPUT_END|INPUT_CANCEL)){all=uniqueArray(all.concat(changed),'identifier',true);}return[all,changed];}var TOUCH_INPUT_MAP={touchstart:INPUT_START,touchmove:INPUT_MOVE,touchend:INPUT_END,touchcancel:INPUT_CANCEL};var TOUCH_TARGET_EVENTS='touchstart touchmove touchend touchcancel';/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */function TouchInput(){this.evTarget=TOUCH_TARGET_EVENTS;this.targetIds={};Input.apply(this,arguments);}inherit(TouchInput,Input,{handler:function MTEhandler(ev){var type=TOUCH_INPUT_MAP[ev.type];var touches=getTouches.call(this,ev,type);if(!touches){return;}this.callback(this.manager,type,{pointers:touches[0],changedPointers:touches[1],pointerType:INPUT_TYPE_TOUCH,srcEvent:ev});}});/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */function getTouches(ev,type){var allTouches=toArray(ev.touches);var targetIds=this.targetIds;// when there is only one touch, the process can be simplified
if(type&(INPUT_START|INPUT_MOVE)&&allTouches.length===1){targetIds[allTouches[0].identifier]=true;return[allTouches,allTouches];}var i,targetTouches,changedTouches=toArray(ev.changedTouches),changedTargetTouches=[],target=this.target;// get target touches from touches
targetTouches=allTouches.filter(function(touch){return hasParent(touch.target,target);});// collect touches
if(type===INPUT_START){i=0;while(i<targetTouches.length){targetIds[targetTouches[i].identifier]=true;i++;}}// filter changed touches to only contain touches that exist in the collected target ids
i=0;while(i<changedTouches.length){if(targetIds[changedTouches[i].identifier]){changedTargetTouches.push(changedTouches[i]);}// cleanup removed touches
if(type&(INPUT_END|INPUT_CANCEL)){delete targetIds[changedTouches[i].identifier];}i++;}if(!changedTargetTouches.length){return;}return[// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
uniqueArray(targetTouches.concat(changedTargetTouches),'identifier',true),changedTargetTouches];}/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */var DEDUP_TIMEOUT=2500;var DEDUP_DISTANCE=25;function TouchMouseInput(){Input.apply(this,arguments);var handler=bindFn(this.handler,this);this.touch=new TouchInput(this.manager,handler);this.mouse=new MouseInput(this.manager,handler);this.primaryTouch=null;this.lastTouches=[];}inherit(TouchMouseInput,Input,{/**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */handler:function TMEhandler(manager,inputEvent,inputData){var isTouch=inputData.pointerType==INPUT_TYPE_TOUCH,isMouse=inputData.pointerType==INPUT_TYPE_MOUSE;if(isMouse&&inputData.sourceCapabilities&&inputData.sourceCapabilities.firesTouchEvents){return;}// when we're in a touch event, record touches to  de-dupe synthetic mouse event
if(isTouch){recordTouches.call(this,inputEvent,inputData);}else if(isMouse&&isSyntheticEvent.call(this,inputData)){return;}this.callback(manager,inputEvent,inputData);},/**
     * remove the event listeners
     */destroy:function destroy(){this.touch.destroy();this.mouse.destroy();}});function recordTouches(eventType,eventData){if(eventType&INPUT_START){this.primaryTouch=eventData.changedPointers[0].identifier;setLastTouch.call(this,eventData);}else if(eventType&(INPUT_END|INPUT_CANCEL)){setLastTouch.call(this,eventData);}}function setLastTouch(eventData){var touch=eventData.changedPointers[0];if(touch.identifier===this.primaryTouch){var lastTouch={x:touch.clientX,y:touch.clientY};this.lastTouches.push(lastTouch);var lts=this.lastTouches;var removeLastTouch=function removeLastTouch(){var i=lts.indexOf(lastTouch);if(i>-1){lts.splice(i,1);}};setTimeout(removeLastTouch,DEDUP_TIMEOUT);}}function isSyntheticEvent(eventData){var x=eventData.srcEvent.clientX,y=eventData.srcEvent.clientY;for(var i=0;i<this.lastTouches.length;i++){var t=this.lastTouches[i];var dx=Math.abs(x-t.x),dy=Math.abs(y-t.y);if(dx<=DEDUP_DISTANCE&&dy<=DEDUP_DISTANCE){return true;}}return false;}var PREFIXED_TOUCH_ACTION=prefixed(TEST_ELEMENT.style,'touchAction');var NATIVE_TOUCH_ACTION=PREFIXED_TOUCH_ACTION!==undefined;// magical touchAction value
var TOUCH_ACTION_COMPUTE='compute';var TOUCH_ACTION_AUTO='auto';var TOUCH_ACTION_MANIPULATION='manipulation';// not implemented
var TOUCH_ACTION_NONE='none';var TOUCH_ACTION_PAN_X='pan-x';var TOUCH_ACTION_PAN_Y='pan-y';var TOUCH_ACTION_MAP=getTouchActionProps();/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */function TouchAction(manager,value){this.manager=manager;this.set(value);}TouchAction.prototype={/**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */set:function set(value){// find out the touch-action by the event handlers
if(value==TOUCH_ACTION_COMPUTE){value=this.compute();}if(NATIVE_TOUCH_ACTION&&this.manager.element.style&&TOUCH_ACTION_MAP[value]){this.manager.element.style[PREFIXED_TOUCH_ACTION]=value;}this.actions=value.toLowerCase().trim();},/**
     * just re-set the touchAction value
     */update:function update(){this.set(this.manager.options.touchAction);},/**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */compute:function compute(){var actions=[];each(this.manager.recognizers,function(recognizer){if(boolOrFn(recognizer.options.enable,[recognizer])){actions=actions.concat(recognizer.getTouchAction());}});return cleanTouchActions(actions.join(' '));},/**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */preventDefaults:function preventDefaults(input){var srcEvent=input.srcEvent;var direction=input.offsetDirection;// if the touch action did prevented once this session
if(this.manager.session.prevented){srcEvent.preventDefault();return;}var actions=this.actions;var hasNone=inStr(actions,TOUCH_ACTION_NONE)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];var hasPanY=inStr(actions,TOUCH_ACTION_PAN_Y)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];var hasPanX=inStr(actions,TOUCH_ACTION_PAN_X)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];if(hasNone){//do not prevent defaults if this is a tap gesture
var isTapPointer=input.pointers.length===1;var isTapMovement=input.distance<2;var isTapTouchTime=input.deltaTime<250;if(isTapPointer&&isTapMovement&&isTapTouchTime){return;}}if(hasPanX&&hasPanY){// `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
return;}if(hasNone||hasPanY&&direction&DIRECTION_HORIZONTAL||hasPanX&&direction&DIRECTION_VERTICAL){return this.preventSrc(srcEvent);}},/**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */preventSrc:function preventSrc(srcEvent){this.manager.session.prevented=true;srcEvent.preventDefault();}};/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */function cleanTouchActions(actions){// none
if(inStr(actions,TOUCH_ACTION_NONE)){return TOUCH_ACTION_NONE;}var hasPanX=inStr(actions,TOUCH_ACTION_PAN_X);var hasPanY=inStr(actions,TOUCH_ACTION_PAN_Y);// if both pan-x and pan-y are set (different recognizers
// for different directions, e.g. horizontal pan but vertical swipe?)
// we need none (as otherwise with pan-x pan-y combined none of these
// recognizers will work, since the browser would handle all panning
if(hasPanX&&hasPanY){return TOUCH_ACTION_NONE;}// pan-x OR pan-y
if(hasPanX||hasPanY){return hasPanX?TOUCH_ACTION_PAN_X:TOUCH_ACTION_PAN_Y;}// manipulation
if(inStr(actions,TOUCH_ACTION_MANIPULATION)){return TOUCH_ACTION_MANIPULATION;}return TOUCH_ACTION_AUTO;}function getTouchActionProps(){if(!NATIVE_TOUCH_ACTION){return false;}var touchMap={};var cssSupports=window.CSS&&window.CSS.supports;['auto','manipulation','pan-y','pan-x','pan-x pan-y','none'].forEach(function(val){// If css.supports is not supported but there is native touch-action assume it supports
// all values. This is the case for IE 10 and 11.
touchMap[val]=cssSupports?window.CSS.supports('touch-action',val):true;});return touchMap;}/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */var STATE_POSSIBLE=1;var STATE_BEGAN=2;var STATE_CHANGED=4;var STATE_ENDED=8;var STATE_RECOGNIZED=STATE_ENDED;var STATE_CANCELLED=16;var STATE_FAILED=32;/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */function Recognizer(options){this.options=assign({},this.defaults,options||{});this.id=uniqueId();this.manager=null;// default is enable true
this.options.enable=ifUndefined(this.options.enable,true);this.state=STATE_POSSIBLE;this.simultaneous={};this.requireFail=[];}Recognizer.prototype={/**
     * @virtual
     * @type {Object}
     */defaults:{},/**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */set:function set(options){assign(this.options,options);// also update the touchAction, in case something changed about the directions/enabled state
this.manager&&this.manager.touchAction.update();return this;},/**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */recognizeWith:function recognizeWith(otherRecognizer){if(invokeArrayArg(otherRecognizer,'recognizeWith',this)){return this;}var simultaneous=this.simultaneous;otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);if(!simultaneous[otherRecognizer.id]){simultaneous[otherRecognizer.id]=otherRecognizer;otherRecognizer.recognizeWith(this);}return this;},/**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */dropRecognizeWith:function dropRecognizeWith(otherRecognizer){if(invokeArrayArg(otherRecognizer,'dropRecognizeWith',this)){return this;}otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);delete this.simultaneous[otherRecognizer.id];return this;},/**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */requireFailure:function requireFailure(otherRecognizer){if(invokeArrayArg(otherRecognizer,'requireFailure',this)){return this;}var requireFail=this.requireFail;otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);if(inArray(requireFail,otherRecognizer)===-1){requireFail.push(otherRecognizer);otherRecognizer.requireFailure(this);}return this;},/**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */dropRequireFailure:function dropRequireFailure(otherRecognizer){if(invokeArrayArg(otherRecognizer,'dropRequireFailure',this)){return this;}otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);var index=inArray(this.requireFail,otherRecognizer);if(index>-1){this.requireFail.splice(index,1);}return this;},/**
     * has require failures boolean
     * @returns {boolean}
     */hasRequireFailures:function hasRequireFailures(){return this.requireFail.length>0;},/**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */canRecognizeWith:function canRecognizeWith(otherRecognizer){return!!this.simultaneous[otherRecognizer.id];},/**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */emit:function emit(input){var self=this;var state=this.state;function emit(event){self.manager.emit(event,input);}// 'panstart' and 'panmove'
if(state<STATE_ENDED){emit(self.options.event+stateStr(state));}emit(self.options.event);// simple 'eventName' events
if(input.additionalEvent){// additional event(panleft, panright, pinchin, pinchout...)
emit(input.additionalEvent);}// panend and pancancel
if(state>=STATE_ENDED){emit(self.options.event+stateStr(state));}},/**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */tryEmit:function tryEmit(input){if(this.canEmit()){return this.emit(input);}// it's failing anyway
this.state=STATE_FAILED;},/**
     * can we emit?
     * @returns {boolean}
     */canEmit:function canEmit(){var i=0;while(i<this.requireFail.length){if(!(this.requireFail[i].state&(STATE_FAILED|STATE_POSSIBLE))){return false;}i++;}return true;},/**
     * update the recognizer
     * @param {Object} inputData
     */recognize:function recognize(inputData){// make a new copy of the inputData
// so we can change the inputData without messing up the other recognizers
var inputDataClone=assign({},inputData);// is is enabled and allow recognizing?
if(!boolOrFn(this.options.enable,[this,inputDataClone])){this.reset();this.state=STATE_FAILED;return;}// reset when we've reached the end
if(this.state&(STATE_RECOGNIZED|STATE_CANCELLED|STATE_FAILED)){this.state=STATE_POSSIBLE;}this.state=this.process(inputDataClone);// the recognizer has recognized a gesture
// so trigger an event
if(this.state&(STATE_BEGAN|STATE_CHANGED|STATE_ENDED|STATE_CANCELLED)){this.tryEmit(inputDataClone);}},/**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */process:function process(inputData){},// jshint ignore:line
/**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */getTouchAction:function getTouchAction(){},/**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */reset:function reset(){}};/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */function stateStr(state){if(state&STATE_CANCELLED){return'cancel';}else if(state&STATE_ENDED){return'end';}else if(state&STATE_CHANGED){return'move';}else if(state&STATE_BEGAN){return'start';}return'';}/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */function directionStr(direction){if(direction==DIRECTION_DOWN){return'down';}else if(direction==DIRECTION_UP){return'up';}else if(direction==DIRECTION_LEFT){return'left';}else if(direction==DIRECTION_RIGHT){return'right';}return'';}/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */function getRecognizerByNameIfManager(otherRecognizer,recognizer){var manager=recognizer.manager;if(manager){return manager.get(otherRecognizer);}return otherRecognizer;}/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */function AttrRecognizer(){Recognizer.apply(this,arguments);}inherit(AttrRecognizer,Recognizer,{/**
     * @namespace
     * @memberof AttrRecognizer
     */defaults:{/**
         * @type {Number}
         * @default 1
         */pointers:1},/**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */attrTest:function attrTest(input){var optionPointers=this.options.pointers;return optionPointers===0||input.pointers.length===optionPointers;},/**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */process:function process(input){var state=this.state;var eventType=input.eventType;var isRecognized=state&(STATE_BEGAN|STATE_CHANGED);var isValid=this.attrTest(input);// on cancel input and we've recognized before, return STATE_CANCELLED
if(isRecognized&&(eventType&INPUT_CANCEL||!isValid)){return state|STATE_CANCELLED;}else if(isRecognized||isValid){if(eventType&INPUT_END){return state|STATE_ENDED;}else if(!(state&STATE_BEGAN)){return STATE_BEGAN;}return state|STATE_CHANGED;}return STATE_FAILED;}});/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */function PanRecognizer(){AttrRecognizer.apply(this,arguments);this.pX=null;this.pY=null;}inherit(PanRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof PanRecognizer
     */defaults:{event:'pan',threshold:10,pointers:1,direction:DIRECTION_ALL},getTouchAction:function getTouchAction(){var direction=this.options.direction;var actions=[];if(direction&DIRECTION_HORIZONTAL){actions.push(TOUCH_ACTION_PAN_Y);}if(direction&DIRECTION_VERTICAL){actions.push(TOUCH_ACTION_PAN_X);}return actions;},directionTest:function directionTest(input){var options=this.options;var hasMoved=true;var distance=input.distance;var direction=input.direction;var x=input.deltaX;var y=input.deltaY;// lock to axis?
if(!(direction&options.direction)){if(options.direction&DIRECTION_HORIZONTAL){direction=x===0?DIRECTION_NONE:x<0?DIRECTION_LEFT:DIRECTION_RIGHT;hasMoved=x!=this.pX;distance=Math.abs(input.deltaX);}else{direction=y===0?DIRECTION_NONE:y<0?DIRECTION_UP:DIRECTION_DOWN;hasMoved=y!=this.pY;distance=Math.abs(input.deltaY);}}input.direction=direction;return hasMoved&&distance>options.threshold&&direction&options.direction;},attrTest:function attrTest(input){return AttrRecognizer.prototype.attrTest.call(this,input)&&(this.state&STATE_BEGAN||!(this.state&STATE_BEGAN)&&this.directionTest(input));},emit:function emit(input){this.pX=input.deltaX;this.pY=input.deltaY;var direction=directionStr(input.direction);if(direction){input.additionalEvent=this.options.event+direction;}this._super.emit.call(this,input);}});/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */function PinchRecognizer(){AttrRecognizer.apply(this,arguments);}inherit(PinchRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof PinchRecognizer
     */defaults:{event:'pinch',threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_NONE];},attrTest:function attrTest(input){return this._super.attrTest.call(this,input)&&(Math.abs(input.scale-1)>this.options.threshold||this.state&STATE_BEGAN);},emit:function emit(input){if(input.scale!==1){var inOut=input.scale<1?'in':'out';input.additionalEvent=this.options.event+inOut;}this._super.emit.call(this,input);}});/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */function PressRecognizer(){Recognizer.apply(this,arguments);this._timer=null;this._input=null;}inherit(PressRecognizer,Recognizer,{/**
     * @namespace
     * @memberof PressRecognizer
     */defaults:{event:'press',pointers:1,time:251,// minimal time of the pointer to be pressed
threshold:9// a minimal movement is ok, but keep it low
},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_AUTO];},process:function process(input){var options=this.options;var validPointers=input.pointers.length===options.pointers;var validMovement=input.distance<options.threshold;var validTime=input.deltaTime>options.time;this._input=input;// we only allow little movement
// and we've reached an end event, so a tap is possible
if(!validMovement||!validPointers||input.eventType&(INPUT_END|INPUT_CANCEL)&&!validTime){this.reset();}else if(input.eventType&INPUT_START){this.reset();this._timer=setTimeoutContext(function(){this.state=STATE_RECOGNIZED;this.tryEmit();},options.time,this);}else if(input.eventType&INPUT_END){return STATE_RECOGNIZED;}return STATE_FAILED;},reset:function reset(){clearTimeout(this._timer);},emit:function emit(input){if(this.state!==STATE_RECOGNIZED){return;}if(input&&input.eventType&INPUT_END){this.manager.emit(this.options.event+'up',input);}else{this._input.timeStamp=now();this.manager.emit(this.options.event,this._input);}}});/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */function RotateRecognizer(){AttrRecognizer.apply(this,arguments);}inherit(RotateRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof RotateRecognizer
     */defaults:{event:'rotate',threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_NONE];},attrTest:function attrTest(input){return this._super.attrTest.call(this,input)&&(Math.abs(input.rotation)>this.options.threshold||this.state&STATE_BEGAN);}});/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */function SwipeRecognizer(){AttrRecognizer.apply(this,arguments);}inherit(SwipeRecognizer,AttrRecognizer,{/**
     * @namespace
     * @memberof SwipeRecognizer
     */defaults:{event:'swipe',threshold:10,velocity:0.3,direction:DIRECTION_HORIZONTAL|DIRECTION_VERTICAL,pointers:1},getTouchAction:function getTouchAction(){return PanRecognizer.prototype.getTouchAction.call(this);},attrTest:function attrTest(input){var direction=this.options.direction;var velocity;if(direction&(DIRECTION_HORIZONTAL|DIRECTION_VERTICAL)){velocity=input.overallVelocity;}else if(direction&DIRECTION_HORIZONTAL){velocity=input.overallVelocityX;}else if(direction&DIRECTION_VERTICAL){velocity=input.overallVelocityY;}return this._super.attrTest.call(this,input)&&direction&input.offsetDirection&&input.distance>this.options.threshold&&input.maxPointers==this.options.pointers&&abs(velocity)>this.options.velocity&&input.eventType&INPUT_END;},emit:function emit(input){var direction=directionStr(input.offsetDirection);if(direction){this.manager.emit(this.options.event+direction,input);}this.manager.emit(this.options.event,input);}});/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */function TapRecognizer(){Recognizer.apply(this,arguments);// previous time and center,
// used for tap counting
this.pTime=false;this.pCenter=false;this._timer=null;this._input=null;this.count=0;}inherit(TapRecognizer,Recognizer,{/**
     * @namespace
     * @memberof PinchRecognizer
     */defaults:{event:'tap',pointers:1,taps:1,interval:300,// max time between the multi-tap taps
time:250,// max time of the pointer to be down (like finger on the screen)
threshold:9,// a minimal movement is ok, but keep it low
posThreshold:10// a multi-tap can be a bit off the initial position
},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_MANIPULATION];},process:function process(input){var options=this.options;var validPointers=input.pointers.length===options.pointers;var validMovement=input.distance<options.threshold;var validTouchTime=input.deltaTime<options.time;this.reset();if(input.eventType&INPUT_START&&this.count===0){return this.failTimeout();}// we only allow little movement
// and we've reached an end event, so a tap is possible
if(validMovement&&validTouchTime&&validPointers){if(input.eventType!=INPUT_END){return this.failTimeout();}var validInterval=this.pTime?input.timeStamp-this.pTime<options.interval:true;var validMultiTap=!this.pCenter||getDistance(this.pCenter,input.center)<options.posThreshold;this.pTime=input.timeStamp;this.pCenter=input.center;if(!validMultiTap||!validInterval){this.count=1;}else{this.count+=1;}this._input=input;// if tap count matches we have recognized it,
// else it has began recognizing...
var tapCount=this.count%options.taps;if(tapCount===0){// no failing requirements, immediately trigger the tap event
// or wait as long as the multitap interval to trigger
if(!this.hasRequireFailures()){return STATE_RECOGNIZED;}else{this._timer=setTimeoutContext(function(){this.state=STATE_RECOGNIZED;this.tryEmit();},options.interval,this);return STATE_BEGAN;}}}return STATE_FAILED;},failTimeout:function failTimeout(){this._timer=setTimeoutContext(function(){this.state=STATE_FAILED;},this.options.interval,this);return STATE_FAILED;},reset:function reset(){clearTimeout(this._timer);},emit:function emit(){if(this.state==STATE_RECOGNIZED){this._input.tapCount=this.count;this.manager.emit(this.options.event,this._input);}}});/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */function Hammer(element,options){options=options||{};options.recognizers=ifUndefined(options.recognizers,Hammer.defaults.preset);return new Manager(element,options);}/**
 * @const {string}
 */Hammer.VERSION='2.0.7';/**
 * default settings
 * @namespace
 */Hammer.defaults={/**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */domEvents:false,/**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */touchAction:TOUCH_ACTION_COMPUTE,/**
     * @type {Boolean}
     * @default true
     */enable:true,/**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */inputTarget:null,/**
     * force an input class
     * @type {Null|Function}
     * @default null
     */inputClass:null,/**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */preset:[// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
[RotateRecognizer,{enable:false}],[PinchRecognizer,{enable:false},['rotate']],[SwipeRecognizer,{direction:DIRECTION_HORIZONTAL}],[PanRecognizer,{direction:DIRECTION_HORIZONTAL},['swipe']],[TapRecognizer],[TapRecognizer,{event:'doubletap',taps:2},['tap']],[PressRecognizer]],/**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */cssProps:{/**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */userSelect:'none',/**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */touchSelect:'none',/**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */touchCallout:'none',/**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */contentZooming:'none',/**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */userDrag:'none',/**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */tapHighlightColor:'rgba(0,0,0,0)'}};var STOP=1;var FORCED_STOP=2;/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */function Manager(element,options){this.options=assign({},Hammer.defaults,options||{});this.options.inputTarget=this.options.inputTarget||element;this.handlers={};this.session={};this.recognizers=[];this.oldCssProps={};this.element=element;this.input=createInputInstance(this);this.touchAction=new TouchAction(this,this.options.touchAction);toggleCssProps(this,true);each(this.options.recognizers,function(item){var recognizer=this.add(new item[0](item[1]));item[2]&&recognizer.recognizeWith(item[2]);item[3]&&recognizer.requireFailure(item[3]);},this);}Manager.prototype={/**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */set:function set(options){assign(this.options,options);// Options that need a little more setup
if(options.touchAction){this.touchAction.update();}if(options.inputTarget){// Clean up existing event listeners and reinitialize
this.input.destroy();this.input.target=options.inputTarget;this.input.init();}return this;},/**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */stop:function stop(force){this.session.stopped=force?FORCED_STOP:STOP;},/**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */recognize:function recognize(inputData){var session=this.session;if(session.stopped){return;}// run the touch-action polyfill
this.touchAction.preventDefaults(inputData);var recognizer;var recognizers=this.recognizers;// this holds the recognizer that is being recognized.
// so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
// if no recognizer is detecting a thing, it is set to `null`
var curRecognizer=session.curRecognizer;// reset when the last recognizer is recognized
// or when we're in a new session
if(!curRecognizer||curRecognizer&&curRecognizer.state&STATE_RECOGNIZED){curRecognizer=session.curRecognizer=null;}var i=0;while(i<recognizers.length){recognizer=recognizers[i];// find out if we are allowed try to recognize the input for this one.
// 1.   allow if the session is NOT forced stopped (see the .stop() method)
// 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
//      that is being recognized.
// 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
//      this can be setup with the `recognizeWith()` method on the recognizer.
if(session.stopped!==FORCED_STOP&&(// 1
!curRecognizer||recognizer==curRecognizer||// 2
recognizer.canRecognizeWith(curRecognizer))){// 3
recognizer.recognize(inputData);}else{recognizer.reset();}// if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
// current active recognizer. but only if we don't already have an active recognizer
if(!curRecognizer&&recognizer.state&(STATE_BEGAN|STATE_CHANGED|STATE_ENDED)){curRecognizer=session.curRecognizer=recognizer;}i++;}},/**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */get:function get(recognizer){if(recognizer instanceof Recognizer){return recognizer;}var recognizers=this.recognizers;for(var i=0;i<recognizers.length;i++){if(recognizers[i].options.event==recognizer){return recognizers[i];}}return null;},/**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */add:function add(recognizer){if(invokeArrayArg(recognizer,'add',this)){return this;}// remove existing
var existing=this.get(recognizer.options.event);if(existing){this.remove(existing);}this.recognizers.push(recognizer);recognizer.manager=this;this.touchAction.update();return recognizer;},/**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */remove:function remove(recognizer){if(invokeArrayArg(recognizer,'remove',this)){return this;}recognizer=this.get(recognizer);// let's make sure this recognizer exists
if(recognizer){var recognizers=this.recognizers;var index=inArray(recognizers,recognizer);if(index!==-1){recognizers.splice(index,1);this.touchAction.update();}}return this;},/**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */on:function on(events,handler){if(events===undefined){return;}if(handler===undefined){return;}var handlers=this.handlers;each(splitStr(events),function(event){handlers[event]=handlers[event]||[];handlers[event].push(handler);});return this;},/**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */off:function off(events,handler){if(events===undefined){return;}var handlers=this.handlers;each(splitStr(events),function(event){if(!handler){delete handlers[event];}else{handlers[event]&&handlers[event].splice(inArray(handlers[event],handler),1);}});return this;},/**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */emit:function emit(event,data){// we also want to trigger dom events
if(this.options.domEvents){triggerDomEvent(event,data);}// no handlers, so skip it all
var handlers=this.handlers[event]&&this.handlers[event].slice();if(!handlers||!handlers.length){return;}data.type=event;data.preventDefault=function(){data.srcEvent.preventDefault();};var i=0;while(i<handlers.length){handlers[i](data);i++;}},/**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */destroy:function destroy(){this.element&&toggleCssProps(this,false);this.handlers={};this.session={};this.input.destroy();this.element=null;}};/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */function toggleCssProps(manager,add){var element=manager.element;if(!element.style){return;}var prop;each(manager.options.cssProps,function(value,name){prop=prefixed(element.style,name);if(add){manager.oldCssProps[prop]=element.style[prop];element.style[prop]=value;}else{element.style[prop]=manager.oldCssProps[prop]||'';}});if(!add){manager.oldCssProps={};}}/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */function triggerDomEvent(event,data){var gestureEvent=document.createEvent('Event');gestureEvent.initEvent(event,true,true);gestureEvent.gesture=data;data.target.dispatchEvent(gestureEvent);}assign(Hammer,{INPUT_START:INPUT_START,INPUT_MOVE:INPUT_MOVE,INPUT_END:INPUT_END,INPUT_CANCEL:INPUT_CANCEL,STATE_POSSIBLE:STATE_POSSIBLE,STATE_BEGAN:STATE_BEGAN,STATE_CHANGED:STATE_CHANGED,STATE_ENDED:STATE_ENDED,STATE_RECOGNIZED:STATE_RECOGNIZED,STATE_CANCELLED:STATE_CANCELLED,STATE_FAILED:STATE_FAILED,DIRECTION_NONE:DIRECTION_NONE,DIRECTION_LEFT:DIRECTION_LEFT,DIRECTION_RIGHT:DIRECTION_RIGHT,DIRECTION_UP:DIRECTION_UP,DIRECTION_DOWN:DIRECTION_DOWN,DIRECTION_HORIZONTAL:DIRECTION_HORIZONTAL,DIRECTION_VERTICAL:DIRECTION_VERTICAL,DIRECTION_ALL:DIRECTION_ALL,Manager:Manager,Input:Input,TouchAction:TouchAction,TouchInput:TouchInput,MouseInput:MouseInput,PointerEventInput:PointerEventInput,TouchMouseInput:TouchMouseInput,SingleTouchInput:SingleTouchInput,Recognizer:Recognizer,AttrRecognizer:AttrRecognizer,Tap:TapRecognizer,Pan:PanRecognizer,Swipe:SwipeRecognizer,Pinch:PinchRecognizer,Rotate:RotateRecognizer,Press:PressRecognizer,on:addEventListeners,off:removeEventListeners,each:each,merge:merge,extend:extend,assign:assign,inherit:inherit,bindFn:bindFn,prefixed:prefixed});// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal=typeof window!=='undefined'?window:typeof self!=='undefined'?self:{};// jshint ignore:line
freeGlobal.Hammer=Hammer;if(typeof define==='function'&&define.amd){define(function(){return Hammer;});}else if(typeof module!='undefined'&&module.exports){module.exports=Hammer;}else{window[exportName]=Hammer;}})(window,document,'Hammer');},{}],3:[function(require,module,exports){// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],"vue-resource":[function(require,module,exports){/*!
 * vue-resource v1.2.1
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */'use strict';/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */var RESOLVED=0;var REJECTED=1;var PENDING=2;function Promise$1(executor){this.state=PENDING;this.value=undefined;this.deferred=[];var promise=this;try{executor(function(x){promise.resolve(x);},function(r){promise.reject(r);});}catch(e){promise.reject(e);}}Promise$1.reject=function(r){return new Promise$1(function(resolve,reject){reject(r);});};Promise$1.resolve=function(x){return new Promise$1(function(resolve,reject){resolve(x);});};Promise$1.all=function all(iterable){return new Promise$1(function(resolve,reject){var count=0,result=[];if(iterable.length===0){resolve(result);}function resolver(i){return function(x){result[i]=x;count+=1;if(count===iterable.length){resolve(result);}};}for(var i=0;i<iterable.length;i+=1){Promise$1.resolve(iterable[i]).then(resolver(i),reject);}});};Promise$1.race=function race(iterable){return new Promise$1(function(resolve,reject){for(var i=0;i<iterable.length;i+=1){Promise$1.resolve(iterable[i]).then(resolve,reject);}});};var p$1=Promise$1.prototype;p$1.resolve=function resolve(x){var promise=this;if(promise.state===PENDING){if(x===promise){throw new TypeError('Promise settled with itself.');}var called=false;try{var then=x&&x['then'];if(x!==null&&(typeof x==="undefined"?"undefined":(0,_typeof3.default)(x))==='object'&&typeof then==='function'){then.call(x,function(x){if(!called){promise.resolve(x);}called=true;},function(r){if(!called){promise.reject(r);}called=true;});return;}}catch(e){if(!called){promise.reject(e);}return;}promise.state=RESOLVED;promise.value=x;promise.notify();}};p$1.reject=function reject(reason){var promise=this;if(promise.state===PENDING){if(reason===promise){throw new TypeError('Promise settled with itself.');}promise.state=REJECTED;promise.value=reason;promise.notify();}};p$1.notify=function notify(){var promise=this;nextTick(function(){if(promise.state!==PENDING){while(promise.deferred.length){var deferred=promise.deferred.shift(),onResolved=deferred[0],onRejected=deferred[1],resolve=deferred[2],reject=deferred[3];try{if(promise.state===RESOLVED){if(typeof onResolved==='function'){resolve(onResolved.call(undefined,promise.value));}else{resolve(promise.value);}}else if(promise.state===REJECTED){if(typeof onRejected==='function'){resolve(onRejected.call(undefined,promise.value));}else{reject(promise.value);}}}catch(e){reject(e);}}}});};p$1.then=function then(onResolved,onRejected){var promise=this;return new Promise$1(function(resolve,reject){promise.deferred.push([onResolved,onRejected,resolve,reject]);promise.notify();});};p$1.catch=function(onRejected){return this.then(undefined,onRejected);};/**
 * Promise adapter.
 */if(typeof _promise2.default==='undefined'){window.Promise=Promise$1;}function PromiseObj(executor,context){if(executor instanceof _promise2.default){this.promise=executor;}else{this.promise=new _promise2.default(executor.bind(context));}this.context=context;}PromiseObj.all=function(iterable,context){return new PromiseObj(_promise2.default.all(iterable),context);};PromiseObj.resolve=function(value,context){return new PromiseObj(_promise2.default.resolve(value),context);};PromiseObj.reject=function(reason,context){return new PromiseObj(_promise2.default.reject(reason),context);};PromiseObj.race=function(iterable,context){return new PromiseObj(_promise2.default.race(iterable),context);};var p=PromiseObj.prototype;p.bind=function(context){this.context=context;return this;};p.then=function(fulfilled,rejected){if(fulfilled&&fulfilled.bind&&this.context){fulfilled=fulfilled.bind(this.context);}if(rejected&&rejected.bind&&this.context){rejected=rejected.bind(this.context);}return new PromiseObj(this.promise.then(fulfilled,rejected),this.context);};p.catch=function(rejected){if(rejected&&rejected.bind&&this.context){rejected=rejected.bind(this.context);}return new PromiseObj(this.promise.catch(rejected),this.context);};p.finally=function(callback){return this.then(function(value){callback.call(this);return value;},function(reason){callback.call(this);return _promise2.default.reject(reason);});};/**
 * Utility functions.
 */var ref={};var hasOwnProperty=ref.hasOwnProperty;var ref$1=[];var slice=ref$1.slice;var debug=false;var ntick;var inBrowser=typeof window!=='undefined';var Util=function Util(ref){var config=ref.config;var nextTick=ref.nextTick;ntick=nextTick;debug=config.debug||!config.silent;};function warn(msg){if(typeof console!=='undefined'&&debug){console.warn('[VueResource warn]: '+msg);}}function error(msg){if(typeof console!=='undefined'){console.error(msg);}}function nextTick(cb,ctx){return ntick(cb,ctx);}function trim(str){return str?str.replace(/^\s*|\s*$/g,''):'';}function toLower(str){return str?str.toLowerCase():'';}function toUpper(str){return str?str.toUpperCase():'';}var isArray=Array.isArray;function isString(val){return typeof val==='string';}function isFunction(val){return typeof val==='function';}function isObject(obj){return obj!==null&&(typeof obj==="undefined"?"undefined":(0,_typeof3.default)(obj))==='object';}function isPlainObject(obj){return isObject(obj)&&(0,_getPrototypeOf2.default)(obj)==Object.prototype;}function isBlob(obj){return typeof Blob!=='undefined'&&obj instanceof Blob;}function isFormData(obj){return typeof FormData!=='undefined'&&obj instanceof FormData;}function when(value,fulfilled,rejected){var promise=PromiseObj.resolve(value);if(arguments.length<2){return promise;}return promise.then(fulfilled,rejected);}function options(fn,obj,opts){opts=opts||{};if(isFunction(opts)){opts=opts.call(obj);}return merge(fn.bind({$vm:obj,$options:opts}),fn,{$options:opts});}function each(obj,iterator){var i,key;if(isArray(obj)){for(i=0;i<obj.length;i++){iterator.call(obj[i],obj[i],i);}}else if(isObject(obj)){for(key in obj){if(hasOwnProperty.call(obj,key)){iterator.call(obj[key],obj[key],key);}}}return obj;}var assign=_assign3.default||_assign;function merge(target){var args=slice.call(arguments,1);args.forEach(function(source){_merge(target,source,true);});return target;}function defaults(target){var args=slice.call(arguments,1);args.forEach(function(source){for(var key in source){if(target[key]===undefined){target[key]=source[key];}}});return target;}function _assign(target){var args=slice.call(arguments,1);args.forEach(function(source){_merge(target,source);});return target;}function _merge(target,source,deep){for(var key in source){if(deep&&(isPlainObject(source[key])||isArray(source[key]))){if(isPlainObject(source[key])&&!isPlainObject(target[key])){target[key]={};}if(isArray(source[key])&&!isArray(target[key])){target[key]=[];}_merge(target[key],source[key],deep);}else if(source[key]!==undefined){target[key]=source[key];}}}/**
 * Root Prefix Transform.
 */var root=function root(options$$1,next){var url=next(options$$1);if(isString(options$$1.root)&&!url.match(/^(https?:)?\//)){url=options$$1.root+'/'+url;}return url;};/**
 * Query Parameter Transform.
 */var query=function query(options$$1,next){var urlParams=(0,_keys2.default)(Url.options.params),query={},url=next(options$$1);each(options$$1.params,function(value,key){if(urlParams.indexOf(key)===-1){query[key]=value;}});query=Url.params(query);if(query){url+=(url.indexOf('?')==-1?'?':'&')+query;}return url;};/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */function expand(url,params,variables){var tmpl=parse(url),expanded=tmpl.expand(params);if(variables){variables.push.apply(variables,tmpl.vars);}return expanded;}function parse(template){var operators=['+','#','.','/',';','?','&'],variables=[];return{vars:variables,expand:function expand(context){return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(_,expression,literal){if(expression){var operator=null,values=[];if(operators.indexOf(expression.charAt(0))!==-1){operator=expression.charAt(0);expression=expression.substr(1);}expression.split(/,/g).forEach(function(variable){var tmp=/([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);values.push.apply(values,getValues(context,operator,tmp[1],tmp[2]||tmp[3]));variables.push(tmp[1]);});if(operator&&operator!=='+'){var separator=',';if(operator==='?'){separator='&';}else if(operator!=='#'){separator=operator;}return(values.length!==0?operator:'')+values.join(separator);}else{return values.join(',');}}else{return encodeReserved(literal);}});}};}function getValues(context,operator,key,modifier){var value=context[key],result=[];if(isDefined(value)&&value!==''){if(typeof value==='string'||typeof value==='number'||typeof value==='boolean'){value=value.toString();if(modifier&&modifier!=='*'){value=value.substring(0,parseInt(modifier,10));}result.push(encodeValue(operator,value,isKeyOperator(operator)?key:null));}else{if(modifier==='*'){if(Array.isArray(value)){value.filter(isDefined).forEach(function(value){result.push(encodeValue(operator,value,isKeyOperator(operator)?key:null));});}else{(0,_keys2.default)(value).forEach(function(k){if(isDefined(value[k])){result.push(encodeValue(operator,value[k],k));}});}}else{var tmp=[];if(Array.isArray(value)){value.filter(isDefined).forEach(function(value){tmp.push(encodeValue(operator,value));});}else{(0,_keys2.default)(value).forEach(function(k){if(isDefined(value[k])){tmp.push(encodeURIComponent(k));tmp.push(encodeValue(operator,value[k].toString()));}});}if(isKeyOperator(operator)){result.push(encodeURIComponent(key)+'='+tmp.join(','));}else if(tmp.length!==0){result.push(tmp.join(','));}}}}else{if(operator===';'){result.push(encodeURIComponent(key));}else if(value===''&&(operator==='&'||operator==='?')){result.push(encodeURIComponent(key)+'=');}else if(value===''){result.push('');}}return result;}function isDefined(value){return value!==undefined&&value!==null;}function isKeyOperator(operator){return operator===';'||operator==='&'||operator==='?';}function encodeValue(operator,value,key){value=operator==='+'||operator==='#'?encodeReserved(value):encodeURIComponent(value);if(key){return encodeURIComponent(key)+'='+value;}else{return value;}}function encodeReserved(str){return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part){if(!/%[0-9A-Fa-f]/.test(part)){part=encodeURI(part);}return part;}).join('');}/**
 * URL Template (RFC 6570) Transform.
 */var template=function template(options){var variables=[],url=expand(options.url,options.params,variables);variables.forEach(function(key){delete options.params[key];});return url;};/**
 * Service for URL templating.
 */function Url(url,params){var self=this||{},options$$1=url,transform;if(isString(url)){options$$1={url:url,params:params};}options$$1=merge({},Url.options,self.$options,options$$1);Url.transforms.forEach(function(handler){transform=factory(handler,transform,self.$vm);});return transform(options$$1);}/**
 * Url options.
 */Url.options={url:'',root:null,params:{}};/**
 * Url transforms.
 */Url.transforms=[template,query,root];/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */Url.params=function(obj){var params=[],escape=encodeURIComponent;params.add=function(key,value){if(isFunction(value)){value=value();}if(value===null){value='';}this.push(escape(key)+'='+escape(value));};serialize(params,obj);return params.join('&').replace(/%20/g,'+');};/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */Url.parse=function(url){var el=document.createElement('a');if(document.documentMode){el.href=url;url=el.href;}el.href=url;return{href:el.href,protocol:el.protocol?el.protocol.replace(/:$/,''):'',port:el.port,host:el.host,hostname:el.hostname,pathname:el.pathname.charAt(0)==='/'?el.pathname:'/'+el.pathname,search:el.search?el.search.replace(/^\?/,''):'',hash:el.hash?el.hash.replace(/^#/,''):''};};function factory(handler,next,vm){return function(options$$1){return handler.call(vm,options$$1,next);};}function serialize(params,obj,scope){var array=isArray(obj),plain=isPlainObject(obj),hash;each(obj,function(value,key){hash=isObject(value)||isArray(value);if(scope){key=scope+'['+(plain||hash?key:'')+']';}if(!scope&&array){params.add(value.name,value.value);}else if(hash){serialize(params,value,key);}else{params.add(key,value);}});}/**
 * XDomain client (Internet Explorer).
 */var xdrClient=function xdrClient(request){return new PromiseObj(function(resolve){var xdr=new XDomainRequest(),handler=function handler(ref){var type=ref.type;var status=0;if(type==='load'){status=200;}else if(type==='error'){status=500;}resolve(request.respondWith(xdr.responseText,{status:status}));};request.abort=function(){return xdr.abort();};xdr.open(request.method,request.getUrl());if(request.timeout){xdr.timeout=request.timeout;}xdr.onload=handler;xdr.onabort=handler;xdr.onerror=handler;xdr.ontimeout=handler;xdr.onprogress=function(){};xdr.send(request.getBody());});};/**
 * CORS Interceptor.
 */var SUPPORTS_CORS=inBrowser&&'withCredentials'in new XMLHttpRequest();var cors=function cors(request,next){if(inBrowser){var orgUrl=Url.parse(location.href);var reqUrl=Url.parse(request.getUrl());if(reqUrl.protocol!==orgUrl.protocol||reqUrl.host!==orgUrl.host){request.crossOrigin=true;request.emulateHTTP=false;if(!SUPPORTS_CORS){request.client=xdrClient;}}}next();};/**
 * Body Interceptor.
 */var body=function body(request,next){if(isFormData(request.body)){request.headers.delete('Content-Type');}else if(isObject(request.body)||isArray(request.body)){if(request.emulateJSON){request.body=Url.params(request.body);request.headers.set('Content-Type','application/x-www-form-urlencoded');}else{request.body=(0,_stringify2.default)(request.body);}}next(function(response){Object.defineProperty(response,'data',{get:function get(){return this.body;},set:function set(body){this.body=body;}});return response.bodyText?when(response.text(),function(text){var type=response.headers.get('Content-Type')||'';if(type.indexOf('application/json')===0||isJson(text)){try{response.body=JSON.parse(text);}catch(e){response.body=null;}}else{response.body=text;}return response;}):response;});};function isJson(str){var start=str.match(/^\[|^\{(?!\{)/),end={'[':/]$/,'{':/}$/};return start&&end[start[0]].test(str);}/**
 * JSONP client (Browser).
 */var jsonpClient=function jsonpClient(request){return new PromiseObj(function(resolve){var name=request.jsonp||'callback',callback=request.jsonpCallback||'_jsonp'+Math.random().toString(36).substr(2),body=null,handler,script;handler=function handler(ref){var type=ref.type;var status=0;if(type==='load'&&body!==null){status=200;}else if(type==='error'){status=500;}if(status&&window[callback]){delete window[callback];document.body.removeChild(script);}resolve(request.respondWith(body,{status:status}));};window[callback]=function(result){body=(0,_stringify2.default)(result);};request.abort=function(){handler({type:'abort'});};request.params[name]=callback;if(request.timeout){setTimeout(request.abort,request.timeout);}script=document.createElement('script');script.src=request.getUrl();script.type='text/javascript';script.async=true;script.onload=handler;script.onerror=handler;document.body.appendChild(script);});};/**
 * JSONP Interceptor.
 */var jsonp=function jsonp(request,next){if(request.method=='JSONP'){request.client=jsonpClient;}next();};/**
 * Before Interceptor.
 */var before=function before(request,next){if(isFunction(request.before)){request.before.call(this,request);}next();};/**
 * HTTP method override Interceptor.
 */var method=function method(request,next){if(request.emulateHTTP&&/^(PUT|PATCH|DELETE)$/i.test(request.method)){request.headers.set('X-HTTP-Method-Override',request.method);request.method='POST';}next();};/**
 * Header Interceptor.
 */var header=function header(request,next){var headers=assign({},Http.headers.common,!request.crossOrigin?Http.headers.custom:{},Http.headers[toLower(request.method)]);each(headers,function(value,name){if(!request.headers.has(name)){request.headers.set(name,value);}});next();};/**
 * XMLHttp client (Browser).
 */var SUPPORTS_BLOB=typeof Blob!=='undefined'&&typeof FileReader!=='undefined';var xhrClient=function xhrClient(request){return new PromiseObj(function(resolve){var xhr=new XMLHttpRequest(),handler=function handler(event){var response=request.respondWith('response'in xhr?xhr.response:xhr.responseText,{status:xhr.status===1223?204:xhr.status,// IE9 status bug
statusText:xhr.status===1223?'No Content':trim(xhr.statusText)});each(trim(xhr.getAllResponseHeaders()).split('\n'),function(row){response.headers.append(row.slice(0,row.indexOf(':')),row.slice(row.indexOf(':')+1));});resolve(response);};request.abort=function(){return xhr.abort();};if(request.progress){if(request.method==='GET'){xhr.addEventListener('progress',request.progress);}else if(/^(POST|PUT)$/i.test(request.method)){xhr.upload.addEventListener('progress',request.progress);}}xhr.open(request.method,request.getUrl(),true);if(request.timeout){xhr.timeout=request.timeout;}if(request.credentials===true){xhr.withCredentials=true;}if(!request.crossOrigin){request.headers.set('X-Requested-With','XMLHttpRequest');}if('responseType'in xhr&&SUPPORTS_BLOB){xhr.responseType='blob';}request.headers.forEach(function(value,name){xhr.setRequestHeader(name,value);});xhr.onload=handler;xhr.onabort=handler;xhr.onerror=handler;xhr.ontimeout=handler;xhr.send(request.getBody());});};/**
 * Http client (Node).
 */var nodeClient=function nodeClient(request){var client=require('got');return new PromiseObj(function(resolve){var url=request.getUrl();var body=request.getBody();var method=request.method;var headers={},handler;request.headers.forEach(function(value,name){headers[name]=value;});client(url,{body:body,method:method,headers:headers}).then(handler=function handler(resp){var response=request.respondWith(resp.body,{status:resp.statusCode,statusText:trim(resp.statusMessage)});each(resp.headers,function(value,name){response.headers.set(name,value);});resolve(response);},function(error$$1){return handler(error$$1.response);});});};/**
 * Base client.
 */var Client=function Client(context){var reqHandlers=[sendRequest],resHandlers=[],handler;if(!isObject(context)){context=null;}function Client(request){return new PromiseObj(function(resolve){function exec(){handler=reqHandlers.pop();if(isFunction(handler)){handler.call(context,request,next);}else{warn("Invalid interceptor of type "+(typeof handler==="undefined"?"undefined":(0,_typeof3.default)(handler))+", must be a function");next();}}function next(response){if(isFunction(response)){resHandlers.unshift(response);}else if(isObject(response)){resHandlers.forEach(function(handler){response=when(response,function(response){return handler.call(context,response)||response;});});when(response,resolve);return;}exec();}exec();},context);}Client.use=function(handler){reqHandlers.push(handler);};return Client;};function sendRequest(request,resolve){var client=request.client||(inBrowser?xhrClient:nodeClient);resolve(client(request));}/**
 * HTTP Headers.
 */var Headers=function Headers(headers){var this$1=this;this.map={};each(headers,function(value,name){return this$1.append(name,value);});};Headers.prototype.has=function has(name){return getName(this.map,name)!==null;};Headers.prototype.get=function get(name){var list=this.map[getName(this.map,name)];return list?list.join():null;};Headers.prototype.getAll=function getAll(name){return this.map[getName(this.map,name)]||[];};Headers.prototype.set=function set(name,value){this.map[normalizeName(getName(this.map,name)||name)]=[trim(value)];};Headers.prototype.append=function append(name,value){var list=this.map[getName(this.map,name)];if(list){list.push(trim(value));}else{this.set(name,value);}};Headers.prototype.delete=function delete$1(name){delete this.map[getName(this.map,name)];};Headers.prototype.deleteAll=function deleteAll(){this.map={};};Headers.prototype.forEach=function forEach(callback,thisArg){var this$1=this;each(this.map,function(list,name){each(list,function(value){return callback.call(thisArg,value,name,this$1);});});};function getName(map,name){return(0,_keys2.default)(map).reduce(function(prev,curr){return toLower(name)===toLower(curr)?curr:prev;},null);}function normalizeName(name){if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){throw new TypeError('Invalid character in header field name');}return trim(name);}/**
 * HTTP Response.
 */var Response=function Response(body,ref){var url=ref.url;var headers=ref.headers;var status=ref.status;var statusText=ref.statusText;this.url=url;this.ok=status>=200&&status<300;this.status=status||0;this.statusText=statusText||'';this.headers=new Headers(headers);this.body=body;if(isString(body)){this.bodyText=body;}else if(isBlob(body)){this.bodyBlob=body;if(isBlobText(body)){this.bodyText=blobText(body);}}};Response.prototype.blob=function blob(){return when(this.bodyBlob);};Response.prototype.text=function text(){return when(this.bodyText);};Response.prototype.json=function json(){return when(this.text(),function(text){return JSON.parse(text);});};function blobText(body){return new PromiseObj(function(resolve){var reader=new FileReader();reader.readAsText(body);reader.onload=function(){resolve(reader.result);};});}function isBlobText(body){return body.type.indexOf('text')===0||body.type.indexOf('json')!==-1;}/**
 * HTTP Request.
 */var Request=function Request(options$$1){this.body=null;this.params={};assign(this,options$$1,{method:toUpper(options$$1.method||'GET')});if(!(this.headers instanceof Headers)){this.headers=new Headers(this.headers);}};Request.prototype.getUrl=function getUrl(){return Url(this);};Request.prototype.getBody=function getBody(){return this.body;};Request.prototype.respondWith=function respondWith(body,options$$1){return new Response(body,assign(options$$1||{},{url:this.getUrl()}));};/**
 * Service for sending network requests.
 */var COMMON_HEADERS={'Accept':'application/json, text/plain, */*'};var JSON_CONTENT_TYPE={'Content-Type':'application/json;charset=utf-8'};function Http(options$$1){var self=this||{},client=Client(self.$vm);defaults(options$$1||{},self.$options,Http.options);Http.interceptors.forEach(function(handler){client.use(handler);});return client(new Request(options$$1)).then(function(response){return response.ok?response:PromiseObj.reject(response);},function(response){if(response instanceof Error){error(response);}return PromiseObj.reject(response);});}Http.options={};Http.headers={put:JSON_CONTENT_TYPE,post:JSON_CONTENT_TYPE,patch:JSON_CONTENT_TYPE,delete:JSON_CONTENT_TYPE,common:COMMON_HEADERS,custom:{}};Http.interceptors=[before,method,body,jsonp,header,cors];['get','delete','head','jsonp'].forEach(function(method$$1){Http[method$$1]=function(url,options$$1){return this(assign(options$$1||{},{url:url,method:method$$1}));};});['post','put','patch'].forEach(function(method$$1){Http[method$$1]=function(url,body$$1,options$$1){return this(assign(options$$1||{},{url:url,method:method$$1,body:body$$1}));};});/**
 * Service for interacting with RESTful services.
 */function Resource(url,params,actions,options$$1){var self=this||{},resource={};actions=assign({},Resource.actions,actions);each(actions,function(action,name){action=merge({url:url,params:assign({},params)},options$$1,action);resource[name]=function(){return(self.$http||Http)(opts(action,arguments));};});return resource;}function opts(action,args){var options$$1=assign({},action),params={},body;switch(args.length){case 2:params=args[0];body=args[1];break;case 1:if(/^(POST|PUT|PATCH)$/i.test(options$$1.method)){body=args[0];}else{params=args[0];}break;case 0:break;default:throw'Expected up to 2 arguments [params, body], got '+args.length+' arguments';}options$$1.body=body;options$$1.params=assign({},options$$1.params,params);return options$$1;}Resource.actions={get:{method:'GET'},save:{method:'POST'},query:{method:'GET'},update:{method:'PUT'},remove:{method:'DELETE'},delete:{method:'DELETE'}};/**
 * Install plugin.
 */function plugin(Vue){if(plugin.installed){return;}Util(Vue);Vue.url=Url;Vue.http=Http;Vue.resource=Resource;Vue.Promise=PromiseObj;(0,_defineProperties2.default)(Vue.prototype,{$url:{get:function get(){return options(Vue.url,this,this.$options.url);}},$http:{get:function get(){return options(Vue.http,this,this.$options.http);}},$resource:{get:function get(){return Vue.resource.bind(this);}},$promise:{get:function get(){var this$1=this;return function(executor){return new Vue.Promise(executor,this$1);};}}});}if(typeof window!=='undefined'&&window.Vue){window.Vue.use(plugin);}module.exports=plugin;},{"got":1}],"vue-touch":[function(require,module,exports){;(function(){var vueTouch={};var Hammer=typeof require==='function'?require('hammerjs'):window.Hammer;var gestures=['tap','pan','pinch','press','rotate','swipe'];var directions=['up','down','left','right','horizontal','vertical','all'];var customEvents={};if(!Hammer){throw new Error('[vue-touch] cannot locate Hammer.js.');}// exposed global options
vueTouch.config={};vueTouch.install=function(Vue){Vue.directive('touch',{isFn:true,acceptStatement:true,priority:Vue.directive('on').priority,bind:function bind(){if(!this.el.hammer){this.el.hammer=new Hammer.Manager(this.el);}var mc=this.mc=this.el.hammer;// determine event type
var event=this.arg;if(!event){console.warn('[vue-touch] event type argument is required.');}var recognizerType,recognizer;if(customEvents[event]){// custom event
var custom=customEvents[event];recognizerType=custom.type;recognizer=new Hammer[capitalize(recognizerType)](custom);recognizer.recognizeWith(mc.recognizers);mc.add(recognizer);}else{// built-in event
for(var i=0;i<gestures.length;i++){if(event.indexOf(gestures[i])===0){recognizerType=gestures[i];break;}}if(!recognizerType){console.warn('[vue-touch] invalid event type: '+event);return;}recognizer=mc.get(recognizerType);if(!recognizer){// add recognizer
recognizer=new Hammer[capitalize(recognizerType)]();// make sure multiple recognizers work together...
recognizer.recognizeWith(mc.recognizers);mc.add(recognizer);}// apply global options
var globalOptions=vueTouch.config[recognizerType];if(globalOptions){guardDirections(globalOptions);recognizer.set(globalOptions);}// apply local options
var localOptions=this.el.hammerOptions&&this.el.hammerOptions[recognizerType];if(localOptions){guardDirections(localOptions);recognizer.set(localOptions);}}this.recognizer=recognizer;},update:function update(fn){var mc=this.mc;var event=this.arg;// teardown old handler
if(this.handler){mc.off(event,this.handler);}if(typeof fn!=='function'){this.handler=null;console.warn('[vue-touch] invalid handler function for v-touch: '+this.arg+'="'+this.descriptor.raw);}else{mc.on(event,this.handler=fn);}},unbind:function unbind(){if(this.handler){this.mc.off(this.arg,this.handler);}if(!(0,_keys2.default)(this.mc.handlers).length){this.mc.destroy();this.el.hammer=null;}}});Vue.directive('touch-options',{priority:Vue.directive('on').priority+1,update:function update(options){var opts=this.el.hammerOptions||(this.el.hammerOptions={});if(!this.arg){console.warn('[vue-touch] recognizer type argument for v-touch-options is required.');}else{opts[this.arg]=options;}}});};/**
   * Register a custom event.
   *
   * @param {String} event
   * @param {Object} options - a Hammer.js recognizer option object.
   *                           required fields:
   *                           - type: the base recognizer to use for this event
   */vueTouch.registerCustomEvent=function(event,options){options.event=event;customEvents[event]=options;};function capitalize(str){return str.charAt(0).toUpperCase()+str.slice(1);}function guardDirections(options){var dir=options.direction;if(typeof dir==='string'){var hammerDirection='DIRECTION_'+dir.toUpperCase();if(directions.indexOf(dir)>-1&&Hammer.hasOwnProperty(hammerDirection)){options.direction=Hammer[hammerDirection];}else{console.warn('[vue-touch] invalid direction: '+dir);}}}if((typeof exports==="undefined"?"undefined":(0,_typeof3.default)(exports))=="object"){module.exports=vueTouch;}else if(typeof define=="function"&&define.amd){define([],function(){return vueTouch;});}else if(window.Vue){window.VueTouch=vueTouch;Vue.use(vueTouch);}})();},{"hammerjs":2}],"vue":[function(require,module,exports){(function(process,global){/*!
 * Vue.js v2.2.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */'use strict';/*  *//**
 * Convert a value to a string that is actually rendered.
 */function _toString(val){return val==null?'':(typeof val==="undefined"?"undefined":(0,_typeof3.default)(val))==='object'?(0,_stringify2.default)(val,null,2):String(val);}/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */function toNumber(val){var n=parseFloat(val);return isNaN(n)?val:n;}/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */function makeMap(str,expectsLowerCase){var map=(0,_create2.default)(null);var list=str.split(',');for(var i=0;i<list.length;i++){map[list[i]]=true;}return expectsLowerCase?function(val){return map[val.toLowerCase()];}:function(val){return map[val];};}/**
 * Check if a tag is a built-in tag.
 */var isBuiltInTag=makeMap('slot,component',true);/**
 * Remove an item from an array
 */function remove(arr,item){if(arr.length){var index=arr.indexOf(item);if(index>-1){return arr.splice(index,1);}}}/**
 * Check whether the object has the property.
 */var hasOwnProperty=Object.prototype.hasOwnProperty;function hasOwn(obj,key){return hasOwnProperty.call(obj,key);}/**
 * Check if value is primitive
 */function isPrimitive(value){return typeof value==='string'||typeof value==='number';}/**
 * Create a cached version of a pure function.
 */function cached(fn){var cache=(0,_create2.default)(null);return function cachedFn(str){var hit=cache[str];return hit||(cache[str]=fn(str));};}/**
 * Camelize a hyphen-delimited string.
 */var camelizeRE=/-(\w)/g;var camelize=cached(function(str){return str.replace(camelizeRE,function(_,c){return c?c.toUpperCase():'';});});/**
 * Capitalize a string.
 */var capitalize=cached(function(str){return str.charAt(0).toUpperCase()+str.slice(1);});/**
 * Hyphenate a camelCase string.
 */var hyphenateRE=/([^-])([A-Z])/g;var hyphenate=cached(function(str){return str.replace(hyphenateRE,'$1-$2').replace(hyphenateRE,'$1-$2').toLowerCase();});/**
 * Simple bind, faster than native
 */function bind(fn,ctx){function boundFn(a){var l=arguments.length;return l?l>1?fn.apply(ctx,arguments):fn.call(ctx,a):fn.call(ctx);}// record original fn length
boundFn._length=fn.length;return boundFn;}/**
 * Convert an Array-like object to a real Array.
 */function toArray(list,start){start=start||0;var i=list.length-start;var ret=new Array(i);while(i--){ret[i]=list[i+start];}return ret;}/**
 * Mix properties into target object.
 */function extend(to,_from){for(var key in _from){to[key]=_from[key];}return to;}/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */function isObject(obj){return obj!==null&&(typeof obj==="undefined"?"undefined":(0,_typeof3.default)(obj))==='object';}/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */var toString=Object.prototype.toString;var OBJECT_STRING='[object Object]';function isPlainObject(obj){return toString.call(obj)===OBJECT_STRING;}/**
 * Merge an Array of Objects into a single Object.
 */function toObject(arr){var res={};for(var i=0;i<arr.length;i++){if(arr[i]){extend(res,arr[i]);}}return res;}/**
 * Perform no operation.
 */function noop(){}/**
 * Always return false.
 */var no=function no(){return false;};/**
 * Return same value
 */var identity=function identity(_){return _;};/**
 * Generate a static keys string from compiler modules.
 */function genStaticKeys(modules){return modules.reduce(function(keys,m){return keys.concat(m.staticKeys||[]);},[]).join(',');}/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */function looseEqual(a,b){var isObjectA=isObject(a);var isObjectB=isObject(b);if(isObjectA&&isObjectB){try{return(0,_stringify2.default)(a)===(0,_stringify2.default)(b);}catch(e){// possible circular reference
return a===b;}}else if(!isObjectA&&!isObjectB){return String(a)===String(b);}else{return false;}}function looseIndexOf(arr,val){for(var i=0;i<arr.length;i++){if(looseEqual(arr[i],val)){return i;}}return-1;}/**
 * Ensure a function is called only once.
 */function once(fn){var called=false;return function(){if(!called){called=true;fn();}};}/*  */var config={/**
   * Option merge strategies (used in core/util/options)
   */optionMergeStrategies:(0,_create2.default)(null),/**
   * Whether to suppress warnings.
   */silent:false,/**
   * Show production mode tip message on boot?
   */productionTip:process.env.NODE_ENV!=='production',/**
   * Whether to enable devtools
   */devtools:process.env.NODE_ENV!=='production',/**
   * Whether to record perf
   */performance:false,/**
   * Error handler for watcher errors
   */errorHandler:null,/**
   * Ignore certain custom elements
   */ignoredElements:[],/**
   * Custom user key aliases for v-on
   */keyCodes:(0,_create2.default)(null),/**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */isReservedTag:no,/**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */isUnknownElement:no,/**
   * Get the namespace of an element
   */getTagNamespace:noop,/**
   * Parse the real tag name for the specific platform.
   */parsePlatformTagName:identity,/**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */mustUseProp:no,/**
   * List of asset types that a component can own.
   */_assetTypes:['component','directive','filter'],/**
   * List of lifecycle hooks.
   */_lifecycleHooks:['beforeCreate','created','beforeMount','mounted','beforeUpdate','updated','beforeDestroy','destroyed','activated','deactivated'],/**
   * Max circular updates allowed in a scheduler flush cycle.
   */_maxUpdateCount:100};/*  */var emptyObject=(0,_freeze2.default)({});/**
 * Check if a string starts with $ or _
 */function isReserved(str){var c=(str+'').charCodeAt(0);return c===0x24||c===0x5F;}/**
 * Define a property.
 */function def(obj,key,val,enumerable){(0,_defineProperty2.default)(obj,key,{value:val,enumerable:!!enumerable,writable:true,configurable:true});}/**
 * Parse simple path.
 */var bailRE=/[^\w.$]/;function parsePath(path){if(bailRE.test(path)){return;}var segments=path.split('.');return function(obj){for(var i=0;i<segments.length;i++){if(!obj){return;}obj=obj[segments[i]];}return obj;};}/*  *//* globals MutationObserver */// can we use __proto__?
var hasProto='__proto__'in{};// Browser environment sniffing
var inBrowser=typeof window!=='undefined';var UA=inBrowser&&window.navigator.userAgent.toLowerCase();var isIE=UA&&/msie|trident/.test(UA);var isIE9=UA&&UA.indexOf('msie 9.0')>0;var isEdge=UA&&UA.indexOf('edge/')>0;var isAndroid=UA&&UA.indexOf('android')>0;var isIOS=UA&&/iphone|ipad|ipod|ios/.test(UA);var isChrome=UA&&/chrome\/\d+/.test(UA)&&!isEdge;// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;var isServerRendering=function isServerRendering(){if(_isServer===undefined){/* istanbul ignore if */if(!inBrowser&&typeof global!=='undefined'){// detect presence of vue-server-renderer and avoid
// Webpack shimming the process
_isServer=global['process'].env.VUE_ENV==='server';}else{_isServer=false;}}return _isServer;};// detect devtools
var devtools=inBrowser&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;/* istanbul ignore next */function isNative(Ctor){return /native code/.test(Ctor.toString());}var hasSymbol=typeof _symbol2.default!=='undefined'&&isNative(_symbol2.default)&&typeof Reflect!=='undefined'&&isNative(_ownKeys2.default);/**
 * Defer a task to execute it asynchronously.
 */var nextTick=function(){var callbacks=[];var pending=false;var timerFunc;function nextTickHandler(){pending=false;var copies=callbacks.slice(0);callbacks.length=0;for(var i=0;i<copies.length;i++){copies[i]();}}// the nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore if */if(typeof _promise2.default!=='undefined'&&isNative(_promise2.default)){var p=_promise2.default.resolve();var logError=function logError(err){console.error(err);};timerFunc=function timerFunc(){p.then(nextTickHandler).catch(logError);// in problematic UIWebViews, Promise.then doesn't completely break, but
// it can get stuck in a weird state where callbacks are pushed into the
// microtask queue but the queue isn't being flushed, until the browser
// needs to do some other work, e.g. handle a timer. Therefore we can
// "force" the microtask queue to be flushed by adding an empty timer.
if(isIOS){setTimeout(noop);}};}else if(typeof MutationObserver!=='undefined'&&(isNative(MutationObserver)||// PhantomJS and iOS 7.x
MutationObserver.toString()==='[object MutationObserverConstructor]')){// use MutationObserver where native Promise is not available,
// e.g. PhantomJS IE11, iOS7, Android 4.4
var counter=1;var observer=new MutationObserver(nextTickHandler);var textNode=document.createTextNode(String(counter));observer.observe(textNode,{characterData:true});timerFunc=function timerFunc(){counter=(counter+1)%2;textNode.data=String(counter);};}else{// fallback to setTimeout
/* istanbul ignore next */timerFunc=function timerFunc(){setTimeout(nextTickHandler,0);};}return function queueNextTick(cb,ctx){var _resolve;callbacks.push(function(){if(cb){cb.call(ctx);}if(_resolve){_resolve(ctx);}});if(!pending){pending=true;timerFunc();}if(!cb&&typeof _promise2.default!=='undefined'){return new _promise2.default(function(resolve){_resolve=resolve;});}};}();var _Set;/* istanbul ignore if */if(typeof _set2.default!=='undefined'&&isNative(_set2.default)){// use native Set when available.
_Set=_set2.default;}else{// a non-standard Set polyfill that only works with primitive keys.
_Set=function(){function Set(){this.set=(0,_create2.default)(null);}Set.prototype.has=function has(key){return this.set[key]===true;};Set.prototype.add=function add(key){this.set[key]=true;};Set.prototype.clear=function clear(){this.set=(0,_create2.default)(null);};return Set;}();}var warn=noop;var tip=noop;var formatComponentName;if(process.env.NODE_ENV!=='production'){var hasConsole=typeof console!=='undefined';var classifyRE=/(?:^|[-_])(\w)/g;var classify=function classify(str){return str.replace(classifyRE,function(c){return c.toUpperCase();}).replace(/[-_]/g,'');};warn=function warn(msg,vm){if(hasConsole&&!config.silent){console.error("[Vue warn]: "+msg+" "+(vm?formatLocation(formatComponentName(vm)):''));}};tip=function tip(msg,vm){if(hasConsole&&!config.silent){console.warn("[Vue tip]: "+msg+" "+(vm?formatLocation(formatComponentName(vm)):''));}};formatComponentName=function formatComponentName(vm,includeFile){if(vm.$root===vm){return'<Root>';}var name=typeof vm==='function'&&vm.options?vm.options.name:vm._isVue?vm.$options.name||vm.$options._componentTag:vm.name;var file=vm._isVue&&vm.$options.__file;if(!name&&file){var match=file.match(/([^/\\]+)\.vue$/);name=match&&match[1];}return(name?"<"+classify(name)+">":"<Anonymous>")+(file&&includeFile!==false?" at "+file:'');};var formatLocation=function formatLocation(str){if(str==="<Anonymous>"){str+=" - use the \"name\" option for better debugging messages.";}return"\n(found in "+str+")";};}/*  */var uid$1=0;/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */var Dep=function Dep(){this.id=uid$1++;this.subs=[];};Dep.prototype.addSub=function addSub(sub){this.subs.push(sub);};Dep.prototype.removeSub=function removeSub(sub){remove(this.subs,sub);};Dep.prototype.depend=function depend(){if(Dep.target){Dep.target.addDep(this);}};Dep.prototype.notify=function notify(){// stabilize the subscriber list first
var subs=this.subs.slice();for(var i=0,l=subs.length;i<l;i++){subs[i].update();}};// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target=null;var targetStack=[];function pushTarget(_target){if(Dep.target){targetStack.push(Dep.target);}Dep.target=_target;}function popTarget(){Dep.target=targetStack.pop();}/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */var arrayProto=Array.prototype;var arrayMethods=(0,_create2.default)(arrayProto);['push','pop','shift','unshift','splice','sort','reverse'].forEach(function(method){// cache original method
var original=arrayProto[method];def(arrayMethods,method,function mutator(){var arguments$1=arguments;// avoid leaking arguments:
// http://jsperf.com/closure-with-arguments
var i=arguments.length;var args=new Array(i);while(i--){args[i]=arguments$1[i];}var result=original.apply(this,args);var ob=this.__ob__;var inserted;switch(method){case'push':inserted=args;break;case'unshift':inserted=args;break;case'splice':inserted=args.slice(2);break;}if(inserted){ob.observeArray(inserted);}// notify change
ob.dep.notify();return result;});});/*  */var arrayKeys=(0,_getOwnPropertyNames2.default)(arrayMethods);/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */var observerState={shouldConvert:true,isSettingProps:false};/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */var Observer=function Observer(value){this.value=value;this.dep=new Dep();this.vmCount=0;def(value,'__ob__',this);if(Array.isArray(value)){var augment=hasProto?protoAugment:copyAugment;augment(value,arrayMethods,arrayKeys);this.observeArray(value);}else{this.walk(value);}};/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */Observer.prototype.walk=function walk(obj){var keys=(0,_keys2.default)(obj);for(var i=0;i<keys.length;i++){defineReactive$$1(obj,keys[i],obj[keys[i]]);}};/**
 * Observe a list of Array items.
 */Observer.prototype.observeArray=function observeArray(items){for(var i=0,l=items.length;i<l;i++){observe(items[i]);}};// helpers
/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */function protoAugment(target,src){/* eslint-disable no-proto */target.__proto__=src;/* eslint-enable no-proto */}/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *//* istanbul ignore next */function copyAugment(target,src,keys){for(var i=0,l=keys.length;i<l;i++){var key=keys[i];def(target,key,src[key]);}}/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */function observe(value,asRootData){if(!isObject(value)){return;}var ob;if(hasOwn(value,'__ob__')&&value.__ob__ instanceof Observer){ob=value.__ob__;}else if(observerState.shouldConvert&&!isServerRendering()&&(Array.isArray(value)||isPlainObject(value))&&(0,_isExtensible2.default)(value)&&!value._isVue){ob=new Observer(value);}if(asRootData&&ob){ob.vmCount++;}return ob;}/**
 * Define a reactive property on an Object.
 */function defineReactive$$1(obj,key,val,customSetter){var dep=new Dep();var property=(0,_getOwnPropertyDescriptor2.default)(obj,key);if(property&&property.configurable===false){return;}// cater for pre-defined getter/setters
var getter=property&&property.get;var setter=property&&property.set;var childOb=observe(val);(0,_defineProperty2.default)(obj,key,{enumerable:true,configurable:true,get:function reactiveGetter(){var value=getter?getter.call(obj):val;if(Dep.target){dep.depend();if(childOb){childOb.dep.depend();}if(Array.isArray(value)){dependArray(value);}}return value;},set:function reactiveSetter(newVal){var value=getter?getter.call(obj):val;/* eslint-disable no-self-compare */if(newVal===value||newVal!==newVal&&value!==value){return;}/* eslint-enable no-self-compare */if(process.env.NODE_ENV!=='production'&&customSetter){customSetter();}if(setter){setter.call(obj,newVal);}else{val=newVal;}childOb=observe(newVal);dep.notify();}});}/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */function set(target,key,val){if(Array.isArray(target)){target.length=Math.max(target.length,key);target.splice(key,1,val);return val;}if(hasOwn(target,key)){target[key]=val;return val;}var ob=target.__ob__;if(target._isVue||ob&&ob.vmCount){process.env.NODE_ENV!=='production'&&warn('Avoid adding reactive properties to a Vue instance or its root $data '+'at runtime - declare it upfront in the data option.');return val;}if(!ob){target[key]=val;return val;}defineReactive$$1(ob.value,key,val);ob.dep.notify();return val;}/**
 * Delete a property and trigger change if necessary.
 */function del(target,key){if(Array.isArray(target)){target.splice(key,1);return;}var ob=target.__ob__;if(target._isVue||ob&&ob.vmCount){process.env.NODE_ENV!=='production'&&warn('Avoid deleting properties on a Vue instance or its root $data '+'- just set it to null.');return;}if(!hasOwn(target,key)){return;}delete target[key];if(!ob){return;}ob.dep.notify();}/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */function dependArray(value){for(var e=void 0,i=0,l=value.length;i<l;i++){e=value[i];e&&e.__ob__&&e.__ob__.dep.depend();if(Array.isArray(e)){dependArray(e);}}}/*  *//**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */var strats=config.optionMergeStrategies;/**
 * Options with restrictions
 */if(process.env.NODE_ENV!=='production'){strats.el=strats.propsData=function(parent,child,vm,key){if(!vm){warn("option \""+key+"\" can only be used during instance "+'creation with the `new` keyword.');}return defaultStrat(parent,child);};}/**
 * Helper that recursively merges two data objects together.
 */function mergeData(to,from){if(!from){return to;}var key,toVal,fromVal;var keys=(0,_keys2.default)(from);for(var i=0;i<keys.length;i++){key=keys[i];toVal=to[key];fromVal=from[key];if(!hasOwn(to,key)){set(to,key,fromVal);}else if(isPlainObject(toVal)&&isPlainObject(fromVal)){mergeData(toVal,fromVal);}}return to;}/**
 * Data
 */strats.data=function(parentVal,childVal,vm){if(!vm){// in a Vue.extend merge, both should be functions
if(!childVal){return parentVal;}if(typeof childVal!=='function'){process.env.NODE_ENV!=='production'&&warn('The "data" option should be a function '+'that returns a per-instance value in component '+'definitions.',vm);return parentVal;}if(!parentVal){return childVal;}// when parentVal & childVal are both present,
// we need to return a function that returns the
// merged result of both functions... no need to
// check if parentVal is a function here because
// it has to be a function to pass previous merges.
return function mergedDataFn(){return mergeData(childVal.call(this),parentVal.call(this));};}else if(parentVal||childVal){return function mergedInstanceDataFn(){// instance merge
var instanceData=typeof childVal==='function'?childVal.call(vm):childVal;var defaultData=typeof parentVal==='function'?parentVal.call(vm):undefined;if(instanceData){return mergeData(instanceData,defaultData);}else{return defaultData;}};}};/**
 * Hooks and props are merged as arrays.
 */function mergeHook(parentVal,childVal){return childVal?parentVal?parentVal.concat(childVal):Array.isArray(childVal)?childVal:[childVal]:parentVal;}config._lifecycleHooks.forEach(function(hook){strats[hook]=mergeHook;});/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */function mergeAssets(parentVal,childVal){var res=(0,_create2.default)(parentVal||null);return childVal?extend(res,childVal):res;}config._assetTypes.forEach(function(type){strats[type+'s']=mergeAssets;});/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */strats.watch=function(parentVal,childVal){/* istanbul ignore if */if(!childVal){return(0,_create2.default)(parentVal||null);}if(!parentVal){return childVal;}var ret={};extend(ret,parentVal);for(var key in childVal){var parent=ret[key];var child=childVal[key];if(parent&&!Array.isArray(parent)){parent=[parent];}ret[key]=parent?parent.concat(child):[child];}return ret;};/**
 * Other object hashes.
 */strats.props=strats.methods=strats.computed=function(parentVal,childVal){if(!childVal){return(0,_create2.default)(parentVal||null);}if(!parentVal){return childVal;}var ret=(0,_create2.default)(null);extend(ret,parentVal);extend(ret,childVal);return ret;};/**
 * Default strategy.
 */var defaultStrat=function defaultStrat(parentVal,childVal){return childVal===undefined?parentVal:childVal;};/**
 * Validate component names
 */function checkComponents(options){for(var key in options.components){var lower=key.toLowerCase();if(isBuiltInTag(lower)||config.isReservedTag(lower)){warn('Do not use built-in or reserved HTML elements as component '+'id: '+key);}}}/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */function normalizeProps(options){var props=options.props;if(!props){return;}var res={};var i,val,name;if(Array.isArray(props)){i=props.length;while(i--){val=props[i];if(typeof val==='string'){name=camelize(val);res[name]={type:null};}else if(process.env.NODE_ENV!=='production'){warn('props must be strings when using array syntax.');}}}else if(isPlainObject(props)){for(var key in props){val=props[key];name=camelize(key);res[name]=isPlainObject(val)?val:{type:val};}}options.props=res;}/**
 * Normalize raw function directives into object format.
 */function normalizeDirectives(options){var dirs=options.directives;if(dirs){for(var key in dirs){var def=dirs[key];if(typeof def==='function'){dirs[key]={bind:def,update:def};}}}}/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */function mergeOptions(parent,child,vm){if(process.env.NODE_ENV!=='production'){checkComponents(child);}normalizeProps(child);normalizeDirectives(child);var extendsFrom=child.extends;if(extendsFrom){parent=typeof extendsFrom==='function'?mergeOptions(parent,extendsFrom.options,vm):mergeOptions(parent,extendsFrom,vm);}if(child.mixins){for(var i=0,l=child.mixins.length;i<l;i++){var mixin=child.mixins[i];if(mixin.prototype instanceof Vue$3){mixin=mixin.options;}parent=mergeOptions(parent,mixin,vm);}}var options={};var key;for(key in parent){mergeField(key);}for(key in child){if(!hasOwn(parent,key)){mergeField(key);}}function mergeField(key){var strat=strats[key]||defaultStrat;options[key]=strat(parent[key],child[key],vm,key);}return options;}/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */function resolveAsset(options,type,id,warnMissing){/* istanbul ignore if */if(typeof id!=='string'){return;}var assets=options[type];// check local registration variations first
if(hasOwn(assets,id)){return assets[id];}var camelizedId=camelize(id);if(hasOwn(assets,camelizedId)){return assets[camelizedId];}var PascalCaseId=capitalize(camelizedId);if(hasOwn(assets,PascalCaseId)){return assets[PascalCaseId];}// fallback to prototype chain
var res=assets[id]||assets[camelizedId]||assets[PascalCaseId];if(process.env.NODE_ENV!=='production'&&warnMissing&&!res){warn('Failed to resolve '+type.slice(0,-1)+': '+id,options);}return res;}/*  */function validateProp(key,propOptions,propsData,vm){var prop=propOptions[key];var absent=!hasOwn(propsData,key);var value=propsData[key];// handle boolean props
if(isType(Boolean,prop.type)){if(absent&&!hasOwn(prop,'default')){value=false;}else if(!isType(String,prop.type)&&(value===''||value===hyphenate(key))){value=true;}}// check default value
if(value===undefined){value=getPropDefaultValue(vm,prop,key);// since the default value is a fresh copy,
// make sure to observe it.
var prevShouldConvert=observerState.shouldConvert;observerState.shouldConvert=true;observe(value);observerState.shouldConvert=prevShouldConvert;}if(process.env.NODE_ENV!=='production'){assertProp(prop,key,value,vm,absent);}return value;}/**
 * Get the default value of a prop.
 */function getPropDefaultValue(vm,prop,key){// no default, return undefined
if(!hasOwn(prop,'default')){return undefined;}var def=prop.default;// warn against non-factory defaults for Object & Array
if(process.env.NODE_ENV!=='production'&&isObject(def)){warn('Invalid default value for prop "'+key+'": '+'Props with type Object/Array must use a factory function '+'to return the default value.',vm);}// the raw prop value was also undefined from previous render,
// return previous default value to avoid unnecessary watcher trigger
if(vm&&vm.$options.propsData&&vm.$options.propsData[key]===undefined&&vm._props[key]!==undefined){return vm._props[key];}// call factory function for non-Function types
// a value is Function if its prototype is function even across different execution context
return typeof def==='function'&&getType(prop.type)!=='Function'?def.call(vm):def;}/**
 * Assert whether a prop is valid.
 */function assertProp(prop,name,value,vm,absent){if(prop.required&&absent){warn('Missing required prop: "'+name+'"',vm);return;}if(value==null&&!prop.required){return;}var type=prop.type;var valid=!type||type===true;var expectedTypes=[];if(type){if(!Array.isArray(type)){type=[type];}for(var i=0;i<type.length&&!valid;i++){var assertedType=assertType(value,type[i]);expectedTypes.push(assertedType.expectedType||'');valid=assertedType.valid;}}if(!valid){warn('Invalid prop: type check failed for prop "'+name+'".'+' Expected '+expectedTypes.map(capitalize).join(', ')+', got '+Object.prototype.toString.call(value).slice(8,-1)+'.',vm);return;}var validator=prop.validator;if(validator){if(!validator(value)){warn('Invalid prop: custom validator check failed for prop "'+name+'".',vm);}}}/**
 * Assert the type of a value
 */function assertType(value,type){var valid;var expectedType=getType(type);if(expectedType==='String'){valid=(typeof value==="undefined"?"undefined":(0,_typeof3.default)(value))===(expectedType='string');}else if(expectedType==='Number'){valid=(typeof value==="undefined"?"undefined":(0,_typeof3.default)(value))===(expectedType='number');}else if(expectedType==='Boolean'){valid=(typeof value==="undefined"?"undefined":(0,_typeof3.default)(value))===(expectedType='boolean');}else if(expectedType==='Function'){valid=(typeof value==="undefined"?"undefined":(0,_typeof3.default)(value))===(expectedType='function');}else if(expectedType==='Object'){valid=isPlainObject(value);}else if(expectedType==='Array'){valid=Array.isArray(value);}else{valid=value instanceof type;}return{valid:valid,expectedType:expectedType};}/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */function getType(fn){var match=fn&&fn.toString().match(/^\s*function (\w+)/);return match&&match[1];}function isType(type,fn){if(!Array.isArray(fn)){return getType(fn)===getType(type);}for(var i=0,len=fn.length;i<len;i++){if(getType(fn[i])===getType(type)){return true;}}/* istanbul ignore next */return false;}function handleError(err,vm,info){if(config.errorHandler){config.errorHandler.call(null,err,vm,info);}else{if(process.env.NODE_ENV!=='production'){warn("Error in "+info+":",vm);}/* istanbul ignore else */if(inBrowser&&typeof console!=='undefined'){console.error(err);}else{throw err;}}}/* not type checking this file because flow doesn't play well with Proxy */var initProxy;if(process.env.NODE_ENV!=='production'){var allowedGlobals=makeMap('Infinity,undefined,NaN,isFinite,isNaN,'+'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,'+'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,'+'require'// for Webpack/Browserify
);var warnNonPresent=function warnNonPresent(target,key){warn("Property or method \""+key+"\" is not defined on the instance but "+"referenced during render. Make sure to declare reactive data "+"properties in the data option.",target);};var hasProxy=typeof Proxy!=='undefined'&&Proxy.toString().match(/native code/);if(hasProxy){var isBuiltInModifier=makeMap('stop,prevent,self,ctrl,shift,alt,meta');config.keyCodes=new Proxy(config.keyCodes,{set:function set(target,key,value){if(isBuiltInModifier(key)){warn("Avoid overwriting built-in modifier in config.keyCodes: ."+key);return false;}else{target[key]=value;return true;}}});}var hasHandler={has:function has(target,key){var has=key in target;var isAllowed=allowedGlobals(key)||key.charAt(0)==='_';if(!has&&!isAllowed){warnNonPresent(target,key);}return has||!isAllowed;}};var getHandler={get:function get(target,key){if(typeof key==='string'&&!(key in target)){warnNonPresent(target,key);}return target[key];}};initProxy=function initProxy(vm){if(hasProxy){// determine which proxy handler to use
var options=vm.$options;var handlers=options.render&&options.render._withStripped?getHandler:hasHandler;vm._renderProxy=new Proxy(vm,handlers);}else{vm._renderProxy=vm;}};}var mark;var measure;if(process.env.NODE_ENV!=='production'){var perf=inBrowser&&window.performance;/* istanbul ignore if */if(perf&&perf.mark&&perf.measure&&perf.clearMarks&&perf.clearMeasures){mark=function mark(tag){return perf.mark(tag);};measure=function measure(name,startTag,endTag){perf.measure(name,startTag,endTag);perf.clearMarks(startTag);perf.clearMarks(endTag);perf.clearMeasures(name);};}}/*  */var VNode=function VNode(tag,data,children,text,elm,context,componentOptions){this.tag=tag;this.data=data;this.children=children;this.text=text;this.elm=elm;this.ns=undefined;this.context=context;this.functionalContext=undefined;this.key=data&&data.key;this.componentOptions=componentOptions;this.componentInstance=undefined;this.parent=undefined;this.raw=false;this.isStatic=false;this.isRootInsert=true;this.isComment=false;this.isCloned=false;this.isOnce=false;};var prototypeAccessors={child:{}};// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */prototypeAccessors.child.get=function(){return this.componentInstance;};(0,_defineProperties2.default)(VNode.prototype,prototypeAccessors);var createEmptyVNode=function createEmptyVNode(){var node=new VNode();node.text='';node.isComment=true;return node;};function createTextVNode(val){return new VNode(undefined,undefined,undefined,String(val));}// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode){var cloned=new VNode(vnode.tag,vnode.data,vnode.children,vnode.text,vnode.elm,vnode.context,vnode.componentOptions);cloned.ns=vnode.ns;cloned.isStatic=vnode.isStatic;cloned.key=vnode.key;cloned.isCloned=true;return cloned;}function cloneVNodes(vnodes){var len=vnodes.length;var res=new Array(len);for(var i=0;i<len;i++){res[i]=cloneVNode(vnodes[i]);}return res;}/*  */var normalizeEvent=cached(function(name){var once$$1=name.charAt(0)==='~';// Prefixed last, checked first
name=once$$1?name.slice(1):name;var capture=name.charAt(0)==='!';name=capture?name.slice(1):name;return{name:name,once:once$$1,capture:capture};});function createFnInvoker(fns){function invoker(){var arguments$1=arguments;var fns=invoker.fns;if(Array.isArray(fns)){for(var i=0;i<fns.length;i++){fns[i].apply(null,arguments$1);}}else{// return handler return value for single handlers
return fns.apply(null,arguments);}}invoker.fns=fns;return invoker;}function updateListeners(on,oldOn,add,remove$$1,vm){var name,cur,old,event;for(name in on){cur=on[name];old=oldOn[name];event=normalizeEvent(name);if(!cur){process.env.NODE_ENV!=='production'&&warn("Invalid handler for event \""+event.name+"\": got "+String(cur),vm);}else if(!old){if(!cur.fns){cur=on[name]=createFnInvoker(cur);}add(event.name,cur,event.once,event.capture);}else if(cur!==old){old.fns=cur;on[name]=old;}}for(name in oldOn){if(!on[name]){event=normalizeEvent(name);remove$$1(event.name,oldOn[name],event.capture);}}}/*  */function mergeVNodeHook(def,hookKey,hook){var invoker;var oldHook=def[hookKey];function wrappedHook(){hook.apply(this,arguments);// important: remove merged hook to ensure it's called only once
// and prevent memory leak
remove(invoker.fns,wrappedHook);}if(!oldHook){// no existing hook
invoker=createFnInvoker([wrappedHook]);}else{/* istanbul ignore if */if(oldHook.fns&&oldHook.merged){// already a merged invoker
invoker=oldHook;invoker.fns.push(wrappedHook);}else{// existing plain hook
invoker=createFnInvoker([oldHook,wrappedHook]);}}invoker.merged=true;def[hookKey]=invoker;}/*  */// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children){for(var i=0;i<children.length;i++){if(Array.isArray(children[i])){return Array.prototype.concat.apply([],children);}}return children;}// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children){return isPrimitive(children)?[createTextVNode(children)]:Array.isArray(children)?normalizeArrayChildren(children):undefined;}function normalizeArrayChildren(children,nestedIndex){var res=[];var i,c,last;for(i=0;i<children.length;i++){c=children[i];if(c==null||typeof c==='boolean'){continue;}last=res[res.length-1];//  nested
if(Array.isArray(c)){res.push.apply(res,normalizeArrayChildren(c,(nestedIndex||'')+"_"+i));}else if(isPrimitive(c)){if(last&&last.text){last.text+=String(c);}else if(c!==''){// convert primitive to vnode
res.push(createTextVNode(c));}}else{if(c.text&&last&&last.text){res[res.length-1]=createTextVNode(last.text+c.text);}else{// default key for nested array children (likely generated by v-for)
if(c.tag&&c.key==null&&nestedIndex!=null){c.key="__vlist"+nestedIndex+"_"+i+"__";}res.push(c);}}}return res;}/*  */function getFirstComponentChild(children){return children&&children.filter(function(c){return c&&c.componentOptions;})[0];}/*  */function initEvents(vm){vm._events=(0,_create2.default)(null);vm._hasHookEvent=false;// init parent attached events
var listeners=vm.$options._parentListeners;if(listeners){updateComponentListeners(vm,listeners);}}var target;function add(event,fn,once$$1){if(once$$1){target.$once(event,fn);}else{target.$on(event,fn);}}function remove$1(event,fn){target.$off(event,fn);}function updateComponentListeners(vm,listeners,oldListeners){target=vm;updateListeners(listeners,oldListeners||{},add,remove$1,vm);}function eventsMixin(Vue){var hookRE=/^hook:/;Vue.prototype.$on=function(event,fn){var this$1=this;var vm=this;if(Array.isArray(event)){for(var i=0,l=event.length;i<l;i++){this$1.$on(event[i],fn);}}else{(vm._events[event]||(vm._events[event]=[])).push(fn);// optimize hook:event cost by using a boolean flag marked at registration
// instead of a hash lookup
if(hookRE.test(event)){vm._hasHookEvent=true;}}return vm;};Vue.prototype.$once=function(event,fn){var vm=this;function on(){vm.$off(event,on);fn.apply(vm,arguments);}on.fn=fn;vm.$on(event,on);return vm;};Vue.prototype.$off=function(event,fn){var this$1=this;var vm=this;// all
if(!arguments.length){vm._events=(0,_create2.default)(null);return vm;}// array of events
if(Array.isArray(event)){for(var i$1=0,l=event.length;i$1<l;i$1++){this$1.$off(event[i$1],fn);}return vm;}// specific event
var cbs=vm._events[event];if(!cbs){return vm;}if(arguments.length===1){vm._events[event]=null;return vm;}// specific handler
var cb;var i=cbs.length;while(i--){cb=cbs[i];if(cb===fn||cb.fn===fn){cbs.splice(i,1);break;}}return vm;};Vue.prototype.$emit=function(event){var vm=this;var cbs=vm._events[event];if(cbs){cbs=cbs.length>1?toArray(cbs):cbs;var args=toArray(arguments,1);for(var i=0,l=cbs.length;i<l;i++){cbs[i].apply(vm,args);}}return vm;};}/*  *//**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */function resolveSlots(children,context){var slots={};if(!children){return slots;}var defaultSlot=[];var name,child;for(var i=0,l=children.length;i<l;i++){child=children[i];// named slots should only be respected if the vnode was rendered in the
// same context.
if((child.context===context||child.functionalContext===context)&&child.data&&(name=child.data.slot)){var slot=slots[name]||(slots[name]=[]);if(child.tag==='template'){slot.push.apply(slot,child.children);}else{slot.push(child);}}else{defaultSlot.push(child);}}// ignore whitespace
if(!defaultSlot.every(isWhitespace)){slots.default=defaultSlot;}return slots;}function isWhitespace(node){return node.isComment||node.text===' ';}function resolveScopedSlots(fns){var res={};for(var i=0;i<fns.length;i++){res[fns[i][0]]=fns[i][1];}return res;}/*  */var activeInstance=null;function initLifecycle(vm){var options=vm.$options;// locate first non-abstract parent
var parent=options.parent;if(parent&&!options.abstract){while(parent.$options.abstract&&parent.$parent){parent=parent.$parent;}parent.$children.push(vm);}vm.$parent=parent;vm.$root=parent?parent.$root:vm;vm.$children=[];vm.$refs={};vm._watcher=null;vm._inactive=null;vm._directInactive=false;vm._isMounted=false;vm._isDestroyed=false;vm._isBeingDestroyed=false;}function lifecycleMixin(Vue){Vue.prototype._update=function(vnode,hydrating){var vm=this;if(vm._isMounted){callHook(vm,'beforeUpdate');}var prevEl=vm.$el;var prevVnode=vm._vnode;var prevActiveInstance=activeInstance;activeInstance=vm;vm._vnode=vnode;// Vue.prototype.__patch__ is injected in entry points
// based on the rendering backend used.
if(!prevVnode){// initial render
vm.$el=vm.__patch__(vm.$el,vnode,hydrating,false/* removeOnly */,vm.$options._parentElm,vm.$options._refElm);}else{// updates
vm.$el=vm.__patch__(prevVnode,vnode);}activeInstance=prevActiveInstance;// update __vue__ reference
if(prevEl){prevEl.__vue__=null;}if(vm.$el){vm.$el.__vue__=vm;}// if parent is an HOC, update its $el as well
if(vm.$vnode&&vm.$parent&&vm.$vnode===vm.$parent._vnode){vm.$parent.$el=vm.$el;}// updated hook is called by the scheduler to ensure that children are
// updated in a parent's updated hook.
};Vue.prototype.$forceUpdate=function(){var vm=this;if(vm._watcher){vm._watcher.update();}};Vue.prototype.$destroy=function(){var vm=this;if(vm._isBeingDestroyed){return;}callHook(vm,'beforeDestroy');vm._isBeingDestroyed=true;// remove self from parent
var parent=vm.$parent;if(parent&&!parent._isBeingDestroyed&&!vm.$options.abstract){remove(parent.$children,vm);}// teardown watchers
if(vm._watcher){vm._watcher.teardown();}var i=vm._watchers.length;while(i--){vm._watchers[i].teardown();}// remove reference from data ob
// frozen object may not have observer.
if(vm._data.__ob__){vm._data.__ob__.vmCount--;}// call the last hook...
vm._isDestroyed=true;callHook(vm,'destroyed');// turn off all instance listeners.
vm.$off();// remove __vue__ reference
if(vm.$el){vm.$el.__vue__=null;}// invoke destroy hooks on current rendered tree
vm.__patch__(vm._vnode,null);};}function mountComponent(vm,el,hydrating){vm.$el=el;if(!vm.$options.render){vm.$options.render=createEmptyVNode;if(process.env.NODE_ENV!=='production'){/* istanbul ignore if */if(vm.$options.template&&vm.$options.template.charAt(0)!=='#'||vm.$options.el||el){warn('You are using the runtime-only build of Vue where the template '+'compiler is not available. Either pre-compile the templates into '+'render functions, or use the compiler-included build.',vm);}else{warn('Failed to mount component: template or render function not defined.',vm);}}}callHook(vm,'beforeMount');var updateComponent;/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){updateComponent=function updateComponent(){var name=vm._name;var id=vm._uid;var startTag="vue-perf-start:"+id;var endTag="vue-perf-end:"+id;mark(startTag);var vnode=vm._render();mark(endTag);measure(name+" render",startTag,endTag);mark(startTag);vm._update(vnode,hydrating);mark(endTag);measure(name+" patch",startTag,endTag);};}else{updateComponent=function updateComponent(){vm._update(vm._render(),hydrating);};}vm._watcher=new Watcher(vm,updateComponent,noop);hydrating=false;// manually mounted instance, call mounted on self
// mounted is called for render-created child components in its inserted hook
if(vm.$vnode==null){vm._isMounted=true;callHook(vm,'mounted');}return vm;}function updateChildComponent(vm,propsData,listeners,parentVnode,renderChildren){// determine whether component has slot children
// we need to do this before overwriting $options._renderChildren
var hasChildren=!!(renderChildren||// has new static slots
vm.$options._renderChildren||// has old static slots
parentVnode.data.scopedSlots||// has new scoped slots
vm.$scopedSlots!==emptyObject// has old scoped slots
);vm.$options._parentVnode=parentVnode;vm.$vnode=parentVnode;// update vm's placeholder node without re-render
if(vm._vnode){// update child tree's parent
vm._vnode.parent=parentVnode;}vm.$options._renderChildren=renderChildren;// update props
if(propsData&&vm.$options.props){observerState.shouldConvert=false;if(process.env.NODE_ENV!=='production'){observerState.isSettingProps=true;}var props=vm._props;var propKeys=vm.$options._propKeys||[];for(var i=0;i<propKeys.length;i++){var key=propKeys[i];props[key]=validateProp(key,vm.$options.props,propsData,vm);}observerState.shouldConvert=true;if(process.env.NODE_ENV!=='production'){observerState.isSettingProps=false;}// keep a copy of raw propsData
vm.$options.propsData=propsData;}// update listeners
if(listeners){var oldListeners=vm.$options._parentListeners;vm.$options._parentListeners=listeners;updateComponentListeners(vm,listeners,oldListeners);}// resolve slots + force update if has children
if(hasChildren){vm.$slots=resolveSlots(renderChildren,parentVnode.context);vm.$forceUpdate();}}function isInInactiveTree(vm){while(vm&&(vm=vm.$parent)){if(vm._inactive){return true;}}return false;}function activateChildComponent(vm,direct){if(direct){vm._directInactive=false;if(isInInactiveTree(vm)){return;}}else if(vm._directInactive){return;}if(vm._inactive||vm._inactive==null){vm._inactive=false;for(var i=0;i<vm.$children.length;i++){activateChildComponent(vm.$children[i]);}callHook(vm,'activated');}}function deactivateChildComponent(vm,direct){if(direct){vm._directInactive=true;if(isInInactiveTree(vm)){return;}}if(!vm._inactive){vm._inactive=true;for(var i=0;i<vm.$children.length;i++){deactivateChildComponent(vm.$children[i]);}callHook(vm,'deactivated');}}function callHook(vm,hook){var handlers=vm.$options[hook];if(handlers){for(var i=0,j=handlers.length;i<j;i++){try{handlers[i].call(vm);}catch(e){handleError(e,vm,hook+" hook");}}}if(vm._hasHookEvent){vm.$emit('hook:'+hook);}}/*  */var queue=[];var has={};var circular={};var waiting=false;var flushing=false;var index=0;/**
 * Reset the scheduler's state.
 */function resetSchedulerState(){queue.length=0;has={};if(process.env.NODE_ENV!=='production'){circular={};}waiting=flushing=false;}/**
 * Flush both queues and run the watchers.
 */function flushSchedulerQueue(){flushing=true;var watcher,id,vm;// Sort queue before flush.
// This ensures that:
// 1. Components are updated from parent to child. (because parent is always
//    created before the child)
// 2. A component's user watchers are run before its render watcher (because
//    user watchers are created before the render watcher)
// 3. If a component is destroyed during a parent component's watcher run,
//    its watchers can be skipped.
queue.sort(function(a,b){return a.id-b.id;});// do not cache length because more watchers might be pushed
// as we run existing watchers
for(index=0;index<queue.length;index++){watcher=queue[index];id=watcher.id;has[id]=null;watcher.run();// in dev build, check and stop circular updates.
if(process.env.NODE_ENV!=='production'&&has[id]!=null){circular[id]=(circular[id]||0)+1;if(circular[id]>config._maxUpdateCount){warn('You may have an infinite update loop '+(watcher.user?"in watcher with expression \""+watcher.expression+"\"":"in a component render function."),watcher.vm);break;}}}// call updated hooks
index=queue.length;while(index--){watcher=queue[index];vm=watcher.vm;if(vm._watcher===watcher&&vm._isMounted){callHook(vm,'updated');}}// devtool hook
/* istanbul ignore if */if(devtools&&config.devtools){devtools.emit('flush');}resetSchedulerState();}/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */function queueWatcher(watcher){var id=watcher.id;if(has[id]==null){has[id]=true;if(!flushing){queue.push(watcher);}else{// if already flushing, splice the watcher based on its id
// if already past its id, it will be run next immediately.
var i=queue.length-1;while(i>=0&&queue[i].id>watcher.id){i--;}queue.splice(Math.max(i,index)+1,0,watcher);}// queue the flush
if(!waiting){waiting=true;nextTick(flushSchedulerQueue);}}}/*  */var uid$2=0;/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */var Watcher=function Watcher(vm,expOrFn,cb,options){this.vm=vm;vm._watchers.push(this);// options
if(options){this.deep=!!options.deep;this.user=!!options.user;this.lazy=!!options.lazy;this.sync=!!options.sync;}else{this.deep=this.user=this.lazy=this.sync=false;}this.cb=cb;this.id=++uid$2;// uid for batching
this.active=true;this.dirty=this.lazy;// for lazy watchers
this.deps=[];this.newDeps=[];this.depIds=new _Set();this.newDepIds=new _Set();this.expression=process.env.NODE_ENV!=='production'?expOrFn.toString():'';// parse expression for getter
if(typeof expOrFn==='function'){this.getter=expOrFn;}else{this.getter=parsePath(expOrFn);if(!this.getter){this.getter=function(){};process.env.NODE_ENV!=='production'&&warn("Failed watching path: \""+expOrFn+"\" "+'Watcher only accepts simple dot-delimited paths. '+'For full control, use a function instead.',vm);}}this.value=this.lazy?undefined:this.get();};/**
 * Evaluate the getter, and re-collect dependencies.
 */Watcher.prototype.get=function get(){pushTarget(this);var value;var vm=this.vm;if(this.user){try{value=this.getter.call(vm,vm);}catch(e){handleError(e,vm,"getter for watcher \""+this.expression+"\"");}}else{value=this.getter.call(vm,vm);}// "touch" every property so they are all tracked as
// dependencies for deep watching
if(this.deep){traverse(value);}popTarget();this.cleanupDeps();return value;};/**
 * Add a dependency to this directive.
 */Watcher.prototype.addDep=function addDep(dep){var id=dep.id;if(!this.newDepIds.has(id)){this.newDepIds.add(id);this.newDeps.push(dep);if(!this.depIds.has(id)){dep.addSub(this);}}};/**
 * Clean up for dependency collection.
 */Watcher.prototype.cleanupDeps=function cleanupDeps(){var this$1=this;var i=this.deps.length;while(i--){var dep=this$1.deps[i];if(!this$1.newDepIds.has(dep.id)){dep.removeSub(this$1);}}var tmp=this.depIds;this.depIds=this.newDepIds;this.newDepIds=tmp;this.newDepIds.clear();tmp=this.deps;this.deps=this.newDeps;this.newDeps=tmp;this.newDeps.length=0;};/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */Watcher.prototype.update=function update(){/* istanbul ignore else */if(this.lazy){this.dirty=true;}else if(this.sync){this.run();}else{queueWatcher(this);}};/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */Watcher.prototype.run=function run(){if(this.active){var value=this.get();if(value!==this.value||// Deep watchers and watchers on Object/Arrays should fire even
// when the value is the same, because the value may
// have mutated.
isObject(value)||this.deep){// set new value
var oldValue=this.value;this.value=value;if(this.user){try{this.cb.call(this.vm,value,oldValue);}catch(e){handleError(e,this.vm,"callback for watcher \""+this.expression+"\"");}}else{this.cb.call(this.vm,value,oldValue);}}}};/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */Watcher.prototype.evaluate=function evaluate(){this.value=this.get();this.dirty=false;};/**
 * Depend on all deps collected by this watcher.
 */Watcher.prototype.depend=function depend(){var this$1=this;var i=this.deps.length;while(i--){this$1.deps[i].depend();}};/**
 * Remove self from all dependencies' subscriber list.
 */Watcher.prototype.teardown=function teardown(){var this$1=this;if(this.active){// remove self from vm's watcher list
// this is a somewhat expensive operation so we skip it
// if the vm is being destroyed.
if(!this.vm._isBeingDestroyed){remove(this.vm._watchers,this);}var i=this.deps.length;while(i--){this$1.deps[i].removeSub(this$1);}this.active=false;}};/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */var seenObjects=new _Set();function traverse(val){seenObjects.clear();_traverse(val,seenObjects);}function _traverse(val,seen){var i,keys;var isA=Array.isArray(val);if(!isA&&!isObject(val)||!(0,_isExtensible2.default)(val)){return;}if(val.__ob__){var depId=val.__ob__.dep.id;if(seen.has(depId)){return;}seen.add(depId);}if(isA){i=val.length;while(i--){_traverse(val[i],seen);}}else{keys=(0,_keys2.default)(val);i=keys.length;while(i--){_traverse(val[keys[i]],seen);}}}/*  */var sharedPropertyDefinition={enumerable:true,configurable:true,get:noop,set:noop};function proxy(target,sourceKey,key){sharedPropertyDefinition.get=function proxyGetter(){return this[sourceKey][key];};sharedPropertyDefinition.set=function proxySetter(val){this[sourceKey][key]=val;};(0,_defineProperty2.default)(target,key,sharedPropertyDefinition);}function initState(vm){vm._watchers=[];var opts=vm.$options;if(opts.props){initProps(vm,opts.props);}if(opts.methods){initMethods(vm,opts.methods);}if(opts.data){initData(vm);}else{observe(vm._data={},true/* asRootData */);}if(opts.computed){initComputed(vm,opts.computed);}if(opts.watch){initWatch(vm,opts.watch);}}var isReservedProp={key:1,ref:1,slot:1};function initProps(vm,propsOptions){var propsData=vm.$options.propsData||{};var props=vm._props={};// cache prop keys so that future props updates can iterate using Array
// instead of dynamic object key enumeration.
var keys=vm.$options._propKeys=[];var isRoot=!vm.$parent;// root instance props should be converted
observerState.shouldConvert=isRoot;var loop=function loop(key){keys.push(key);var value=validateProp(key,propsOptions,propsData,vm);/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){if(isReservedProp[key]){warn("\""+key+"\" is a reserved attribute and cannot be used as component prop.",vm);}defineReactive$$1(props,key,value,function(){if(vm.$parent&&!observerState.isSettingProps){warn("Avoid mutating a prop directly since the value will be "+"overwritten whenever the parent component re-renders. "+"Instead, use a data or computed property based on the prop's "+"value. Prop being mutated: \""+key+"\"",vm);}});}else{defineReactive$$1(props,key,value);}// static props are already proxied on the component's prototype
// during Vue.extend(). We only need to proxy props defined at
// instantiation here.
if(!(key in vm)){proxy(vm,"_props",key);}};for(var key in propsOptions){loop(key);}observerState.shouldConvert=true;}function initData(vm){var data=vm.$options.data;data=vm._data=typeof data==='function'?data.call(vm):data||{};if(!isPlainObject(data)){data={};process.env.NODE_ENV!=='production'&&warn('data functions should return an object:\n'+'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',vm);}// proxy data on instance
var keys=(0,_keys2.default)(data);var props=vm.$options.props;var i=keys.length;while(i--){if(props&&hasOwn(props,keys[i])){process.env.NODE_ENV!=='production'&&warn("The data property \""+keys[i]+"\" is already declared as a prop. "+"Use prop default value instead.",vm);}else if(!isReserved(keys[i])){proxy(vm,"_data",keys[i]);}}// observe data
observe(data,true/* asRootData */);}var computedWatcherOptions={lazy:true};function initComputed(vm,computed){var watchers=vm._computedWatchers=(0,_create2.default)(null);for(var key in computed){var userDef=computed[key];var getter=typeof userDef==='function'?userDef:userDef.get;// create internal watcher for the computed property.
watchers[key]=new Watcher(vm,getter,noop,computedWatcherOptions);// component-defined computed properties are already defined on the
// component prototype. We only need to define computed properties defined
// at instantiation here.
if(!(key in vm)){defineComputed(vm,key,userDef);}}}function defineComputed(target,key,userDef){if(typeof userDef==='function'){sharedPropertyDefinition.get=createComputedGetter(key);sharedPropertyDefinition.set=noop;}else{sharedPropertyDefinition.get=userDef.get?userDef.cache!==false?createComputedGetter(key):userDef.get:noop;sharedPropertyDefinition.set=userDef.set?userDef.set:noop;}(0,_defineProperty2.default)(target,key,sharedPropertyDefinition);}function createComputedGetter(key){return function computedGetter(){var watcher=this._computedWatchers&&this._computedWatchers[key];if(watcher){if(watcher.dirty){watcher.evaluate();}if(Dep.target){watcher.depend();}return watcher.value;}};}function initMethods(vm,methods){var props=vm.$options.props;for(var key in methods){vm[key]=methods[key]==null?noop:bind(methods[key],vm);if(process.env.NODE_ENV!=='production'){if(methods[key]==null){warn("method \""+key+"\" has an undefined value in the component definition. "+"Did you reference the function correctly?",vm);}if(props&&hasOwn(props,key)){warn("method \""+key+"\" has already been defined as a prop.",vm);}}}}function initWatch(vm,watch){for(var key in watch){var handler=watch[key];if(Array.isArray(handler)){for(var i=0;i<handler.length;i++){createWatcher(vm,key,handler[i]);}}else{createWatcher(vm,key,handler);}}}function createWatcher(vm,key,handler){var options;if(isPlainObject(handler)){options=handler;handler=handler.handler;}if(typeof handler==='string'){handler=vm[handler];}vm.$watch(key,handler,options);}function stateMixin(Vue){// flow somehow has problems with directly declared definition object
// when using Object.defineProperty, so we have to procedurally build up
// the object here.
var dataDef={};dataDef.get=function(){return this._data;};var propsDef={};propsDef.get=function(){return this._props;};if(process.env.NODE_ENV!=='production'){dataDef.set=function(newData){warn('Avoid replacing instance root $data. '+'Use nested data properties instead.',this);};propsDef.set=function(){warn("$props is readonly.",this);};}Object.defineProperty(Vue.prototype,'$data',dataDef);Object.defineProperty(Vue.prototype,'$props',propsDef);Vue.prototype.$set=set;Vue.prototype.$delete=del;Vue.prototype.$watch=function(expOrFn,cb,options){var vm=this;options=options||{};options.user=true;var watcher=new Watcher(vm,expOrFn,cb,options);if(options.immediate){cb.call(vm,watcher.value);}return function unwatchFn(){watcher.teardown();};};}/*  */// hooks to be invoked on component VNodes during patch
var componentVNodeHooks={init:function init(vnode,hydrating,parentElm,refElm){if(!vnode.componentInstance||vnode.componentInstance._isDestroyed){var child=vnode.componentInstance=createComponentInstanceForVnode(vnode,activeInstance,parentElm,refElm);child.$mount(hydrating?vnode.elm:undefined,hydrating);}else if(vnode.data.keepAlive){// kept-alive components, treat as a patch
var mountedNode=vnode;// work around flow
componentVNodeHooks.prepatch(mountedNode,mountedNode);}},prepatch:function prepatch(oldVnode,vnode){var options=vnode.componentOptions;var child=vnode.componentInstance=oldVnode.componentInstance;updateChildComponent(child,options.propsData,// updated props
options.listeners,// updated listeners
vnode,// new parent vnode
options.children// new children
);},insert:function insert(vnode){if(!vnode.componentInstance._isMounted){vnode.componentInstance._isMounted=true;callHook(vnode.componentInstance,'mounted');}if(vnode.data.keepAlive){activateChildComponent(vnode.componentInstance,true/* direct */);}},destroy:function destroy(vnode){if(!vnode.componentInstance._isDestroyed){if(!vnode.data.keepAlive){vnode.componentInstance.$destroy();}else{deactivateChildComponent(vnode.componentInstance,true/* direct */);}}}};var hooksToMerge=(0,_keys2.default)(componentVNodeHooks);function createComponent(Ctor,data,context,children,tag){if(!Ctor){return;}var baseCtor=context.$options._base;if(isObject(Ctor)){Ctor=baseCtor.extend(Ctor);}if(typeof Ctor!=='function'){if(process.env.NODE_ENV!=='production'){warn("Invalid Component definition: "+String(Ctor),context);}return;}// async component
if(!Ctor.cid){if(Ctor.resolved){Ctor=Ctor.resolved;}else{Ctor=resolveAsyncComponent(Ctor,baseCtor,function(){// it's ok to queue this on every render because
// $forceUpdate is buffered by the scheduler.
context.$forceUpdate();});if(!Ctor){// return nothing if this is indeed an async component
// wait for the callback to trigger parent update.
return;}}}// resolve constructor options in case global mixins are applied after
// component constructor creation
resolveConstructorOptions(Ctor);data=data||{};// transform component v-model data into props & events
if(data.model){transformModel(Ctor.options,data);}// extract props
var propsData=extractProps(data,Ctor);// functional component
if(Ctor.options.functional){return createFunctionalComponent(Ctor,propsData,data,context,children);}// extract listeners, since these needs to be treated as
// child component listeners instead of DOM listeners
var listeners=data.on;// replace with listeners with .native modifier
data.on=data.nativeOn;if(Ctor.options.abstract){// abstract components do not keep anything
// other than props & listeners
data={};}// merge component management hooks onto the placeholder node
mergeHooks(data);// return a placeholder vnode
var name=Ctor.options.name||tag;var vnode=new VNode("vue-component-"+Ctor.cid+(name?"-"+name:''),data,undefined,undefined,undefined,context,{Ctor:Ctor,propsData:propsData,listeners:listeners,tag:tag,children:children});return vnode;}function createFunctionalComponent(Ctor,propsData,data,context,children){var props={};var propOptions=Ctor.options.props;if(propOptions){for(var key in propOptions){props[key]=validateProp(key,propOptions,propsData);}}// ensure the createElement function in functional components
// gets a unique context - this is necessary for correct named slot check
var _context=(0,_create2.default)(context);var h=function h(a,b,c,d){return createElement(_context,a,b,c,d,true);};var vnode=Ctor.options.render.call(null,h,{props:props,data:data,parent:context,children:children,slots:function slots(){return resolveSlots(children,context);}});if(vnode instanceof VNode){vnode.functionalContext=context;if(data.slot){(vnode.data||(vnode.data={})).slot=data.slot;}}return vnode;}function createComponentInstanceForVnode(vnode,// we know it's MountedComponentVNode but flow doesn't
parent,// activeInstance in lifecycle state
parentElm,refElm){var vnodeComponentOptions=vnode.componentOptions;var options={_isComponent:true,parent:parent,propsData:vnodeComponentOptions.propsData,_componentTag:vnodeComponentOptions.tag,_parentVnode:vnode,_parentListeners:vnodeComponentOptions.listeners,_renderChildren:vnodeComponentOptions.children,_parentElm:parentElm||null,_refElm:refElm||null};// check inline-template render functions
var inlineTemplate=vnode.data.inlineTemplate;if(inlineTemplate){options.render=inlineTemplate.render;options.staticRenderFns=inlineTemplate.staticRenderFns;}return new vnodeComponentOptions.Ctor(options);}function resolveAsyncComponent(factory,baseCtor,cb){if(factory.requested){// pool callbacks
factory.pendingCallbacks.push(cb);}else{factory.requested=true;var cbs=factory.pendingCallbacks=[cb];var sync=true;var resolve=function resolve(res){if(isObject(res)){res=baseCtor.extend(res);}// cache resolved
factory.resolved=res;// invoke callbacks only if this is not a synchronous resolve
// (async resolves are shimmed as synchronous during SSR)
if(!sync){for(var i=0,l=cbs.length;i<l;i++){cbs[i](res);}}};var reject=function reject(reason){process.env.NODE_ENV!=='production'&&warn("Failed to resolve async component: "+String(factory)+(reason?"\nReason: "+reason:''));};var res=factory(resolve,reject);// handle promise
if(res&&typeof res.then==='function'&&!factory.resolved){res.then(resolve,reject);}sync=false;// return in case resolved synchronously
return factory.resolved;}}function extractProps(data,Ctor){// we are only extracting raw values here.
// validation and default values are handled in the child
// component itself.
var propOptions=Ctor.options.props;if(!propOptions){return;}var res={};var attrs=data.attrs;var props=data.props;var domProps=data.domProps;if(attrs||props||domProps){for(var key in propOptions){var altKey=hyphenate(key);if(process.env.NODE_ENV!=='production'){var keyInLowerCase=key.toLowerCase();if(key!==keyInLowerCase&&attrs&&attrs.hasOwnProperty(keyInLowerCase)){warn("Prop \""+keyInLowerCase+"\" is not declared in component "+formatComponentName(Ctor)+". Note that HTML attributes are "+"case-insensitive and camelCased props need to use their kebab-case "+"equivalents when using in-DOM templates. You should probably use "+"\""+altKey+"\" instead of \""+key+"\".");}}checkProp(res,props,key,altKey,true)||checkProp(res,attrs,key,altKey)||checkProp(res,domProps,key,altKey);}}return res;}function checkProp(res,hash,key,altKey,preserve){if(hash){if(hasOwn(hash,key)){res[key]=hash[key];if(!preserve){delete hash[key];}return true;}else if(hasOwn(hash,altKey)){res[key]=hash[altKey];if(!preserve){delete hash[altKey];}return true;}}return false;}function mergeHooks(data){if(!data.hook){data.hook={};}for(var i=0;i<hooksToMerge.length;i++){var key=hooksToMerge[i];var fromParent=data.hook[key];var ours=componentVNodeHooks[key];data.hook[key]=fromParent?mergeHook$1(ours,fromParent):ours;}}function mergeHook$1(one,two){return function(a,b,c,d){one(a,b,c,d);two(a,b,c,d);};}// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options,data){var prop=options.model&&options.model.prop||'value';var event=options.model&&options.model.event||'input';(data.props||(data.props={}))[prop]=data.model.value;var on=data.on||(data.on={});if(on[event]){on[event]=[data.model.callback].concat(on[event]);}else{on[event]=data.model.callback;}}/*  */var SIMPLE_NORMALIZE=1;var ALWAYS_NORMALIZE=2;// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context,tag,data,children,normalizationType,alwaysNormalize){if(Array.isArray(data)||isPrimitive(data)){normalizationType=children;children=data;data=undefined;}if(alwaysNormalize){normalizationType=ALWAYS_NORMALIZE;}return _createElement(context,tag,data,children,normalizationType);}function _createElement(context,tag,data,children,normalizationType){if(data&&data.__ob__){process.env.NODE_ENV!=='production'&&warn("Avoid using observed data object as vnode data: "+(0,_stringify2.default)(data)+"\n"+'Always create fresh vnode data objects in each render!',context);return createEmptyVNode();}if(!tag){// in case of component :is set to falsy value
return createEmptyVNode();}// support single function children as default scoped slot
if(Array.isArray(children)&&typeof children[0]==='function'){data=data||{};data.scopedSlots={default:children[0]};children.length=0;}if(normalizationType===ALWAYS_NORMALIZE){children=normalizeChildren(children);}else if(normalizationType===SIMPLE_NORMALIZE){children=simpleNormalizeChildren(children);}var vnode,ns;if(typeof tag==='string'){var Ctor;ns=config.getTagNamespace(tag);if(config.isReservedTag(tag)){// platform built-in elements
vnode=new VNode(config.parsePlatformTagName(tag),data,children,undefined,undefined,context);}else if(Ctor=resolveAsset(context.$options,'components',tag)){// component
vnode=createComponent(Ctor,data,context,children,tag);}else{// unknown or unlisted namespaced elements
// check at runtime because it may get assigned a namespace when its
// parent normalizes children
vnode=new VNode(tag,data,children,undefined,undefined,context);}}else{// direct component options / constructor
vnode=createComponent(tag,data,context,children);}if(vnode){if(ns){applyNS(vnode,ns);}return vnode;}else{return createEmptyVNode();}}function applyNS(vnode,ns){vnode.ns=ns;if(vnode.tag==='foreignObject'){// use default namespace inside foreignObject
return;}if(vnode.children){for(var i=0,l=vnode.children.length;i<l;i++){var child=vnode.children[i];if(child.tag&&!child.ns){applyNS(child,ns);}}}}/*  *//**
 * Runtime helper for rendering v-for lists.
 */function renderList(val,render){var ret,i,l,keys,key;if(Array.isArray(val)||typeof val==='string'){ret=new Array(val.length);for(i=0,l=val.length;i<l;i++){ret[i]=render(val[i],i);}}else if(typeof val==='number'){ret=new Array(val);for(i=0;i<val;i++){ret[i]=render(i+1,i);}}else if(isObject(val)){keys=(0,_keys2.default)(val);ret=new Array(keys.length);for(i=0,l=keys.length;i<l;i++){key=keys[i];ret[i]=render(val[key],key,i);}}return ret;}/*  *//**
 * Runtime helper for rendering <slot>
 */function renderSlot(name,fallback,props,bindObject){var scopedSlotFn=this.$scopedSlots[name];if(scopedSlotFn){// scoped slot
props=props||{};if(bindObject){extend(props,bindObject);}return scopedSlotFn(props)||fallback;}else{var slotNodes=this.$slots[name];// warn duplicate slot usage
if(slotNodes&&process.env.NODE_ENV!=='production'){slotNodes._rendered&&warn("Duplicate presence of slot \""+name+"\" found in the same render tree "+"- this will likely cause render errors.",this);slotNodes._rendered=true;}return slotNodes||fallback;}}/*  *//**
 * Runtime helper for resolving filters
 */function resolveFilter(id){return resolveAsset(this.$options,'filters',id,true)||identity;}/*  *//**
 * Runtime helper for checking keyCodes from config.
 */function checkKeyCodes(eventKeyCode,key,builtInAlias){var keyCodes=config.keyCodes[key]||builtInAlias;if(Array.isArray(keyCodes)){return keyCodes.indexOf(eventKeyCode)===-1;}else{return keyCodes!==eventKeyCode;}}/*  *//**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */function bindObjectProps(data,tag,value,asProp){if(value){if(!isObject(value)){process.env.NODE_ENV!=='production'&&warn('v-bind without argument expects an Object or Array value',this);}else{if(Array.isArray(value)){value=toObject(value);}var hash;for(var key in value){if(key==='class'||key==='style'){hash=data;}else{var type=data.attrs&&data.attrs.type;hash=asProp||config.mustUseProp(tag,type,key)?data.domProps||(data.domProps={}):data.attrs||(data.attrs={});}if(!(key in hash)){hash[key]=value[key];}}}}return data;}/*  *//**
 * Runtime helper for rendering static trees.
 */function renderStatic(index,isInFor){var tree=this._staticTrees[index];// if has already-rendered static tree and not inside v-for,
// we can reuse the same tree by doing a shallow clone.
if(tree&&!isInFor){return Array.isArray(tree)?cloneVNodes(tree):cloneVNode(tree);}// otherwise, render a fresh tree.
tree=this._staticTrees[index]=this.$options.staticRenderFns[index].call(this._renderProxy);markStatic(tree,"__static__"+index,false);return tree;}/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */function markOnce(tree,index,key){markStatic(tree,"__once__"+index+(key?"_"+key:""),true);return tree;}function markStatic(tree,key,isOnce){if(Array.isArray(tree)){for(var i=0;i<tree.length;i++){if(tree[i]&&typeof tree[i]!=='string'){markStaticNode(tree[i],key+"_"+i,isOnce);}}}else{markStaticNode(tree,key,isOnce);}}function markStaticNode(node,key,isOnce){node.isStatic=true;node.key=key;node.isOnce=isOnce;}/*  */function initRender(vm){vm.$vnode=null;// the placeholder node in parent tree
vm._vnode=null;// the root of the child tree
vm._staticTrees=null;var parentVnode=vm.$options._parentVnode;var renderContext=parentVnode&&parentVnode.context;vm.$slots=resolveSlots(vm.$options._renderChildren,renderContext);vm.$scopedSlots=emptyObject;// bind the createElement fn to this instance
// so that we get proper render context inside it.
// args order: tag, data, children, normalizationType, alwaysNormalize
// internal version is used by render functions compiled from templates
vm._c=function(a,b,c,d){return createElement(vm,a,b,c,d,false);};// normalization is always applied for the public version, used in
// user-written render functions.
vm.$createElement=function(a,b,c,d){return createElement(vm,a,b,c,d,true);};}function renderMixin(Vue){Vue.prototype.$nextTick=function(fn){return nextTick(fn,this);};Vue.prototype._render=function(){var vm=this;var ref=vm.$options;var render=ref.render;var staticRenderFns=ref.staticRenderFns;var _parentVnode=ref._parentVnode;if(vm._isMounted){// clone slot nodes on re-renders
for(var key in vm.$slots){vm.$slots[key]=cloneVNodes(vm.$slots[key]);}}vm.$scopedSlots=_parentVnode&&_parentVnode.data.scopedSlots||emptyObject;if(staticRenderFns&&!vm._staticTrees){vm._staticTrees=[];}// set parent vnode. this allows render functions to have access
// to the data on the placeholder node.
vm.$vnode=_parentVnode;// render self
var vnode;try{vnode=render.call(vm._renderProxy,vm.$createElement);}catch(e){handleError(e,vm,"render function");// return error render result,
// or previous vnode to prevent render error causing blank component
/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){vnode=vm.$options.renderError?vm.$options.renderError.call(vm._renderProxy,vm.$createElement,e):vm._vnode;}else{vnode=vm._vnode;}}// return empty vnode in case the render function errored out
if(!(vnode instanceof VNode)){if(process.env.NODE_ENV!=='production'&&Array.isArray(vnode)){warn('Multiple root nodes returned from render function. Render function '+'should return a single root node.',vm);}vnode=createEmptyVNode();}// set parent
vnode.parent=_parentVnode;return vnode;};// internal render helpers.
// these are exposed on the instance prototype to reduce generated render
// code size.
Vue.prototype._o=markOnce;Vue.prototype._n=toNumber;Vue.prototype._s=_toString;Vue.prototype._l=renderList;Vue.prototype._t=renderSlot;Vue.prototype._q=looseEqual;Vue.prototype._i=looseIndexOf;Vue.prototype._m=renderStatic;Vue.prototype._f=resolveFilter;Vue.prototype._k=checkKeyCodes;Vue.prototype._b=bindObjectProps;Vue.prototype._v=createTextVNode;Vue.prototype._e=createEmptyVNode;Vue.prototype._u=resolveScopedSlots;}/*  */function initProvide(vm){var provide=vm.$options.provide;if(provide){vm._provided=typeof provide==='function'?provide.call(vm):provide;}}function initInjections(vm){var inject=vm.$options.inject;if(inject){// inject is :any because flow is not smart enough to figure out cached
// isArray here
var isArray=Array.isArray(inject);var keys=isArray?inject:hasSymbol?(0,_ownKeys2.default)(inject):(0,_keys2.default)(inject);for(var i=0;i<keys.length;i++){var key=keys[i];var provideKey=isArray?key:inject[key];var source=vm;while(source){if(source._provided&&provideKey in source._provided){vm[key]=source._provided[provideKey];break;}source=source.$parent;}}}}/*  */var uid=0;function initMixin(Vue){Vue.prototype._init=function(options){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){mark('vue-perf-init');}var vm=this;// a uid
vm._uid=uid++;// a flag to avoid this being observed
vm._isVue=true;// merge options
if(options&&options._isComponent){// optimize internal component instantiation
// since dynamic options merging is pretty slow, and none of the
// internal component options needs special treatment.
initInternalComponent(vm,options);}else{vm.$options=mergeOptions(resolveConstructorOptions(vm.constructor),options||{},vm);}/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){initProxy(vm);}else{vm._renderProxy=vm;}// expose real self
vm._self=vm;initLifecycle(vm);initEvents(vm);initRender(vm);callHook(vm,'beforeCreate');initInjections(vm);// resolve injections before data/props
initState(vm);initProvide(vm);// resolve provide after data/props
callHook(vm,'created');/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){vm._name=formatComponentName(vm,false);mark('vue-perf-init-end');measure(vm._name+" init",'vue-perf-init','vue-perf-init-end');}if(vm.$options.el){vm.$mount(vm.$options.el);}};}function initInternalComponent(vm,options){var opts=vm.$options=(0,_create2.default)(vm.constructor.options);// doing this because it's faster than dynamic enumeration.
opts.parent=options.parent;opts.propsData=options.propsData;opts._parentVnode=options._parentVnode;opts._parentListeners=options._parentListeners;opts._renderChildren=options._renderChildren;opts._componentTag=options._componentTag;opts._parentElm=options._parentElm;opts._refElm=options._refElm;if(options.render){opts.render=options.render;opts.staticRenderFns=options.staticRenderFns;}}function resolveConstructorOptions(Ctor){var options=Ctor.options;if(Ctor.super){var superOptions=resolveConstructorOptions(Ctor.super);var cachedSuperOptions=Ctor.superOptions;if(superOptions!==cachedSuperOptions){// super option changed,
// need to resolve new options.
Ctor.superOptions=superOptions;// check if there are any late-modified/attached options (#4976)
var modifiedOptions=resolveModifiedOptions(Ctor);// update base extend options
if(modifiedOptions){extend(Ctor.extendOptions,modifiedOptions);}options=Ctor.options=mergeOptions(superOptions,Ctor.extendOptions);if(options.name){options.components[options.name]=Ctor;}}}return options;}function resolveModifiedOptions(Ctor){var modified;var latest=Ctor.options;var sealed=Ctor.sealedOptions;for(var key in latest){if(latest[key]!==sealed[key]){if(!modified){modified={};}modified[key]=dedupe(latest[key],sealed[key]);}}return modified;}function dedupe(latest,sealed){// compare latest and sealed to ensure lifecycle hooks won't be duplicated
// between merges
if(Array.isArray(latest)){var res=[];sealed=Array.isArray(sealed)?sealed:[sealed];for(var i=0;i<latest.length;i++){if(sealed.indexOf(latest[i])<0){res.push(latest[i]);}}return res;}else{return latest;}}function Vue$3(options){if(process.env.NODE_ENV!=='production'&&!(this instanceof Vue$3)){warn('Vue is a constructor and should be called with the `new` keyword');}this._init(options);}initMixin(Vue$3);stateMixin(Vue$3);eventsMixin(Vue$3);lifecycleMixin(Vue$3);renderMixin(Vue$3);/*  */function initUse(Vue){Vue.use=function(plugin){/* istanbul ignore if */if(plugin.installed){return;}// additional parameters
var args=toArray(arguments,1);args.unshift(this);if(typeof plugin.install==='function'){plugin.install.apply(plugin,args);}else if(typeof plugin==='function'){plugin.apply(null,args);}plugin.installed=true;return this;};}/*  */function initMixin$1(Vue){Vue.mixin=function(mixin){this.options=mergeOptions(this.options,mixin);};}/*  */function initExtend(Vue){/**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */Vue.cid=0;var cid=1;/**
   * Class inheritance
   */Vue.extend=function(extendOptions){extendOptions=extendOptions||{};var Super=this;var SuperId=Super.cid;var cachedCtors=extendOptions._Ctor||(extendOptions._Ctor={});if(cachedCtors[SuperId]){return cachedCtors[SuperId];}var name=extendOptions.name||Super.options.name;if(process.env.NODE_ENV!=='production'){if(!/^[a-zA-Z][\w-]*$/.test(name)){warn('Invalid component name: "'+name+'". Component names '+'can only contain alphanumeric characters and the hyphen, '+'and must start with a letter.');}}var Sub=function VueComponent(options){this._init(options);};Sub.prototype=(0,_create2.default)(Super.prototype);Sub.prototype.constructor=Sub;Sub.cid=cid++;Sub.options=mergeOptions(Super.options,extendOptions);Sub['super']=Super;// For props and computed properties, we define the proxy getters on
// the Vue instances at extension time, on the extended prototype. This
// avoids Object.defineProperty calls for each instance created.
if(Sub.options.props){initProps$1(Sub);}if(Sub.options.computed){initComputed$1(Sub);}// allow further extension/mixin/plugin usage
Sub.extend=Super.extend;Sub.mixin=Super.mixin;Sub.use=Super.use;// create asset registers, so extended classes
// can have their private assets too.
config._assetTypes.forEach(function(type){Sub[type]=Super[type];});// enable recursive self-lookup
if(name){Sub.options.components[name]=Sub;}// keep a reference to the super options at extension time.
// later at instantiation we can check if Super's options have
// been updated.
Sub.superOptions=Super.options;Sub.extendOptions=extendOptions;Sub.sealedOptions=extend({},Sub.options);// cache constructor
cachedCtors[SuperId]=Sub;return Sub;};}function initProps$1(Comp){var props=Comp.options.props;for(var key in props){proxy(Comp.prototype,"_props",key);}}function initComputed$1(Comp){var computed=Comp.options.computed;for(var key in computed){defineComputed(Comp.prototype,key,computed[key]);}}/*  */function initAssetRegisters(Vue){/**
   * Create asset registration methods.
   */config._assetTypes.forEach(function(type){Vue[type]=function(id,definition){if(!definition){return this.options[type+'s'][id];}else{/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){if(type==='component'&&config.isReservedTag(id)){warn('Do not use built-in or reserved HTML elements as component '+'id: '+id);}}if(type==='component'&&isPlainObject(definition)){definition.name=definition.name||id;definition=this.options._base.extend(definition);}if(type==='directive'&&typeof definition==='function'){definition={bind:definition,update:definition};}this.options[type+'s'][id]=definition;return definition;}};});}/*  */var patternTypes=[String,RegExp];function getComponentName(opts){return opts&&(opts.Ctor.options.name||opts.tag);}function matches(pattern,name){if(typeof pattern==='string'){return pattern.split(',').indexOf(name)>-1;}else if(pattern instanceof RegExp){return pattern.test(name);}/* istanbul ignore next */return false;}function pruneCache(cache,filter){for(var key in cache){var cachedNode=cache[key];if(cachedNode){var name=getComponentName(cachedNode.componentOptions);if(name&&!filter(name)){pruneCacheEntry(cachedNode);cache[key]=null;}}}}function pruneCacheEntry(vnode){if(vnode){if(!vnode.componentInstance._inactive){callHook(vnode.componentInstance,'deactivated');}vnode.componentInstance.$destroy();}}var KeepAlive={name:'keep-alive',abstract:true,props:{include:patternTypes,exclude:patternTypes},created:function created(){this.cache=(0,_create2.default)(null);},destroyed:function destroyed(){var this$1=this;for(var key in this$1.cache){pruneCacheEntry(this$1.cache[key]);}},watch:{include:function include(val){pruneCache(this.cache,function(name){return matches(val,name);});},exclude:function exclude(val){pruneCache(this.cache,function(name){return!matches(val,name);});}},render:function render(){var vnode=getFirstComponentChild(this.$slots.default);var componentOptions=vnode&&vnode.componentOptions;if(componentOptions){// check pattern
var name=getComponentName(componentOptions);if(name&&(this.include&&!matches(this.include,name)||this.exclude&&matches(this.exclude,name))){return vnode;}var key=vnode.key==null// same constructor may get registered as different local components
// so cid alone is not enough (#3269)
?componentOptions.Ctor.cid+(componentOptions.tag?"::"+componentOptions.tag:''):vnode.key;if(this.cache[key]){vnode.componentInstance=this.cache[key].componentInstance;}else{this.cache[key]=vnode;}vnode.data.keepAlive=true;}return vnode;}};var builtInComponents={KeepAlive:KeepAlive};/*  */function initGlobalAPI(Vue){// config
var configDef={};configDef.get=function(){return config;};if(process.env.NODE_ENV!=='production'){configDef.set=function(){warn('Do not replace the Vue.config object, set individual fields instead.');};}Object.defineProperty(Vue,'config',configDef);// exposed util methods.
// NOTE: these are not considered part of the public API - avoid relying on
// them unless you are aware of the risk.
Vue.util={warn:warn,extend:extend,mergeOptions:mergeOptions,defineReactive:defineReactive$$1};Vue.set=set;Vue.delete=del;Vue.nextTick=nextTick;Vue.options=(0,_create2.default)(null);config._assetTypes.forEach(function(type){Vue.options[type+'s']=(0,_create2.default)(null);});// this is used to identify the "base" constructor to extend all plain-object
// components with in Weex's multi-instance scenarios.
Vue.options._base=Vue;extend(Vue.options.components,builtInComponents);initUse(Vue);initMixin$1(Vue);initExtend(Vue);initAssetRegisters(Vue);}initGlobalAPI(Vue$3);Object.defineProperty(Vue$3.prototype,'$isServer',{get:isServerRendering});Vue$3.version='2.2.4';/*  */// attributes that should be using props for binding
var acceptValue=makeMap('input,textarea,option,select');var mustUseProp=function mustUseProp(tag,type,attr){return attr==='value'&&acceptValue(tag)&&type!=='button'||attr==='selected'&&tag==='option'||attr==='checked'&&tag==='input'||attr==='muted'&&tag==='video';};var isEnumeratedAttr=makeMap('contenteditable,draggable,spellcheck');var isBooleanAttr=makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,'+'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,'+'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,'+'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,'+'required,reversed,scoped,seamless,selected,sortable,translate,'+'truespeed,typemustmatch,visible');var xlinkNS='http://www.w3.org/1999/xlink';var isXlink=function isXlink(name){return name.charAt(5)===':'&&name.slice(0,5)==='xlink';};var getXlinkProp=function getXlinkProp(name){return isXlink(name)?name.slice(6,name.length):'';};var isFalsyAttrValue=function isFalsyAttrValue(val){return val==null||val===false;};/*  */function genClassForVnode(vnode){var data=vnode.data;var parentNode=vnode;var childNode=vnode;while(childNode.componentInstance){childNode=childNode.componentInstance._vnode;if(childNode.data){data=mergeClassData(childNode.data,data);}}while(parentNode=parentNode.parent){if(parentNode.data){data=mergeClassData(data,parentNode.data);}}return genClassFromData(data);}function mergeClassData(child,parent){return{staticClass:concat(child.staticClass,parent.staticClass),class:child.class?[child.class,parent.class]:parent.class};}function genClassFromData(data){var dynamicClass=data.class;var staticClass=data.staticClass;if(staticClass||dynamicClass){return concat(staticClass,stringifyClass(dynamicClass));}/* istanbul ignore next */return'';}function concat(a,b){return a?b?a+' '+b:a:b||'';}function stringifyClass(value){var res='';if(!value){return res;}if(typeof value==='string'){return value;}if(Array.isArray(value)){var stringified;for(var i=0,l=value.length;i<l;i++){if(value[i]){if(stringified=stringifyClass(value[i])){res+=stringified+' ';}}}return res.slice(0,-1);}if(isObject(value)){for(var key in value){if(value[key]){res+=key+' ';}}return res.slice(0,-1);}/* istanbul ignore next */return res;}/*  */var namespaceMap={svg:'http://www.w3.org/2000/svg',math:'http://www.w3.org/1998/Math/MathML'};var isHTMLTag=makeMap('html,body,base,head,link,meta,style,title,'+'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,'+'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,'+'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,'+'s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,'+'embed,object,param,source,canvas,script,noscript,del,ins,'+'caption,col,colgroup,table,thead,tbody,td,th,tr,'+'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,'+'output,progress,select,textarea,'+'details,dialog,menu,menuitem,summary,'+'content,element,shadow,template');// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG=makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,'+'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,'+'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',true);var isPreTag=function isPreTag(tag){return tag==='pre';};var isReservedTag=function isReservedTag(tag){return isHTMLTag(tag)||isSVG(tag);};function getTagNamespace(tag){if(isSVG(tag)){return'svg';}// basic support for MathML
// note it doesn't support other MathML elements being component roots
if(tag==='math'){return'math';}}var unknownElementCache=(0,_create2.default)(null);function isUnknownElement(tag){/* istanbul ignore if */if(!inBrowser){return true;}if(isReservedTag(tag)){return false;}tag=tag.toLowerCase();/* istanbul ignore if */if(unknownElementCache[tag]!=null){return unknownElementCache[tag];}var el=document.createElement(tag);if(tag.indexOf('-')>-1){// http://stackoverflow.com/a/28210364/1070244
return unknownElementCache[tag]=el.constructor===window.HTMLUnknownElement||el.constructor===window.HTMLElement;}else{return unknownElementCache[tag]=/HTMLUnknownElement/.test(el.toString());}}/*  *//**
 * Query an element selector if it's not an element already.
 */function query(el){if(typeof el==='string'){var selected=document.querySelector(el);if(!selected){process.env.NODE_ENV!=='production'&&warn('Cannot find element: '+el);return document.createElement('div');}return selected;}else{return el;}}/*  */function createElement$1(tagName,vnode){var elm=document.createElement(tagName);if(tagName!=='select'){return elm;}// false or null will remove the attribute but undefined will not
if(vnode.data&&vnode.data.attrs&&vnode.data.attrs.multiple!==undefined){elm.setAttribute('multiple','multiple');}return elm;}function createElementNS(namespace,tagName){return document.createElementNS(namespaceMap[namespace],tagName);}function createTextNode(text){return document.createTextNode(text);}function createComment(text){return document.createComment(text);}function insertBefore(parentNode,newNode,referenceNode){parentNode.insertBefore(newNode,referenceNode);}function removeChild(node,child){node.removeChild(child);}function appendChild(node,child){node.appendChild(child);}function parentNode(node){return node.parentNode;}function nextSibling(node){return node.nextSibling;}function tagName(node){return node.tagName;}function setTextContent(node,text){node.textContent=text;}function setAttribute(node,key,val){node.setAttribute(key,val);}var nodeOps=(0,_freeze2.default)({createElement:createElement$1,createElementNS:createElementNS,createTextNode:createTextNode,createComment:createComment,insertBefore:insertBefore,removeChild:removeChild,appendChild:appendChild,parentNode:parentNode,nextSibling:nextSibling,tagName:tagName,setTextContent:setTextContent,setAttribute:setAttribute});/*  */var ref={create:function create(_,vnode){registerRef(vnode);},update:function update(oldVnode,vnode){if(oldVnode.data.ref!==vnode.data.ref){registerRef(oldVnode,true);registerRef(vnode);}},destroy:function destroy(vnode){registerRef(vnode,true);}};function registerRef(vnode,isRemoval){var key=vnode.data.ref;if(!key){return;}var vm=vnode.context;var ref=vnode.componentInstance||vnode.elm;var refs=vm.$refs;if(isRemoval){if(Array.isArray(refs[key])){remove(refs[key],ref);}else if(refs[key]===ref){refs[key]=undefined;}}else{if(vnode.data.refInFor){if(Array.isArray(refs[key])&&refs[key].indexOf(ref)<0){refs[key].push(ref);}else{refs[key]=[ref];}}else{refs[key]=ref;}}}/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */var emptyNode=new VNode('',{},[]);var hooks=['create','activate','update','remove','destroy'];function isUndef(s){return s==null;}function isDef(s){return s!=null;}function sameVnode(vnode1,vnode2){return vnode1.key===vnode2.key&&vnode1.tag===vnode2.tag&&vnode1.isComment===vnode2.isComment&&!vnode1.data===!vnode2.data;}function createKeyToOldIdx(children,beginIdx,endIdx){var i,key;var map={};for(i=beginIdx;i<=endIdx;++i){key=children[i].key;if(isDef(key)){map[key]=i;}}return map;}function createPatchFunction(backend){var i,j;var cbs={};var modules=backend.modules;var nodeOps=backend.nodeOps;for(i=0;i<hooks.length;++i){cbs[hooks[i]]=[];for(j=0;j<modules.length;++j){if(modules[j][hooks[i]]!==undefined){cbs[hooks[i]].push(modules[j][hooks[i]]);}}}function emptyNodeAt(elm){return new VNode(nodeOps.tagName(elm).toLowerCase(),{},[],undefined,elm);}function createRmCb(childElm,listeners){function remove$$1(){if(--remove$$1.listeners===0){removeNode(childElm);}}remove$$1.listeners=listeners;return remove$$1;}function removeNode(el){var parent=nodeOps.parentNode(el);// element may have already been removed due to v-html / v-text
if(parent){nodeOps.removeChild(parent,el);}}var inPre=0;function createElm(vnode,insertedVnodeQueue,parentElm,refElm,nested){vnode.isRootInsert=!nested;// for transition enter check
if(createComponent(vnode,insertedVnodeQueue,parentElm,refElm)){return;}var data=vnode.data;var children=vnode.children;var tag=vnode.tag;if(isDef(tag)){if(process.env.NODE_ENV!=='production'){if(data&&data.pre){inPre++;}if(!inPre&&!vnode.ns&&!(config.ignoredElements.length&&config.ignoredElements.indexOf(tag)>-1)&&config.isUnknownElement(tag)){warn('Unknown custom element: <'+tag+'> - did you '+'register the component correctly? For recursive components, '+'make sure to provide the "name" option.',vnode.context);}}vnode.elm=vnode.ns?nodeOps.createElementNS(vnode.ns,tag):nodeOps.createElement(tag,vnode);setScope(vnode);/* istanbul ignore if */{createChildren(vnode,children,insertedVnodeQueue);if(isDef(data)){invokeCreateHooks(vnode,insertedVnodeQueue);}insert(parentElm,vnode.elm,refElm);}if(process.env.NODE_ENV!=='production'&&data&&data.pre){inPre--;}}else if(vnode.isComment){vnode.elm=nodeOps.createComment(vnode.text);insert(parentElm,vnode.elm,refElm);}else{vnode.elm=nodeOps.createTextNode(vnode.text);insert(parentElm,vnode.elm,refElm);}}function createComponent(vnode,insertedVnodeQueue,parentElm,refElm){var i=vnode.data;if(isDef(i)){var isReactivated=isDef(vnode.componentInstance)&&i.keepAlive;if(isDef(i=i.hook)&&isDef(i=i.init)){i(vnode,false/* hydrating */,parentElm,refElm);}// after calling the init hook, if the vnode is a child component
// it should've created a child instance and mounted it. the child
// component also has set the placeholder vnode's elm.
// in that case we can just return the element and be done.
if(isDef(vnode.componentInstance)){initComponent(vnode,insertedVnodeQueue);if(isReactivated){reactivateComponent(vnode,insertedVnodeQueue,parentElm,refElm);}return true;}}}function initComponent(vnode,insertedVnodeQueue){if(vnode.data.pendingInsert){insertedVnodeQueue.push.apply(insertedVnodeQueue,vnode.data.pendingInsert);}vnode.elm=vnode.componentInstance.$el;if(isPatchable(vnode)){invokeCreateHooks(vnode,insertedVnodeQueue);setScope(vnode);}else{// empty component root.
// skip all element-related modules except for ref (#3455)
registerRef(vnode);// make sure to invoke the insert hook
insertedVnodeQueue.push(vnode);}}function reactivateComponent(vnode,insertedVnodeQueue,parentElm,refElm){var i;// hack for #4339: a reactivated component with inner transition
// does not trigger because the inner node's created hooks are not called
// again. It's not ideal to involve module-specific logic in here but
// there doesn't seem to be a better way to do it.
var innerNode=vnode;while(innerNode.componentInstance){innerNode=innerNode.componentInstance._vnode;if(isDef(i=innerNode.data)&&isDef(i=i.transition)){for(i=0;i<cbs.activate.length;++i){cbs.activate[i](emptyNode,innerNode);}insertedVnodeQueue.push(innerNode);break;}}// unlike a newly created component,
// a reactivated keep-alive component doesn't insert itself
insert(parentElm,vnode.elm,refElm);}function insert(parent,elm,ref){if(parent){if(ref){nodeOps.insertBefore(parent,elm,ref);}else{nodeOps.appendChild(parent,elm);}}}function createChildren(vnode,children,insertedVnodeQueue){if(Array.isArray(children)){for(var i=0;i<children.length;++i){createElm(children[i],insertedVnodeQueue,vnode.elm,null,true);}}else if(isPrimitive(vnode.text)){nodeOps.appendChild(vnode.elm,nodeOps.createTextNode(vnode.text));}}function isPatchable(vnode){while(vnode.componentInstance){vnode=vnode.componentInstance._vnode;}return isDef(vnode.tag);}function invokeCreateHooks(vnode,insertedVnodeQueue){for(var i$1=0;i$1<cbs.create.length;++i$1){cbs.create[i$1](emptyNode,vnode);}i=vnode.data.hook;// Reuse variable
if(isDef(i)){if(i.create){i.create(emptyNode,vnode);}if(i.insert){insertedVnodeQueue.push(vnode);}}}// set scope id attribute for scoped CSS.
// this is implemented as a special case to avoid the overhead
// of going through the normal attribute patching process.
function setScope(vnode){var i;var ancestor=vnode;while(ancestor){if(isDef(i=ancestor.context)&&isDef(i=i.$options._scopeId)){nodeOps.setAttribute(vnode.elm,i,'');}ancestor=ancestor.parent;}// for slot content they should also get the scopeId from the host instance.
if(isDef(i=activeInstance)&&i!==vnode.context&&isDef(i=i.$options._scopeId)){nodeOps.setAttribute(vnode.elm,i,'');}}function addVnodes(parentElm,refElm,vnodes,startIdx,endIdx,insertedVnodeQueue){for(;startIdx<=endIdx;++startIdx){createElm(vnodes[startIdx],insertedVnodeQueue,parentElm,refElm);}}function invokeDestroyHook(vnode){var i,j;var data=vnode.data;if(isDef(data)){if(isDef(i=data.hook)&&isDef(i=i.destroy)){i(vnode);}for(i=0;i<cbs.destroy.length;++i){cbs.destroy[i](vnode);}}if(isDef(i=vnode.children)){for(j=0;j<vnode.children.length;++j){invokeDestroyHook(vnode.children[j]);}}}function removeVnodes(parentElm,vnodes,startIdx,endIdx){for(;startIdx<=endIdx;++startIdx){var ch=vnodes[startIdx];if(isDef(ch)){if(isDef(ch.tag)){removeAndInvokeRemoveHook(ch);invokeDestroyHook(ch);}else{// Text node
removeNode(ch.elm);}}}}function removeAndInvokeRemoveHook(vnode,rm){if(rm||isDef(vnode.data)){var listeners=cbs.remove.length+1;if(!rm){// directly removing
rm=createRmCb(vnode.elm,listeners);}else{// we have a recursively passed down rm callback
// increase the listeners count
rm.listeners+=listeners;}// recursively invoke hooks on child component root node
if(isDef(i=vnode.componentInstance)&&isDef(i=i._vnode)&&isDef(i.data)){removeAndInvokeRemoveHook(i,rm);}for(i=0;i<cbs.remove.length;++i){cbs.remove[i](vnode,rm);}if(isDef(i=vnode.data.hook)&&isDef(i=i.remove)){i(vnode,rm);}else{rm();}}else{removeNode(vnode.elm);}}function updateChildren(parentElm,oldCh,newCh,insertedVnodeQueue,removeOnly){var oldStartIdx=0;var newStartIdx=0;var oldEndIdx=oldCh.length-1;var oldStartVnode=oldCh[0];var oldEndVnode=oldCh[oldEndIdx];var newEndIdx=newCh.length-1;var newStartVnode=newCh[0];var newEndVnode=newCh[newEndIdx];var oldKeyToIdx,idxInOld,elmToMove,refElm;// removeOnly is a special flag used only by <transition-group>
// to ensure removed elements stay in correct relative positions
// during leaving transitions
var canMove=!removeOnly;while(oldStartIdx<=oldEndIdx&&newStartIdx<=newEndIdx){if(isUndef(oldStartVnode)){oldStartVnode=oldCh[++oldStartIdx];// Vnode has been moved left
}else if(isUndef(oldEndVnode)){oldEndVnode=oldCh[--oldEndIdx];}else if(sameVnode(oldStartVnode,newStartVnode)){patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);oldStartVnode=oldCh[++oldStartIdx];newStartVnode=newCh[++newStartIdx];}else if(sameVnode(oldEndVnode,newEndVnode)){patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);oldEndVnode=oldCh[--oldEndIdx];newEndVnode=newCh[--newEndIdx];}else if(sameVnode(oldStartVnode,newEndVnode)){// Vnode moved right
patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);canMove&&nodeOps.insertBefore(parentElm,oldStartVnode.elm,nodeOps.nextSibling(oldEndVnode.elm));oldStartVnode=oldCh[++oldStartIdx];newEndVnode=newCh[--newEndIdx];}else if(sameVnode(oldEndVnode,newStartVnode)){// Vnode moved left
patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);canMove&&nodeOps.insertBefore(parentElm,oldEndVnode.elm,oldStartVnode.elm);oldEndVnode=oldCh[--oldEndIdx];newStartVnode=newCh[++newStartIdx];}else{if(isUndef(oldKeyToIdx)){oldKeyToIdx=createKeyToOldIdx(oldCh,oldStartIdx,oldEndIdx);}idxInOld=isDef(newStartVnode.key)?oldKeyToIdx[newStartVnode.key]:null;if(isUndef(idxInOld)){// New element
createElm(newStartVnode,insertedVnodeQueue,parentElm,oldStartVnode.elm);newStartVnode=newCh[++newStartIdx];}else{elmToMove=oldCh[idxInOld];/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&!elmToMove){warn('It seems there are duplicate keys that is causing an update error. '+'Make sure each v-for item has a unique key.');}if(sameVnode(elmToMove,newStartVnode)){patchVnode(elmToMove,newStartVnode,insertedVnodeQueue);oldCh[idxInOld]=undefined;canMove&&nodeOps.insertBefore(parentElm,newStartVnode.elm,oldStartVnode.elm);newStartVnode=newCh[++newStartIdx];}else{// same key but different element. treat as new element
createElm(newStartVnode,insertedVnodeQueue,parentElm,oldStartVnode.elm);newStartVnode=newCh[++newStartIdx];}}}}if(oldStartIdx>oldEndIdx){refElm=isUndef(newCh[newEndIdx+1])?null:newCh[newEndIdx+1].elm;addVnodes(parentElm,refElm,newCh,newStartIdx,newEndIdx,insertedVnodeQueue);}else if(newStartIdx>newEndIdx){removeVnodes(parentElm,oldCh,oldStartIdx,oldEndIdx);}}function patchVnode(oldVnode,vnode,insertedVnodeQueue,removeOnly){if(oldVnode===vnode){return;}// reuse element for static trees.
// note we only do this if the vnode is cloned -
// if the new node is not cloned it means the render functions have been
// reset by the hot-reload-api and we need to do a proper re-render.
if(vnode.isStatic&&oldVnode.isStatic&&vnode.key===oldVnode.key&&(vnode.isCloned||vnode.isOnce)){vnode.elm=oldVnode.elm;vnode.componentInstance=oldVnode.componentInstance;return;}var i;var data=vnode.data;var hasData=isDef(data);if(hasData&&isDef(i=data.hook)&&isDef(i=i.prepatch)){i(oldVnode,vnode);}var elm=vnode.elm=oldVnode.elm;var oldCh=oldVnode.children;var ch=vnode.children;if(hasData&&isPatchable(vnode)){for(i=0;i<cbs.update.length;++i){cbs.update[i](oldVnode,vnode);}if(isDef(i=data.hook)&&isDef(i=i.update)){i(oldVnode,vnode);}}if(isUndef(vnode.text)){if(isDef(oldCh)&&isDef(ch)){if(oldCh!==ch){updateChildren(elm,oldCh,ch,insertedVnodeQueue,removeOnly);}}else if(isDef(ch)){if(isDef(oldVnode.text)){nodeOps.setTextContent(elm,'');}addVnodes(elm,null,ch,0,ch.length-1,insertedVnodeQueue);}else if(isDef(oldCh)){removeVnodes(elm,oldCh,0,oldCh.length-1);}else if(isDef(oldVnode.text)){nodeOps.setTextContent(elm,'');}}else if(oldVnode.text!==vnode.text){nodeOps.setTextContent(elm,vnode.text);}if(hasData){if(isDef(i=data.hook)&&isDef(i=i.postpatch)){i(oldVnode,vnode);}}}function invokeInsertHook(vnode,queue,initial){// delay insert hooks for component root nodes, invoke them after the
// element is really inserted
if(initial&&vnode.parent){vnode.parent.data.pendingInsert=queue;}else{for(var i=0;i<queue.length;++i){queue[i].data.hook.insert(queue[i]);}}}var bailed=false;// list of modules that can skip create hook during hydration because they
// are already rendered on the client or has no need for initialization
var isRenderedModule=makeMap('attrs,style,class,staticClass,staticStyle,key');// Note: this is a browser-only function so we can assume elms are DOM nodes.
function hydrate(elm,vnode,insertedVnodeQueue){if(process.env.NODE_ENV!=='production'){if(!assertNodeMatch(elm,vnode)){return false;}}vnode.elm=elm;var tag=vnode.tag;var data=vnode.data;var children=vnode.children;if(isDef(data)){if(isDef(i=data.hook)&&isDef(i=i.init)){i(vnode,true/* hydrating */);}if(isDef(i=vnode.componentInstance)){// child component. it should have hydrated its own tree.
initComponent(vnode,insertedVnodeQueue);return true;}}if(isDef(tag)){if(isDef(children)){// empty element, allow client to pick up and populate children
if(!elm.hasChildNodes()){createChildren(vnode,children,insertedVnodeQueue);}else{var childrenMatch=true;var childNode=elm.firstChild;for(var i$1=0;i$1<children.length;i$1++){if(!childNode||!hydrate(childNode,children[i$1],insertedVnodeQueue)){childrenMatch=false;break;}childNode=childNode.nextSibling;}// if childNode is not null, it means the actual childNodes list is
// longer than the virtual children list.
if(!childrenMatch||childNode){if(process.env.NODE_ENV!=='production'&&typeof console!=='undefined'&&!bailed){bailed=true;console.warn('Parent: ',elm);console.warn('Mismatching childNodes vs. VNodes: ',elm.childNodes,children);}return false;}}}if(isDef(data)){for(var key in data){if(!isRenderedModule(key)){invokeCreateHooks(vnode,insertedVnodeQueue);break;}}}}else if(elm.data!==vnode.text){elm.data=vnode.text;}return true;}function assertNodeMatch(node,vnode){if(vnode.tag){return vnode.tag.indexOf('vue-component')===0||vnode.tag.toLowerCase()===(node.tagName&&node.tagName.toLowerCase());}else{return node.nodeType===(vnode.isComment?8:3);}}return function patch(oldVnode,vnode,hydrating,removeOnly,parentElm,refElm){if(!vnode){if(oldVnode){invokeDestroyHook(oldVnode);}return;}var isInitialPatch=false;var insertedVnodeQueue=[];if(!oldVnode){// empty mount (likely as component), create new root element
isInitialPatch=true;createElm(vnode,insertedVnodeQueue,parentElm,refElm);}else{var isRealElement=isDef(oldVnode.nodeType);if(!isRealElement&&sameVnode(oldVnode,vnode)){// patch existing root node
patchVnode(oldVnode,vnode,insertedVnodeQueue,removeOnly);}else{if(isRealElement){// mounting to a real element
// check if this is server-rendered content and if we can perform
// a successful hydration.
if(oldVnode.nodeType===1&&oldVnode.hasAttribute('server-rendered')){oldVnode.removeAttribute('server-rendered');hydrating=true;}if(hydrating){if(hydrate(oldVnode,vnode,insertedVnodeQueue)){invokeInsertHook(vnode,insertedVnodeQueue,true);return oldVnode;}else if(process.env.NODE_ENV!=='production'){warn('The client-side rendered virtual DOM tree is not matching '+'server-rendered content. This is likely caused by incorrect '+'HTML markup, for example nesting block-level elements inside '+'<p>, or missing <tbody>. Bailing hydration and performing '+'full client-side render.');}}// either not server-rendered, or hydration failed.
// create an empty node and replace it
oldVnode=emptyNodeAt(oldVnode);}// replacing existing element
var oldElm=oldVnode.elm;var parentElm$1=nodeOps.parentNode(oldElm);createElm(vnode,insertedVnodeQueue,// extremely rare edge case: do not insert if old element is in a
// leaving transition. Only happens when combining transition +
// keep-alive + HOCs. (#4590)
oldElm._leaveCb?null:parentElm$1,nodeOps.nextSibling(oldElm));if(vnode.parent){// component root element replaced.
// update parent placeholder node element, recursively
var ancestor=vnode.parent;while(ancestor){ancestor.elm=vnode.elm;ancestor=ancestor.parent;}if(isPatchable(vnode)){for(var i=0;i<cbs.create.length;++i){cbs.create[i](emptyNode,vnode.parent);}}}if(parentElm$1!==null){removeVnodes(parentElm$1,[oldVnode],0,0);}else if(isDef(oldVnode.tag)){invokeDestroyHook(oldVnode);}}}invokeInsertHook(vnode,insertedVnodeQueue,isInitialPatch);return vnode.elm;};}/*  */var directives={create:updateDirectives,update:updateDirectives,destroy:function unbindDirectives(vnode){updateDirectives(vnode,emptyNode);}};function updateDirectives(oldVnode,vnode){if(oldVnode.data.directives||vnode.data.directives){_update(oldVnode,vnode);}}function _update(oldVnode,vnode){var isCreate=oldVnode===emptyNode;var isDestroy=vnode===emptyNode;var oldDirs=normalizeDirectives$1(oldVnode.data.directives,oldVnode.context);var newDirs=normalizeDirectives$1(vnode.data.directives,vnode.context);var dirsWithInsert=[];var dirsWithPostpatch=[];var key,oldDir,dir;for(key in newDirs){oldDir=oldDirs[key];dir=newDirs[key];if(!oldDir){// new directive, bind
callHook$1(dir,'bind',vnode,oldVnode);if(dir.def&&dir.def.inserted){dirsWithInsert.push(dir);}}else{// existing directive, update
dir.oldValue=oldDir.value;callHook$1(dir,'update',vnode,oldVnode);if(dir.def&&dir.def.componentUpdated){dirsWithPostpatch.push(dir);}}}if(dirsWithInsert.length){var callInsert=function callInsert(){for(var i=0;i<dirsWithInsert.length;i++){callHook$1(dirsWithInsert[i],'inserted',vnode,oldVnode);}};if(isCreate){mergeVNodeHook(vnode.data.hook||(vnode.data.hook={}),'insert',callInsert);}else{callInsert();}}if(dirsWithPostpatch.length){mergeVNodeHook(vnode.data.hook||(vnode.data.hook={}),'postpatch',function(){for(var i=0;i<dirsWithPostpatch.length;i++){callHook$1(dirsWithPostpatch[i],'componentUpdated',vnode,oldVnode);}});}if(!isCreate){for(key in oldDirs){if(!newDirs[key]){// no longer present, unbind
callHook$1(oldDirs[key],'unbind',oldVnode,oldVnode,isDestroy);}}}}var emptyModifiers=(0,_create2.default)(null);function normalizeDirectives$1(dirs,vm){var res=(0,_create2.default)(null);if(!dirs){return res;}var i,dir;for(i=0;i<dirs.length;i++){dir=dirs[i];if(!dir.modifiers){dir.modifiers=emptyModifiers;}res[getRawDirName(dir)]=dir;dir.def=resolveAsset(vm.$options,'directives',dir.name,true);}return res;}function getRawDirName(dir){return dir.rawName||dir.name+"."+(0,_keys2.default)(dir.modifiers||{}).join('.');}function callHook$1(dir,hook,vnode,oldVnode,isDestroy){var fn=dir.def&&dir.def[hook];if(fn){fn(vnode.elm,dir,vnode,oldVnode,isDestroy);}}var baseModules=[ref,directives];/*  */function updateAttrs(oldVnode,vnode){if(!oldVnode.data.attrs&&!vnode.data.attrs){return;}var key,cur,old;var elm=vnode.elm;var oldAttrs=oldVnode.data.attrs||{};var attrs=vnode.data.attrs||{};// clone observed objects, as the user probably wants to mutate it
if(attrs.__ob__){attrs=vnode.data.attrs=extend({},attrs);}for(key in attrs){cur=attrs[key];old=oldAttrs[key];if(old!==cur){setAttr(elm,key,cur);}}// #4391: in IE9, setting type can reset value for input[type=radio]
/* istanbul ignore if */if(isIE9&&attrs.value!==oldAttrs.value){setAttr(elm,'value',attrs.value);}for(key in oldAttrs){if(attrs[key]==null){if(isXlink(key)){elm.removeAttributeNS(xlinkNS,getXlinkProp(key));}else if(!isEnumeratedAttr(key)){elm.removeAttribute(key);}}}}function setAttr(el,key,value){if(isBooleanAttr(key)){// set attribute for blank value
// e.g. <option disabled>Select one</option>
if(isFalsyAttrValue(value)){el.removeAttribute(key);}else{el.setAttribute(key,key);}}else if(isEnumeratedAttr(key)){el.setAttribute(key,isFalsyAttrValue(value)||value==='false'?'false':'true');}else if(isXlink(key)){if(isFalsyAttrValue(value)){el.removeAttributeNS(xlinkNS,getXlinkProp(key));}else{el.setAttributeNS(xlinkNS,key,value);}}else{if(isFalsyAttrValue(value)){el.removeAttribute(key);}else{el.setAttribute(key,value);}}}var attrs={create:updateAttrs,update:updateAttrs};/*  */function updateClass(oldVnode,vnode){var el=vnode.elm;var data=vnode.data;var oldData=oldVnode.data;if(!data.staticClass&&!data.class&&(!oldData||!oldData.staticClass&&!oldData.class)){return;}var cls=genClassForVnode(vnode);// handle transition classes
var transitionClass=el._transitionClasses;if(transitionClass){cls=concat(cls,stringifyClass(transitionClass));}// set the class
if(cls!==el._prevClass){el.setAttribute('class',cls);el._prevClass=cls;}}var klass={create:updateClass,update:updateClass};/*  */var validDivisionCharRE=/[\w).+\-_$\]]/;function parseFilters(exp){var inSingle=false;var inDouble=false;var inTemplateString=false;var inRegex=false;var curly=0;var square=0;var paren=0;var lastFilterIndex=0;var c,prev,i,expression,filters;for(i=0;i<exp.length;i++){prev=c;c=exp.charCodeAt(i);if(inSingle){if(c===0x27&&prev!==0x5C){inSingle=false;}}else if(inDouble){if(c===0x22&&prev!==0x5C){inDouble=false;}}else if(inTemplateString){if(c===0x60&&prev!==0x5C){inTemplateString=false;}}else if(inRegex){if(c===0x2f&&prev!==0x5C){inRegex=false;}}else if(c===0x7C&&// pipe
exp.charCodeAt(i+1)!==0x7C&&exp.charCodeAt(i-1)!==0x7C&&!curly&&!square&&!paren){if(expression===undefined){// first filter, end of expression
lastFilterIndex=i+1;expression=exp.slice(0,i).trim();}else{pushFilter();}}else{switch(c){case 0x22:inDouble=true;break;// "
case 0x27:inSingle=true;break;// '
case 0x60:inTemplateString=true;break;// `
case 0x28:paren++;break;// (
case 0x29:paren--;break;// )
case 0x5B:square++;break;// [
case 0x5D:square--;break;// ]
case 0x7B:curly++;break;// {
case 0x7D:curly--;break;// }
}if(c===0x2f){// /
var j=i-1;var p=void 0;// find first non-whitespace prev char
for(;j>=0;j--){p=exp.charAt(j);if(p!==' '){break;}}if(!p||!validDivisionCharRE.test(p)){inRegex=true;}}}}if(expression===undefined){expression=exp.slice(0,i).trim();}else if(lastFilterIndex!==0){pushFilter();}function pushFilter(){(filters||(filters=[])).push(exp.slice(lastFilterIndex,i).trim());lastFilterIndex=i+1;}if(filters){for(i=0;i<filters.length;i++){expression=wrapFilter(expression,filters[i]);}}return expression;}function wrapFilter(exp,filter){var i=filter.indexOf('(');if(i<0){// _f: resolveFilter
return"_f(\""+filter+"\")("+exp+")";}else{var name=filter.slice(0,i);var args=filter.slice(i+1);return"_f(\""+name+"\")("+exp+","+args;}}/*  */function baseWarn(msg){console.error("[Vue compiler]: "+msg);}function pluckModuleFunction(modules,key){return modules?modules.map(function(m){return m[key];}).filter(function(_){return _;}):[];}function addProp(el,name,value){(el.props||(el.props=[])).push({name:name,value:value});}function addAttr(el,name,value){(el.attrs||(el.attrs=[])).push({name:name,value:value});}function addDirective(el,name,rawName,value,arg,modifiers){(el.directives||(el.directives=[])).push({name:name,rawName:rawName,value:value,arg:arg,modifiers:modifiers});}function addHandler(el,name,value,modifiers,important){// check capture modifier
if(modifiers&&modifiers.capture){delete modifiers.capture;name='!'+name;// mark the event as captured
}if(modifiers&&modifiers.once){delete modifiers.once;name='~'+name;// mark the event as once
}var events;if(modifiers&&modifiers.native){delete modifiers.native;events=el.nativeEvents||(el.nativeEvents={});}else{events=el.events||(el.events={});}var newHandler={value:value,modifiers:modifiers};var handlers=events[name];/* istanbul ignore if */if(Array.isArray(handlers)){important?handlers.unshift(newHandler):handlers.push(newHandler);}else if(handlers){events[name]=important?[newHandler,handlers]:[handlers,newHandler];}else{events[name]=newHandler;}}function getBindingAttr(el,name,getStatic){var dynamicValue=getAndRemoveAttr(el,':'+name)||getAndRemoveAttr(el,'v-bind:'+name);if(dynamicValue!=null){return parseFilters(dynamicValue);}else if(getStatic!==false){var staticValue=getAndRemoveAttr(el,name);if(staticValue!=null){return(0,_stringify2.default)(staticValue);}}}function getAndRemoveAttr(el,name){var val;if((val=el.attrsMap[name])!=null){var list=el.attrsList;for(var i=0,l=list.length;i<l;i++){if(list[i].name===name){list.splice(i,1);break;}}}return val;}/*  *//**
 * Cross-platform code generation for component v-model
 */function genComponentModel(el,value,modifiers){var ref=modifiers||{};var number=ref.number;var trim=ref.trim;var baseValueExpression='$$v';var valueExpression=baseValueExpression;if(trim){valueExpression="(typeof "+baseValueExpression+" === 'string'"+"? "+baseValueExpression+".trim()"+": "+baseValueExpression+")";}if(number){valueExpression="_n("+valueExpression+")";}var assignment=genAssignmentCode(value,valueExpression);el.model={value:"("+value+")",expression:"\""+value+"\"",callback:"function ("+baseValueExpression+") {"+assignment+"}"};}/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */function genAssignmentCode(value,assignment){var modelRs=parseModel(value);if(modelRs.idx===null){return value+"="+assignment;}else{return"var $$exp = "+modelRs.exp+", $$idx = "+modelRs.idx+";"+"if (!Array.isArray($$exp)){"+value+"="+assignment+"}"+"else{$$exp.splice($$idx, 1, "+assignment+")}";}}/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */var len;var str;var chr;var index$1;var expressionPos;var expressionEndPos;function parseModel(val){str=val;len=str.length;index$1=expressionPos=expressionEndPos=0;if(val.indexOf('[')<0||val.lastIndexOf(']')<len-1){return{exp:val,idx:null};}while(!eof()){chr=next();/* istanbul ignore if */if(isStringStart(chr)){parseString(chr);}else if(chr===0x5B){parseBracket(chr);}}return{exp:val.substring(0,expressionPos),idx:val.substring(expressionPos+1,expressionEndPos)};}function next(){return str.charCodeAt(++index$1);}function eof(){return index$1>=len;}function isStringStart(chr){return chr===0x22||chr===0x27;}function parseBracket(chr){var inBracket=1;expressionPos=index$1;while(!eof()){chr=next();if(isStringStart(chr)){parseString(chr);continue;}if(chr===0x5B){inBracket++;}if(chr===0x5D){inBracket--;}if(inBracket===0){expressionEndPos=index$1;break;}}}function parseString(chr){var stringQuote=chr;while(!eof()){chr=next();if(chr===stringQuote){break;}}}/*  */var warn$1;// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN='__r';var CHECKBOX_RADIO_TOKEN='__c';function model(el,dir,_warn){warn$1=_warn;var value=dir.value;var modifiers=dir.modifiers;var tag=el.tag;var type=el.attrsMap.type;if(process.env.NODE_ENV!=='production'){var dynamicType=el.attrsMap['v-bind:type']||el.attrsMap[':type'];if(tag==='input'&&dynamicType){warn$1("<input :type=\""+dynamicType+"\" v-model=\""+value+"\">:\n"+"v-model does not support dynamic input types. Use v-if branches instead.");}// inputs with type="file" are read only and setting the input's
// value will throw an error.
if(tag==='input'&&type==='file'){warn$1("<"+el.tag+" v-model=\""+value+"\" type=\"file\">:\n"+"File inputs are read only. Use a v-on:change listener instead.");}}if(tag==='select'){genSelect(el,value,modifiers);}else if(tag==='input'&&type==='checkbox'){genCheckboxModel(el,value,modifiers);}else if(tag==='input'&&type==='radio'){genRadioModel(el,value,modifiers);}else if(tag==='input'||tag==='textarea'){genDefaultModel(el,value,modifiers);}else if(!config.isReservedTag(tag)){genComponentModel(el,value,modifiers);// component v-model doesn't need extra runtime
return false;}else if(process.env.NODE_ENV!=='production'){warn$1("<"+el.tag+" v-model=\""+value+"\">: "+"v-model is not supported on this element type. "+'If you are working with contenteditable, it\'s recommended to '+'wrap a library dedicated for that purpose inside a custom component.');}// ensure runtime directive metadata
return true;}function genCheckboxModel(el,value,modifiers){var number=modifiers&&modifiers.number;var valueBinding=getBindingAttr(el,'value')||'null';var trueValueBinding=getBindingAttr(el,'true-value')||'true';var falseValueBinding=getBindingAttr(el,'false-value')||'false';addProp(el,'checked',"Array.isArray("+value+")"+"?_i("+value+","+valueBinding+")>-1"+(trueValueBinding==='true'?":("+value+")":":_q("+value+","+trueValueBinding+")"));addHandler(el,CHECKBOX_RADIO_TOKEN,"var $$a="+value+","+'$$el=$event.target,'+"$$c=$$el.checked?("+trueValueBinding+"):("+falseValueBinding+");"+'if(Array.isArray($$a)){'+"var $$v="+(number?'_n('+valueBinding+')':valueBinding)+","+'$$i=_i($$a,$$v);'+"if($$c){$$i<0&&("+value+"=$$a.concat($$v))}"+"else{$$i>-1&&("+value+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}"+"}else{"+value+"=$$c}",null,true);}function genRadioModel(el,value,modifiers){var number=modifiers&&modifiers.number;var valueBinding=getBindingAttr(el,'value')||'null';valueBinding=number?"_n("+valueBinding+")":valueBinding;addProp(el,'checked',"_q("+value+","+valueBinding+")");addHandler(el,CHECKBOX_RADIO_TOKEN,genAssignmentCode(value,valueBinding),null,true);}function genSelect(el,value,modifiers){var number=modifiers&&modifiers.number;var selectedVal="Array.prototype.filter"+".call($event.target.options,function(o){return o.selected})"+".map(function(o){var val = \"_value\" in o ? o._value : o.value;"+"return "+(number?'_n(val)':'val')+"})";var assignment='$event.target.multiple ? $$selectedVal : $$selectedVal[0]';var code="var $$selectedVal = "+selectedVal+";";code=code+" "+genAssignmentCode(value,assignment);addHandler(el,'change',code,null,true);}function genDefaultModel(el,value,modifiers){var type=el.attrsMap.type;var ref=modifiers||{};var lazy=ref.lazy;var number=ref.number;var trim=ref.trim;var needCompositionGuard=!lazy&&type!=='range';var event=lazy?'change':type==='range'?RANGE_TOKEN:'input';var valueExpression='$event.target.value';if(trim){valueExpression="$event.target.value.trim()";}if(number){valueExpression="_n("+valueExpression+")";}var code=genAssignmentCode(value,valueExpression);if(needCompositionGuard){code="if($event.target.composing)return;"+code;}addProp(el,'value',"("+value+")");addHandler(el,event,code,null,true);if(trim||number||type==='number'){addHandler(el,'blur','$forceUpdate()');}}/*  */// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on){var event;/* istanbul ignore if */if(on[RANGE_TOKEN]){// IE input[type=range] only supports `change` event
event=isIE?'change':'input';on[event]=[].concat(on[RANGE_TOKEN],on[event]||[]);delete on[RANGE_TOKEN];}if(on[CHECKBOX_RADIO_TOKEN]){// Chrome fires microtasks in between click/change, leads to #4521
event=isChrome?'click':'change';on[event]=[].concat(on[CHECKBOX_RADIO_TOKEN],on[event]||[]);delete on[CHECKBOX_RADIO_TOKEN];}}var target$1;function add$1(event,_handler,once,capture){if(once){var oldHandler=_handler;var _target=target$1;// save current target element in closure
_handler=function handler(ev){var res=arguments.length===1?oldHandler(ev):oldHandler.apply(null,arguments);if(res!==null){remove$2(event,_handler,capture,_target);}};}target$1.addEventListener(event,_handler,capture);}function remove$2(event,handler,capture,_target){(_target||target$1).removeEventListener(event,handler,capture);}function updateDOMListeners(oldVnode,vnode){if(!oldVnode.data.on&&!vnode.data.on){return;}var on=vnode.data.on||{};var oldOn=oldVnode.data.on||{};target$1=vnode.elm;normalizeEvents(on);updateListeners(on,oldOn,add$1,remove$2,vnode.context);}var events={create:updateDOMListeners,update:updateDOMListeners};/*  */function updateDOMProps(oldVnode,vnode){if(!oldVnode.data.domProps&&!vnode.data.domProps){return;}var key,cur;var elm=vnode.elm;var oldProps=oldVnode.data.domProps||{};var props=vnode.data.domProps||{};// clone observed objects, as the user probably wants to mutate it
if(props.__ob__){props=vnode.data.domProps=extend({},props);}for(key in oldProps){if(props[key]==null){elm[key]='';}}for(key in props){cur=props[key];// ignore children if the node has textContent or innerHTML,
// as these will throw away existing DOM nodes and cause removal errors
// on subsequent patches (#3360)
if(key==='textContent'||key==='innerHTML'){if(vnode.children){vnode.children.length=0;}if(cur===oldProps[key]){continue;}}if(key==='value'){// store value as _value as well since
// non-string values will be stringified
elm._value=cur;// avoid resetting cursor position when value is the same
var strCur=cur==null?'':String(cur);if(shouldUpdateValue(elm,vnode,strCur)){elm.value=strCur;}}else{elm[key]=cur;}}}// check platforms/web/util/attrs.js acceptValue
function shouldUpdateValue(elm,vnode,checkVal){return!elm.composing&&(vnode.tag==='option'||isDirty(elm,checkVal)||isInputChanged(elm,checkVal));}function isDirty(elm,checkVal){// return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
return document.activeElement!==elm&&elm.value!==checkVal;}function isInputChanged(elm,newVal){var value=elm.value;var modifiers=elm._vModifiers;// injected by v-model runtime
if(modifiers&&modifiers.number||elm.type==='number'){return toNumber(value)!==toNumber(newVal);}if(modifiers&&modifiers.trim){return value.trim()!==newVal.trim();}return value!==newVal;}var domProps={create:updateDOMProps,update:updateDOMProps};/*  */var parseStyleText=cached(function(cssText){var res={};var listDelimiter=/;(?![^(]*\))/g;var propertyDelimiter=/:(.+)/;cssText.split(listDelimiter).forEach(function(item){if(item){var tmp=item.split(propertyDelimiter);tmp.length>1&&(res[tmp[0].trim()]=tmp[1].trim());}});return res;});// merge static and dynamic style data on the same vnode
function normalizeStyleData(data){var style=normalizeStyleBinding(data.style);// static style is pre-processed into an object during compilation
// and is always a fresh object, so it's safe to merge into it
return data.staticStyle?extend(data.staticStyle,style):style;}// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle){if(Array.isArray(bindingStyle)){return toObject(bindingStyle);}if(typeof bindingStyle==='string'){return parseStyleText(bindingStyle);}return bindingStyle;}/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */function getStyle(vnode,checkChild){var res={};var styleData;if(checkChild){var childNode=vnode;while(childNode.componentInstance){childNode=childNode.componentInstance._vnode;if(childNode.data&&(styleData=normalizeStyleData(childNode.data))){extend(res,styleData);}}}if(styleData=normalizeStyleData(vnode.data)){extend(res,styleData);}var parentNode=vnode;while(parentNode=parentNode.parent){if(parentNode.data&&(styleData=normalizeStyleData(parentNode.data))){extend(res,styleData);}}return res;}/*  */var cssVarRE=/^--/;var importantRE=/\s*!important$/;var setProp=function setProp(el,name,val){/* istanbul ignore if */if(cssVarRE.test(name)){el.style.setProperty(name,val);}else if(importantRE.test(val)){el.style.setProperty(name,val.replace(importantRE,''),'important');}else{el.style[normalize(name)]=val;}};var prefixes=['Webkit','Moz','ms'];var testEl;var normalize=cached(function(prop){testEl=testEl||document.createElement('div');prop=camelize(prop);if(prop!=='filter'&&prop in testEl.style){return prop;}var upper=prop.charAt(0).toUpperCase()+prop.slice(1);for(var i=0;i<prefixes.length;i++){var prefixed=prefixes[i]+upper;if(prefixed in testEl.style){return prefixed;}}});function updateStyle(oldVnode,vnode){var data=vnode.data;var oldData=oldVnode.data;if(!data.staticStyle&&!data.style&&!oldData.staticStyle&&!oldData.style){return;}var cur,name;var el=vnode.elm;var oldStaticStyle=oldVnode.data.staticStyle;var oldStyleBinding=oldVnode.data.style||{};// if static style exists, stylebinding already merged into it when doing normalizeStyleData
var oldStyle=oldStaticStyle||oldStyleBinding;var style=normalizeStyleBinding(vnode.data.style)||{};vnode.data.style=style.__ob__?extend({},style):style;var newStyle=getStyle(vnode,true);for(name in oldStyle){if(newStyle[name]==null){setProp(el,name,'');}}for(name in newStyle){cur=newStyle[name];if(cur!==oldStyle[name]){// ie9 setting to null has no effect, must use empty string
setProp(el,name,cur==null?'':cur);}}}var style={create:updateStyle,update:updateStyle};/*  *//**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */function addClass(el,cls){/* istanbul ignore if */if(!cls||!(cls=cls.trim())){return;}/* istanbul ignore else */if(el.classList){if(cls.indexOf(' ')>-1){cls.split(/\s+/).forEach(function(c){return el.classList.add(c);});}else{el.classList.add(cls);}}else{var cur=" "+(el.getAttribute('class')||'')+" ";if(cur.indexOf(' '+cls+' ')<0){el.setAttribute('class',(cur+cls).trim());}}}/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */function removeClass(el,cls){/* istanbul ignore if */if(!cls||!(cls=cls.trim())){return;}/* istanbul ignore else */if(el.classList){if(cls.indexOf(' ')>-1){cls.split(/\s+/).forEach(function(c){return el.classList.remove(c);});}else{el.classList.remove(cls);}}else{var cur=" "+(el.getAttribute('class')||'')+" ";var tar=' '+cls+' ';while(cur.indexOf(tar)>=0){cur=cur.replace(tar,' ');}el.setAttribute('class',cur.trim());}}/*  */function resolveTransition(def$$1){if(!def$$1){return;}/* istanbul ignore else */if((typeof def$$1==="undefined"?"undefined":(0,_typeof3.default)(def$$1))==='object'){var res={};if(def$$1.css!==false){extend(res,autoCssTransition(def$$1.name||'v'));}extend(res,def$$1);return res;}else if(typeof def$$1==='string'){return autoCssTransition(def$$1);}}var autoCssTransition=cached(function(name){return{enterClass:name+"-enter",enterToClass:name+"-enter-to",enterActiveClass:name+"-enter-active",leaveClass:name+"-leave",leaveToClass:name+"-leave-to",leaveActiveClass:name+"-leave-active"};});var hasTransition=inBrowser&&!isIE9;var TRANSITION='transition';var ANIMATION='animation';// Transition property/event sniffing
var transitionProp='transition';var transitionEndEvent='transitionend';var animationProp='animation';var animationEndEvent='animationend';if(hasTransition){/* istanbul ignore if */if(window.ontransitionend===undefined&&window.onwebkittransitionend!==undefined){transitionProp='WebkitTransition';transitionEndEvent='webkitTransitionEnd';}if(window.onanimationend===undefined&&window.onwebkitanimationend!==undefined){animationProp='WebkitAnimation';animationEndEvent='webkitAnimationEnd';}}// binding to window is necessary to make hot reload work in IE in strict mode
var raf=inBrowser&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout;function nextFrame(fn){raf(function(){raf(fn);});}function addTransitionClass(el,cls){(el._transitionClasses||(el._transitionClasses=[])).push(cls);addClass(el,cls);}function removeTransitionClass(el,cls){if(el._transitionClasses){remove(el._transitionClasses,cls);}removeClass(el,cls);}function whenTransitionEnds(el,expectedType,cb){var ref=getTransitionInfo(el,expectedType);var type=ref.type;var timeout=ref.timeout;var propCount=ref.propCount;if(!type){return cb();}var event=type===TRANSITION?transitionEndEvent:animationEndEvent;var ended=0;var end=function end(){el.removeEventListener(event,onEnd);cb();};var onEnd=function onEnd(e){if(e.target===el){if(++ended>=propCount){end();}}};setTimeout(function(){if(ended<propCount){end();}},timeout+1);el.addEventListener(event,onEnd);}var transformRE=/\b(transform|all)(,|$)/;function getTransitionInfo(el,expectedType){var styles=window.getComputedStyle(el);var transitionDelays=styles[transitionProp+'Delay'].split(', ');var transitionDurations=styles[transitionProp+'Duration'].split(', ');var transitionTimeout=getTimeout(transitionDelays,transitionDurations);var animationDelays=styles[animationProp+'Delay'].split(', ');var animationDurations=styles[animationProp+'Duration'].split(', ');var animationTimeout=getTimeout(animationDelays,animationDurations);var type;var timeout=0;var propCount=0;/* istanbul ignore if */if(expectedType===TRANSITION){if(transitionTimeout>0){type=TRANSITION;timeout=transitionTimeout;propCount=transitionDurations.length;}}else if(expectedType===ANIMATION){if(animationTimeout>0){type=ANIMATION;timeout=animationTimeout;propCount=animationDurations.length;}}else{timeout=Math.max(transitionTimeout,animationTimeout);type=timeout>0?transitionTimeout>animationTimeout?TRANSITION:ANIMATION:null;propCount=type?type===TRANSITION?transitionDurations.length:animationDurations.length:0;}var hasTransform=type===TRANSITION&&transformRE.test(styles[transitionProp+'Property']);return{type:type,timeout:timeout,propCount:propCount,hasTransform:hasTransform};}function getTimeout(delays,durations){/* istanbul ignore next */while(delays.length<durations.length){delays=delays.concat(delays);}return Math.max.apply(null,durations.map(function(d,i){return toMs(d)+toMs(delays[i]);}));}function toMs(s){return Number(s.slice(0,-1))*1000;}/*  */function enter(vnode,toggleDisplay){var el=vnode.elm;// call leave callback now
if(el._leaveCb){el._leaveCb.cancelled=true;el._leaveCb();}var data=resolveTransition(vnode.data.transition);if(!data){return;}/* istanbul ignore if */if(el._enterCb||el.nodeType!==1){return;}var css=data.css;var type=data.type;var enterClass=data.enterClass;var enterToClass=data.enterToClass;var enterActiveClass=data.enterActiveClass;var appearClass=data.appearClass;var appearToClass=data.appearToClass;var appearActiveClass=data.appearActiveClass;var beforeEnter=data.beforeEnter;var enter=data.enter;var afterEnter=data.afterEnter;var enterCancelled=data.enterCancelled;var beforeAppear=data.beforeAppear;var appear=data.appear;var afterAppear=data.afterAppear;var appearCancelled=data.appearCancelled;var duration=data.duration;// activeInstance will always be the <transition> component managing this
// transition. One edge case to check is when the <transition> is placed
// as the root node of a child component. In that case we need to check
// <transition>'s parent for appear check.
var context=activeInstance;var transitionNode=activeInstance.$vnode;while(transitionNode&&transitionNode.parent){transitionNode=transitionNode.parent;context=transitionNode.context;}var isAppear=!context._isMounted||!vnode.isRootInsert;if(isAppear&&!appear&&appear!==''){return;}var startClass=isAppear&&appearClass?appearClass:enterClass;var activeClass=isAppear&&appearActiveClass?appearActiveClass:enterActiveClass;var toClass=isAppear&&appearToClass?appearToClass:enterToClass;var beforeEnterHook=isAppear?beforeAppear||beforeEnter:beforeEnter;var enterHook=isAppear?typeof appear==='function'?appear:enter:enter;var afterEnterHook=isAppear?afterAppear||afterEnter:afterEnter;var enterCancelledHook=isAppear?appearCancelled||enterCancelled:enterCancelled;var explicitEnterDuration=toNumber(isObject(duration)?duration.enter:duration);if(process.env.NODE_ENV!=='production'&&explicitEnterDuration!=null){checkDuration(explicitEnterDuration,'enter',vnode);}var expectsCSS=css!==false&&!isIE9;var userWantsControl=getHookArgumentsLength(enterHook);var cb=el._enterCb=once(function(){if(expectsCSS){removeTransitionClass(el,toClass);removeTransitionClass(el,activeClass);}if(cb.cancelled){if(expectsCSS){removeTransitionClass(el,startClass);}enterCancelledHook&&enterCancelledHook(el);}else{afterEnterHook&&afterEnterHook(el);}el._enterCb=null;});if(!vnode.data.show){// remove pending leave element on enter by injecting an insert hook
mergeVNodeHook(vnode.data.hook||(vnode.data.hook={}),'insert',function(){var parent=el.parentNode;var pendingNode=parent&&parent._pending&&parent._pending[vnode.key];if(pendingNode&&pendingNode.tag===vnode.tag&&pendingNode.elm._leaveCb){pendingNode.elm._leaveCb();}enterHook&&enterHook(el,cb);});}// start enter transition
beforeEnterHook&&beforeEnterHook(el);if(expectsCSS){addTransitionClass(el,startClass);addTransitionClass(el,activeClass);nextFrame(function(){addTransitionClass(el,toClass);removeTransitionClass(el,startClass);if(!cb.cancelled&&!userWantsControl){if(isValidDuration(explicitEnterDuration)){setTimeout(cb,explicitEnterDuration);}else{whenTransitionEnds(el,type,cb);}}});}if(vnode.data.show){toggleDisplay&&toggleDisplay();enterHook&&enterHook(el,cb);}if(!expectsCSS&&!userWantsControl){cb();}}function leave(vnode,rm){var el=vnode.elm;// call enter callback now
if(el._enterCb){el._enterCb.cancelled=true;el._enterCb();}var data=resolveTransition(vnode.data.transition);if(!data){return rm();}/* istanbul ignore if */if(el._leaveCb||el.nodeType!==1){return;}var css=data.css;var type=data.type;var leaveClass=data.leaveClass;var leaveToClass=data.leaveToClass;var leaveActiveClass=data.leaveActiveClass;var beforeLeave=data.beforeLeave;var leave=data.leave;var afterLeave=data.afterLeave;var leaveCancelled=data.leaveCancelled;var delayLeave=data.delayLeave;var duration=data.duration;var expectsCSS=css!==false&&!isIE9;var userWantsControl=getHookArgumentsLength(leave);var explicitLeaveDuration=toNumber(isObject(duration)?duration.leave:duration);if(process.env.NODE_ENV!=='production'&&explicitLeaveDuration!=null){checkDuration(explicitLeaveDuration,'leave',vnode);}var cb=el._leaveCb=once(function(){if(el.parentNode&&el.parentNode._pending){el.parentNode._pending[vnode.key]=null;}if(expectsCSS){removeTransitionClass(el,leaveToClass);removeTransitionClass(el,leaveActiveClass);}if(cb.cancelled){if(expectsCSS){removeTransitionClass(el,leaveClass);}leaveCancelled&&leaveCancelled(el);}else{rm();afterLeave&&afterLeave(el);}el._leaveCb=null;});if(delayLeave){delayLeave(performLeave);}else{performLeave();}function performLeave(){// the delayed leave may have already been cancelled
if(cb.cancelled){return;}// record leaving element
if(!vnode.data.show){(el.parentNode._pending||(el.parentNode._pending={}))[vnode.key]=vnode;}beforeLeave&&beforeLeave(el);if(expectsCSS){addTransitionClass(el,leaveClass);addTransitionClass(el,leaveActiveClass);nextFrame(function(){addTransitionClass(el,leaveToClass);removeTransitionClass(el,leaveClass);if(!cb.cancelled&&!userWantsControl){if(isValidDuration(explicitLeaveDuration)){setTimeout(cb,explicitLeaveDuration);}else{whenTransitionEnds(el,type,cb);}}});}leave&&leave(el,cb);if(!expectsCSS&&!userWantsControl){cb();}}}// only used in dev mode
function checkDuration(val,name,vnode){if(typeof val!=='number'){warn("<transition> explicit "+name+" duration is not a valid number - "+"got "+(0,_stringify2.default)(val)+".",vnode.context);}else if(isNaN(val)){warn("<transition> explicit "+name+" duration is NaN - "+'the duration expression might be incorrect.',vnode.context);}}function isValidDuration(val){return typeof val==='number'&&!isNaN(val);}/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */function getHookArgumentsLength(fn){if(!fn){return false;}var invokerFns=fn.fns;if(invokerFns){// invoker
return getHookArgumentsLength(Array.isArray(invokerFns)?invokerFns[0]:invokerFns);}else{return(fn._length||fn.length)>1;}}function _enter(_,vnode){if(!vnode.data.show){enter(vnode);}}var transition=inBrowser?{create:_enter,activate:_enter,remove:function remove$$1(vnode,rm){/* istanbul ignore else */if(!vnode.data.show){leave(vnode,rm);}else{rm();}}}:{};var platformModules=[attrs,klass,events,domProps,style,transition];/*  */// the directive module should be applied last, after all
// built-in modules have been applied.
var modules=platformModules.concat(baseModules);var patch=createPatchFunction({nodeOps:nodeOps,modules:modules});/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 *//* istanbul ignore if */if(isIE9){// http://www.matts411.com/post/internet-explorer-9-oninput/
document.addEventListener('selectionchange',function(){var el=document.activeElement;if(el&&el.vmodel){trigger(el,'input');}});}var model$1={inserted:function inserted(el,binding,vnode){if(vnode.tag==='select'){var cb=function cb(){setSelected(el,binding,vnode.context);};cb();/* istanbul ignore if */if(isIE||isEdge){setTimeout(cb,0);}}else if(vnode.tag==='textarea'||el.type==='text'){el._vModifiers=binding.modifiers;if(!binding.modifiers.lazy){if(!isAndroid){el.addEventListener('compositionstart',onCompositionStart);el.addEventListener('compositionend',onCompositionEnd);}/* istanbul ignore if */if(isIE9){el.vmodel=true;}}}},componentUpdated:function componentUpdated(el,binding,vnode){if(vnode.tag==='select'){setSelected(el,binding,vnode.context);// in case the options rendered by v-for have changed,
// it's possible that the value is out-of-sync with the rendered options.
// detect such cases and filter out values that no longer has a matching
// option in the DOM.
var needReset=el.multiple?binding.value.some(function(v){return hasNoMatchingOption(v,el.options);}):binding.value!==binding.oldValue&&hasNoMatchingOption(binding.value,el.options);if(needReset){trigger(el,'change');}}}};function setSelected(el,binding,vm){var value=binding.value;var isMultiple=el.multiple;if(isMultiple&&!Array.isArray(value)){process.env.NODE_ENV!=='production'&&warn("<select multiple v-model=\""+binding.expression+"\"> "+"expects an Array value for its binding, but got "+Object.prototype.toString.call(value).slice(8,-1),vm);return;}var selected,option;for(var i=0,l=el.options.length;i<l;i++){option=el.options[i];if(isMultiple){selected=looseIndexOf(value,getValue(option))>-1;if(option.selected!==selected){option.selected=selected;}}else{if(looseEqual(getValue(option),value)){if(el.selectedIndex!==i){el.selectedIndex=i;}return;}}}if(!isMultiple){el.selectedIndex=-1;}}function hasNoMatchingOption(value,options){for(var i=0,l=options.length;i<l;i++){if(looseEqual(getValue(options[i]),value)){return false;}}return true;}function getValue(option){return'_value'in option?option._value:option.value;}function onCompositionStart(e){e.target.composing=true;}function onCompositionEnd(e){e.target.composing=false;trigger(e.target,'input');}function trigger(el,type){var e=document.createEvent('HTMLEvents');e.initEvent(type,true,true);el.dispatchEvent(e);}/*  */// recursively search for possible transition defined inside the component root
function locateNode(vnode){return vnode.componentInstance&&(!vnode.data||!vnode.data.transition)?locateNode(vnode.componentInstance._vnode):vnode;}var show={bind:function bind(el,ref,vnode){var value=ref.value;vnode=locateNode(vnode);var transition=vnode.data&&vnode.data.transition;var originalDisplay=el.__vOriginalDisplay=el.style.display==='none'?'':el.style.display;if(value&&transition&&!isIE9){vnode.data.show=true;enter(vnode,function(){el.style.display=originalDisplay;});}else{el.style.display=value?originalDisplay:'none';}},update:function update(el,ref,vnode){var value=ref.value;var oldValue=ref.oldValue;/* istanbul ignore if */if(value===oldValue){return;}vnode=locateNode(vnode);var transition=vnode.data&&vnode.data.transition;if(transition&&!isIE9){vnode.data.show=true;if(value){enter(vnode,function(){el.style.display=el.__vOriginalDisplay;});}else{leave(vnode,function(){el.style.display='none';});}}else{el.style.display=value?el.__vOriginalDisplay:'none';}},unbind:function unbind(el,binding,vnode,oldVnode,isDestroy){if(!isDestroy){el.style.display=el.__vOriginalDisplay;}}};var platformDirectives={model:model$1,show:show};/*  */// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)
var transitionProps={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode){var compOptions=vnode&&vnode.componentOptions;if(compOptions&&compOptions.Ctor.options.abstract){return getRealChild(getFirstComponentChild(compOptions.children));}else{return vnode;}}function extractTransitionData(comp){var data={};var options=comp.$options;// props
for(var key in options.propsData){data[key]=comp[key];}// events.
// extract listeners and pass them directly to the transition methods
var listeners=options._parentListeners;for(var key$1 in listeners){data[camelize(key$1)]=listeners[key$1];}return data;}function placeholder(h,rawChild){return /\d-keep-alive$/.test(rawChild.tag)?h('keep-alive'):null;}function hasParentTransition(vnode){while(vnode=vnode.parent){if(vnode.data.transition){return true;}}}function isSameChild(child,oldChild){return oldChild.key===child.key&&oldChild.tag===child.tag;}var Transition={name:'transition',props:transitionProps,abstract:true,render:function render(h){var this$1=this;var children=this.$slots.default;if(!children){return;}// filter out text nodes (possible whitespaces)
children=children.filter(function(c){return c.tag;});/* istanbul ignore if */if(!children.length){return;}// warn multiple elements
if(process.env.NODE_ENV!=='production'&&children.length>1){warn('<transition> can only be used on a single element. Use '+'<transition-group> for lists.',this.$parent);}var mode=this.mode;// warn invalid mode
if(process.env.NODE_ENV!=='production'&&mode&&mode!=='in-out'&&mode!=='out-in'){warn('invalid <transition> mode: '+mode,this.$parent);}var rawChild=children[0];// if this is a component root node and the component's
// parent container node also has transition, skip.
if(hasParentTransition(this.$vnode)){return rawChild;}// apply transition data to child
// use getRealChild() to ignore abstract components e.g. keep-alive
var child=getRealChild(rawChild);/* istanbul ignore if */if(!child){return rawChild;}if(this._leaving){return placeholder(h,rawChild);}// ensure a key that is unique to the vnode type and to this transition
// component instance. This key will be used to remove pending leaving nodes
// during entering.
var id="__transition-"+this._uid+"-";child.key=child.key==null?id+child.tag:isPrimitive(child.key)?String(child.key).indexOf(id)===0?child.key:id+child.key:child.key;var data=(child.data||(child.data={})).transition=extractTransitionData(this);var oldRawChild=this._vnode;var oldChild=getRealChild(oldRawChild);// mark v-show
// so that the transition module can hand over the control to the directive
if(child.data.directives&&child.data.directives.some(function(d){return d.name==='show';})){child.data.show=true;}if(oldChild&&oldChild.data&&!isSameChild(child,oldChild)){// replace old child transition data with fresh one
// important for dynamic transitions!
var oldData=oldChild&&(oldChild.data.transition=extend({},data));// handle transition mode
if(mode==='out-in'){// return placeholder node and queue update when leave finishes
this._leaving=true;mergeVNodeHook(oldData,'afterLeave',function(){this$1._leaving=false;this$1.$forceUpdate();});return placeholder(h,rawChild);}else if(mode==='in-out'){var delayedLeave;var performLeave=function performLeave(){delayedLeave();};mergeVNodeHook(data,'afterEnter',performLeave);mergeVNodeHook(data,'enterCancelled',performLeave);mergeVNodeHook(oldData,'delayLeave',function(leave){delayedLeave=leave;});}}return rawChild;}};/*  */// Provides transition support for list items.
// supports move transitions using the FLIP technique.
// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.
var props=extend({tag:String,moveClass:String},transitionProps);delete props.mode;var TransitionGroup={props:props,render:function render(h){var tag=this.tag||this.$vnode.data.tag||'span';var map=(0,_create2.default)(null);var prevChildren=this.prevChildren=this.children;var rawChildren=this.$slots.default||[];var children=this.children=[];var transitionData=extractTransitionData(this);for(var i=0;i<rawChildren.length;i++){var c=rawChildren[i];if(c.tag){if(c.key!=null&&String(c.key).indexOf('__vlist')!==0){children.push(c);map[c.key]=c;(c.data||(c.data={})).transition=transitionData;}else if(process.env.NODE_ENV!=='production'){var opts=c.componentOptions;var name=opts?opts.Ctor.options.name||opts.tag||'':c.tag;warn("<transition-group> children must be keyed: <"+name+">");}}}if(prevChildren){var kept=[];var removed=[];for(var i$1=0;i$1<prevChildren.length;i$1++){var c$1=prevChildren[i$1];c$1.data.transition=transitionData;c$1.data.pos=c$1.elm.getBoundingClientRect();if(map[c$1.key]){kept.push(c$1);}else{removed.push(c$1);}}this.kept=h(tag,null,kept);this.removed=removed;}return h(tag,null,children);},beforeUpdate:function beforeUpdate(){// force removing pass
this.__patch__(this._vnode,this.kept,false,// hydrating
true// removeOnly (!important, avoids unnecessary moves)
);this._vnode=this.kept;},updated:function updated(){var children=this.prevChildren;var moveClass=this.moveClass||(this.name||'v')+'-move';if(!children.length||!this.hasMove(children[0].elm,moveClass)){return;}// we divide the work into three loops to avoid mixing DOM reads and writes
// in each iteration - which helps prevent layout thrashing.
children.forEach(callPendingCbs);children.forEach(recordPosition);children.forEach(applyTranslation);// force reflow to put everything in position
var body=document.body;var f=body.offsetHeight;// eslint-disable-line
children.forEach(function(c){if(c.data.moved){var el=c.elm;var s=el.style;addTransitionClass(el,moveClass);s.transform=s.WebkitTransform=s.transitionDuration='';el.addEventListener(transitionEndEvent,el._moveCb=function cb(e){if(!e||/transform$/.test(e.propertyName)){el.removeEventListener(transitionEndEvent,cb);el._moveCb=null;removeTransitionClass(el,moveClass);}});}});},methods:{hasMove:function hasMove(el,moveClass){/* istanbul ignore if */if(!hasTransition){return false;}if(this._hasMove!=null){return this._hasMove;}// Detect whether an element with the move class applied has
// CSS transitions. Since the element may be inside an entering
// transition at this very moment, we make a clone of it and remove
// all other transition classes applied to ensure only the move class
// is applied.
var clone=el.cloneNode();if(el._transitionClasses){el._transitionClasses.forEach(function(cls){removeClass(clone,cls);});}addClass(clone,moveClass);clone.style.display='none';this.$el.appendChild(clone);var info=getTransitionInfo(clone);this.$el.removeChild(clone);return this._hasMove=info.hasTransform;}}};function callPendingCbs(c){/* istanbul ignore if */if(c.elm._moveCb){c.elm._moveCb();}/* istanbul ignore if */if(c.elm._enterCb){c.elm._enterCb();}}function recordPosition(c){c.data.newPos=c.elm.getBoundingClientRect();}function applyTranslation(c){var oldPos=c.data.pos;var newPos=c.data.newPos;var dx=oldPos.left-newPos.left;var dy=oldPos.top-newPos.top;if(dx||dy){c.data.moved=true;var s=c.elm.style;s.transform=s.WebkitTransform="translate("+dx+"px,"+dy+"px)";s.transitionDuration='0s';}}var platformComponents={Transition:Transition,TransitionGroup:TransitionGroup};/*  */// install platform specific utils
Vue$3.config.mustUseProp=mustUseProp;Vue$3.config.isReservedTag=isReservedTag;Vue$3.config.getTagNamespace=getTagNamespace;Vue$3.config.isUnknownElement=isUnknownElement;// install platform runtime directives & components
extend(Vue$3.options.directives,platformDirectives);extend(Vue$3.options.components,platformComponents);// install platform patch function
Vue$3.prototype.__patch__=inBrowser?patch:noop;// public mount method
Vue$3.prototype.$mount=function(el,hydrating){el=el&&inBrowser?query(el):undefined;return mountComponent(this,el,hydrating);};// devtools global hook
/* istanbul ignore next */setTimeout(function(){if(config.devtools){if(devtools){devtools.emit('init',Vue$3);}else if(process.env.NODE_ENV!=='production'&&isChrome){console[console.info?'info':'log']('Download the Vue Devtools extension for a better development experience:\n'+'https://github.com/vuejs/vue-devtools');}}if(process.env.NODE_ENV!=='production'&&config.productionTip!==false&&inBrowser&&typeof console!=='undefined'){console[console.info?'info':'log']("You are running Vue in development mode.\n"+"Make sure to turn on production mode when deploying for production.\n"+"See more tips at https://vuejs.org/guide/deployment.html");}},0);/*  */// check whether current browser encodes a char inside attribute values
function shouldDecode(content,encoded){var div=document.createElement('div');div.innerHTML="<div a=\""+content+"\">";return div.innerHTML.indexOf(encoded)>0;}// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines=inBrowser?shouldDecode('\n','&#10;'):false;/*  */var isUnaryTag=makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,'+'link,meta,param,source,track,wbr');// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag=makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag=makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,'+'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,'+'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,'+'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,'+'title,tr,track');/*  */var decoder;function decode(html){decoder=decoder||document.createElement('div');decoder.innerHTML=html;return decoder.textContent;}/**
 * Not type-checking this file because it's mostly vendor code.
 *//*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier=/([^\s"'<>/=]+)/;var singleAttrAssign=/(?:=)/;var singleAttrValues=[// attr value double quotes
/"([^"]*)"+/.source,// attr value, single quotes
/'([^']*)'+/.source,// attr value, no quotes
/([^\s"'=<>`]+)/.source];var attribute=new RegExp('^\\s*'+singleAttrIdentifier.source+'(?:\\s*('+singleAttrAssign.source+')'+'\\s*(?:'+singleAttrValues.join('|')+'))?');// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname='[a-zA-Z_][\\w\\-\\.]*';var qnameCapture='((?:'+ncname+'\\:)?'+ncname+')';var startTagOpen=new RegExp('^<'+qnameCapture);var startTagClose=/^\s*(\/?)>/;var endTag=new RegExp('^<\\/'+qnameCapture+'[^>]*>');var doctype=/^<!DOCTYPE [^>]+>/i;var comment=/^<!--/;var conditionalComment=/^<!\[/;var IS_REGEX_CAPTURING_BROKEN=false;'x'.replace(/x(.)?/g,function(m,g){IS_REGEX_CAPTURING_BROKEN=g==='';});// Special Elements (can contain anything)
var isPlainTextElement=makeMap('script,style,textarea',true);var reCache={};var decodingMap={'&lt;':'<','&gt;':'>','&quot;':'"','&amp;':'&','&#10;':'\n'};var encodedAttr=/&(?:lt|gt|quot|amp);/g;var encodedAttrWithNewLines=/&(?:lt|gt|quot|amp|#10);/g;function decodeAttr(value,shouldDecodeNewlines){var re=shouldDecodeNewlines?encodedAttrWithNewLines:encodedAttr;return value.replace(re,function(match){return decodingMap[match];});}function parseHTML(html,options){var stack=[];var expectHTML=options.expectHTML;var isUnaryTag$$1=options.isUnaryTag||no;var index=0;var last,lastTag;while(html){last=html;// Make sure we're not in a plaintext content element like script/style
if(!lastTag||!isPlainTextElement(lastTag)){var textEnd=html.indexOf('<');if(textEnd===0){// Comment:
if(comment.test(html)){var commentEnd=html.indexOf('-->');if(commentEnd>=0){advance(commentEnd+3);continue;}}// http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
if(conditionalComment.test(html)){var conditionalEnd=html.indexOf(']>');if(conditionalEnd>=0){advance(conditionalEnd+2);continue;}}// Doctype:
var doctypeMatch=html.match(doctype);if(doctypeMatch){advance(doctypeMatch[0].length);continue;}// End tag:
var endTagMatch=html.match(endTag);if(endTagMatch){var curIndex=index;advance(endTagMatch[0].length);parseEndTag(endTagMatch[1],curIndex,index);continue;}// Start tag:
var startTagMatch=parseStartTag();if(startTagMatch){handleStartTag(startTagMatch);continue;}}var text=void 0,rest$1=void 0,next=void 0;if(textEnd>=0){rest$1=html.slice(textEnd);while(!endTag.test(rest$1)&&!startTagOpen.test(rest$1)&&!comment.test(rest$1)&&!conditionalComment.test(rest$1)){// < in plain text, be forgiving and treat it as text
next=rest$1.indexOf('<',1);if(next<0){break;}textEnd+=next;rest$1=html.slice(textEnd);}text=html.substring(0,textEnd);advance(textEnd);}if(textEnd<0){text=html;html='';}if(options.chars&&text){options.chars(text);}}else{var stackedTag=lastTag.toLowerCase();var reStackedTag=reCache[stackedTag]||(reCache[stackedTag]=new RegExp('([\\s\\S]*?)(</'+stackedTag+'[^>]*>)','i'));var endTagLength=0;var rest=html.replace(reStackedTag,function(all,text,endTag){endTagLength=endTag.length;if(!isPlainTextElement(stackedTag)&&stackedTag!=='noscript'){text=text.replace(/<!--([\s\S]*?)-->/g,'$1').replace(/<!\[CDATA\[([\s\S]*?)]]>/g,'$1');}if(options.chars){options.chars(text);}return'';});index+=html.length-rest.length;html=rest;parseEndTag(stackedTag,index-endTagLength,index);}if(html===last){options.chars&&options.chars(html);if(process.env.NODE_ENV!=='production'&&!stack.length&&options.warn){options.warn("Mal-formatted tag at end of template: \""+html+"\"");}break;}}// Clean up any remaining tags
parseEndTag();function advance(n){index+=n;html=html.substring(n);}function parseStartTag(){var start=html.match(startTagOpen);if(start){var match={tagName:start[1],attrs:[],start:index};advance(start[0].length);var end,attr;while(!(end=html.match(startTagClose))&&(attr=html.match(attribute))){advance(attr[0].length);match.attrs.push(attr);}if(end){match.unarySlash=end[1];advance(end[0].length);match.end=index;return match;}}}function handleStartTag(match){var tagName=match.tagName;var unarySlash=match.unarySlash;if(expectHTML){if(lastTag==='p'&&isNonPhrasingTag(tagName)){parseEndTag(lastTag);}if(canBeLeftOpenTag(tagName)&&lastTag===tagName){parseEndTag(tagName);}}var unary=isUnaryTag$$1(tagName)||tagName==='html'&&lastTag==='head'||!!unarySlash;var l=match.attrs.length;var attrs=new Array(l);for(var i=0;i<l;i++){var args=match.attrs[i];// hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
if(IS_REGEX_CAPTURING_BROKEN&&args[0].indexOf('""')===-1){if(args[3]===''){delete args[3];}if(args[4]===''){delete args[4];}if(args[5]===''){delete args[5];}}var value=args[3]||args[4]||args[5]||'';attrs[i]={name:args[1],value:decodeAttr(value,options.shouldDecodeNewlines)};}if(!unary){stack.push({tag:tagName,lowerCasedTag:tagName.toLowerCase(),attrs:attrs});lastTag=tagName;}if(options.start){options.start(tagName,attrs,unary,match.start,match.end);}}function parseEndTag(tagName,start,end){var pos,lowerCasedTagName;if(start==null){start=index;}if(end==null){end=index;}if(tagName){lowerCasedTagName=tagName.toLowerCase();}// Find the closest opened tag of the same type
if(tagName){for(pos=stack.length-1;pos>=0;pos--){if(stack[pos].lowerCasedTag===lowerCasedTagName){break;}}}else{// If no tag name is provided, clean shop
pos=0;}if(pos>=0){// Close all the open elements, up the stack
for(var i=stack.length-1;i>=pos;i--){if(process.env.NODE_ENV!=='production'&&(i>pos||!tagName)&&options.warn){options.warn("tag <"+stack[i].tag+"> has no matching end tag.");}if(options.end){options.end(stack[i].tag,start,end);}}// Remove the open elements from the stack
stack.length=pos;lastTag=pos&&stack[pos-1].tag;}else if(lowerCasedTagName==='br'){if(options.start){options.start(tagName,[],true,start,end);}}else if(lowerCasedTagName==='p'){if(options.start){options.start(tagName,[],false,start,end);}if(options.end){options.end(tagName,start,end);}}}}/*  */var defaultTagRE=/\{\{((?:.|\n)+?)\}\}/g;var regexEscapeRE=/[-.*+?^${}()|[\]\/\\]/g;var buildRegex=cached(function(delimiters){var open=delimiters[0].replace(regexEscapeRE,'\\$&');var close=delimiters[1].replace(regexEscapeRE,'\\$&');return new RegExp(open+'((?:.|\\n)+?)'+close,'g');});function parseText(text,delimiters){var tagRE=delimiters?buildRegex(delimiters):defaultTagRE;if(!tagRE.test(text)){return;}var tokens=[];var lastIndex=tagRE.lastIndex=0;var match,index;while(match=tagRE.exec(text)){index=match.index;// push text token
if(index>lastIndex){tokens.push((0,_stringify2.default)(text.slice(lastIndex,index)));}// tag token
var exp=parseFilters(match[1].trim());tokens.push("_s("+exp+")");lastIndex=index+match[0].length;}if(lastIndex<text.length){tokens.push((0,_stringify2.default)(text.slice(lastIndex)));}return tokens.join('+');}/*  */var onRE=/^@|^v-on:/;var dirRE=/^v-|^@|^:/;var forAliasRE=/(.*?)\s+(?:in|of)\s+(.*)/;var forIteratorRE=/\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;var argRE=/:(.*)$/;var bindRE=/^:|^v-bind:/;var modifierRE=/\.[^.]+/g;var decodeHTMLCached=cached(decode);// configurable state
var warn$2;var delimiters;var transforms;var preTransforms;var postTransforms;var platformIsPreTag;var platformMustUseProp;var platformGetTagNamespace;/**
 * Convert HTML string to AST.
 */function parse(template,options){warn$2=options.warn||baseWarn;platformGetTagNamespace=options.getTagNamespace||no;platformMustUseProp=options.mustUseProp||no;platformIsPreTag=options.isPreTag||no;preTransforms=pluckModuleFunction(options.modules,'preTransformNode');transforms=pluckModuleFunction(options.modules,'transformNode');postTransforms=pluckModuleFunction(options.modules,'postTransformNode');delimiters=options.delimiters;var stack=[];var preserveWhitespace=options.preserveWhitespace!==false;var root;var currentParent;var inVPre=false;var inPre=false;var warned=false;function warnOnce(msg){if(!warned){warned=true;warn$2(msg);}}function endPre(element){// check pre state
if(element.pre){inVPre=false;}if(platformIsPreTag(element.tag)){inPre=false;}}parseHTML(template,{warn:warn$2,expectHTML:options.expectHTML,isUnaryTag:options.isUnaryTag,shouldDecodeNewlines:options.shouldDecodeNewlines,start:function start(tag,attrs,unary){// check namespace.
// inherit parent ns if there is one
var ns=currentParent&&currentParent.ns||platformGetTagNamespace(tag);// handle IE svg bug
/* istanbul ignore if */if(isIE&&ns==='svg'){attrs=guardIESVGBug(attrs);}var element={type:1,tag:tag,attrsList:attrs,attrsMap:makeAttrsMap(attrs),parent:currentParent,children:[]};if(ns){element.ns=ns;}if(isForbiddenTag(element)&&!isServerRendering()){element.forbidden=true;process.env.NODE_ENV!=='production'&&warn$2('Templates should only be responsible for mapping the state to the '+'UI. Avoid placing tags with side-effects in your templates, such as '+"<"+tag+">"+', as they will not be parsed.');}// apply pre-transforms
for(var i=0;i<preTransforms.length;i++){preTransforms[i](element,options);}if(!inVPre){processPre(element);if(element.pre){inVPre=true;}}if(platformIsPreTag(element.tag)){inPre=true;}if(inVPre){processRawAttrs(element);}else{processFor(element);processIf(element);processOnce(element);processKey(element);// determine whether this is a plain element after
// removing structural attributes
element.plain=!element.key&&!attrs.length;processRef(element);processSlot(element);processComponent(element);for(var i$1=0;i$1<transforms.length;i$1++){transforms[i$1](element,options);}processAttrs(element);}function checkRootConstraints(el){if(process.env.NODE_ENV!=='production'){if(el.tag==='slot'||el.tag==='template'){warnOnce("Cannot use <"+el.tag+"> as component root element because it may "+'contain multiple nodes.');}if(el.attrsMap.hasOwnProperty('v-for')){warnOnce('Cannot use v-for on stateful component root element because '+'it renders multiple elements.');}}}// tree management
if(!root){root=element;checkRootConstraints(root);}else if(!stack.length){// allow root elements with v-if, v-else-if and v-else
if(root.if&&(element.elseif||element.else)){checkRootConstraints(element);addIfCondition(root,{exp:element.elseif,block:element});}else if(process.env.NODE_ENV!=='production'){warnOnce("Component template should contain exactly one root element. "+"If you are using v-if on multiple elements, "+"use v-else-if to chain them instead.");}}if(currentParent&&!element.forbidden){if(element.elseif||element.else){processIfConditions(element,currentParent);}else if(element.slotScope){// scoped slot
currentParent.plain=false;var name=element.slotTarget||'"default"';(currentParent.scopedSlots||(currentParent.scopedSlots={}))[name]=element;}else{currentParent.children.push(element);element.parent=currentParent;}}if(!unary){currentParent=element;stack.push(element);}else{endPre(element);}// apply post-transforms
for(var i$2=0;i$2<postTransforms.length;i$2++){postTransforms[i$2](element,options);}},end:function end(){// remove trailing whitespace
var element=stack[stack.length-1];var lastNode=element.children[element.children.length-1];if(lastNode&&lastNode.type===3&&lastNode.text===' '&&!inPre){element.children.pop();}// pop stack
stack.length-=1;currentParent=stack[stack.length-1];endPre(element);},chars:function chars(text){if(!currentParent){if(process.env.NODE_ENV!=='production'){if(text===template){warnOnce('Component template requires a root element, rather than just text.');}else if(text=text.trim()){warnOnce("text \""+text+"\" outside root element will be ignored.");}}return;}// IE textarea placeholder bug
/* istanbul ignore if */if(isIE&&currentParent.tag==='textarea'&&currentParent.attrsMap.placeholder===text){return;}var children=currentParent.children;text=inPre||text.trim()?decodeHTMLCached(text)// only preserve whitespace if its not right after a starting tag
:preserveWhitespace&&children.length?' ':'';if(text){var expression;if(!inVPre&&text!==' '&&(expression=parseText(text,delimiters))){children.push({type:2,expression:expression,text:text});}else if(text!==' '||!children.length||children[children.length-1].text!==' '){children.push({type:3,text:text});}}}});return root;}function processPre(el){if(getAndRemoveAttr(el,'v-pre')!=null){el.pre=true;}}function processRawAttrs(el){var l=el.attrsList.length;if(l){var attrs=el.attrs=new Array(l);for(var i=0;i<l;i++){attrs[i]={name:el.attrsList[i].name,value:(0,_stringify2.default)(el.attrsList[i].value)};}}else if(!el.pre){// non root node in pre blocks with no attributes
el.plain=true;}}function processKey(el){var exp=getBindingAttr(el,'key');if(exp){if(process.env.NODE_ENV!=='production'&&el.tag==='template'){warn$2("<template> cannot be keyed. Place the key on real elements instead.");}el.key=exp;}}function processRef(el){var ref=getBindingAttr(el,'ref');if(ref){el.ref=ref;el.refInFor=checkInFor(el);}}function processFor(el){var exp;if(exp=getAndRemoveAttr(el,'v-for')){var inMatch=exp.match(forAliasRE);if(!inMatch){process.env.NODE_ENV!=='production'&&warn$2("Invalid v-for expression: "+exp);return;}el.for=inMatch[2].trim();var alias=inMatch[1].trim();var iteratorMatch=alias.match(forIteratorRE);if(iteratorMatch){el.alias=iteratorMatch[1].trim();el.iterator1=iteratorMatch[2].trim();if(iteratorMatch[3]){el.iterator2=iteratorMatch[3].trim();}}else{el.alias=alias;}}}function processIf(el){var exp=getAndRemoveAttr(el,'v-if');if(exp){el.if=exp;addIfCondition(el,{exp:exp,block:el});}else{if(getAndRemoveAttr(el,'v-else')!=null){el.else=true;}var elseif=getAndRemoveAttr(el,'v-else-if');if(elseif){el.elseif=elseif;}}}function processIfConditions(el,parent){var prev=findPrevElement(parent.children);if(prev&&prev.if){addIfCondition(prev,{exp:el.elseif,block:el});}else if(process.env.NODE_ENV!=='production'){warn$2("v-"+(el.elseif?'else-if="'+el.elseif+'"':'else')+" "+"used on element <"+el.tag+"> without corresponding v-if.");}}function findPrevElement(children){var i=children.length;while(i--){if(children[i].type===1){return children[i];}else{if(process.env.NODE_ENV!=='production'&&children[i].text!==' '){warn$2("text \""+children[i].text.trim()+"\" between v-if and v-else(-if) "+"will be ignored.");}children.pop();}}}function addIfCondition(el,condition){if(!el.ifConditions){el.ifConditions=[];}el.ifConditions.push(condition);}function processOnce(el){var once$$1=getAndRemoveAttr(el,'v-once');if(once$$1!=null){el.once=true;}}function processSlot(el){if(el.tag==='slot'){el.slotName=getBindingAttr(el,'name');if(process.env.NODE_ENV!=='production'&&el.key){warn$2("`key` does not work on <slot> because slots are abstract outlets "+"and can possibly expand into multiple elements. "+"Use the key on a wrapping element instead.");}}else{var slotTarget=getBindingAttr(el,'slot');if(slotTarget){el.slotTarget=slotTarget==='""'?'"default"':slotTarget;}if(el.tag==='template'){el.slotScope=getAndRemoveAttr(el,'scope');}}}function processComponent(el){var binding;if(binding=getBindingAttr(el,'is')){el.component=binding;}if(getAndRemoveAttr(el,'inline-template')!=null){el.inlineTemplate=true;}}function processAttrs(el){var list=el.attrsList;var i,l,name,rawName,value,modifiers,isProp;for(i=0,l=list.length;i<l;i++){name=rawName=list[i].name;value=list[i].value;if(dirRE.test(name)){// mark element as dynamic
el.hasBindings=true;// modifiers
modifiers=parseModifiers(name);if(modifiers){name=name.replace(modifierRE,'');}if(bindRE.test(name)){// v-bind
name=name.replace(bindRE,'');value=parseFilters(value);isProp=false;if(modifiers){if(modifiers.prop){isProp=true;name=camelize(name);if(name==='innerHtml'){name='innerHTML';}}if(modifiers.camel){name=camelize(name);}}if(isProp||platformMustUseProp(el.tag,el.attrsMap.type,name)){addProp(el,name,value);}else{addAttr(el,name,value);}}else if(onRE.test(name)){// v-on
name=name.replace(onRE,'');addHandler(el,name,value,modifiers);}else{// normal directives
name=name.replace(dirRE,'');// parse arg
var argMatch=name.match(argRE);var arg=argMatch&&argMatch[1];if(arg){name=name.slice(0,-(arg.length+1));}addDirective(el,name,rawName,value,arg,modifiers);if(process.env.NODE_ENV!=='production'&&name==='model'){checkForAliasModel(el,value);}}}else{// literal attribute
if(process.env.NODE_ENV!=='production'){var expression=parseText(value,delimiters);if(expression){warn$2(name+"=\""+value+"\": "+'Interpolation inside attributes has been removed. '+'Use v-bind or the colon shorthand instead. For example, '+'instead of <div id="{{ val }}">, use <div :id="val">.');}}addAttr(el,name,(0,_stringify2.default)(value));}}}function checkInFor(el){var parent=el;while(parent){if(parent.for!==undefined){return true;}parent=parent.parent;}return false;}function parseModifiers(name){var match=name.match(modifierRE);if(match){var ret={};match.forEach(function(m){ret[m.slice(1)]=true;});return ret;}}function makeAttrsMap(attrs){var map={};for(var i=0,l=attrs.length;i<l;i++){if(process.env.NODE_ENV!=='production'&&map[attrs[i].name]&&!isIE){warn$2('duplicate attribute: '+attrs[i].name);}map[attrs[i].name]=attrs[i].value;}return map;}function isForbiddenTag(el){return el.tag==='style'||el.tag==='script'&&(!el.attrsMap.type||el.attrsMap.type==='text/javascript');}var ieNSBug=/^xmlns:NS\d+/;var ieNSPrefix=/^NS\d+:/;/* istanbul ignore next */function guardIESVGBug(attrs){var res=[];for(var i=0;i<attrs.length;i++){var attr=attrs[i];if(!ieNSBug.test(attr.name)){attr.name=attr.name.replace(ieNSPrefix,'');res.push(attr);}}return res;}function checkForAliasModel(el,value){var _el=el;while(_el){if(_el.for&&_el.alias===value){warn$2("<"+el.tag+" v-model=\""+value+"\">: "+"You are binding v-model directly to a v-for iteration alias. "+"This will not be able to modify the v-for source array because "+"writing to the alias is like modifying a function local variable. "+"Consider using an array of objects and use v-model on an object property instead.");}_el=_el.parent;}}/*  */var isStaticKey;var isPlatformReservedTag;var genStaticKeysCached=cached(genStaticKeys$1);/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */function optimize(root,options){if(!root){return;}isStaticKey=genStaticKeysCached(options.staticKeys||'');isPlatformReservedTag=options.isReservedTag||no;// first pass: mark all non-static nodes.
markStatic$1(root);// second pass: mark static roots.
markStaticRoots(root,false);}function genStaticKeys$1(keys){return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs'+(keys?','+keys:''));}function markStatic$1(node){node.static=isStatic(node);if(node.type===1){// do not make component slot content static. this avoids
// 1. components not able to mutate slot nodes
// 2. static slot content fails for hot-reloading
if(!isPlatformReservedTag(node.tag)&&node.tag!=='slot'&&node.attrsMap['inline-template']==null){return;}for(var i=0,l=node.children.length;i<l;i++){var child=node.children[i];markStatic$1(child);if(!child.static){node.static=false;}}}}function markStaticRoots(node,isInFor){if(node.type===1){if(node.static||node.once){node.staticInFor=isInFor;}// For a node to qualify as a static root, it should have children that
// are not just static text. Otherwise the cost of hoisting out will
// outweigh the benefits and it's better off to just always render it fresh.
if(node.static&&node.children.length&&!(node.children.length===1&&node.children[0].type===3)){node.staticRoot=true;return;}else{node.staticRoot=false;}if(node.children){for(var i=0,l=node.children.length;i<l;i++){markStaticRoots(node.children[i],isInFor||!!node.for);}}if(node.ifConditions){walkThroughConditionsBlocks(node.ifConditions,isInFor);}}}function walkThroughConditionsBlocks(conditionBlocks,isInFor){for(var i=1,len=conditionBlocks.length;i<len;i++){markStaticRoots(conditionBlocks[i].block,isInFor);}}function isStatic(node){if(node.type===2){// expression
return false;}if(node.type===3){// text
return true;}return!!(node.pre||!node.hasBindings&&// no dynamic bindings
!node.if&&!node.for&&// not v-if or v-for or v-else
!isBuiltInTag(node.tag)&&// not a built-in
isPlatformReservedTag(node.tag)&&// not a component
!isDirectChildOfTemplateFor(node)&&(0,_keys2.default)(node).every(isStaticKey));}function isDirectChildOfTemplateFor(node){while(node.parent){node=node.parent;if(node.tag!=='template'){return false;}if(node.for){return true;}}return false;}/*  */var fnExpRE=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;var simplePathRE=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;// keyCode aliases
var keyCodes={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,'delete':[8,46]};// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard=function genGuard(condition){return"if("+condition+")return null;";};var modifierCode={stop:'$event.stopPropagation();',prevent:'$event.preventDefault();',self:genGuard("$event.target !== $event.currentTarget"),ctrl:genGuard("!$event.ctrlKey"),shift:genGuard("!$event.shiftKey"),alt:genGuard("!$event.altKey"),meta:genGuard("!$event.metaKey"),left:genGuard("'button' in $event && $event.button !== 0"),middle:genGuard("'button' in $event && $event.button !== 1"),right:genGuard("'button' in $event && $event.button !== 2")};function genHandlers(events,native){var res=native?'nativeOn:{':'on:{';for(var name in events){res+="\""+name+"\":"+genHandler(name,events[name])+",";}return res.slice(0,-1)+'}';}function genHandler(name,handler){if(!handler){return'function(){}';}if(Array.isArray(handler)){return"["+handler.map(function(handler){return genHandler(name,handler);}).join(',')+"]";}var isMethodPath=simplePathRE.test(handler.value);var isFunctionExpression=fnExpRE.test(handler.value);if(!handler.modifiers){return isMethodPath||isFunctionExpression?handler.value:"function($event){"+handler.value+"}";// inline statement
}else{var code='';var genModifierCode='';var keys=[];for(var key in handler.modifiers){if(modifierCode[key]){genModifierCode+=modifierCode[key];// left/right
if(keyCodes[key]){keys.push(key);}}else{keys.push(key);}}if(keys.length){code+=genKeyFilter(keys);}// Make sure modifiers like prevent and stop get executed after key filtering
if(genModifierCode){code+=genModifierCode;}var handlerCode=isMethodPath?handler.value+'($event)':isFunctionExpression?"("+handler.value+")($event)":handler.value;return"function($event){"+code+handlerCode+"}";}}function genKeyFilter(keys){return"if(!('button' in $event)&&"+keys.map(genFilterCode).join('&&')+")return null;";}function genFilterCode(key){var keyVal=parseInt(key,10);if(keyVal){return"$event.keyCode!=="+keyVal;}var alias=keyCodes[key];return"_k($event.keyCode,"+(0,_stringify2.default)(key)+(alias?','+(0,_stringify2.default)(alias):'')+")";}/*  */function bind$1(el,dir){el.wrapData=function(code){return"_b("+code+",'"+el.tag+"',"+dir.value+(dir.modifiers&&dir.modifiers.prop?',true':'')+")";};}/*  */var baseDirectives={bind:bind$1,cloak:noop};/*  */// configurable state
var warn$3;var transforms$1;var dataGenFns;var platformDirectives$1;var isPlatformReservedTag$1;var staticRenderFns;var onceCount;var currentOptions;function generate(ast,options){// save previous staticRenderFns so generate calls can be nested
var prevStaticRenderFns=staticRenderFns;var currentStaticRenderFns=staticRenderFns=[];var prevOnceCount=onceCount;onceCount=0;currentOptions=options;warn$3=options.warn||baseWarn;transforms$1=pluckModuleFunction(options.modules,'transformCode');dataGenFns=pluckModuleFunction(options.modules,'genData');platformDirectives$1=options.directives||{};isPlatformReservedTag$1=options.isReservedTag||no;var code=ast?genElement(ast):'_c("div")';staticRenderFns=prevStaticRenderFns;onceCount=prevOnceCount;return{render:"with(this){return "+code+"}",staticRenderFns:currentStaticRenderFns};}function genElement(el){if(el.staticRoot&&!el.staticProcessed){return genStatic(el);}else if(el.once&&!el.onceProcessed){return genOnce(el);}else if(el.for&&!el.forProcessed){return genFor(el);}else if(el.if&&!el.ifProcessed){return genIf(el);}else if(el.tag==='template'&&!el.slotTarget){return genChildren(el)||'void 0';}else if(el.tag==='slot'){return genSlot(el);}else{// component or element
var code;if(el.component){code=genComponent(el.component,el);}else{var data=el.plain?undefined:genData(el);var children=el.inlineTemplate?null:genChildren(el,true);code="_c('"+el.tag+"'"+(data?","+data:'')+(children?","+children:'')+")";}// module transforms
for(var i=0;i<transforms$1.length;i++){code=transforms$1[i](el,code);}return code;}}// hoist static sub-trees out
function genStatic(el){el.staticProcessed=true;staticRenderFns.push("with(this){return "+genElement(el)+"}");return"_m("+(staticRenderFns.length-1)+(el.staticInFor?',true':'')+")";}// v-once
function genOnce(el){el.onceProcessed=true;if(el.if&&!el.ifProcessed){return genIf(el);}else if(el.staticInFor){var key='';var parent=el.parent;while(parent){if(parent.for){key=parent.key;break;}parent=parent.parent;}if(!key){process.env.NODE_ENV!=='production'&&warn$3("v-once can only be used inside v-for that is keyed. ");return genElement(el);}return"_o("+genElement(el)+","+onceCount++ +(key?","+key:"")+")";}else{return genStatic(el);}}function genIf(el){el.ifProcessed=true;// avoid recursion
return genIfConditions(el.ifConditions.slice());}function genIfConditions(conditions){if(!conditions.length){return'_e()';}var condition=conditions.shift();if(condition.exp){return"("+condition.exp+")?"+genTernaryExp(condition.block)+":"+genIfConditions(conditions);}else{return""+genTernaryExp(condition.block);}// v-if with v-once should generate code like (a)?_m(0):_m(1)
function genTernaryExp(el){return el.once?genOnce(el):genElement(el);}}function genFor(el){var exp=el.for;var alias=el.alias;var iterator1=el.iterator1?","+el.iterator1:'';var iterator2=el.iterator2?","+el.iterator2:'';if(process.env.NODE_ENV!=='production'&&maybeComponent(el)&&el.tag!=='slot'&&el.tag!=='template'&&!el.key){warn$3("<"+el.tag+" v-for=\""+alias+" in "+exp+"\">: component lists rendered with "+"v-for should have explicit keys. "+"See https://vuejs.org/guide/list.html#key for more info.",true/* tip */);}el.forProcessed=true;// avoid recursion
return"_l(("+exp+"),"+"function("+alias+iterator1+iterator2+"){"+"return "+genElement(el)+'})';}function genData(el){var data='{';// directives first.
// directives may mutate the el's other properties before they are generated.
var dirs=genDirectives(el);if(dirs){data+=dirs+',';}// key
if(el.key){data+="key:"+el.key+",";}// ref
if(el.ref){data+="ref:"+el.ref+",";}if(el.refInFor){data+="refInFor:true,";}// pre
if(el.pre){data+="pre:true,";}// record original tag name for components using "is" attribute
if(el.component){data+="tag:\""+el.tag+"\",";}// module data generation functions
for(var i=0;i<dataGenFns.length;i++){data+=dataGenFns[i](el);}// attributes
if(el.attrs){data+="attrs:{"+genProps(el.attrs)+"},";}// DOM props
if(el.props){data+="domProps:{"+genProps(el.props)+"},";}// event handlers
if(el.events){data+=genHandlers(el.events)+",";}if(el.nativeEvents){data+=genHandlers(el.nativeEvents,true)+",";}// slot target
if(el.slotTarget){data+="slot:"+el.slotTarget+",";}// scoped slots
if(el.scopedSlots){data+=genScopedSlots(el.scopedSlots)+",";}// component v-model
if(el.model){data+="model:{value:"+el.model.value+",callback:"+el.model.callback+",expression:"+el.model.expression+"},";}// inline-template
if(el.inlineTemplate){var inlineTemplate=genInlineTemplate(el);if(inlineTemplate){data+=inlineTemplate+",";}}data=data.replace(/,$/,'')+'}';// v-bind data wrap
if(el.wrapData){data=el.wrapData(data);}return data;}function genDirectives(el){var dirs=el.directives;if(!dirs){return;}var res='directives:[';var hasRuntime=false;var i,l,dir,needRuntime;for(i=0,l=dirs.length;i<l;i++){dir=dirs[i];needRuntime=true;var gen=platformDirectives$1[dir.name]||baseDirectives[dir.name];if(gen){// compile-time directive that manipulates AST.
// returns true if it also needs a runtime counterpart.
needRuntime=!!gen(el,dir,warn$3);}if(needRuntime){hasRuntime=true;res+="{name:\""+dir.name+"\",rawName:\""+dir.rawName+"\""+(dir.value?",value:("+dir.value+"),expression:"+(0,_stringify2.default)(dir.value):'')+(dir.arg?",arg:\""+dir.arg+"\"":'')+(dir.modifiers?",modifiers:"+(0,_stringify2.default)(dir.modifiers):'')+"},";}}if(hasRuntime){return res.slice(0,-1)+']';}}function genInlineTemplate(el){var ast=el.children[0];if(process.env.NODE_ENV!=='production'&&(el.children.length>1||ast.type!==1)){warn$3('Inline-template components must have exactly one child element.');}if(ast.type===1){var inlineRenderFns=generate(ast,currentOptions);return"inlineTemplate:{render:function(){"+inlineRenderFns.render+"},staticRenderFns:["+inlineRenderFns.staticRenderFns.map(function(code){return"function(){"+code+"}";}).join(',')+"]}";}}function genScopedSlots(slots){return"scopedSlots:_u(["+(0,_keys2.default)(slots).map(function(key){return genScopedSlot(key,slots[key]);}).join(',')+"])";}function genScopedSlot(key,el){return"["+key+",function("+String(el.attrsMap.scope)+"){"+"return "+(el.tag==='template'?genChildren(el)||'void 0':genElement(el))+"}]";}function genChildren(el,checkSkip){var children=el.children;if(children.length){var el$1=children[0];// optimize single v-for
if(children.length===1&&el$1.for&&el$1.tag!=='template'&&el$1.tag!=='slot'){return genElement(el$1);}var normalizationType=checkSkip?getNormalizationType(children):0;return"["+children.map(genNode).join(',')+"]"+(normalizationType?","+normalizationType:'');}}// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(children){var res=0;for(var i=0;i<children.length;i++){var el=children[i];if(el.type!==1){continue;}if(needsNormalization(el)||el.ifConditions&&el.ifConditions.some(function(c){return needsNormalization(c.block);})){res=2;break;}if(maybeComponent(el)||el.ifConditions&&el.ifConditions.some(function(c){return maybeComponent(c.block);})){res=1;}}return res;}function needsNormalization(el){return el.for!==undefined||el.tag==='template'||el.tag==='slot';}function maybeComponent(el){return!isPlatformReservedTag$1(el.tag);}function genNode(node){if(node.type===1){return genElement(node);}else{return genText(node);}}function genText(text){return"_v("+(text.type===2?text.expression// no need for () because already wrapped in _s()
:transformSpecialNewlines((0,_stringify2.default)(text.text)))+")";}function genSlot(el){var slotName=el.slotName||'"default"';var children=genChildren(el);var res="_t("+slotName+(children?","+children:'');var attrs=el.attrs&&"{"+el.attrs.map(function(a){return camelize(a.name)+":"+a.value;}).join(',')+"}";var bind$$1=el.attrsMap['v-bind'];if((attrs||bind$$1)&&!children){res+=",null";}if(attrs){res+=","+attrs;}if(bind$$1){res+=(attrs?'':',null')+","+bind$$1;}return res+')';}// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent(componentName,el){var children=el.inlineTemplate?null:genChildren(el,true);return"_c("+componentName+","+genData(el)+(children?","+children:'')+")";}function genProps(props){var res='';for(var i=0;i<props.length;i++){var prop=props[i];res+="\""+prop.name+"\":"+transformSpecialNewlines(prop.value)+",";}return res.slice(0,-1);}// #3895, #4268
function transformSpecialNewlines(text){return text.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");}/*  */// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE=new RegExp('\\b'+('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,'+'super,throw,while,yield,delete,export,import,return,switch,default,'+'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b')+'\\b');// these unary operators should not be used as property/method names
var unaryOperatorsRE=new RegExp('\\b'+'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b')+'\\s*\\([^\\)]*\\)');// check valid identifier for v-for
var identRE=/[A-Za-z_$][\w$]*/;// strip strings in expressions
var stripStringRE=/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;// detect problematic expressions in a template
function detectErrors(ast){var errors=[];if(ast){checkNode(ast,errors);}return errors;}function checkNode(node,errors){if(node.type===1){for(var name in node.attrsMap){if(dirRE.test(name)){var value=node.attrsMap[name];if(value){if(name==='v-for'){checkFor(node,"v-for=\""+value+"\"",errors);}else if(onRE.test(name)){checkEvent(value,name+"=\""+value+"\"",errors);}else{checkExpression(value,name+"=\""+value+"\"",errors);}}}}if(node.children){for(var i=0;i<node.children.length;i++){checkNode(node.children[i],errors);}}}else if(node.type===2){checkExpression(node.expression,node.text,errors);}}function checkEvent(exp,text,errors){var keywordMatch=exp.replace(stripStringRE,'').match(unaryOperatorsRE);if(keywordMatch){errors.push("avoid using JavaScript unary operator as property name: "+"\""+keywordMatch[0]+"\" in expression "+text.trim());}checkExpression(exp,text,errors);}function checkFor(node,text,errors){checkExpression(node.for||'',text,errors);checkIdentifier(node.alias,'v-for alias',text,errors);checkIdentifier(node.iterator1,'v-for iterator',text,errors);checkIdentifier(node.iterator2,'v-for iterator',text,errors);}function checkIdentifier(ident,type,text,errors){if(typeof ident==='string'&&!identRE.test(ident)){errors.push("invalid "+type+" \""+ident+"\" in expression: "+text.trim());}}function checkExpression(exp,text,errors){try{new Function("return "+exp);}catch(e){var keywordMatch=exp.replace(stripStringRE,'').match(prohibitedKeywordRE);if(keywordMatch){errors.push("avoid using JavaScript keyword as property name: "+"\""+keywordMatch[0]+"\" in expression "+text.trim());}else{errors.push("invalid expression: "+text.trim());}}}/*  */function baseCompile(template,options){var ast=parse(template.trim(),options);optimize(ast,options);var code=generate(ast,options);return{ast:ast,render:code.render,staticRenderFns:code.staticRenderFns};}function makeFunction(code,errors){try{return new Function(code);}catch(err){errors.push({err:err,code:code});return noop;}}function createCompiler(baseOptions){var functionCompileCache=(0,_create2.default)(null);function compile(template,options){var finalOptions=(0,_create2.default)(baseOptions);var errors=[];var tips=[];finalOptions.warn=function(msg,tip$$1){(tip$$1?tips:errors).push(msg);};if(options){// merge custom modules
if(options.modules){finalOptions.modules=(baseOptions.modules||[]).concat(options.modules);}// merge custom directives
if(options.directives){finalOptions.directives=extend((0,_create2.default)(baseOptions.directives),options.directives);}// copy other options
for(var key in options){if(key!=='modules'&&key!=='directives'){finalOptions[key]=options[key];}}}var compiled=baseCompile(template,finalOptions);if(process.env.NODE_ENV!=='production'){errors.push.apply(errors,detectErrors(compiled.ast));}compiled.errors=errors;compiled.tips=tips;return compiled;}function compileToFunctions(template,options,vm){options=options||{};/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){// detect possible CSP restriction
try{new Function('return 1');}catch(e){if(e.toString().match(/unsafe-eval|CSP/)){warn('It seems you are using the standalone build of Vue.js in an '+'environment with Content Security Policy that prohibits unsafe-eval. '+'The template compiler cannot work in this environment. Consider '+'relaxing the policy to allow unsafe-eval or pre-compiling your '+'templates into render functions.');}}}// check cache
var key=options.delimiters?String(options.delimiters)+template:template;if(functionCompileCache[key]){return functionCompileCache[key];}// compile
var compiled=compile(template,options);// check compilation errors/tips
if(process.env.NODE_ENV!=='production'){if(compiled.errors&&compiled.errors.length){warn("Error compiling template:\n\n"+template+"\n\n"+compiled.errors.map(function(e){return"- "+e;}).join('\n')+'\n',vm);}if(compiled.tips&&compiled.tips.length){compiled.tips.forEach(function(msg){return tip(msg,vm);});}}// turn code into functions
var res={};var fnGenErrors=[];res.render=makeFunction(compiled.render,fnGenErrors);var l=compiled.staticRenderFns.length;res.staticRenderFns=new Array(l);for(var i=0;i<l;i++){res.staticRenderFns[i]=makeFunction(compiled.staticRenderFns[i],fnGenErrors);}// check function generation errors.
// this should only happen if there is a bug in the compiler itself.
// mostly for codegen development use
/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){if((!compiled.errors||!compiled.errors.length)&&fnGenErrors.length){warn("Failed to generate render function:\n\n"+fnGenErrors.map(function(ref){var err=ref.err;var code=ref.code;return err.toString()+" in\n\n"+code+"\n";}).join('\n'),vm);}}return functionCompileCache[key]=res;}return{compile:compile,compileToFunctions:compileToFunctions};}/*  */function transformNode(el,options){var warn=options.warn||baseWarn;var staticClass=getAndRemoveAttr(el,'class');if(process.env.NODE_ENV!=='production'&&staticClass){var expression=parseText(staticClass,options.delimiters);if(expression){warn("class=\""+staticClass+"\": "+'Interpolation inside attributes has been removed. '+'Use v-bind or the colon shorthand instead. For example, '+'instead of <div class="{{ val }}">, use <div :class="val">.');}}if(staticClass){el.staticClass=(0,_stringify2.default)(staticClass);}var classBinding=getBindingAttr(el,'class',false/* getStatic */);if(classBinding){el.classBinding=classBinding;}}function genData$1(el){var data='';if(el.staticClass){data+="staticClass:"+el.staticClass+",";}if(el.classBinding){data+="class:"+el.classBinding+",";}return data;}var klass$1={staticKeys:['staticClass'],transformNode:transformNode,genData:genData$1};/*  */function transformNode$1(el,options){var warn=options.warn||baseWarn;var staticStyle=getAndRemoveAttr(el,'style');if(staticStyle){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){var expression=parseText(staticStyle,options.delimiters);if(expression){warn("style=\""+staticStyle+"\": "+'Interpolation inside attributes has been removed. '+'Use v-bind or the colon shorthand instead. For example, '+'instead of <div style="{{ val }}">, use <div :style="val">.');}}el.staticStyle=(0,_stringify2.default)(parseStyleText(staticStyle));}var styleBinding=getBindingAttr(el,'style',false/* getStatic */);if(styleBinding){el.styleBinding=styleBinding;}}function genData$2(el){var data='';if(el.staticStyle){data+="staticStyle:"+el.staticStyle+",";}if(el.styleBinding){data+="style:("+el.styleBinding+"),";}return data;}var style$1={staticKeys:['staticStyle'],transformNode:transformNode$1,genData:genData$2};var modules$1=[klass$1,style$1];/*  */function text(el,dir){if(dir.value){addProp(el,'textContent',"_s("+dir.value+")");}}/*  */function html(el,dir){if(dir.value){addProp(el,'innerHTML',"_s("+dir.value+")");}}var directives$1={model:model,text:text,html:html};/*  */var baseOptions={expectHTML:true,modules:modules$1,directives:directives$1,isPreTag:isPreTag,isUnaryTag:isUnaryTag,mustUseProp:mustUseProp,isReservedTag:isReservedTag,getTagNamespace:getTagNamespace,staticKeys:genStaticKeys(modules$1)};var ref$1=createCompiler(baseOptions);var compileToFunctions=ref$1.compileToFunctions;/*  */var idToTemplate=cached(function(id){var el=query(id);return el&&el.innerHTML;});var mount=Vue$3.prototype.$mount;Vue$3.prototype.$mount=function(el,hydrating){el=el&&query(el);/* istanbul ignore if */if(el===document.body||el===document.documentElement){process.env.NODE_ENV!=='production'&&warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");return this;}var options=this.$options;// resolve template/el and convert to render function
if(!options.render){var template=options.template;if(template){if(typeof template==='string'){if(template.charAt(0)==='#'){template=idToTemplate(template);/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&!template){warn("Template element not found or is empty: "+options.template,this);}}}else if(template.nodeType){template=template.innerHTML;}else{if(process.env.NODE_ENV!=='production'){warn('invalid template option:'+template,this);}return this;}}else if(el){template=getOuterHTML(el);}if(template){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){mark('compile');}var ref=compileToFunctions(template,{shouldDecodeNewlines:shouldDecodeNewlines,delimiters:options.delimiters},this);var render=ref.render;var staticRenderFns=ref.staticRenderFns;options.render=render;options.staticRenderFns=staticRenderFns;/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){mark('compile end');measure(this._name+" compile",'compile','compile end');}}}return mount.call(this,el,hydrating);};/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */function getOuterHTML(el){if(el.outerHTML){return el.outerHTML;}else{var container=document.createElement('div');container.appendChild(el.cloneNode(true));return container.innerHTML;}}Vue$3.compile=compileToFunctions;module.exports=Vue$3;}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"_process":3}]},{},[]);//# sourceMappingURL=vendor-compiled.js.map

//# sourceMappingURL=vendor-compiled-compiled.js.map