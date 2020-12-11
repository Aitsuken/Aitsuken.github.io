; このファイルは Simple UI を使用した際、実行に必要となる最小限の記述を行なったサンプルになります。
; 必要に応じて書き換えて下さい。

; Simple UI のタイトル画面機能を使用する場合は、一番最初にカレントメッセージレイヤを非表示にします。
[position layer=message0 page=fore visible=false]

;///////////////////////////////////////////////////////////////////////////////
; Simple UI で使用するプラグインを読み込みます。

; ns_assist プラグイン
; 	ノベルスフィアで公開する作品において、
; 	セーブ＆ロード機能を利用する場合に必要となるプラグインです。
[o2_loadplugin module="ns_assist.js"]

; htmloverlay プラグイン
; 	HTML や CSS などを利用して、画面を作成することが出来るプラグインです。
; 	Simple UI ではメニュー画面に利用しています。
[o2_loadplugin module="html_overlay/plugin.js"]

;///////////////////////////////////////////////////////////////////////////////
; Simple UI が提供するマクロを読み込みます。

; Simple UI のメニュー画面に関する機能を読み込みます。
[call storage="o2ui_macro.ks" target=*start]
; Simple UI のタイトル画面に関する機能を読み込みます。
[call storage="o2ui_title.ks" target=*start]
; Simple UI のダイアログに関する機能を読み込みます。
[call storage="o2dialog.ks" target=*start]

;///////////////////////////////////////////////////////////////////////////////
; シナリオで使用するマクロを定義します。
; この [x] は、シナリオの文末で行う処理をまとめたマクロです。
@macro name=x
; クリック待ち
[p]
;　コンテンツの状態を保存します
[o2_savestat]
; カレントメッセージレイヤの内容をリセットします
[er]
@endmacro

;///////////////////////////////////////////////////////////////////////////////
*start
; ノベル起動直後に、novelsphere.jsロゴや、注意事項などを順番に表示します。
[o2ui_slideshow prefix="o2ui_opening_"]

;///////////////////////////////////////////////////////////////////////////////
*title
; タイトル画面の設定を行います。
[o2ui_title storage=first.ks target=*newgame method=universal rule=rule_lefttoright]
; タイトル画面を表示します。
[o2ui_title_show]
[s]

;///////////////////////////////////////////////////////////////////////////////
*newgame
; scenario.ks に移動します。
[jump storage=scenario.ks target=*start]