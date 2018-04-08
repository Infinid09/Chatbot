import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import './userInput.css';

class UserInput extends Component {

    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
    }

    uploadFile(){
        document.getElementById("excelUpload").click();
    }

    onFileChange(evt) {
        /* wire up file reader */
        var target = evt.target;
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        var reader = new FileReader();
        reader.onload = (e) => {
          /* read workbook */
          var bstr = e.target.result;
          var wb = XLSX.read(bstr, {type: 'binary'});
      
          /* grab first sheet */
          var wsname = wb.SheetNames[0];
          var ws = wb.Sheets[wsname];
      
          /* save data */
          this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
          console.log(this.data);
        };
        reader.readAsBinaryString(target.files[0]);
      }

    handleEnterKeyPress = (event) => {
        if (event.key == 'Enter' && /\S/.test(event.target.value)) {
            console.log('enter press here! ', event.target.value);
            this.props.userInputValue(event.target.value);
            event.target.value="";
        }        
    }

    render() {
        return (
            <div className="inputContainer">
                <input className="widUserInput" type="text" placeholder="type here .." onKeyPress={this.handleEnterKeyPress} />
                <span className="attachment" onClick={this.uploadFile}><i className="fas fa-paperclip"></i></span>
                <input onChange={this.onFileChange}  className="uploadExcel" type="file" id="excelUpload"/>
            </div>
        )
    }
}

export default UserInput;