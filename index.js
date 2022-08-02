
const express=require('express')
const app=express();
const path=require('path')
const bodyParser=require('body-parser')


app.use(express.static(path.join(__dirname , 'public')))
app.set('view engine' , 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
//connect mongodb
const {MongoClient}=require('mongodb');
const dotenv=require('dotenv');
const { urlencoded } = require('express');
dotenv.config();

//connect mongodb end



// const databaseName = "firstProject";
// MongoClient.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true }, async function(err , client) {
//     const db=client.db(databaseName)
//     const result=await db.collection("pets").find({species:"cat"}).toArray()
    
    
    // console.log(result)

//     const pets=db.collection("pets")
//     await pets.insertMany([
//         {name:"Rambo " , species:"dog" , age:5},
//         {name:"cat1 " , species:"cat" , age:2}, 
//     ])
       

//    console.log("added multiple animal")
//    client.close()

// })

app.get('/', (req , res) => {
    res.render('form')
})

app.post('/form' , (req ,res) => {

    let name=req.body.name;
    let species=req.body.species;
    let age=req.body.age;


    const data={
        "name":name,
        "species":species,
        "age":age
        }
    
        const databaseName = "firstProject";
MongoClient.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true }, async function(err , client) {
    const db=client.db(databaseName)
    const result=await db.collection("pets").find({species:"cat"}).toArray()
    // console.log(result)

    const pets=db.collection("pets")
   await pets.insertOne(data , (err ,collection)=> {
    if(err) throw err;

    console.log("Collection added" , collection)
   })

})

// return res.redirect('about')
})





const port=(process.env.PORT ||7000)
app.listen(port, () => {
    console.log(`App is listening on port ${port}...`)
})