;///////////////////////////////////////////////////////////////////////////////
;// novelsphere.js Simple UI タイトルメニュー マクロ
;///////////////////////////////////////////////////////////////////////////////
*start
; 初期設定
[o2_iscript]
	if (typeof o2ui === "undefined"){
		o2.error("Simple UI付属のタイトルメニュー機能を使用する場合は、必ず o2ui_macro.ks を先に読み込んでください")
	}
	o2ui.title = {
		enabled : true,
		layer : "message0",
		storage : undefined,
		target : undefined,
		bg : "titlebg",
		method : "crossfade",
		rule : undefined,
		vague : 64,
		time : 1000,
		bgm : {
			enabled : true,
			storage : "titlebgm",
			loop : true,
			volume : 100
		},
		load : true,
		config : true,
		status : true, // 現在ユーザーがタイトル画面にいるかそうでないか
		button : {
			start : {x:100,y:240},
			load : {x:100,y:360},
			config : {x:100,y:480}
		},
		close : {
			clearImage : "white",
			method : "crossfade",
			rule : undefined,
			vague : 64,
			time : 2000
		}
	};
[o2_endscript]

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_title
/* ------------------------------
	タイトルメニューの各種設定を行います。
	このタグが実行されてもタイトルメニューは表示されません。

	enabled = true / false (true)										// タイトル画面の オン / オフ を設定します。
	storage = storage.ks (現在のファイル)							// 「はじめから」を選んだ場合にジャンプ先のシナリオファイル名を指定します。
	target = *labelname (ファイルの冒頭)								// 「はじめから」を選んだ場合にジャンプ先のラベル名を指定します。

	bg = storage (titlebg)													// タイトル画面の背景画像を指定します。
	method = crossfade / universal (crossfade)			// トランジションの方法を指定します。
	rule = storage (undefined)											// ユニバーサルトランジションのルール画像を指定します。
	vague = integer (64)														// ユニバーサルトランジションに適用するあいまいさを 0 以上の数値で指定します。
	time = integer (1000 ms)												// トランジションにかける時間を指定します。

	bgm = true / false (true)												// タイトル画面でBGMを流すか流さないかを指定します。
	bgm_storage = storage	(titlebgm)								// タイトル画面で流すBGMを指定します。
	loop = true / false	(true)											// タイトル画面で流すBGMをループさせるか指定します。
	volume = integer (100)													// タイトル画面で流すBGMの音量を 0 ~ 100 の間で指定します。

	pos_start_x = integer (100)											// 「はじめから」ボタンの x 位置を指定します。
	pos_start_y = integer (240)											// 「はじめから」ボタンの y 位置を指定します。
	pos_load_x = integer (100)											// 「ロード」ボタンの x 位置を指定します。
	pos_load_y = integer (3600)											// 「ロード」ボタンの y 位置を指定します。
	pos_config_x = integer (100)										// 「設定」ボタンの x 位置を指定します。
	pos_config_y = integer (480)										// 「設定」ボタンの y 位置を指定します。
	load = true / false	(true)											// load メニューの オン / オフ を設定します。
	config = true / false	(true)										// config メニューの オン / オフ を設定します。

------------------------------ */
[o2_iscript]
	o2ui.title.enabled = o2ui.checkOpt( mp.enabled, o2ui.title.enabled );
	o2ui.title.storage = o2ui.checkOpt( mp.storage, o2ui.title.storage );
	o2ui.title.target = o2ui.checkOpt( mp.target, o2ui.title.target );
	o2ui.title.bg = o2ui.checkOpt( mp.bg, o2ui.title.bg );
	o2ui.title.method = o2ui.checkOpt( mp.method, o2ui.title.method );
	o2ui.title.rule = o2ui.checkOpt( mp.rule, o2ui.title.rule );
	o2ui.title.vague = o2ui.checkOpt( mp.vague, o2ui.title.vague );
	o2ui.title.time = o2ui.checkOpt( mp.time, o2ui.title.time );
	o2ui.title.bgm.enabled = o2ui.checkOpt( mp.bgm, o2ui.title.bgm.enabled );
	o2ui.title.bgm.storage = o2ui.checkOpt( mp.bgm_storage, o2ui.title.bgm.storage );
	o2ui.title.bgm.loop = o2ui.checkOpt( mp.loop, o2ui.title.bgm.loop );
	o2ui.title.bgm.volume = o2ui.checkOpt( mp.volume, o2ui.title.bgm.volume );
	o2ui.title.button.start.x = o2ui.checkOpt( mp.pos_start_x, o2ui.title.button.start.x );
	o2ui.title.button.start.y = o2ui.checkOpt( mp.pos_start_y, o2ui.title.button.start.y );
	o2ui.title.button.load.x = o2ui.checkOpt( mp.pos_load_x, o2ui.title.button.load.x );
	o2ui.title.button.load.y = o2ui.checkOpt( mp.pos_load_y, o2ui.title.button.load.y );
	o2ui.title.button.config.x = o2ui.checkOpt( mp.pos_config_x, o2ui.title.button.config.x );
	o2ui.title.button.config.y = o2ui.checkOpt( mp.pos_config_y, o2ui.title.button.config.y );
	o2ui.title.load = o2ui.checkOpt( mp.load, o2ui.title.load );
	o2ui.title.config = o2ui.checkOpt( mp.config, o2ui.title.config );
