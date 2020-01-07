/*
--Now.sh|now.json--
{"rewrites":[{"source":"/(.*)","destination":"/api/layer.js?$1"}]}
--Now.sh|now.json--
*/
module.exports=function(req,res){
let qry=Object.keys(req.query)[0].match(/^(\w+)\.panda\.user\.js$/i);
let key=qry?qry[1]:null;
let obj=JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname,'..')+'/config','utf-8'));
let txt=obj.monkey.replace('`func`',obj.func).replace('`cdn`',obj.cdn).replace('`ver`',obj.ver).replace('`key`',(key?'s.setAttribute(\'exkey\',\''+key+'\');':'')).replace('`web`','https://'+window.location.hostname+window.location.pathname.replace(/[\/]+$/g,'/'));
res.status(200).send(txt);
}