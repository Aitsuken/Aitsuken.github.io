var util=require("util"),fs=require("fs"),path=require("path"),config=require("../config.js").config,command=require("commander");command.option("-l, --legacy","Legacy\u30e2\u30fc\u30c9\u3092\u4f7f\u3046").option("-r, --release","Release\u30e2\u30fc\u30c9\u3092\u4f7f\u3046").parse(process.argv);var Tag=function(){this.name=void 0;this.args={};this.charNumber=this.lineNumber=void 0;this.callbackArgs=[];this.isClose=this.isOpen=!1};
Tag.prototype.toJSON=function(){var d=[];d[config.scriptTagNameKey]=this.name;d[config.scriptTagArgsKey]=Object.keys(this.args).length?this.args:0;if(!command.release||this.isOpen)d[config.scriptTagCallbackArgsKey]=this.isOpen?this.callbackArgs:0;command.release||(d[config.scriptTagLineKey]=this.lineNumber,d[config.scriptTagCharKey]=this.charNumber);this.isClose&&(d[config.scriptTagNameKey]="/");for(var f=d.length-1;0<=f;f--){var h=d[f];if(0===h||null==h)d.splice(f,1);else break}return d};
var TagBuilder=function(d){this.currentTag=void 0;var f=0,h=void 0,e=void 0,a=[];this.startTag=function(a,b){if(void 0!=this.currentTag)throw"\u3059\u3067\u306b\u30bf\u30b0\u5b9a\u7fa9\u4e2d\u3067\u3059\u3002";this.currentTag=new Tag;this.currentTag.lineNumber=a;this.currentTag.charNumber=b;f=0};this.appendTagName=function(a){if(!this.currentTag)throw"\u30bf\u30b0\u306e\u5916\u3067\u30bf\u30b0\u540d\u524d\u3092\u767b\u9332\u3057\u3088\u3046\u3068\u3057\u3066\u308b";if(1<f)throw"\u4eca\u306f\u30bf\u30b0\u540d\u3092\u6307\u5b9a\u3067\u304d\u306a\u3044\u3002";
f=1;this.currentTag.name=void 0===this.currentTag.name?a:this.currentTag.name+a};this.appendAttrName=function(a){if(!this.currentTag)throw"\u30bf\u30b0\u5916\u3067\u5c5e\u6027\u540d\u3092\u767b\u9332\u3057\u3088\u3046\u3068\u3057\u3066\u3044\u307e\u3059";if(this.currentTag.isClose)throw"\u9589\u3058\u30bf\u30b0\u306b\u5c5e\u6027\u3092\u5165\u308c\u3066\u306f\u3044\u3051\u307e\u305b\u3093\u3002";if(3===f){if(e)throw"\u5c5e\u6027\u306e\u5024\u3092\u5165\u308c\u305f\u5f8c\u306b\u5c5e\u6027\u540d\u3092\u5909\u3048\u3088\u3046\u3068\u3057\u3066\u3044\u307e\u3059";
this.endAttrValue()}f=2;h||(h="");h+=a};this.endAttrName=function(){f=3};this.appendAttrValue=function(a){if(!this.currentTag)throw"\u30bf\u30b0\u5916\u3067\u5c5e\u6027\u5024\u3092\u767b\u9332\u3057\u3088\u3046\u3068\u3057\u3066\u3044\u307e\u3059";f=3;e||(e="");e+=a};this.endAttrValue=function(){if("undefined"===typeof h)throw"\u5c5e\u6027\u540d\u3092\u6307\u5b9a\u3057\u3066\u3044\u307e\u305b\u3093";"undefined"===typeof e&&(e=null);this.currentTag.args[h]=e;e=h=void 0;f=0};this.appendCallbackArgs=
function(a){4===f?this.currentTag.callbackArgs[this.currentTag.callbackArgs.length-1]+=a:(f=4,this.currentTag.callbackArgs.push(a))};this.endCallbackArgs=function(){f=5};this.markAsOpenTag=function(){this.currentTag.isOpen=!0};this.markAsCloseTag=function(){this.currentTag.isClose=!0};this.closeTag=function(){if(!this.currentTag)throw"\u30bf\u30b0\u4e2d\u3067\u306f\u3042\u308a\u307e\u305b\u3093";(3==f||2==f)&&this.endAttrValue();if(!this.currentTag.name&&!this.currentTag.isClose)throw"\u30bf\u30b0\u540d\u304c\u3042\u308a\u307e\u305b\u3093";
if(this.currentTag.isOpen&&this.currentTag.isClose)throw"close tag\u306bcallback\u306f\u6307\u5b9a\u3067\u304d\u306a\u3044\u3067\u3059";if(this.currentTag.isOpen)a.push(this.currentTag.name);else if(this.currentTag.isClose){var e=a.pop();if(!e)throw"\u3053\u3053\u3067\u9589\u3058\u3089\u308c\u308b\u30bf\u30b0\u304c\u306a\u3044\u3067\u3059";if(this.currentTag.name&&e!==this.currentTag.name)throw"\u3053\u3053\u306f"+e+"\u3092\u9589\u3058\u308b\u3079\u304d\u3067\u3059\u304c\u3001"+this.currentTag.name+
"\u3092\u9589\u3058\u3066\u307e\u3059";this.currentTag.name=e}for(var b in this.currentTag.args)null===this.currentTag.args[b]&&(this.currentTag.args[b]="true");this.currentTag.name=this.currentTag.name.toLowerCase();d.push(this.currentTag);this.resetTag()};this.currentTagName=function(){return!this.currentTag?void 0:this.currentTag.name};this.resetTag=function(){this.currentTag=void 0;f=0}},TAG_MODE_NONE=0,TAG_MODE_BRACKET=1,TAG_MODE_AT=2,TAG_MODE_TEXT=3,TAG_MODE_LABEL=4,ATTR_MODE_NONE=0,ATTR_MODE_TAG_NAME=
1,ATTR_MODE_NAME=2,ATTR_MODE_NAME_END=3,ATTR_MODE_VALUE_START=4,ATTR_MODE_NO_QUOTE=5,ATTR_MODE_QUOTE=6,ATTR_MODE_CALLBACK=7,ATTR_MODE_CALLBACK_ARG=8,SYNTAX_MODE_STANDARD=0,SYNTAX_MODE_LEGACY=1,syntaxMode=SYNTAX_MODE_STANDARD;command.legacy&&(syntaxMode=SYNTAX_MODE_LEGACY);var warnings=[],lastLabelName=void 0,lastLabelEmptyCount=void 0;
exports.parse=function(d,f){function h(a,b){for(var c=a+1;c<=b;c++)"\n"==d.charAt(c)?(k++,i=0):i++}var d=d.replace(/\r\n|\r/g,"\n"),d=d+"\n",e=TAG_MODE_NONE,a=ATTR_MODE_NONE,j=[],b=new TagBuilder(j),k=1,i=1;warnings=[];try{for(var g=0;g<d.length;g++)if(65279!=d.charCodeAt(g)){var c=d.charAt(g),l=d.charAt(g+1);"\u301c"==c&&(c="\uff5e");i++;"\n"==c&&(k++,i=0);var p=b.currentTagName();if(a!=ATTR_MODE_QUOTE&&(e==TAG_MODE_AT&&"\n"===c||e==TAG_MODE_BRACKET&&"]"===c)&&p&&p.isOneOf(["iscript","o2_iscript"])||
a!=ATTR_MODE_QUOTE&&"/"==c&&"*"==l){b.resetTag();var e=TAG_MODE_NONE,a=ATTR_MODE_NONE,u=d.substr(g),q,r;switch(p){case "iscript":q=/[@|\[][\t|\s]*endscript[\t|\s]*]?/;r="[ERROR100] iscript\u30bf\u30b0\u306b\u5bfe\u5fdc\u3059\u308bendscript\u30bf\u30b0\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093";break;case "o2_iscript":q=/[@|\[][\t|\s]*o2_endscript[\t|\s]*]?/;r="[ERROR101] o2_iscript\u306b\u5bfe\u5fdc\u3059\u308bo2_endscript\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093";break;default:q=/\*\//,
r="[ERROR102] \u8907\u6570\u884c\u30b3\u30e1\u30f3\u30c8\u304c\u9589\u3058\u3089\u308c\u3066\u3044\u307e\u305b\u3093"}var m=u.match(q);if(!m||!m.length)throw r;if("o2_iscript"==p){var v=d.substring(g+1,m.index+g);b.startTag(k,i);b.appendTagName("o2_iscript");b.appendAttrName("o2_exp");b.appendAttrValue(v);b.closeTag()}var t=g+m.index+m[0].length-1;h(g,t);g=t}else{if(";"===c&&function(){if(syntaxMode==SYNTAX_MODE_LEGACY){if(0==g)return!0;for(var b=g-1;0<=b;b--){var c=d.charAt(b);if("\n"==c)return!0;
if("\t"!=c)break}}else if(a!=ATTR_MODE_QUOTE)return!0;return!1}()){var n;a:{for(var s=g;s<d.length;s++)if("\n"==d.charAt(s)){n=s;break a}n=-1}if(-1!=n){h(g,n-1);g=n-1;continue}}if(e===TAG_MODE_NONE)if("@"===c)e=TAG_MODE_AT,b.startTag(k,i);else{if("["===c){if("["!=l){e=TAG_MODE_BRACKET;b.startTag(k,i);continue}}else if("*"===c){b.startTag(k,i);e=TAG_MODE_LABEL;b.appendTagName("label");b.appendAttrName("name");continue}if(!c.isOneOf(["\t","\n"])||"["==c&&"["==l)e=TAG_MODE_TEXT,b.startTag(k,i),b.appendTagName("text"),
b.appendAttrName("text"),b.endAttrName(),b.appendAttrValue(c),"["==c&&"["==l&&g++}else if(e===TAG_MODE_TEXT)d.charAt(g+2),"["==c?"["==l?(g++,b.appendAttrValue(c)):(b.closeTag(),e=TAG_MODE_NONE,a=ATTR_MODE_NONE,g--):"\n"==c||"\t"==l?(b.closeTag(),e=TAG_MODE_NONE,a=ATTR_MODE_NONE):b.appendAttrValue(c);else if(e===TAG_MODE_LABEL)if("\n"==c){b.endAttrValue();if(null===b.currentTag.args.name){if(void 0===lastLabelEmptyCount)throw"\u30b7\u30ca\u30ea\u30aa\u306e\u6700\u521d\u306e\u30e9\u30d9\u30eb\u306f\u540d\u524d\u304c\u5fc5\u8981\u3067\u3059\u3002";
lastLabelEmptyCount++;b.currentTag.args.name=lastLabelName+":"+lastLabelEmptyCount}else lastLabelEmptyCount=1,lastLabelName=b.currentTag.args.name;null===b.currentTag.args.caption&&(b.currentTag.args.caption="");b.closeTag();e=TAG_MODE_NONE}else"|"==c?(b.endAttrValue(),b.appendAttrName("caption")):b.appendAttrValue(c);else if(a!=ATTR_MODE_QUOTE&&(e==TAG_MODE_AT&&"\n"===c||e==TAG_MODE_BRACKET&&"]"===c))b.closeTag(),e=TAG_MODE_NONE,a=ATTR_MODE_NONE;else{if(syntaxMode==SYNTAX_MODE_LEGACY&&"\n"==c){if(a==
ATTR_MODE_QUOTE)throw"[ERROR201] KAG3\u4e92\u63db\u6587\u6cd5\u30e2\u30fc\u30c9\u3067\u306f\u30bf\u30b0\u3084\u5024\u306e\u4e2d\u3067\u6539\u884c\u3059\u308b\u3053\u3068\u306f\u3067\u304d\u307e\u305b\u3093";throw"[ERROR200] KAG3\u4e92\u63db\u6587\u6cd5\u30e2\u30fc\u30c9\u3067\u306f\u30bf\u30b0\u306e\u4e2d\u3067\u6539\u884c\u3059\u308b\u3053\u3068\u306f\u3067\u304d\u307e\u305b\u3093";}a===ATTR_MODE_NONE&&!b.currentTagName()&&"/"===c?b.markAsCloseTag():a===ATTR_MODE_NONE&&!b.currentTag.name&&!c.isOneOf([" ",
"\t","\n"])?(a=ATTR_MODE_TAG_NAME,b.appendTagName(c)):a===ATTR_MODE_TAG_NAME?c.isOneOf([" ","\t","\n"])?a=ATTR_MODE_NONE:b.appendTagName(c):a===ATTR_MODE_NONE&&!c.isOneOf([" ","\t","\n","(","-"])?(a=ATTR_MODE_NAME,b.appendAttrName(c)):a===ATTR_MODE_NAME?c.isOneOf([" ","\t","\n"])?a=ATTR_MODE_NAME_END:"="===c?a=ATTR_MODE_VALUE_START:b.appendAttrName(c):a===ATTR_MODE_NAME_END?"="===c?a=ATTR_MODE_VALUE_START:c.isOneOf(["\t"," ","\n"])||(b.endAttrValue(),a=ATTR_MODE_NONE,g--):a===ATTR_MODE_VALUE_START&&
!c.isOneOf([" ","\u3000","\n"])?'"'===c?(a=ATTR_MODE_QUOTE,b.appendAttrValue("")):(a=ATTR_MODE_NO_QUOTE,b.appendAttrValue(c)):a===ATTR_MODE_QUOTE?c.isOneOf(["`"])?(b.appendAttrValue(l),g+=1):c.isOneOf(['"'])?(a=ATTR_MODE_NONE,b.endAttrValue()):b.appendAttrValue(c):a===ATTR_MODE_NO_QUOTE?c.isOneOf([" ","\t","\n"])?(a=ATTR_MODE_NONE,b.endAttrValue()):b.appendAttrValue(c):a===ATTR_MODE_NONE&&c.isOneOf(["-","("])?a=ATTR_MODE_CALLBACK:(a===ATTR_MODE_CALLBACK||a===ATTR_MODE_CALLBACK_ARG)&&!c.isOneOf(",() \n\t->".split(""))?
(a=ATTR_MODE_CALLBACK_ARG,b.appendCallbackArgs(c)):(a===ATTR_MODE_CALLBACK||a===ATTR_MODE_CALLBACK_ARG)&&c.isOneOf([",",")"])?(b.endCallbackArgs(),a=ATTR_MODE_CALLBACK):a===ATTR_MODE_CALLBACK&&">"===c&&(b.markAsOpenTag(),a=ATTR_MODE_NONE)}}}if(a!=ATTR_MODE_NONE)throw"[ERROR103] \u30bf\u30b0\u5185\u306e\u5024\u304c\u7d42\u4e86\u3057\u306a\u3044\u307e\u307e\u30d5\u30a1\u30a4\u30eb\u306e\u7d42\u7aef\u306b\u9054\u3057\u307e\u3057\u305f";if(e!=TAG_MODE_NONE)throw"[ERROR104] \u30bf\u30b0\u304c\u9589\u3058\u306a\u3044\u307e\u307e\u30d5\u30a1\u30a4\u30eb\u306e\u7d42\u7aef\u306b\u9054\u3057\u307e\u3057\u305f";
}catch(w){throw f+" Line:"+k+" Char:"+i+"\n"+w;}return{scripts:j,warnings:warnings}};exports.parseFiles=function(d){for(var f={},h=[],e=0;e<d.length;e++){var a=fs.readFileSync(path.normalize(d[e]),"utf8"),a=exports.parse(a,d[e]),j=path.basename(d[e]);f[j]=a.scripts;for(j=0;j<a.warnings.length;j++)h.push("File: "+d[e]+" "+a.warnings[j])}return{scripts:f,warnings:h}};
exports.configure=function(d){"legacy"in d&&(command.legacy=!!d.legacy);"release"in d&&(command.release=!!d.release);syntaxMode=command.legacy?SYNTAX_MODE_LEGACY:SYNTAX_MODE_STANDARD};exports.main=function(d){d.length||(console.log("Usage: builder.js FILE1 [FILE2 ...]"),process.exit(1));return JSON.stringify(exports.parseFiles(d))};String.prototype.isOneOf=function(d){"string"===typeof d&&(d=[d]);for(var f=0;f<d.length;f++)if(this==d[f])return!0;return!1};
if("undefined"!==typeof module&&require.main===module)try{var result=exports.main(command.args);util.print(result)}catch(e$$11){console.error(e$$11)};
