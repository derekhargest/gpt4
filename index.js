import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
	organization: "org-Rqgad24MLeDu39gJKgZpH0XJ",
	apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

aapp.post("/", async (req, res) => {
	const { messages } = req.body;
  
	console.log(messages);
  
	const completion = await openai.createChatCompletion({
	  model: "davinci",
	  prompt: "Hello, I am a chatbot. How can I assist you today?",
	  temperature: 0.5,
	  maxTokens: 1024,
	  messages: [
		{ role: "system", content: "Hello, I am a chatbot. How can I assist you today?" },
		...messages,
	  ],
	});
  
	let content = completion.data.choices[0].text.trim();
	let isCode = false;
  
	// Check if response starts and ends with backticks (indicating code)
	if (content.startsWith("```") && content.endsWith("```")) {
	  content = content.slice(3, -3);
	  isCode = true;
	}
  
	res.json({
	  completion: {
		content: content,
		isCode: isCode,
	  },
	});
  });

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});