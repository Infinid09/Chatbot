import React, { Component } from 'react';
import WidgetHeader from '../components/widgetHeader';
import ConversationWindow from '../components/conversationWindow';
import UserInput from '../components/userInput';
import { sendRequestToBotServer, getResponsePayload } from './botService';
import './kbChatWidget.css';

class KbChatWidget extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            mock:[{type:"bot",message:"Hi"},{type:"user",message:"Hi bot"}]
        }
        this.setToState = this.setToState.bind(this);
    }
    componentDidMount(){
        this.initBot();
    }

    async initBot(){
        let resposne = await sendRequestToBotServer('',null);
    }

    async sendRequestToBot(data) {
        //this.state.mock.push({type:"user",message:data});
        let context;
        const latestResponse = getResponsePayload();
        if (latestResponse) {
          context = latestResponse.context;
        }
        let resposne = await sendRequestToBotServer(data,context);
        console.log("resposne from BOT:",resposne);

    }

    setToState(data){
        console.log("data reads",data)
        var newMock=this.state.mock;
        newMock.push({type:"user",message:data});
        this.setState({
            mock: newMock
          });
        this.sendRequestToBot(data);
    }


    render() {
        
        return (
            <div className="kbbotContainer">
                <WidgetHeader />
                <ConversationWindow messages={this.state.mock} />
                <UserInput  userInputValue={this.setToState} />
            </div>
        )
    }
}

export default KbChatWidget;