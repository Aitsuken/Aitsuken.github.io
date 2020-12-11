;///////////////////////////////////////////////////////////////////////////////
;// novelsphere.js Simple UI マクロ
;///////////////////////////////////////////////////////////////////////////////
*start
; 初期設定
; lanchImage = 1352*914px
[o2_iscript]
	o2ui = {
		checkOpt : function(mp,myself){
			return typeof mp !== 'undefined' && myself != mp ? mp : myself;
		},
		enabled : true,
		launchView : "info",
		launchSize : "default",
		launchImage : "information",
		launchImageStatus : true,
		automode : true,
		skipmode : true,
		automodeStatus : false,
		skipmodeStatus : false,
		save : true,
		load : true,
		slot : 28,
		snap : {width: config.scWidth, height: config.scHeight},
		config : {
			enabled : true,
			chspeed : {max: 200, min: 0},
			automode : {max: 2000, min: 200}
		},
		backToTitle : true, //タイトルに戻るボタンのオン/オフ制御
		login : null,
		button : {
			checkCurrentLayer : function(){
				for (var i=0; i < o2.foreLayers.messageLayers.length; i++){
					if (o2.foreLayers.messageLayers[i].index == o2.currentMessageLayer.index){
						return o2ui.tmp.currentMessageLayer = "message"+i;
					}
				}
				return o2ui.tmp.currentMessageLayer = "message0";
			},
			checkAlreadyCreate : function(){
				o2ui.tmp.sysbtn = o2.foreLayers.messageLayers[Number(o2ui.button.layer.match(/\d+/)[0])].routineButtons;
				if ( o2ui.tmp.sysbtn.length > 0 ){
					for(var i=0; i < o2ui.tmp.sysbtn.length; i++){
						if (o2ui.tmp.sysbtn[i].tagArgs.id == o2ui.button.id){
							return o2ui.tmp.sysbtnStatus = true;
						}
					}
				}
				return o2ui.tmp.sysbtnStatus = false;
			},
			enabled : true,
			id : 'o2sysbtn',
			layer : "message1",
			graphic : "o2ui_sysbutton",
			left : 0,
			top : 0
		},
		title : {
			enabled : false
		},
		tmp : {}
	};
[o2_endscript]
[rclick call=true storage=o2ui_macro.ks target=*showMenu enabled=&o2ui.enabled]

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui
/* ------------------------------
	メニュー画面の各種設定を行います。
	このタグが実行されてもメニュー画面は開きません。

	enabled = true / false  (true)											// Simple UI を右クリックで開くかの 有効 / 無効 を設定します。

	launch_view = info / save / load / config (info)		// メニューを開いた時にどの画面を最初に表示するかを設定します。
	launch_size = default / fixed (default)							// メニューの表示サイズをノベルの画面サイズに合わせるか否かを設定します。
	launch_image = storage ("information")							// メニューの info を開いた時に表示される画像を設定します。
	launch_image_visible = true / false (true)					// メニューを開いた時に info で表示される画像の 表示 / 非表示 を設定します。

	automode = true / false (true)											// automode 機能の オン / オフ を設定します。
	skipmode = true / false (true)											// automode 機能の オン / オフ を設定します。

	save = true / false (true)													// save 機能の オン / オフ を設定します。
	load = true / false (true)													// load 機能の オン / オフ を設定します。
	config = true / false (true)												// config 機能の オン / オフ を設定します。
	backtotitle = true / false (true)										// タイトルに戻る 機能の オン / オフ を設定します。

	slot = integer (28)																	// save 可能なスロット数を設定します。最大28個です。

	chspeed_max = millisecond (200)											// 文字表示速度の最大値を設定します。
	chspeed_min = millisecond (0)												// 文字表示速度の最小値を設定します。
	automode_max = millisecond (2000)										// automode 時のページ送り速度の最大値を設定します。
	automode_min = millisecond (200)										// automode 時のページ送り速度の最小値を設定します。
------------------------------ */
[rclick call=true storage=o2ui_macro.ks target=*showMenu enabled=%enabled o2_cond="typeof mp.enabled !== 'undefined' && o2ui.enabled != mp.enabled"]