[o2_endscript]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_title_show
/* ------------------------------
	タイトルメニューを表示します。

	clear_callstack = true / false (undefined)			// callstack が存在する場合は return で戻ります
------------------------------ */
[if o2_exp="String(o2ui.title.enabled) === 'true'"]
	[eval o2_exp="o2ui.tmp.backToTitleFromScenario = false;"]
	[return storage=o2ui_title.ks target=*showTitleMenu o2_cond="mp.clear_callstack"]
	[jump storage=o2ui_title.ks target=*showTitleMenu]
[else]
[eval o2_exp="o2.warn('【o2ui_title_show】 [o2ui_title] の enabled 属性が false のため、実行は無視されました。')"]
[endif]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2ui_title_close
/* ------------------------------
	タイトルメニューを非表示にします。
	タグ実行の度に属性を記述しないとデフォルト値が設定されます。

	clear = black / white (white)										// 非表示にする際の遷移画像を指定します。実際に読み込まれるのは、ここで指定した名前の前に'o2ui_'という接頭辞がついたファイルです。
	method = crossfade / universal (crossfade)				// トランジションの方法を指定します。
	rule = storage (undefined)											// ユニバーサルトランジションのルール画像を指定します。
	vague = integer (64)														// ユニバーサルトランジションに適用するあいまいさを 0 以上の数値で指定します。
	time = integer (2000 ms)												// トランジションにかける時間を指定します。
------------------------------ */
[if o2_exp="String(o2ui.title.enabled) === 'true'"]
	[o2_iscript]
		o2ui.title.close.clearImage = o2ui.checkOpt( mp.clear, "white" );
		o2ui.title.close.method = o2ui.checkOpt( mp.method, "crossfade" );
		o2ui.title.close.rule = o2ui.checkOpt( mp.rule, undefined );
		o2ui.title.close.vague = o2ui.checkOpt( mp.vague, 64 );
		o2ui.title.close.time = o2ui.checkOpt( mp.time, 2000 );
	[o2_endscript]

	[fadeoutbgm time=&o2ui.title.close.time]
	[foreach from=0 to=&o2.se.length-1 (num)->]
		[fadeoutse buf=$num time=&o2ui.title.close.time]
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

	[image storage=&"o2ui_"+o2ui.title.close.clearImage layer=base page=back]
	[trans method=&o2ui.title.close.method time=&o2ui.title.close.time rule=&o2ui.title.close.rule vague=&o2ui.title.close.vague o2_cond=o2ui.title.close.method=='universal']
	[trans method=crossfade time=&o2ui.title.close.time o2_cond=o2ui.title.close.method!='universal']
	[o2_iscript]
		 if(o2ui.title.close.method!='crossfade')&&(o2ui.title.close.method!='universal'){
		 	o2.warn("【o2ui_title_close】method属性の指定が間違っているため、crossfadeが実行されました")
		 }
	[o2_endscript]
	[wt]
	[wb]
	[foreach from=0 to=&o2.se.length-1 (num)->]
		[wf buf=$num]
	[/foreach]

	[current layer=&o2ui.tmp.currentMessageLayer]
[else]
[eval o2_exp="o2.warn('【o2ui_title_close】 [o2ui_title] の enabled 属性が false のため、実行は無視されました。')"]
[endif]
@endmacro

[return]

;///////////////////////////////////////////////////////////////////////////////
;// タイトル画面を開きます
;///////////////////////////////////////////////////////////////////////////////
*showTitleMenu
; fの中身を初期化
[clearvar]

[history enabled=false]
[rclick call=true storage=o2ui_macro.ks target=*showMenu enabled=false]

