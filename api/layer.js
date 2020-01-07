let obj=require('fs').readFileSync(require('path').resolve(__dirname,'..')+'/config','utf-8');
console.log(JSON.stringify(obj));
res.status(200).send('Key:'+key+':'+obj.ver);
module.exports=function(req,res){
let key=req.query.key.replace(/[^\w]+/ig,'');
}
