module.exports=(req,res)=>{
const{exkey}=req.query
res.status(200).send(`Hello ${exkey}!`)
}