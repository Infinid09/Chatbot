import React, { Component } from 'react';
import WidgetHeader from '../components/widgetHeader';
import ConversationWindow from '../components/conversationWindow';
import UserInput from '../components/userInput';
import { sendRequestToBotServer, getResponsePayload } from './botService';
import './kbChatWidget.css';

class KbChatWidget extends Component {
    
    componentDidMount(){
        this.initBot();
    }

    async initBot(){
        let resposne = await sendRequestToBotServer('',null);
    }

    async sendRequestToBot(data) {
        console.log("sendRequestToBot:", data);
        let context;
        const latestResponse = getResponsePayload();
        if (latestResponse) {
          context = latestResponse.context;
        }
        let resposne = await sendRequestToBotServer(data,context);
        console.log("resposne from BOT:",resposne);
    }


    render() {
        return (
            <div className="kbbotContainer">
                <WidgetHeader />
                <ConversationWindow />
                <UserInput userInputValue={this.sendRequestToBot} />
            </div>
        )
    }
}

export default KbChatWidget;