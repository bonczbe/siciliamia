import fetch from 'node-fetch';
import * as http from 'http';
import { MongoClient, ServerApiVersion } from 'mongodb';


const uri = "mongodb+srv://sicilia:sicilia@cluster0.5ag7jeq.mongodb.net/test";
    const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    const db = client.db("Cluster0");
    const coll = db.collection("sicilia");

const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type', 'application/JSON');

    var datas={};

    if(req.url=="/refresh"&& req.method=="GET"){
        fetch('https://api.publicapis.org/entries')
            .then((response) => response.json())
            .then((data) => {
                datas = Object.values(data["entries"]).map(item=>({
                    API: item.API,
                    Description: item.Description,
                    Link: item.Link,
                    Category: item.Category
                }));
                res.write(JSON.stringify(datas));
                res.end()
            });

    }else if( req.url=="/data"&&req.method=="GET"){

    }
});

server.listen(3008,'localhost',()=>{
    console.log('listening on http://localhost');
});