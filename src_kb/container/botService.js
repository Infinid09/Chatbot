import axios from 'axios';

let requestPayload;
let responsePayload;

function setRequestPayload(payload){
  requestPayload = payload;
}

function setResponse(payload){
  responsePayload = payload;
}

export function getRequestPayload() {
  return requestPayload;
}

export function getResponsePayload() {
  return responsePayload;
}

export async function sendRequestToBotServer(text,context) {
   console.log(text,context);
    let requestObject = {};
    if (text) {
      requestObject.input = {
        text: text
      };
    }
    if (context) {
      requestObject.context = context;
    }
    let dataFromBot = await axios.post('http://localhost:4500/api/conversation', requestObject);
    setResponse(dataFromBot.data);
    return dataFromBot;
}