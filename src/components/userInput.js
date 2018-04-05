import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './userInput.css';

class UserInput extends Component {

    constructor(props) {
        super(props);
    }

    handleEnterKeyPress = (event) => {
        if (event.key == 'Enter') {
            console.log('enter press here! ', event.target.value);
            this.props.userInputValue(event.target.value);
            event.target.value="";
        }        
    }

    render() {
        return (
            <div >
                <input className="widUserInput" type="text" placeholder="type here .." onKeyPress={this.handleEnterKeyPress} />
            </div>
        )
    }
}

export default UserInput;