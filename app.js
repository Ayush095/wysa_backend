require("dotenv").config();
const User = require("./models/user");
const Content = require("./models/content");

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");

const db = require("./config/mongoose");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/", async(req, res)=> {
    res.send({"Message": "This is working"});
})

app.get('/page/:num', async (req, res) => {
    const content = await Content.findOne({pageNumber: req.params.num});
    try {
        if (content) {
            res.status(201).json({
                pageNumber: content.pageNumber,
                pageContent: content.pageContent,
            });
        } else {
            res.status(401).json({ "Message": "Not able to fetch data" });
        }
    } catch (err) {
        res.status(401).json({ "Message": "Not able to fetch data" });
    }
});


app.post("/user", async (req, res) => {
    const response = await User.findOne({email: req.body.email});
    if(response){
        if(response.password==req.body.password){
            res.status(201).json({ "Message": "You are login successfully"});
        }else {
            res.status(401).json({ "Message": "You are already register, type right passwword"});
        }
    }else {
        try {
            await User.create({
                email: req.body.email,
                password: req.body.password,
                sleepProblem: "",
                bedTime: "",
                getUpTime: "",
            })
            res.status(201).json({ "Message": "Successfully insert the data" });
        } catch (err) {
            console.log(err)
            res.status(401).json({ "Message": "Not able to post data" });
        }
    }
});

app.post("/user/page/:num", async (req, res) => {
    const page = req.params.num;
    try {
        if (page == '1') {
            await User.updateOne({ email: req.body.email }, { $set: { sleepProblem: req.body.sleepProblem } });
            res.status(201).json({ "Message": "Successfully insert the data" });
        } else if (page == '2') {
            await User.updateOne({ email: req.body.email }, { $set: { bedTime: req.body.bedTime } });
            res.status(201).json({ "Message": "Successfully insert the data" });
        } else if (page == '3') {
            await User.updateOne({ email: req.body.email }, { $set: { getUpTime: req.body.getUpTime } });
            res.status(201).json({ "Message": "Successfully insert the data" });
        }
    } catch (err) {
        res.status(401).json({ "Message": "Not able to post data" });
    }
});

app.post("/insert-data/Page/:id", async (req, res) => {
    try {
        await Content.create({
            pageContent: req.body.pageContent,
            pageNumber: req.params.id,
        })
        res.status(201).json({ "Message": "Successfully insert the data" });
    } catch (err) {
        console.log(err)
        res.status(401).json({ "Message": "Not able to post data" });
    }
})

app.listen(port, () => {
    console.log(`Server is running successfully on ${port}`);
});