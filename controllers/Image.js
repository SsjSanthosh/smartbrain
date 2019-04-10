const handleImage = (req,res,db)=>{
    const{id}=req.body;
    // let found = false;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        if(entries[0]){
            res.json(entries[0])
        }
        else{
            res.json("Cant find id")
        }
        
    })
    .catch(err=>res.json("Error! id not found"))
    // if(!found){
    //     res.status(404).json('not found');
    // }
}

module.exports = {
    handleImage:handleImage
}