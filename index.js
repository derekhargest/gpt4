import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Import fileURLToPath from url module

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the current directory's path

const configuration = new Configuration({
  organization: process.env.ORG_KEY,
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public folder

app.post("/", async (req, res) => {
    const { messages } = req.body;

    console.log(messages);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "You are a chatbot that is an expert on my business, I am a freelande web developer. Ive been creating websites for over 10 years. I work primarily in wordpress and shopify. I have expierence with html, scc, javascript, node.js, react and more. I would like ytou to respond with a short intro paragraph for my website. No longer than a sentence.",
            },
            ...messages,
        ],
    });

    const responseData = {
        completion: completion.data.choices[0].message,
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(responseData));
});
  
  app.get("/", (req, res) => {
	// Serve the index.html file
	res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  
  app.listen(port, () => {
	console.log(`Example app listening at http://0.0.0.0:${port}`);
  });