[o2_iscript]
	o2ui.enabled = o2ui.checkOpt( mp.enabled, o2ui.enabled );
	o2ui.launchView = o2ui.checkOpt( mp.launch_view, o2ui.launchView );
	o2ui.launchSize = o2ui.checkOpt( mp.launch_size, o2ui.launchSize );
	o2ui.launchImage = o2ui.checkOpt( mp.launch_image, o2ui.launchImage );
	o2ui.launchImageStatus = o2ui.checkOpt( mp.launch_image_visible, o2ui.launchImageStatus );
	o2ui.automode = o2ui.checkOpt( mp.automode, o2ui.automode );
	o2ui.skipmode = o2ui.checkOpt( mp.skipmode, o2ui.skipmode );
	o2ui.save = o2ui.checkOpt( mp.save, o2ui.save );
	o2ui.load = o2ui.checkOpt( mp.load, o2ui.load );
	o2ui.slot = o2ui.checkOpt( mp.slot, o2ui.slot );
	o2ui.backToTitle = o2ui.checkOpt( mp.backtotitle, o2ui.backToTitle );
	o2ui.config.enabled = o2ui.checkOpt( mp.config, o2ui.config.enabled );
	o2ui.config.chspeed.max = o2ui.checkOpt( mp.chspeed_max, o2ui.config.chspeed.max );
	o2ui.config.chspeed.min = o2ui.checkOpt( mp.chspeed_min, o2ui.config.chspeed.min );
	o2ui.config.automode.max = o2ui.checkOpt( mp.automode_max, o2ui.config.automode.max );
	o2ui.config.automode.min = o2ui.checkOpt( mp.automode_min, o2ui.config.automode.min );
	console.log("o2ui:",o2ui)
[o2_endscript]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_show
/* ------------------------------
	メニュー画面を開きます。

	launch_view = info / save / load / config (info)		// メニューを開いた時にどの画面を最初に表示するかを設定します。
------------------------------ */
[o2_iscript]
	// launchView変更前の状態を記憶しておく（あくまでも[o2ui_show]では一時的な変更にしかなりません）
	o2ui.tmp.lastLaunchView = o2ui.launchView;
	o2ui.launchView = typeof mp.launch_view === 'undefined' ? "info" : mp.launch_view;
[o2_endscript]
[call storage=o2ui_macro.ks target=*showMenu]
[o2_iscript]
	// launchView変更前に戻す
	o2ui.launchView = o2ui.tmp.lastLaunchView;
[o2_endscript]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_button
/* ------------------------------
	メニュー画面を開くためのボタンを作成します。
	すでに作成されている場合は設定だけを変更します。

	enabled = true / false (true)					// クリックの 有効 / 無効 を設定します。
	layer = layername ("message1")				// o2ui_button を描画する先のレイヤーを設定します。
	graphic = storage ("o2ui_sysbutton")	// o2ui_button で使用する画像を設定します。
	left = integer (0) 										// o2ui_button を描画する左右位置を設定します。layer 属性で設定したレイヤーが基準になります。
	top = integer (0) 										// o2ui_button を描画する上下位置を設定します。layer 属性で設定したレイヤーが基準になります。
------------------------------ */
[o2_iscript]
	o2ui.button.enabled = o2ui.checkOpt( mp.enabled, o2ui.button.enabled );
	o2ui.button.layer = o2ui.checkOpt( mp.layer, o2ui.button.layer );
	o2ui.button.graphic = o2ui.checkOpt( mp.graphic, o2ui.button.graphic );
	o2ui.button.left = o2ui.checkOpt( mp.left, o2ui.button.left );
	o2ui.button.top = o2ui.checkOpt( mp.top, o2ui.button.top );
	o2ui.button.checkCurrentLayer();
	o2ui.button.checkAlreadyCreate();
[o2_endscript]
[if o2_exp="o2ui.tmp.sysbtnStatus == false"]
	[position layer=&o2ui.button.layer page=back visible=true opacity=0 top=0 left=0 width=&config.scWidth height=&config.scHeight margint=0 marginr=0 marginb=0 marginl=0]
	[position layer=&o2ui.button.layer page=fore visible=true opacity=0 top=0 left=0 width=&config.scWidth height=&config.scHeight margint=0 marginr=0 marginb=0 marginl=0]
	[current layer=&o2ui.button.layer]
	[locate x=&o2ui.button.left y=&o2ui.button.top]
	[o2_sysbutton graphic=&o2ui.button.graphic id=&o2ui.button.id storage=o2ui_macro.ks target=*showMenu]
	[current layer=&o2ui.tmp.currentMessageLayer]
[endif]
[if o2_exp="mp.enabled == 'true'"]
	[o2_updatesysbutton id=&o2ui.button.id enabled=true]
