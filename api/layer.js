/*
--Now.sh|now.json--
{"rewrites":[{"source":"/(.*)","destination":"/api/layer.js?$1"}]}
--Now.sh|now.json--
*/
module.exports=function(req,res){
console.log(window.location.search);
console.log(window.location);
console.log(window);

console.log(req.query);return;

let key=req.query?req.query.replace(/[^\w]+/ig,''):null;
let obj=JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname,'..')+'/config','utf-8'));
let txt=obj.monkey.replace('`func`',obj.func).replace('`cdn`',obj.cdn).replace('`ver`',obj.ver).replace('`key`',(key?'s.setAttribute(\'exkey\',\''+key+'\');':'')).replace('`web`','https://'+window.location.hostname+window.location.pathname.replace(/[\/]+$/g,'/'));
res.status(200).send(txt);
}