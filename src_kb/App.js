import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import logo from './logo.svg';
import './App.css';
import KbChatWidget from './container/kbChatWidget';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" >
            Chat Bot.AI 
          </Typography>
        </Toolbar>
      </AppBar>
      <KbChatWidget />
      </div>
    );
  }
}

export default App;
