/*
--Now.sh|now.json--
{"rewrites":[{"source":"/(.*)","destination":"/api/layer.js"}]}
--Now.sh|now.json--
*/
module.exports=function(req,res){
let key=req.url.match(/\/(\w+)\.panda\.user\.js$/i);
let obj=JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname,'..')+'/config','utf-8'));
let txt=obj.monkey.replace(/`func`/g,obj.func).replace(/`node`/g,obj.node).replace(/`ver`/g,obj.ver).replace(/`key`/g,(key?'s.setAttribute(\'exkey\',\''+key[1]+'\');':'')).replace(/`web`/g,obj.node.slice(1,-1).split(',')[0].slice(1,-1));
res.status(200).send(txt);
}