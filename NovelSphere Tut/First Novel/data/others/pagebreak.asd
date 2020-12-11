@loadcell
@loop
;
@macro name=copyone
@copy dx=0 dy=0 sx=%x sy=0 sw=35 sh=35
@wait time=50
@endmacro
;
*start
@copyone x=0
@copyone x=24
@copyone x=48
@copyone x=72
@copyone x=96
@copyone x=120
@copyone x=144
@copyone x=168
@copyone x=192
@copyone x=216
@copyone x=240
@copyone x=264
@copyone x=288
@copyone x=312
@copyone x=336
@copyone x=360
@copyone x=384
@copyone x=408
@copyone x=432
@copyone x=456
@copyone x=480
@copyone x=504
@copyone x=528
@copyone x=552
;
@jump target=*start
