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
                content: "You are a content generation machine with expert marketing knowledge in web development services. You are an expert on my web development services and your goal is to sell my services to potential clients who are agency owners or owners of B to C bustinesses. Here is a copy of my resume: Derek Hargest Web Consultant and Developer Baltimore, MD 443-932-7513 derekhargest@gmail.com Objective An enthusiastic web consultant, with an extensive background in web development, seeks opportunities to work with flourishing B2C clients and agencies to help ease pains associated with building, updating, maintaining, or scaling up e-commerce and lead generation web implementations. Using a componentized approach, I build and maintain websites to work with clients' business models, helping to improve operations for all involved. Experience OCT 2020 - PRESENT Freelance Web Consultant ● Helps and advises growing businesses through the process of building or scaling their eCommerce solutions. ● Consults with agencies through the process of building websites all the way from idea to implementation on a wide range of content management systems. ● Builds and maintains eCommerce and lead-generation websites while helping to streamline operations for B2C clients. JAN 2020 - OCT 2020 Duckpin - Director of Web Services ● Lead a team of talented engineers in creating a wide range of bespoke websites for small to midsize businesses. ● Leveled up development operations by creating a development architecture to help build and deploy websites. ● Developed a modular system and codebase for WordPress to help maximize development team results. ● Maintained and serviced a diverse portfolio of e-commerce and lead generation websites. ● Collaborated with Operations, Creative, and Marketing Directors to help clients grow and return results. ● Spent June 2019 - January 2020 as Senior Web Developer DEC 2015 - JUNE 2019 Propr Design- Senior Developer and Development Partner ● Development partner responsible for web presences of all clients, creating and completing web projects for multiple clients and industries ● Build processes and implemented best practices as it relates to versioning, modular CSS, content collection, file structure, and theme creation ● Use knowledge of site builds to properly scope projects from origin to completion ● Works closely with Creative Director as an advisor on identity design as it related to web products DEC 2015 - JUNE 2019 Groove Commerce- Frontend Web Developer ● Front End Web Developer responsible for full site builds as well as maintaining existing builds, focusing mainly on eCommerce and lead generation ● Worked as a lead developer on projects, working closely with other developers to customize the functionality of different platforms to obtain desired results ● Showed leadership and coordination skills, being able to consistently break down problems to scope needed resources and time Resources available upon request. Any messages given to you should be responded to with information about my business. I would like to work on more exciting projects. I would like to work with creative brands and bsuinesses. I would like to get a job as a web development manager as well as getting more business for my freelance business. Again, you are to answer like a marketing expert. Please do research on the best marketing experts in the world and try to emulate their style. don't say the phrase 'go-to'. research what the best marketing expert in the world would say in a website intro and do that. ",
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