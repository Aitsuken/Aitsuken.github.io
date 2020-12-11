"use strict";var _createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}!function(){MessageLayer.textCustomizers.slideTextCustomizer=function(e){function s(e,t,a){_classCallCheck(this,s);var i=_possibleConstructorReturn(this,(s.__proto__||Object.getPrototypeOf(s)).call(this,e,t,a)),l="textSlideOffsetX"in e?e.textSlideOffsetX:0,u="textSlideOffsetY"in e?e.textSlideOffsetY:20,n="textSlideDuration"in e?e.textSlideDuration:700,d="textSlideFadeDuration"in e?e.textSlideFadeDuration:350,f=e.delaySpeed;i._ended=!1,void 0===l&&(l=100),void 0===u&&(u=100),void 0===n&&(n=1e3),void 0===f&&(f=100),void 0===d&&(d=1e3);var c=new KeySpline(0,0,.58,1);return i.perform=function(){var r=this.timePassed/n,o=this;a.forEach(function(e,t){var i=(o.timePassed-t*f)/d;if(i<0)e.styles.visible=!1;else{1<i&&(i=1),e.styles.visible=!0,e.styles.opacity=i,e.needRedraw=!0,1<(i=c.get(i))&&(i=1);var n=(1-i)*u,s=(1-i)*l;e.rect.y+=n,e.rect.x+=s,t===a.length-1&&1<=i&&1<=r&&(this._ended=!0)}})},i}return _inherits(s,TextCustomizer),_createClass(s,[{key:"isAnimation",value:function(){return!0}},{key:"isEnded",get:function(){return this._ended}}]),s}();var n=Tag.actions.position.action;$.extend(Tag.actions.position.rules,{slide:{type:"BOOLEAN"},slideoffsetx:{type:"INT"},slideoffsety:{type:"INT"},slideduration:{type:"INT"},slidefadeduration:{type:"INT"}}),Tag.actions.position.action=function(e){var t;if(t="layer"in e&&"page"in e?e.layer[e.page]:o2.currentMessageLayer,e.slide)-1==t.textCustomizers.indexOf("slideTextCustomizer")&&t.textCustomizers.push("slideTextCustomizer");else if(!1===e.slide){var i=t.textCustomizers.indexOf("slideTextCustomizer");0<=i&&t.textCustomizers.splice(i,1)}return"slideoffsetx"in e&&(t.textSlideOffsetX=e.slideoffsetx),"slideoffsety"in e&&(t.textSlideOffsetY=e.slideoffsety),"slideduration"in e&&(t.textSlideDuration=e.slideduration),"slidefadeduration"in e&&(t.textSlideFadeDuration=e.slidefadeduration),n.apply(this,arguments)}}();