[backlay]
[image storage=&o2ui.title.bg layer=base page=back]
[trans method=&o2ui.title.method time=&o2ui.title.time rule=&o2ui.title.rule vague=&o2ui.title.vague o2_cond=o2ui.title.method=='universal']
[trans method=crossfade time=&o2ui.title.time o2_cond=o2ui.title.method!='universal']
[o2_iscript]
	 if(o2ui.title.method!='crossfade')&&(o2ui.title.method!='universal'){
	 	o2.warn("【o2ui_title_close】method属性の指定が間違っているため、crossfadeが実行されました")
	 }
[o2_endscript]
[wt]

[bgmopt volume=&o2ui.title.bgm.volume]
[playbgm storage=&o2ui.title.bgm.storage loop=&o2ui.title.bgm.loop o2_cond="o2ui.title.bgm.enabled"]

[o2_iscript]
	o2ui.title.status = true;
	o2ui.title.layer = o2ui.button.checkCurrentLayer();
[o2_endscript]
[position layer=&o2ui.title.layer page=back visible=true opacity=0 top=0 left=0 width=&config.scWidth height=&config.scHeight margint=0 marginr=0 marginb=0 marginl=0]
[position layer=&o2ui.title.layer page=fore visible=true opacity=0 top=0 left=0 width=&config.scWidth height=&config.scHeight margint=0 marginr=0 marginb=0 marginl=0]

; ボタンを描画
*createButtons
[history enabled=false]
[rclick call=true storage=o2ui_macro.ks target=*showMenu enabled=false]

[backlay]
[current layer=&o2ui.title.layer page=back]
[er]

[locate x=&o2ui.title.button.start.x y=&o2ui.title.button.start.y]
[button graphic=o2ui_title_btn_startgame storage=o2ui_title.ks target=*startgame]

[locate x=&o2ui.title.button.load.x y=&o2ui.title.button.load.y]
[button graphic=o2ui_title_btn_load storage=o2ui_title.ks target=*loadmenu o2_cond="o2ui.title.load==true"]

[locate x=&o2ui.title.button.config.x y=&o2ui.title.button.config.y]
[button graphic=o2ui_title_btn_config storage=o2ui_title.ks target=*configmenu o2_cond="o2ui.title.config==true"]

[trans method=crossfade time=&o2ui.title.time/2]
[wt]

[current layer=&o2ui.tmp.currentMessageLayer]
[s]

;///////////////////////////////////////////////////////////////////////////////
;// はじめから
;///////////////////////////////////////////////////////////////////////////////
*startgame
[o2_iscript]
	o2ui.tmp.backToTitleFromScenario = true;
	o2ui.title.status = false;
[o2_endscript]
[rclick call=true storage=o2ui_macro.ks target=*showMenu enabled=true]
[history enabled=true]
[jump storage=&o2ui.title.storage target=&o2ui.title.target]

;///////////////////////////////////////////////////////////////////////////////
;// ロード
;///////////////////////////////////////////////////////////////////////////////
*loadmenu
[o2_iscript]
	o2ui.tmp.titlesave = o2ui.save;
	o2ui.tmp.titleload = o2ui.load;
	o2ui.tmp.titleconfig = o2ui.config;
	o2ui.tmp.titleautomode = o2ui.automode;
	o2ui.tmp.titleskipmode = o2ui.skipmode;
	o2ui.tmp.titlebacktotitle = o2ui.backToTitle;
[o2_endscript]
[o2ui save=false config=&o2ui.title.config automode=false skipmode=false title=false]
[o2ui_show launch_view=load]
[o2ui save=&o2ui.tmp.titlesave config=&o2ui.tmp.titleconfig automode=&o2ui.tmp.titleautomode skipmode=&o2ui.tmp.titleskipmode title=&o2ui.tmp.titlebacktotitle]
[jump storage=o2ui_title.ks target=*createButtons]

;///////////////////////////////////////////////////////////////////////////////
;// 設定
;///////////////////////////////////////////////////////////////////////////////
*configmenu
[o2_iscript]
	o2ui.tmp.titlesave = o2ui.save;
	o2ui.tmp.titleload = o2ui.load;
	o2ui.tmp.titleconfig = o2ui.config;
	o2ui.tmp.titleautomode = o2ui.automode;
	o2ui.tmp.titleskipmode = o2ui.skipmode;
	o2ui.tmp.titlebacktotitle = o2ui.backToTitle;
[o2_endscript]
[o2ui save=false load=&o2ui.title.load automode=false skipmode=false title=false]
[o2ui_show launch_view=config]
[o2ui save=&o2ui.tmp.titlesave load=&o2ui.tmp.titleload automode=&o2ui.tmp.titleautomode skipmode=&o2ui.tmp.titleskipmode title=&o2ui.tmp.titlebacktotitle]
[jump storage=o2ui_title.ks target=*createButtons]
