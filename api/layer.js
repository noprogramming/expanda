module.exports=(req,res)=>{
console.log(req);
const{key='null'}=req.query
res.status(200).send(`Hello ${key}!`)
}
