"use strict";Tag.actions.ns_checklogin=new TagAction({rules:{storage:{type:"SCENARIO"},target:{type:"STRING"}},action:function(t){var e=this;return setTimeout(function(){Renderer.askForLogin().fail(function(){if(t.storage||t.target){var e=new Tag("jump",{storage:t.storage,target:t.target});currentConductor.queue.push(e)}}).always(function(){e.done()})}),1}}),function(){function e(){if(o2.serverStat.mode==o2.SERVER_MODE_O2SERVER){window.ns_assist_init||(window.ns_assist_init=function(e,t){var n=$("meta[name=o2engine_gameID]").attr("content"),o=$("meta[name=o2engine_userServer]").attr("content")||"//novelsphere.jp";n&&(config.gameID=n),o&&(o2.serverStat.userServer=o),config.gameID?e.src=o2.serverStat.userServer+"/js?id="+config.gameID:e.src=o2.serverStat.userServer+"/js",t()});var e=document.createElement("script");e.onload=function(){o2.serverStat.skey?(t(),$(o2).trigger("systeminit.loggedin")):$(o2).on("loggedin",function(){t()})},window.ns_assist_init(e,function(){document.getElementsByTagName("head").item(0).appendChild(e)});var n=0,o=null,r=1e4,a=!1}function t(){$(conductor).on("ran",function(e,t){0!=t&&(Date.now()-n>r?(i(),n=Date.now()):o||(o=setTimeout(function(){i(),o=null,n=Date.now()},n+r-Date.now())))})}function i(){a||$.post(o2.serverStat.saveServer+"/api/1.2/skey/check.php",{uid:o2.serverStat.uid,novel:config.gameID,key:o2.serverStat.skey},function(e){if("string"==typeof e&&(e=JSON.parse(e)),"ok"!=e.result){a=!0,$("body").append($("<div />").addClass("black-overlay").css({position:"absolute",width:"100%",height:"100%",cursor:"pointer",background:"rgba(0,0,0,0.7)"}).append($("<div />").html("別の場所でこのゲームを起動したためゲームを終了しました。<BR>クリックすると再読み込みします。").css({width:"300px",margin:"0 auto",background:"rgba(0,0,0,0.7)",color:"white",borderRadius:"5px",padding:"10px",fontSize:"18px",fontFamily:"'Myriad Pro', Arial, sans-serif"})).click(function(){location.reload()}));var t=new Tag("s");currentConductor.queue.push(t)}})}}conductor?e():$(o2).one("init",e)}();