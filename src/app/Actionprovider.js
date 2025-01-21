import OpenAI from "openai";
// import { createChatBotMessage, createClientMessage, createCustomMessage, userMessage } from "react-chatbot-kit/build/src/components/Chat/chatUtils";

const openai = new OpenAI({
    apiKey: '76caf081ca5547ddbb49b8b8aea275e4',
    baseURL: 'https://api.aimlapi.com',
    dangerouslyAllowBrowser: true
})

class ActionProvider {
    createChatBotMessage
    setState
    createClientMessage
    stateRef
    createCustomMessage

    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ){
        this.createChatBotMessage =createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;
    }


    callGenAI = async (prompt) => {
        const chatCompletion = await openai.chat.completions.create(
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: "system", content:"You are credit card advisor for the India market, help the user solving their doubts regarding credit cards. Remember only give answer for only credits card questions. you are not allowed to give answer for the questions related to anything else"},
                    {role: 'user', content: prompt}
                ],
                temperature: 0.5,
                max_tokens: 50
            }
        );
         return chatCompletion.choices[0].message.content;
    }
    timer = ms => new Promise(res =>setTimeout(res, ms));

    generateResponseMessage = async (userMessage) =>{
        const responseFromGPT = await this.callGenAI(userMessage);
        let message;
        let numNoLines  = responseFromGPT.split('\n').length;
        for(let i=0; i<numNoLines; i++){
            const msg = responseFromGPT.split('\n')[i];
            if (msg.length){
                console.log('KW101', msg)
                message = this.createChatBotMessage(msg);
                this.updateChatBotMessage(message);

            }
            await this.timer(1000);

        }


    }
    respond = (message) => {
        this.generateResponseMessage(message);

    }
    updateChatBotMessage = (message) => {
        this.setState(prevState =>({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }
}


export default ActionProvider;
