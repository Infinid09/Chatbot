import React, { Component } from 'react';
import WidgetHeader from '../components/widgetHeader';
import ConversationWindow from '../components/conversationWindow';
import UserInput from '../components/userInput';
import { sendRequestToBotServer, getResponsePayload } from './botService';
import './kbChatWidget.css';

class KbChatWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mock: [],
            expanded:false,
            newMessage:true,
            templateData:null
        }
        this.setToState = this.setToState.bind(this);
        this.changeExpandedState= this.changeExpandedState.bind(this);
        this.toggleNewMessage = this.toggleNewMessage.bind(this);
        this.handleTemplateData= this.handleTemplateData.bind(this);
    }
    componentDidMount() {
        this.initBot();
    }

    changeExpandedState(){
        //console.log("came in");
        this.setState({expanded:!this.state.expanded});
    }

    toggleNewMessage(){
        this.setState({newMessage:false});
    }

    async initBot() {
        let resposne = await sendRequestToBotServer('', null);
        console.log("initBot:",resposne);
        this.setState({mock : [ ...this.state.mock, {type: "bot", message: resposne} ]});
    }

    async sendRequestToBot(data) {
        //this.state.mock.push({type:"user",message:data});
        let context;
        const latestResponse = getResponsePayload();
        if (latestResponse) {
            context = latestResponse.context;
        }
        let resposne = await sendRequestToBotServer(data, context);
        console.log("resposne from BOT:", resposne);
        this.setState({mock : [ ...this.state.mock, {type: "bot", message: resposne} ]});
        this.setState({newMessage:true});
    }

    setToState(data) {
        console.log("data reads", data)
        var newMock = this.state.mock;
        newMock.push({ type: "user", message: data });
        this.setState({
            mock: newMock
        });
        this.sendRequestToBot(data);
    }

    handleTemplateData(data){
        console.log(data);
        this.setState({templateData:data});
    }


    render() {

        return (
            <div className="kbbotContainer" onClick={this.toggleNewMessage}>
                <div onClick={this.changeExpandedState}>
                    <WidgetHeader messageReceived={this.state.newMessage} expanded={this.state.expanded} /> 
                </div>
                <div className={
        this.state.expanded ? 'widgetOpen' : 'widgetClose'
      }>
                <div >
                    <ConversationWindow messages={this.state.mock} />
                    <UserInput fileUploadData={this.handleTemplateData} userInputValue={this.setToState} />
                </div>
                </div>
            </div>
        )
    }
}

export default KbChatWidget;