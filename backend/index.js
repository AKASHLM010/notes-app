const express = require("express")
//db connect
const { Client } = require("pg")
const cors = require("cors");

const app = express()
const port = 4500

app.use(express.json()); //middleware to extract info from req,body
app.use(cors());

async function getClient(){
    const client = new Client("postgresql://Notes_owner:1xjHmpkvl3ZX@ep-square-math-a18bnf3o.ap-southeast-1.aws.neon.tech/Notes?sslmode=require");
    await client.connect();

    return client;
}

app.get("/notes" , async (req, res)=> {
    const client = await getClient();

    const selectQuery = "select id,title,content from notes"
    const response = await client.query(selectQuery);

    return res.json({
        data: response.rows
});
});

app.post("/add", async (req,res)=>{
    const notes = req.body;
    const client = await getClient();
    addNoteQuery = "insert into notes(id ,  title , content) values($1,$2,$3)"
    values = [notes.id , notes.title , notes.content]

    await client.query(addNoteQuery , values);
    
    return res.json({
        msg: "note added",
    });
});


app.listen(port ,()=>{
console.log(`App listening on port ${port}`)
});