[elsif o2_exp="mp.enabled == 'false'"]
	[o2_updatesysbutton id=&o2ui.button.id enabled=false]
[endif]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_deletebutton
/* ------------------------------
	o2ui_button を削除します
------------------------------ */
[o2_iscript]
	if (typeof o2ui.tmp.currentMessageLayer === "undefined"){
		o2ui.button.checkCurrentLayer();
		if (!o2ui.button.checkAlreadyCreate()){
			o2.warn("[o2ui_deletebutton]","システムボタンが作成されていないため、削除は行われません");
		}
	}
[o2_endscript]
[current layer=&o2ui.button.layer]
[o2_deletesysbutton id=&o2ui.button.id o2_cond="o2ui.tmp.sysbtnStatus"]
[current layer=&o2ui.tmp.currentMessageLayer]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_slideshow
/* ------------------------------
	指定した名前（接頭辞）から始まる一連の画像を順番に表示します。
	連番で用意しておくと確実です。

	prefix = string ('')						// 接頭辞を指定します。デフォルトでは何も接頭辞が付かないことになっています
	time = integer (1000)						// トランジションにかける時間を指定します
------------------------------ */
[o2_iscript]
	if (typeof mp.prefix === 'undefined'){
		o2.warn("[o2ui_slideshow]","prefix 属性が指定されていません")
	}
	o2ui.tmp.prefix = o2ui.checkOpt( mp.prefix, '' );
	o2ui.tmp.keys = Object.keys(o2.imageList);
	o2ui.tmp.values = [];
	for(var i=0,j=0; i<o2ui.tmp.keys.length; i++){
		if (o2ui.tmp.keys[i].indexOf(o2ui.tmp.prefix) != -1 && o2ui.tmp.keys[i].indexOf('.png') == -1 && o2ui.tmp.keys[i].indexOf('.jpg') == -1){
			o2ui.tmp.values[j] = o2ui.tmp.keys[i];
			j++;
		}
	}
	o2ui.tmp.values.sort();
[o2_endscript]

[foreach from=0 to=&o2ui.tmp.values.length-1 (num)->]
	[eval o2_exp="o2ui.tmp.openingStorage = o2ui.tmp.values[$num]"]
	[backlay]
	[image storage=&o2ui.tmp.openingStorage layer=base page=back visible=true]
	[trans method=crossfade time=%time|1000]
	[wt]
	[waitclick]
[/foreach]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_reset_load
/* ------------------------------
	画面をリセット後、指定したセーブデータをロードします。
	タグ実行の度に属性を記述しないとデフォルト値が設定されます

	clear = black / white (black)										// 非表示にする際の遷移画像を指定します。実際に読み込まれるのは、ここで指定した名前の前に'o2ui_'という接頭辞がついたファイルです。
	method = crossfade / universal (crossfade)			// トランジションの方法を指定します。
	rule = storage (undefined)											// ユニバーサルトランジションのルール画像を指定します。
	vague = integer (64)														// ユニバーサルトランジションに適用するあいまいさを 0 以上の数値で指定します。
	time = integer (2000 ms)												// トランジションにかける時間を指定します。
	place = slot Number 														// ロードするスロットの番号を指定します
------------------------------ */
[o2_iscript]
	o2ui.tmp.reset = {};
	o2ui.tmp.reset.clearImage = o2ui.checkOpt( mp.clear, "black" );
	o2ui.tmp.reset.method = o2ui.checkOpt( mp.method, "crossfade" );
	o2ui.tmp.reset.rule = o2ui.checkOpt( mp.rule, undefined );
	o2ui.tmp.reset.vague = o2ui.checkOpt( mp.vague, 64 );
	o2ui.tmp.reset.time = o2ui.checkOpt( mp.time, 1000 );
	if (typeof mp.place === 'undefined'){
		o2.warn('【o2ui_reset_load】 place属性が指定されていないため、0番のスロットをロードします')
	}
	o2ui.tmp.reset.place = o2ui.checkOpt( mp.place, 0 );
[o2_endscript]

; 音を全て止める
[fadeoutbgm time=&o2ui.tmp.reset.time]
[foreach from=0 to=&o2.se.length-1 (num)->]
	[fadeoutse buf=$num time=&o2ui.tmp.reset.time]
[/foreach]

[backlay]

