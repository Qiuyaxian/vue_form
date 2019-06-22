export const each = (data, callback) => {
  if(data.forEach){ 
    data.forEach( (item, index) => { 
      callback.call(null, item, index);
    });
  }else{
    for (let i = 0; i <= data.length; i++) { 
      callback.call(null, data[i], i);
    }
  }
};
/**
 * [classTypeMap 存储类型错误key-value]
 * @type {Object}
 */
let classTypeMap = {};
/**
 * [判断类型]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const classType = (obj) => { return obj == null ? String( obj ) : classTypeMap[ toString.call(obj) ] || "object"; };
/**
 * [生成类型map]
 * @param  {[type]} _       [description]
 * @param  {[type]} name){                 classTypeMap["[object " + name + "]"] [description]
 * @return {[type]}         [description]
 */
each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(name, index){  
  classTypeMap["[object " + String(name) + "]"] = name.toLowerCase();    
});   
/**
 * [isArray 判断是否是数组值]
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [description]
 */
export function isArray (obj) {
   return classType(obj) === 'array' 
} 
/**
 * [isFunction 判断是否是函数值]
 * @param  {Function} fn [description]
 * @return {Boolean}     [description]
 */
export function isFunction (obj) {
  return classType(obj) === 'function';
}
/**
 * [isNumber 判断是否是数值]
 * @param  {[type]}  num [description]
 * @return {Boolean}     [description]
 */
export function isNumber (obj) {
  return classType(obj) === 'number';
}
/**
 * [isObject 判断是否是一个object值]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isObject (obj) { 
  return classType(obj) === 'object';
}
/**
 * [isTypeError 判断是否是Error类型]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isTypeError (obj) { 
  return classType(obj) === 'error';
}
/**
 * [isBoolean 判断是否是Boolean类型]
 * @param  {[type]}  boolean [description]
 * @return {Boolean}         [description]
 */
export function isBoolean (obj) {
  return classType(obj) === 'boolean';
}

/**
 * [isString 判断是否是字符串类型]
 * @param  {[type]}  string [description]
 * @return {Boolean}        [description]
 */
export function isString (obj) {
  return classType(obj) === 'string';
}
/**
 * [isNull 判断是否是null类型]
 * @param  {[type]}  type [description]
 * @return {Boolean}      [description]
 */
export function isNull (obj) {
  return classType(obj) === 'null';
}
/**
 * [isUndefined 判断是否是undefined类型]
 * @param  {[type]}  type [description]
 * @return {Boolean}      [description]
 */
export function isUndefined (obj) {
  return classType(obj) === 'undefined';
} 
/**
 * [isEmptyObject 是否是空对象]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isEmptyObject (obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
/**
 * [inArray 某一个数组中是否存在某一个对象]
 * @param  {[type]} obj [description]
 * @param  {[type]} arr [description]
 * @param  {[type]} i   [description]
 * @return {[type]}     [description]
 */
export function inArray (obj, arr, i) {
  let len;
  if ( arr ) {
    if ( indexOf ) { return indexOf.call( arr, elem, i ); }
    len = arr.length;  
    i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
    for ( ; i < len; i++ ) {
      if ( i in arr && arr[ i ] === elem ) { return i; }
    }
  }
  return -1;
}
/**
 * [toArray 将类数组转换为真正的数组]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
export function toArray (array) {
  return Array.prototype.slice.call(array);
}
/**
 * [inObject 检查是否存在某一个key值]
 * @param  {[type]} obj [description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
export function inObject (obj, key) {
  if (hasOwn(obj, key)) return true;
  else {
    for(let name in obj){ 
      if(isObject(obj[name])) return inObject(obj[name], key);
    }
    return false;
  }
}
/**
 * [extend 合并函数]
 * @param  {[type]} des [description]
 * @param  {[type]} src [description]
 * @return {[type]}     [description]
 */
export function extend () { 
  let args = toArray(arguments),
      arg = args.shift();
  if (objectAssign) { 
    return objectAssign.call(null, arg, ...args);
  } else { 
    if (Object.assign) { 
      for (let i = 0; i < args.length; i++ ) {
        arg = Object.assign(arg, args[i]);
      }
      return arg; 
    } else {
      for (let i = 0; i < args.length; i++ ) { 
        prop (args[i], function (p) {
          arg[p] = args[i][p];
        });
      } 
      return arg;
    }
  }  
}
/**
 * [prop 合并函数]
 * @param  {[type]} obj [description]
 * @param  {[type]} fun [description]
 * @return {[type]}     [description]
 */
function prop (obj, fun) {
  for (var p in obj) {
    hasOwn(obj, p) && fun(p);
  }
}

/**
 * [cleanStyle 样式过滤]
 * @param  {Object} styles [description]
 * @return {[type]}        [description]
 */
export function cleanStyle (styles = {}) {
  for (let i in styles) {
    if (typeof styles[i] === 'undefined') delete styles[i];
  }
  return styles;
}
/**
 * [获取父级的 props]
 * @param  {[type]} self [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getParentProp (self, name) {
  if (self.$parent && typeof self.$parent[name] !== 'undefined') return self.$parent[name];
  if (self.$parent && self.$parent.$parent && typeof self.$parent.$parent[name] !== 'undefined') return self.$parent.$parent[name];
}
/**
 * [getParentNode 通过class类查找父级]
 * @param  {[type]} elem      [description]
 * @param  {[type]} className [description]
 * @param  {[type]} context   [description]
 * @return {[type]}           [description]
 */
