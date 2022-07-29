import fetch from 'node-fetch';
import * as http from 'http';
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://sicilia:sicilia@cluster0.5ag7jeq.mongodb.net/test"
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 })
const db = client.db("Cluster0")
const coll = db.collection("sicilia")

const server = http.createServer(async (req,res)=>{
    res.setHeader('Content-Type', 'application/JSON');
    res.setHeader("Allow-Cross-Origin", "*");
    if(req.url=="/refresh"&& req.method=="GET"){
        coll.deleteMany( { } )
        fetch('https://api.publicapis.org/entries')
            .then((response) => response.json())
            .then(async (data) => {
                data = Object.values(data["entries"]).map(item=>({
                    API: item.API,
                    Description: item.Description,
                    Link: item.Link,
                    Category: item.Category
                }));
                try{
                    await coll.insertMany(data)
                    res.write(JSON.stringify("Updated entries"))
                }catch(e){
                    res.write(JSON.stringify("Updated failed"))
                }
                res.end()
            }).catch((error)=>console.log(error));

    }else if( req.url=="/data"&&req.method=="GET"){
        try{
            const data = await coll.aggregate([{$sort:{API : 1}}]).toArray();
            res.write(await JSON.stringify(data))
            res.end()
        }catch(e){

        }
    }else if( req.url.includes('/api?filter=')&&req.method=="POST"){
        let url = req.url.split('=');

        try{
            const data = await coll.aggregate([{$match:{API : url[1]}}]).toArray();
            res.write(await JSON.stringify(data))
            res.end()
        }catch(e){
            console.log(req.headers.filter)
        }
    }else{
        res.end()
    }
});

server.listen(3008,'localhost',()=>{
    console.log('listening on http://localhost')
});