import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { now } from 'moment';

import './lower_bar.css'
class LowerBar extends Component{
    constructor(props){
        super(props);

        this.state={
            startDate:""
        }
    }
    handleDate = (date) => {
        this.setState({startDate: date})
    }
   submit = () =>{
    this.props.action(this.state.startDate)
   } 

    render(){
        return(
            <div className="calendars">
                <p>Filtrar por tempo</p>
                <div className="startDatePicker">
                    <DateTimePicker 
                        onChange={this.handleDate}
                        value={this.state.startDate}
                    />
                    <button 
                    >
                        aplicar
                    </button>
                </div>
                    <div className="endDatePicker">
                </div>
            </div>
        )
    }
}
   

 export default LowerBar;