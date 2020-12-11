; Macro =========================
@macro name=textBoxHide
[position visible=false layer=message0 page=fore]
@endmacro

; Script ========================
[textBoxHide]
[position visible=false]

[image storage=Bg03 left=0 top=0 page=fore layer=base]
[image storage=unityChan01 left=600 top=170 page=fore layer=0]

;namebox
[current layer=message1 page=fore]
[position visible=true margint=0 marginl=10 page=fore color=0xFF0000 layer=message1 opacity=200 width=150 height=30 left=158 top=460]
[defstyle linespacing=0][resetstyle]
[deffont size=20 bold=true][resetfont]
[nowait]
Unity-Chan



;Scenario
[current layer=message0 page=fore]
[position visible=true page=fore layer=message0 opacity=100 width=800 height=150 left=168 top=480 margint=0]
[deffont size=30 color=0xFFFFFF][resetfont]
Hello I'm unity chan![l][r]
[font color=0x00FFFF]Welcome to the First Novel.[p][er]

I'm going to introduce you to some few [r]
basics that you should know![p][er]

[backlay]
[image storage=Misaki01 left=250 top=170 page=back layer=1 fliplr=true]
[current layer=message1 page=back][er]
Misaki
[trans time=1000][wt]