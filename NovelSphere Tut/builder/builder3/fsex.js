(function(){var c=require("fs"),h=require("path");exports.readdirRSync=function(g){var a=function(e){var d=[];c.readdirSync(e).forEach(function(b){var b=e+"/"+b,f=c.statSync(b);f&&f.isDirectory()?d=d.concat(a(b)):d.push(b)});return d};return a(g)};exports.copy=function(g,a,e){c.readFile(g,function(d,b){c.writeFile(a,b,e)})};exports.copySync=function(g,a){try{c.writeFileSync(a,c.readFileSync(g))}catch(e){throw e;}};exports.copyRSync=function(g,a){var e=function(d,b){var f=c.existsSync(d),a=f&&c.statSync(d),
a=f&&a.isDirectory();f&&a?(c.mkdirSync(b),c.readdirSync(d).forEach(function(a){e(h.join(d,a),h.join(b,a))})):exports.copySync(d,b)};return e(g,a)};exports.rmdirRSync=function(g){var a=function(e){for(var d=c.readdirSync(e),b=0;b<d.length;b++){var f=h.join(e,d[b]),g=c.statSync(f);if(!("."==f||".."==f))if(g.isDirectory())a(f);else try{c.unlinkSync(f)}catch(i){throw i;}}try{c.rmdirSync(e)}catch(j){throw j;}};return a(g)}})();
