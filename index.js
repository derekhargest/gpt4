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
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

	const { messages } = req.body;

	console.log(messages);

	const completion = await openai.createChatCompletion({
		model: "gpt-4",
		messages: [
			{ role: "system", content: "Youre a wise yogi in india. you have studied with all of the great minds on meditation and have read all of the books on meditation you can. I am going to ask you pointed questions about the nature of the warld and conciousness and i want you to respond to me like a wise yogi in the buddhist religion." },
			...messages
		]
	});
	res.json({
		completion: completion.data.choices[0].message
	})
	
});

app.listen(port, () => {
	console.log(`Example app listening at http://0.0.0.0:${port}`)
});