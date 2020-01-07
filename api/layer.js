module.exports=function(req,res){
let obj=JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname,'..')+'/config','utf-8'));
let key=req.query.key.replace(/[^\w]+/ig,'');
res.status(200).send('Key:'+key+':'+obj.ver);
}
