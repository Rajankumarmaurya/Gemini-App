const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");

app.post("/get", async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI( "AIzaSyAIRWf0tr8CEjeh4g5VexYjsm2wOHgJ-jw" );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
        const result = await model.generateContent(req.body.question);
        console.log(result.response.text());
        res.status(200).json({res:result.response.text()});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error})
    }
});

app.listen(port, () => {
  console.log(`app is listing on ${port}`);
});
