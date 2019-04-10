

const handleRegister = (req,res,db,bcrypt)=>{
    
    const {email, name,password,id}=req.body;
    console.log("reg log ",email,"pass",password)
    if(!email || !password || !name){
        console.log('check')
        return res.status(400).json("Incorrect submission! Try again.")
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
        trx.insert({
            hash:hash,
            email:email,

        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
           return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            }).then(user=>res.json(user[0]))
            .catch(err=>res.status(400).json(err.detail))
        
        })
        .then(trx.commit)
        .catch(err=>{
            trx.rollback;
            res.json(err.detail)
        })
         
    })
  
}

module.exports ={
    handleRegister:handleRegister
}