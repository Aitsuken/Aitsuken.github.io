;///////////////////////////////////////////////////////////////////////////////
;// novelsphere.js Simple UI ダイアログマクロ
;///////////////////////////////////////////////////////////////////////////////
*start
[o2_iscript]
	o2dialog = {
		eval : function(a,b){
			eval(a+"=b")
		},
		confirm : false,
		text : "テキストが入力されていません",
		tmp : {}
	};
[o2_endscript]

;///////////////////////////////////////////////////////////////////////////////
@macro name=o2dialog
/* ------------------------------
	メッセージダイアログを表示します。

	val = 変数名												// ダイアログで「はい」「いいえ」「OK」のどのボタンを押したかが、指定した変数に代入されます
	confirm = true / false (false)		// confirm（はい・いいえ）のダイアログボックスにするか否かを指定します。falseを選ぶとOKダイアログになります
	text = メッセージ 										// メッセージを指定します。複数行に渡る場合は'<br>'をはさみます
------------------------------ */
[o2_iscript]
	o2dialog.confirm = typeof mp.confirm === 'undefined' ? 'false' : mp.confirm;
	if (typeof mp.val === 'undefined'){
		mp.val = "o2dialog.tmp.val";
		if (String(o2dialog.confirm) === 'true'){
			o2.error('【o2dialog】 confirm属性がtrueの時はval属性が必須です')
		}else{
			o2.warn('【o2dialog】 val属性が指定されていません')
		}
	}
	if (typeof mp.text === 'undefined'){
		o2.warn('【o2dialog】 text属性が指定されていません')
	}
	o2dialog.text =  typeof mp.text === 'undefined' ? o2dialog.text : mp.text;
	o2dialog.tmp.bgmgvolume = sf.__system.bgmGVolume;
	o2dialog.tmp.segvolume = sf.__system.seGVolume;
	o2.setBgmGVolume(sf.__system.bgmGVolume/2);
	o2.setSeGVolume(sf.__system.seGVolume/2);
[o2_endscript]
[eval o2_exp="mp.val"]
[showoverlay filename=o2dialog.html event=fullscreen (answer)->]
	[switch val=$answer ->]
		[case val=yes ->]
			[o2_iscript]
				o2dialog.eval(mp.val,true);
				console.info("【o2dialog】 はい が選択されました。",mp.val+" = true");
			[o2_endscript]
			[close]
		[/]
		[case val=no ->]
			[o2_iscript]
				o2dialog.eval(mp.val,false);
				console.info("【o2dialog】 いいえ が選択されました。",mp.val+" = false");
			[o2_endscript]
			[close]
		[/]
		[case val=ok ->]
			[o2_iscript]
				o2dialog.eval(mp.val,true);
				console.info("【o2dialog】 OK が選択されました。",mp.val+" = true");
			[o2_endscript]
			[close]
		[/]
	[/]
[/showoverlay]
[o2_iscript]
	o2.setBgmGVolume(o2dialog.tmp.bgmgvolume);
	o2.setSeGVolume(o2dialog.tmp.segvolume);
[o2_endscript]
@endmacro

[return]
