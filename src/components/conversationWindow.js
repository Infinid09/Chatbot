import React, { Component } from 'react';
import './conversationWindow.css';

class ConversationWindow extends Component {
    constructor(props) {
        super(props);
        this.indents = [];
    }
    componentDidMount() {

    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.el.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        this.indents = [];
        for (var i = 0; i < this.props.messages.length; i++) {
            //console.log("messsaggeadasd", this.props.messages[i]);
            if (this.props.messages[i].type == "bot") {
                this.indents.push(<div className="leftUser" key={i}><span className="botIcon"></span><p>{this.props.messages[i].message}</p></div>);
            }
            else {
                this.indents.push(<div className="rightUser" key={i}><p>{this.props.messages[i].message}</p><span className="userIcon"></span></div>);
            }
        }
        return (
            <div className="widConvWindowContainer">   
                <div className="messages">             
                    {this.indents}
                </div>
                <div ref={el => { this.el = el; }} />
        </div>
        )
    }
}

export default ConversationWindow;