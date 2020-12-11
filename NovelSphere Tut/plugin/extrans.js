"use strict";$.extend(Tag.actions.trans.rules,{zoom_out_to:{type:"FLOAT"},zoom_in_from:{type:"FLOAT"},zoom_in_draw_count:{type:"INT"}}),Tag.actions.trans.methods.zoom=new TransMethod({prepare:function(t){this.beginning=Date.now(),this.tempCanvas=document.createElement("canvas"),this.tempCanvas.width=config.scWidth,this.tempCanvas.height=config.scHeight,this.tempContext=this.tempCanvas.getContext("2d"),this.zoomOutTo=.5,this.zoomInFrom=1.5,this.drawCount=10,"zoom_out_to"in t&&(this.zoomOutTo=t.zoom_out_to),"zoom_in_from"in t&&(this.zoomInFrom=t.zoom_in_from),"zoom_in_draw_count"in t&&(this.drawCount=t.zoom_in_draw_count)},transit:function(t,e,a,n){var i=(Date.now()-this.beginning)/t.time;1<i&&(i=1);for(var s=n.getContext("2d"),o=this.drawCount,r=1-(1-this.zoomOutTo)*i,m=0;m<o;m++){var h=m/(o-1),d=1-(1-r)*h,c=e.width*d,g=e.height*d,l=(e.width-c)/2,p=(e.height-g)/2;s.globalAlpha=1-h,s.drawImage(e,0,0,e.width,e.height,l,p,c,g)}this.tempContext.clearRect(0,0,this.tempCanvas.width,this.tempCanvas.height);for(var u=this.zoomInFrom-(this.zoomInFrom-1)*i,f=0;f<o;f++){var w=f/(o-1),v=1+(u-1)*w,T=a.width*v,y=a.height*v,b=(a.width-T)/2,C=(a.height-y)/2;this.tempContext.globalAlpha=1-w,this.tempContext.drawImage(a,0,0,a.width,a.height,b,C,T,y)}s.save(),s.globalAlpha=i,s.drawImage(this.tempCanvas,0,0,this.tempCanvas.width,this.tempCanvas.height),s.restore()},teardown:function(){delete this.beginning,delete this.tempCanvas,delete this.zoomOutTo,delete this.zoomInFrom,delete this.drawCount}}),$.extend(Tag.actions.trans.rules,{translatex:{type:"FLOAT",defaultValue:0},translatey:{type:"FLOAT",defaultValue:-40},zoomscale:{type:"FLOAT",defaultValue:1.5}}),Tag.actions.trans.methods.fadethrough=new TransMethod({canRun:function(){return supportCssProperty(["animationName","animationDuration"])},transitAllLayers:function(t,e,a,n){this.cssTag=document.createElement("style"),this.cssTag.type="text/css";var i="@-webkit-keyframes fadethrough {0% { -webkit-transform: scale(1) translate(0,0);opacity: 1;} 100% { -webkit-transform: scale("+t.zoomscale+") translate("+t.translatex+"px,"+t.translatey+"px); opacity: 0; }};";i+=i.replace(/-webkit-/g,"-moz-")+i.replace(/-webkit-/g,"-o-")+i.replace(/-webkit-/g,"");var s=document.createTextNode(i);this.cssTag.appendChild(s),document.getElementsByTagName("head")[0].appendChild(this.cssTag),$(a).css({"animation-duration":t.time+"ms","animation-timing-function":"ease-in-out","animation-fill-mode":"both","animation-name":"fadethrough","z-index":"2"}),$(e).css("z-index","1")},teardownAllLayers:function(t,e,a,n){document.getElementsByTagName("head")[0].removeChild(this.cssTag),$(a).css({"animation-duration":"","animation-timing-function":"","animation-fill-mode":"","animation-name":"","z-index":""}),$(e).css("z-index",""),delete this.cssTag}}),Tag.actions.trans.methods.multiflip=new TransMethod({canRun:function(){return supportCssProperty(["animationName","perspective"])},transitAllLayers:function(t,s,o,e){this.cssTag=document.createElement("style"),this.cssTag.type="text/css";var a="@-webkit-keyframes flip-out { \n0% { \n-webkit-transform:rotateX(0deg); \n} 100% { \n-webkit-transform:rotateX(90deg) \n}} \n@-webkit-keyframes flip-in { \n0% { -webkit-transform:rotateX(-90deg); \n} 100% { \n-webkit-transform:rotateX(0deg); \n} \n} ";a+=a.replace(/-webkit-/g,"-moz-")+a.replace(/-webkit-/g,"-o-")+a.replace(/-webkit-/g,"");var n=document.createTextNode(a);this.cssTag.appendChild(n),document.getElementsByTagName("head")[0].appendChild(this.cssTag),$(o).css({display:"none"}),$(s).css({display:"none"}),$(e).css("perspective","1000px");var r=Math.round(o.width/10),m=t.time/1.72,h=.08*m;this.foreCanvases=[],this.backCanvases=[];for(var i=0;i<10;i++){var d=document.createElement("canvas"),c=document.createElement("canvas");d.height=c.height=o.height,d.width=c.width=o.width/10,$([d,c]).css({position:"absolute",left:r*i+"px",top:"0","animation-duration":m/2+"ms","animation-fill-mode":"both"}).appendTo(e),$(d).css({"animation-name":"flip-out","animation-delay":i*h+"ms","animation-timing-function":"ease-in"}),$(c).css({"animation-name":"flip-in","animation-delay":i*h+m/2+"ms","animation-timing-function":"ease-out"}),this.foreCanvases.push(d),this.backCanvases.push(c)}var g=Date.now(),l=this;this.syncCanvases=function(t){for(var e=0;e<l.foreCanvases.length;e++){var a=Date.now()-g,n=l.foreCanvases[e],i=l.backCanvases[e];(a<e*h+m/2||!0===t)&&n.getContext("2d").drawImage(o,r*e,0,r,o.height,0,0,r,o.height),(e*h+m/2<=a||!0===t)&&i.getContext("2d").drawImage(s,r*e,0,r,s.height,0,0,r,s.height)}},$([o,s]).on("draw",this.syncCanvases),this.syncCanvases(!0)},teardownAllLayers:function(t,e,a,n){$([a,e]).off("draw",this.syncCanvases),document.getElementsByTagName("head")[0].removeChild(this.cssTag),delete this.cssTag,$(a).css({display:"block"}),$(e).css({display:"block"}),$(n).css("perspective","");for(var i=0;i<this.foreCanvases;i++)$([this.foreCanvases[i],this.backCanvases[i]]).remove();delete this.foreCanvases,delete this.backCanvases,delete this.syncCanvases}}),Tag.actions.trans.methods.cube=new TransMethod({canRun:function(){return!browser.isIE&&supportCssProperty(["animationName","perspective"])},transitAllLayers:function(t,e,a,n){this.cssTag=document.createElement("style"),this.cssTag.type="text/css";var i="@-webkit-keyframes cube-up {0%{ -webkit-transform:rotateX(0deg) translateZ(0);}100%{-webkit-transform:rotateX(90deg) translateZ("+config.scHeight+"px);}};";i+=i.replace(/-webkit-/g,"-moz-")+i.replace(/-webkit-/g,"-o-")+i.replace(/-webkit-/g,"");var s=document.createTextNode(i);this.cssTag.appendChild(s),document.getElementsByTagName("head")[0].appendChild(this.cssTag),this.rotateDiv=document.createElement("div"),$(e).css({"transform-origin":"50% 0 0",transform:"rotateX(-90deg) translateZ("+config.scHeight+"px)"}),$(a).css({"transform-origin":"50% 0 0"}),$(n).css({width:$(n).width()+"px",height:$(n).height()+"px",perspective:"1000px","transform-style":"preserve-3d","transform-origin":"50% 0"}).append(this.rotateDiv),$(this.rotateDiv).css({width:$(n).width()+"px",height:$(n).height()+"px","transform-origin":"50% 100%","transform-style":"preserve-3d","animation-duration":t.time+"ms","animation-timing-function":"ease-in-out","animation-fill-mode":"both","animation-name":"cube-up"}).append(e).append(a)},teardownAllLayers:function(t,e,a,n){document.getElementsByTagName("head")[0].removeChild(this.cssTag),delete this.cssTag,$(e).css({"transform-origin":"",transform:""}),$(a).css({"transform-origin":""}),$(n).append(a).append(e),$(this.rotateDiv).remove(),delete this.rotateDiv}}),Tag.actions.trans.methods.blindup=new TransMethod({prepare:function(t){this.beginning=Date.now()},transit:function(t,e,a,n){var i=n.getContext("2d");i.clearRect(0,0,n.width,n.height);var s=(Date.now()-this.beginning)/t.time;1<s&&(s=1);var o=a.height/10,r=o*(1-s);i.drawImage(a,0,0,a.width,a.height);for(var m=0;m<10;m++){var h=o*m;0<r&&i.drawImage(e,0,h,e.width,r,0,h,e.width,r)}},teardown:function(){delete this.beginning}}),Tag.actions.trans.methods.blinddown=new TransMethod({prepare:function(t){this.beginning=Date.now()},transit:function(t,e,a,n){var i=n.getContext("2d");i.clearRect(0,0,n.width,n.height);var s=(Date.now()-this.beginning)/t.time;1<s&&(s=1);var o=a.height/10,r=o*s;i.drawImage(e,0,0,e.width,e.height);for(var m=0;m<10;m++){var h=o*m;0<r&&i.drawImage(a,0,h,a.width,r,0,h,a.width,r)}},teardown:function(){delete this.beginning}}),Tag.actions.trans.methods.toss=new TransMethod({canRun:function(){return supportCssProperty(["animationName","animationDuration"])},transitAllLayers:function(t,e,a,n){this.cssTag=document.createElement("style"),this.cssTag.type="text/css";var i="@-webkit-keyframes toss {0% { -webkit-transform: rotate(-30deg) scale(1.3) translate(-20px,-250px); opacity: 0; } 100% { transform: scale(1) translate(0,0) rotate(0deg); opacity: 1; }};";i+=i.replace(/-webkit-/g,"-moz-")+i.replace(/-webkit-/g,"-o-")+i.replace(/-webkit-/g,"");var s=document.createTextNode(i);this.cssTag.appendChild(s),document.getElementsByTagName("head")[0].appendChild(this.cssTag),$(e).css({"animation-duration":t.time+"ms","animation-timing-function":"ease-in-out","animation-fill-mode":"both","animation-name":"toss"})},teardownAllLayers:function(t,e,a,n){document.getElementsByTagName("head")[0].removeChild(this.cssTag),$(e).css({"animation-duration":"","animation-timing-function":"","animation-fill-mode":"","animation-name":""}),delete this.cssTag}}),Tag.actions.trans.methods.horizontalflip=new TransMethod({canRun:function(){return supportCssProperty(["animationName","animationDuration","animationFillMode","perspective"])},transitAllLayers:function(t,e,a,n){this.cssTag=document.createElement("style"),this.cssTag.type="text/css";var i="@-webkit-keyframes flip-in {0%{-webkit-transform:rotateX(-90deg);}100%{-webkit-transform:rotateX(0deg);}} \n@-webkit-keyframes flip-out {0%{-webkit-transform:rotateX(0deg);}100%{-webkit-transform:rotateX(90deg);}};";i+=i.replace(/-webkit-/g,"-moz-")+i.replace(/-webkit-/g,"-o-")+i.replace(/-webkit-/g,"");var s=document.createTextNode(i);this.cssTag.appendChild(s),document.getElementsByTagName("head")[0].appendChild(this.cssTag),$(n).css("perspective","1000px"),$(a).css({"animation-duration":t.time/2+"ms","animation-timing-function":"ease-in","animation-fill-mode":"both","animation-name":"flip-out"}),$(e).css({"animation-duration":t.time/2+"ms","animation-delay":t.time/2+"ms","animation-timing-function":"ease-out","animation-fill-mode":"both","animation-name":"flip-in"})},teardownAllLayers:function(t,e,a,n){document.getElementsByTagName("head")[0].removeChild(this.cssTag),$(n).css("perspective",""),$(a).css({"animation-duration":"","animation-timing-function":"","animation-fill-mode":"","animation-name":""}),$(e).css({"animation-duration":"","animation-delay":"","animation-timing-function":"","animation-fill-mode":"","animation-name":""}),delete this.cssTag}});