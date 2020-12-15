; Macro =========================
@macro name=textBoxHide
[layopt visible=false layer=message0 page=fore]
@endmacro

@macro name=nameBoxHide
[layopt visible=false layer=message1 page=fore]
@endmacro

@macro name=loadBg
[image storage=%fileName left=0 top=0 page=%page|back layer=base]
@endmacro

@macro name=loadCharLeft
[backlay]
[image storage=%fileName left=250 top=170 page=back layer=1 fliplr=true]
[trans time=2000]
[wt]
@endmacro

@macro name=loadCharRight
[backlay]
[image storage=%fileName left=600 top=170 page=back layer=0]
[trans time=2000]
[wt]
@endmacro

@macro name=initNameBox
[current layer=message1 page=fore]
[defstyle linespacing=0][resetstyle]
[deffont size=20 bold=true][resetfont]
[nowait]
@endmacro

@macro name=displayNameBox
[er]
[current layer=message1 page=fore]
[position visible=true margint=0 marginl=10 page=fore color=0xFF0000 layer=message1 opacity=200 width=150 height=30 left=158 top=460]
@endmacro

@macro name=initTextBox
[current layer=message0 page=fore]
[deffont size=30 color=0xFFFFFF][resetfont]
@endmacro

@macro name=displayTextBox
[current layer=message0 page=fore]
[position visible=true page=fore layer=message0 opacity=100 width=800 height=150 left=168 top=480 margint=0]
@endmacro

@macro name=x
[l][r]
@endmacro

@macro name=y 
[p][er]
@endmacro
; Script ========================
[textBoxHide][initNameBox][initTextBox]

[loadBg fileName=Bg03 page=fore]
[LoadCharRight fileName=unityChan01]

[displayNameBox]
Unity-Chan



;Scenario
[displayTextBox]
Hello I'm Unity-chan![x]
Welcome to the First Novel.[y]

I'm going to introduce you to some few [r]
basics that you should know![y]

[loadCharLeft fileName=Misaki01]
[displayNameBox]
Misaki


