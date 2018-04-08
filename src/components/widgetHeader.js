import React, { Component } from 'react';
import './widgetHeader.css';

class WidgetHeader extends Component {
    render() {
        return (
            <div className={(this.props.messageReceived && !this.props.expanded) ? "widHeaderNew" :"widHeader"}>
            
                <div className="widHeaderText">
                    {/* <img className="botImage" src="https://png.icons8.com/color/34/000000/bot.png"/> */}
                    <span className="headerName">BoB</span>
                    {
                        !this.props.expanded && <span className="windowSize"><i className="fa fa-window-maximize"></i></span>
                    } 
                    {
                        this.props.expanded && <span className="windowSize"><i className="fa fa-window-minimize"></i></span>
                    }                     
                </div>
            </div>
        )
    }
}

export default WidgetHeader;