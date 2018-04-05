import React, { Component } from 'react';
import './conversationWindow.css';

class ConversationWindow extends Component { 
    constructor(props) {
        super(props);
        this.indents=[];
    }
    componentDidMount(){
        
    }   
    render() {
        this.indents=[];
        for (var i = 0; i < this.props.messages.length; i++) {
            console.log("messsaggeadasd",this.props.messages[i]);
            if(this.props.messages[i].type=="bot"){
                this.indents.push(<div className="leftUser" key={i}><span className="botIcon"></span><p>{this.props.messages[i].message}</p></div>);                
            }
            else{
                this.indents.push(<div className="rightUser" key={i}><p>{this.props.messages[i].message}</p><span className="userIcon"></span></div>);
            }        
        }
        return (
            // <div className="widConvWindowContainer">
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
            //     <div className="rightUser"><p>Yes?</p><span className="userIcon"></span></div>
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
            //     <div className="rightUser"><p>Yes?</p><span className="userIcon"></span></div>
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
            //     <div className="rightUser"><p>Yes?</p><span className="userIcon"></span></div>
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
            //     <div className="rightUser"><p>Yes?</p><span className="userIcon"></span></div>
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
            //     <div className="rightUser"><p>Yes?</p><span className="userIcon"></span></div>
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
            //     <div className="rightUser"><p>asdadasdasdasdsadadadasdasdnaklndlakndlakndlkandlkansdlknalksdnaslkdnaldnlksandlkandlksanldknslkd</p><span className="userIcon"></span></div>
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
            //     <div className="rightUser"><p>Yes?</p><span className="userIcon"></span></div>
            //     <div className="leftUser"><span className="botIcon"></span><p>Hi!</p></div>
                
            // </div>
            <div className="widConvWindowContainer">                
            {this.indents}
        </div>
        )
    }
}

export default ConversationWindow;