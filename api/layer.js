module.exports=(req,res)=>{
const{key='null'}=req.query
res.status(200).send(`Hello ${key}!`)
}
