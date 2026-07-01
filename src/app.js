const express = require("express");
const app = express();
const postModel = require("./db/model");
const upload = require("./storage/multer");

const fileUpload = require("./storage/storage.image");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/posts",async (req,res)=>{
    const data = await postModel.find();
    res.json(data);
})

app.post("/upload", upload.single("image"), async (req,res)=>{
    const body = req.body;

    if(!req.file){
        return res.status(400).json({error:"No file uploaded"});
    }

    if(!body.caption){
        return res.status(400).json({error:"Caption is required"});
    }
    
    const response = await fileUpload(req.file.buffer, req.file.originalname);

    const data = await postModel.create({
        image : response.url,
        caption : body.caption,
    });
    console.log("Data saved:", data);
    res.json(data);
})


app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const data = await postModel.findByIdAndDelete(id);
    res.status(200).json({
        data : data,
        Message : "This data has been deleted Successfuly"
    })
})

module.exports = app;
