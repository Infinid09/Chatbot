import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import './userInput.css';

class UserInput extends Component {

    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        this.convertToJson = this.convertToJson.bind(this);
    }

    uploadFile(){
        document.getElementById("excelUpload").click();
    }

    onFileChange(evt) {
        /* wire up file reader */
        var target = evt.target;
        console.log(target.files)
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        if(target.files[0].type=="application/vnd.ms-excel" || target.files[0].type=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
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
            var jsonData=this.convertToJson(this.data);
            if(this.checkValidTemplate(jsonData)){
                this.props.fileUploadData(jsonData);
            }
            else{
                alert("Please use a valid template");
            }            
            };
            reader.readAsBinaryString(target.files[0]);
            
        }
        else{
            alert("Please upload a valid file");
        }
    }

    convertToJson(data){
        console.log("convert to json");
        var jsonData={};
        data.forEach(element => {
            jsonData[element[0]]=element[1]
        });
        return jsonData;
    }

    checkValidTemplate(thisSession){
        if(thisSession.hasOwnProperty("*Employee Name") && thisSession.hasOwnProperty('*Emp#') && thisSession.hasOwnProperty("*PM/Lead Name") && thisSession.hasOwnProperty('*GDC ID') && thisSession.hasOwnProperty("Background Check Completed(Y/N)") && thisSession.hasOwnProperty('*Emp#') && thisSession.hasOwnProperty("Fiedlglass Worker ID") && thisSession.hasOwnProperty("Employee Approved in LOB Engagement Tracker?") && thisSession.hasOwnProperty("Location (If Hyderabad - Also specify STP or SEZ)") && thisSession.hasOwnProperty("Bldg (Preferred)") && thisSession.hasOwnProperty("Floor & Wing (Preferred)") && thisSession.hasOwnProperty("Cube (Preferred)")){
            return true;
        }
        return false;
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