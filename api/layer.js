/*
--Now.sh|now.json--
{"rewrites":[{"source":"/(.*).panda.user.js","destination":"/api/layer.js?key=$1"}]}
--Now.sh|now.json--
*/
module.exports=function(req,res){
if(!req.query.key){res.status(200).send(null);return;}
let key=req.query.key.replace(/[^\w]+/ig,'');
let obj=JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname,'..')+'/config','utf-8'));
let txt=obj.monkey.replace('`func`',obj.func).replace('`cdn`',obj.cdn).replace('`ver`',obj.ver).replace('`key`',(exkey?'s.setAttribute(\'exkey\',\''+exkey+'\');':'')).replace('`web`','https://'+window.location.hostname+window.location.pathname.replace(/[\/]+$/g,'/'));
res.status(200).send(txt);
}