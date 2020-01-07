let obj=require('fs').readFileSync(path.resolve(__dirname,'..')+'/config','utf-8');
module.exports=function(req,res){
let key=req.query.key.replace(/[^\w]+/ig,'');
res.status(200).send('Key:'+key+':'+obj.ver);
}
