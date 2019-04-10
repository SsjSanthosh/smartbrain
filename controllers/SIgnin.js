const handleSignin=(req,res,db,bcrypt)=>{
    const {email, password }=req.body;
    if(!email || !password){
        return res.status(400).json("Invalid submission")
    }
    let found=false;
   db.select('email','hash').from('login')
   .where('email','=',req.body.email)
   .then(data=>{
    found=true;
    const valid = bcrypt.compareSync(req.body.password,data[0].hash)
    console.log(valid)
    if(valid){
        console.log('cominhere')
        return db.select('*').from("users")
            .where('email','=',req.body.email)
            .then(user => {
                console.log(user)
                res.json(user[0])
            })
            .catch(err=>res.json("cant get user"))
    }
}).catch(err=>{res.json(err)})
// if(!found){
//     res.json("Invalid credentials")
// }
}

module.exports = {
    handleSignin:handleSignin
}