export function getParentNode (elem, className, context = document) {
  while (!hasClass(elem, className)) {
    elem = elem.parentNode;
    if(hasClass(elem, className)){ 
      break;
    }
    if (elem === context) { 
      break;
    }
  }
  return elem;
}

export function resetScrollIntoView (elem, state = true, time = 10) {
  if (/iphone/i.test(navigator.userAgent)) { 
  } 
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {  
    let timer = setTimeout(() => { 
      if(timer) clearTimeout(timer);  
      elem && elem.scrollIntoViewIfNeeded && elem.scrollIntoViewIfNeeded(state);
    }, time);
  }
}
/* ------- dom start -------- */
/**
 * [querySelector 选择dom节点]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function querySelector (name, elem = document) { 
  return (typeof name === 'string') ? elem.querySelector(name) : name;
}

/**
 * [querySelectorAll 选择所有dom]
 * @return {[type]} [description]
 */
export function querySelectorAll (name, elem = document) {
  return (typeof name === 'string') ? elem.querySelectorAll(name) : name;
}
/**
 * [getById 通过ID查找dom]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function getById (id, elem = document) {
  return (typeof id === 'string') ? elem.getElementById(id) : id; 
}
/**
 * [getByName 通过name 查找input]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getByName (name, elem = document) {
  return (typeof name === 'string') ? elem.getElementsByName(name) : name;
}
/**
 * [getByTagName 通过dom标签 查找html节点]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getByTagName (name, elem = document) { 
  return (typeof name === 'string') ? elem.getElementsByTagName(name) : name;
}
/**
 * [getByClassName 通过class名寻找html节点]
 * @param  {[type]} name [description]
 * @param  {[type]} elem [description]
 * @return {[type]}      [description]
 */
export function getByClassName (name, elem = document) {  
  return (typeof name === 'string') ? elem.getElementsByClassName(name) : name;
}

/**
 * [hasClass 判断是否存在class样式类]
 * @param  {[type]}  el        [description]
 * @param  {[type]}  className [description]
 * @return {Boolean}           [description]
 */
export function hasClass (el, className) { 
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}
/**
 * [addClass 添加class样式类]
 * @param {[type]} el        [description]
 * @param {[type]} className [description]
 */
export function addClass (el, className) {
  if (hasClass(el, className)) return;
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}
/**
 * [removeClass 移除指定class样式]
 * @param  {[type]} el        [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
export function removeClass (el, className) {
  if (!hasClass(el, className)) return;
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
  el.className = el.className.replace(reg, ' ')
}
/**
 * [getData 获取dom上绑定的data-数据]
 * @param  {[type]} el   [description]
 * @param  {[type]} name [description]
 * @param  {[type]} val  [description]
 * @return {[type]}      [description]
 */
export function getData (el, name, val) {
  let prefix = 'data-';
  if (val) return el.setAttribute(prefix + name, val);
  return el.getAttribute(prefix + name);
}
/**
 * [getRect 获取dom节点的基本信息]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */

export function getRect (el) {
  if (window && el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}

/**
 * [getStyle 获取的css样式]
 * @param  {[type]} obj  [description]
 * @param  {[type]} attr [description]
 * @return {[type]}      [description]
 */
export function getStyle (el, attr) {
  let computedStyle = el.currentStyle ? el.currentStyle : window.getComputedStyle(el);
  if(!attr){
    return computedStyle;
    // if(el.currentStyle) return el.currentStyle;     
    // else return document.defaultView.getComputedStyle(el, null);  
  }else{
    return computedStyle[attr];
     // if(el.currentStyle) return el.currentStyle[attr];   
     // else return document.defaultView.getComputedStyle(el, null)[attr]; 
  }    
}
/* ------- dom end -------- */

/**
 * [addEventHandle 绑定事件]
 * @param {[type]}   dom     [description]
 * @param {String}   event   [description]
 * @param {Function} fn      [description]
 * @param {[type]}   passive [description]
 */
export function addEventHandle(dom, event = 'WeixinJSBridgeReady', fn, passive = ({ passive: false } || false)){
  if( document.addEventListener ){
    dom.addEventListener(event, fn, passive);
  }else if (document.attachEvent){
    dom.attachEvent(`on${event}`, fn);
  }
}
/**
 * [removeEventHandle 移除绑定事件]
 * @param  {[type]}   dom     [description]
 * @param  {String}   event   [description]
 * @param  {Function} fn      [description]
 * @param  {[type]}   passive [description]
 * @return {[type]}           [description]
 */
export function removeEventHandle(dom, event = 'WeixinJSBridgeReady', fn, passive = ({ passive: false } || false)){
  if( document.removeEventListener ){
    dom.removeEventListener(event, fn, passive);
  }else if (document.detachEvent){
    dom.detachEvent(`on${event}`, fn);
  }
}