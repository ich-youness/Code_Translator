import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();
console.log(process.env.OPENAI_API_KEY);


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Hellooo from my bedroom',
    })
});

app.post('/', async(req, res) =>{
    try{
        const prompt = req.body.prompt;// kt9raha
        console.log(prompt);

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            // prompt: `${prompt}`,// here is where you wrte to the chatgpt api
            "prompt": prompt,
            temperature: 0.7,
            max_tokens: 1009,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });
          res.send({
           
            bot:  response.data.choices[0].text
            
          })
       
        console.log(response);


          console.log("3tat rep "+ response.data.choices[0].text);
        
        console.log("fef");
    }catch(error){
        console.log(error);
        res.send({error})
    }
})
app.listen(5300, () => console.log('Server is running on http://localhost:5300'));