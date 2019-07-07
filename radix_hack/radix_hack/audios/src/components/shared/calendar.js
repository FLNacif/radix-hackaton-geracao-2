import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class Calendar extends Component {
  constructor(props){
    super(props)

    this.state={
      date:""
    }
  }

  onChange = date => this.props.action(date)

  render() {
    console.log(this.props)
    return (
      <div>
        <DateTimePicker
          onChange={()=>this.onChange()}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default Calendar;