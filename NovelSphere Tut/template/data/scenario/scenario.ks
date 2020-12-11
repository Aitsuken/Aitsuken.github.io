*start
; このファイルに、シナリオを書いてください。
; 現在は Simple UI のサンプルが記述されていますので、
; 必要に応じて削除してください。

; first.ks の *title ラベルで表示したタイトル画面を非表示にします。
[o2ui_title_close method=universal rule=rule_ichimatsu]

; first.ks のファイル冒頭で非表示にしたメッセージレイヤを表示します。
[position layer=message0 page=fore left=0 top=440 marginl=60 marginr=60 margint=10 opacity=200 visible=true]

; メニュー画面を表示する機能をもったシステムボタンを、画面上に作成します。
[o2ui_button]

こんにちは。[x]

Simple UI を使うと、例えば……[p]

; アラートダイアログを表示するサンプルです。
; OKボタンを押すと、tf.dialog という一時変数に「ボタンを押した」という状態が代入されます。
[o2dialog val="tf.dialog" text="ダイアログのサンプルです。"]

ダイアログの表示などができます。[x]

; 確認ダイアログを表示するサンプルです。
; 「はい」か「いいえ」いずれかのボタンを押すと、tf.dialog という一時変数に「どちらのボタンを押したか」が代入されます。
[o2dialog val="tf.dialog" confirm=true text="「はい」か「いいえ」を<br>選んでください。"]

; 条件分岐を行います。
[if o2_exp="tf.dialog == true"]
	; tf.dialog が true （＝ はい が選択された）の場合
	はいが選択されました。[x]
[else]
	; tf.dialog が false （＝ いいえ が選択された）の場合
	いいえが選択されました。[x]
[endif]

メニュー画面を表示することもできます。[x]

; Simple UI のメニュー画面をシナリオ側から表示します。
[o2ui_show]

メニュー画面が表示されたでしょうか。[x]

最初からセーブ画面を表示することもできます。[x]

; lanch_view 属性を指定することで「セーブ画面を表示する」といった使い方もできます。
[o2ui_show launch_view="save"]

他にも色々なカスタマイズが可能です。[x]

Simple UIが提供する機能の詳細は、[r]
> [font color="0x5555ff"]
[link o2_url="https://developer.novelsphere.jp/doc/o2doc2/content/ref_o2ui.html"]novelsphere.js documentation[endlink]
[resetfont][r]
を参照してください。

[s]