; レイヤーを全て削除
[foreach from=0 to=&o2.foreLayers.imageLayers.length-1 (num)->]
	[freeimage layer=$num page=back]
[/foreach]
; メッセージレイヤも初期化
[foreach from=0 to=&o2.foreLayers.messageLayers.length-1 (num)->]
	[current layer=&"message"+$num page=back]
	[er]
	[position layer=&"message"+$num page=back visible=false]
[/foreach]

[image storage=&"o2ui_"+o2ui.tmp.reset.clearImage layer=base page=back]
[trans method=&o2ui.tmp.reset.method time=&o2ui.tmp.reset.time rule=&o2ui.tmp.reset.rule vague=&o2ui.tmp.reset.vague o2_cond=o2ui.tmp.reset.method=='universal']
[trans method=crossfade time=&o2ui.tmp.reset.time o2_cond=o2ui.tmp.reset.method!='universal']
[o2_iscript]
	 if(o2ui.tmp.reset.method!='crossfade')&&(o2ui.tmp.reset.method!='universal'){
	 	o2.warn("【o2ui_reset_load】method属性の指定が間違っているため、crossfadeが実行されました")
	 }
[o2_endscript]
[wt]
[wb]
[foreach from=0 to=&o2.se.length-1 (num)->]
	[wf buf=$num]
[/foreach]

[current layer=&o2ui.tmp.currentMessageLayer]
[load place=&o2ui.tmp.reset.place]
@endmacro


[return]

;///////////////////////////////////////////////////////////////////////////////
;// メニューを開きます
;///////////////////////////////////////////////////////////////////////////////
*showMenu

[locksnapshot]

[history enabled=false]
[rclick call=true storage=o2ui_macro.ks target=*showMenu enabled=false]

; タイトルに戻るボタン以外は全て false にする
[eval o2_exp="o2ui.tmp.backToTitleFromScenario = false"]
; ロードする時以外は全て undefined にする
[eval o2_exp="o2ui.tmp.loadplace = undefined"]
; 閉じるまでタグは進行しない
[showoverlay filename=o2_menu.html event=fullscreen (action, slot, callback)->]
	[switch val=$action ->]

		; ノベルに戻る
		[case val=close ->]
			[close]
		[/]

		; タイトル画面に戻る
		[case val=title ->]
			[eval o2_exp="o2ui.tmp.backToTitleFromScenario = true"]
			[close]
		[/]

		; セーブする
		[case val=save ->]
			[save place=$slot]
			; セーブ後 callback で渡された関数を実行
			[eval func=$callback]
		[/]

		; ロードする
		[case val=load ->]
			; slot 番号を記憶
			[eval o2_exp="o2ui.tmp.loadplace = $slot"]
			; タイトル画面からロードした時は、メニュー画面の設定を引き継がないようにする
			[if o2_exp="o2ui.title.status"]
				[eval o2_exp="o2ui.title.status = false"]
				[o2ui launch_view=&o2ui.tmp.lastLaunchView save=&o2ui.tmp.titlesave config=&o2ui.tmp.titleconfig automode=&o2ui.tmp.titleautomode skipmode=&o2ui.tmp.titleskipmode title=&o2ui.tmp.backToTitle]
			[endif]
			; セーブ後 callback で渡された関数を実行（ここではまだロードしない）
			[eval func=$callback]
		[/]

		; オートモード
		[case val=auto ->]
			[eval o2_exp="setTimeout(function(){o2.enterAutoMode()},250)"]
			[close]
		[/]

		; スキップモード
		[case val=skip ->]
			[eval o2_exp="setTimeout(function(){o2.skipToStop()},250)"]
			[close]
		[/]

		; ノベルスフィアへのログインが必要な時
		[case val=nscheck ->]
			[ns_checklogin]
			; ログイン処理が終わったら「ログインしているかどうか」に関わらず callback で渡された関数を実行
			[eval func=$callback]
		[/]

	[/switch]
[/showoverlay]

[unlocksnapshot]

; タイトルに戻る
[if o2_exp="o2ui.tmp.backToTitleFromScenario == true"]
	[o2ui_title_close clear=black]
	[o2ui_title_show clear_callstack=true]
[endif]

; ここで実際にロードする
[if o2_exp="!isNaN(o2ui.tmp.loadplace)"]
	[o2ui_reset_load clear=black place=&o2ui.tmp.loadplace]
[endif]

[rclick call=true storage=o2ui_macro.ks target=*showMenu enabled=true]
[history enabled=true]

[return]