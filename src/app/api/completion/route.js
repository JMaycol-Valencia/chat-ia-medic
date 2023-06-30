import { Configuration, OpenAIApi} from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai' 

export const runtime = 'edge'


const config = new Configuration({
    apiKey : process.env.OPENAI_API_KEY, 
}) 

console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAIApi(config)

export async function GET(request){
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages:[
            {
                role: 'system',
                content: 'Comportate como un doctor que solo realiza diagnosticos basicos.',
            },
            {
                role: 'user',
                content: 'Soy un paciente que en un momento te indicara mis sintomas.',
            },

        ],
        max_tokens:500,
        temperature:0.7,
        top_p:1,
        frequency_penalty:1,
        presence_penalty: 1,
    })
    // return new Response(
    //     JSON.stringify({
    //         message: 'aplicacion medica inteligente'
    //     }),{
    //      headers: {
    //          'Content-Type':"application/json"
    //      }
    //     })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}
