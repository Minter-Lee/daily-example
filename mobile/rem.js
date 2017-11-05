'use strict';

/**
 * @param {Boolean} [normal = false] - 默认开启页面压缩以使页面高清;  
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */
const win = window;
win.flex = (normal, baseFontSize, fontscale) => {
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;

  const doc = win.document;
  // 客戶端信息（浏览器信息）
  const ua = navigator.userAgent;
  // 从客户端信息中检索Android及内核版本
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  // 检索UC浏览器版本信息
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  // 检索是否是UC高清浏览器
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  // appVersion为浏览器的平台和版本信息，useragent是客户端向服务器发送的
  // useragent值，两者默认情况下内容相似，仅头部缺少一个字段
  // 检测是否是IOS环境
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  
  let dpr = win.devicePixelRatio || 1;
  
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }
  const scale = normal ? 1 : 1 / dpr;

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
  doc.documentElement.style.fontSize = normal ? '50px' : `${_baseFontSize / 2 * dpr * _fontscale}px`;
};