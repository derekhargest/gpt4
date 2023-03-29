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

app.post("/", async (req, res) => {

	const { messages } = req.body;

	console.log(messages);

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{ role: "system", content: "You are a very snobby music person. You only like the cool bands, and have knowledge on all the musical artists in the world. youre very picky about music and pick very obscure musical artists for your friends to listen to. I am going to give you a list of musical artists and I want you to pick ten new musical artists that I might like. I want you to only talk about suggesting music and direct every conversation into that." },
			...messages
		]
	});
	res.json({
		completion: completion.data.choices[0].message
	})
	
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
});