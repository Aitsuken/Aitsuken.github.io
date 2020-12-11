"use strict";!function(){var t=[],l=[],n=[];o2.fallenleaf={pauseForeVisible:-1,pauseBackVisible:-1,foreVisible:!0,backVisible:!0,num:0,xInitVelocityMin:0,xInitVelocityMax:0,xInitAccelerationMin:0,xInitAccelerationMax:1,xVelocityMin:-1.5,xVelocityMax:1.5,xAccelerationMin:-.2,xAccelerationMax:.2,xAccelerationDelta:.15,yInitVelocityMin:1.9,yInitVelocityMax:4.5,yInitAccelerationMin:0,yInitAccelerationMax:.2,interval:40,images:["ichou1","ichou2","momiji1","momiji2","sakura1","sakura2"]};var i=o2.allForeLayers,a=o2.allBackLayers;o2.allForeLayers=function(){var e=i.call(o2);return e=e.concat(l)},o2.allBackLayers=function(){var e=a.call(o2);return e=e.concat(n)};var o=o2.importFromSaveData;o2.importFromSaveData=function(e){return"fallenleaf"in e&&(t.length&&new Tag("leafuninit").run(),new Tag("leafinit",{forevisible:e.fallenleaf.foreVisible,backvisible:e.fallenleaf.backVisible,num:e.fallenleaf.num,xinitvelocitymin:e.fallenleaf.xInitVelocityMin,xinitvelocitymax:e.fallenleaf.xInitVelocityMax,xinitaccelerationmin:e.fallenleaf.xInitAccelerationMin,xinitaccelerationmax:e.fallenleaf.xInitAccelerationMax,xvelocitymin:e.fallenleaf.xVelocityMin,xvelocitymax:e.fallenleaf.xVelocityMax,xaccelerationmin:e.fallenleaf.xAccelerationMin,xaccelerationmax:e.fallenleaf.xAccelerationMax,xaccelerationdelta:e.fallenleaf.xAccelerationDelta,yinitvelocitymin:e.fallenleaf.yInitVelocityMin,yinitvelocitymax:e.fallenleaf.yInitVelocityMax,yinitaccelerationmin:e.fallenleaf.yInitAccelerationMin,yinitaccelerationmax:e.fallenleaf.yInitAccelerationMax,interval:e.fallenleaf.interval,images:e.fallenleaf.images.join(",")}).run()),o.apply(this,arguments)};var c=function(){ImageLayer.call(this)};(c.prototype=Object.create(ImageLayer.prototype)).importFrom=function(e){this.visible=e.visible};var r=function(){this.fore=new c,this.back=new c;var e=this,i=o2.fallenleaf.images[Math.floor(Math.random()*o2.fallenleaf.images.length)];this.fore.loadImage(i,{}).done(function(){e.fore.images[0].cacheEnabled=!1,e.fore.rect.width/=8,e.fore.setRect()}),this.back.loadImage(i,{}).done(function(){e.back.images[0].cacheEnabled=!1,e.back.rect.width/=8,e.back.setRect()}),l.push(this.fore),n.push(this.back);var a=.5<Math.random(),t=o2.allForeLayers().filter(function(e){return e instanceof MessageLayer}).reduce(function(e,i){return Math.min(e,i.index)},1/0);a?(this.fore.index=t-1,this.back.index=t-1):this.fore.index=this.back.index=1,this.clipIndex=0,this.reset()};r.prototype.reset=function(){this.xVelocity=e(o2.fallenleaf.xInitVelocityMin,o2.fallenleaf.xInitVelocityMax),this.yVelocity=e(o2.fallenleaf.yInitVelocityMin,o2.fallenleaf.yInitVelocityMax),this.xAcceleration=e(o2.fallenleaf.xInitAccelerationMin,o2.fallenleaf.xInitAccelerationMax),this.yAcceleration=e(o2.fallenleaf.yInitAccelerationMin,o2.fallenleaf.yInitAccelerationMax),this.setPosition(config.scWidth*Math.random(),-config.scHeight)},r.prototype.x=function(){return this.fore.rect.x},r.prototype.y=function(){return this.fore.rect.y},r.prototype.setPosition=function(e,i){var a=this;renderer.animator.requestFrame(function(){a.fore.rect.x=a.back.rect.x=e,a.fore.rect.y=a.back.rect.y=i})},r.prototype.move=function(){this.xVelocity+=this.xAcceleration,this.yVelocity+=this.yAcceleration,this.xAcceleration+=(Math.random()-.5)*(2*o2.fallenleaf.xAccelerationDelta),this.xVelocity>=o2.fallenleaf.xVelocityMax&&(this.xVelocity=o2.fallenleaf.xVelocityMax),this.xVelocity<=o2.fallenleaf.xVelocityMin&&(this.xVelocity=o2.fallenleaf.xVelocityMin),this.xAcceleration>=o2.fallenleaf.xAccelerationMax&&(this.xAcceleration=o2.fallenleaf.xAccelerationMax),this.xAcceleration<=o2.fallenleaf.xAccelerationMax&&(this.xAcceleration=o2.fallenleaf.xAccelerationMax);var e=this.x()+this.xVelocity,i=this.y()+this.yVelocity;i>config.scHeight?this.reset():(this.setPosition(e,i),this.fore.images.length&&o2.fallenleaf.foreVisible&&(this.fore.images[0].options.clipLeft=this.fore.rect.width*this.clipIndex,this.fore.images[0].options.clipWidth=this.fore.rect.width,this.fore.redrawRect()),this.back.images.length&&o2.fallenleaf.backVisible&&(this.back.images[0].options.clipLeft=this.back.rect.width*this.clipIndex,this.back.images[0].options.clipWidth=this.back.rect.width,this.back.redrawRect()),this.clipIndex++,this.clipIndex%=8)};var f=null;function s(){for(var e=0;e<t.length;e++){t[e].move()}}function y(){t.forEach(function(e){e.fore.visible=o2.fallenleaf.foreVisible,e.back.visible=o2.fallenleaf.backVisible})}function e(e,i){return e+Math.random()*(i-e)}Tag.actions.leafinit=new TagAction({rules:{forevisible:{type:"BOOLEAN"},backvisible:{type:"BOOLEAN"},num:{type:"INT",defaultValue:24},xinitvelocitymin:{type:"FLOAT"},xinitvelocitymax:{type:"FLOAT"},xinitaccelerationmin:{type:"FLOAT"},xinitaccelerationmax:{type:"FLOAT"},xvelocitymin:{type:"FLOAT"},xvelocitymax:{type:"FLOAT"},xaccelerationmin:{type:"FLOAT"},xaccelerationmax:{type:"FLOAT"},xaccelerationdelta:{type:"FLOAT"},yinitvelocitymin:{type:"FLOAT"},yinitvelocitymax:{type:"FLOAT"},yinitaccelerationmin:{type:"FLOAT"},yinitaccelerationmax:{type:"FLOAT"},interval:{type:"INT"},images:{type:"STRING"}},action:function(e){if(t.length)return o2.error("すでにinitしました"),0;new Tag("leafopt",e).run();for(var i=0;i<e.num;i++){var a=new r(i%2);a.fore.rect.x=50*i,a.fore.rect.y=Math.floor(i/10),a.back.rect.x=50*i,a.back.rect.y=Math.floor(i/10),t.push(a)}return e.num&&(o2.refreshRendererLayers(),null!=f&&clearInterval(f),f=setInterval(s,o2.fallenleaf.interval)),0}}),Tag.actions.leafuninit=new TagAction({rules:{},action:function(e){return l=[],n=[],t=[],clearInterval(f),f=null,o2.fallenleaf.num=0,o2.refreshRendererLayers(),renderer.animator.requestFrame(),0}}),Tag.actions.leafopt=new TagAction({rules:{forevisible:{type:"BOOLEAN"},backvisible:{type:"BOOLEAN"},num:{type:"INT",defaultValue:24},xinitvelocitymin:{type:"FLOAT"},xinitvelocitymax:{type:"FLOAT"},xinitaccelerationmin:{type:"FLOAT"},xinitaccelerationmax:{type:"FLOAT"},xvelocitymin:{type:"FLOAT"},xvelocitymax:{type:"FLOAT"},xaccelerationmin:{type:"FLOAT"},xaccelerationmax:{type:"FLOAT"},xaccelerationdelta:{type:"FLOAT"},yinitvelocitymin:{type:"FLOAT"},yinitvelocitymax:{type:"FLOAT"},yinitaccelerationmin:{type:"FLOAT"},yinitaccelerationmax:{type:"FLOAT"},images:{type:"STRING"}},action:function(e){for(var i in e.images&&(o2.fallenleaf.images=e.images.split(","),delete e.images),o2.fallenleaf){var a=i.toLowerCase();a in e&&(o2.fallenleaf[i]=e[a])}return y(),0}}),Tag.actions.leafpause=new TagAction({rules:{},action:function(e){return-1==o2.fallenleaf.pauseForeVisible&&-1==o2.fallenleaf.pauseBackVisible?(o2.fallenleaf.pauseForeVisible=o2.fallenleaf.foreVisible,o2.fallenleaf.pauseBackVisible=o2.fallenleaf.backVisible,o2.fallenleaf.foreVisible=!1,o2.fallenleaf.backVisible=!1):(o2.fallenleaf.foreVisible=o2.fallenleaf.pauseForeVisible,o2.fallenleaf.backVisible=o2.fallenleaf.pauseBackVisible,o2.fallenleaf.pauseBackVisible=o2.fallenleaf.pauseForeVisible=-1),y(),0}})}();