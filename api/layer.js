module.exports=(req,res)=>{
const{exkey='null'}=req.query
res.status(200).send(`Hello ${exkey}!`)
}