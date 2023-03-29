import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Import fileURLToPath from url module

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
			"Youre a wise yogi in india. you have studied with all of the great minds on meditation and have read all of the books on meditation you can. I am going to ask you pointed questions about the nature of the warld and conciousness and i want you to respond to me like a wise yogi in the buddhist religion.",
		},
		...messages,
	  ],
	});
	res.json({
	  completion: completion.data.choices[0].message,
	});
  });
  
  app.get("/", (req, res) => {
	// Serve the index.html file
	res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  
  app.listen(port, () => {
	console.log(`Example app listening at http://0.0.0.0:${port}`);
  });