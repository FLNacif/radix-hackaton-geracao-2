import React, {Component} from 'react'
import SearchBar from '../shared/searchbar'
// import Calendar from '../shared/calendar'
import './index.css'
import logo from '../../assets/engievox-logo.png';

class Home extends Component{
    
    constructor(props){
        super(props);
        this.state={searchWord:""}
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.applyRedirect()
        }
      }
    applyRedirect = () => {
        const searchWord = this.state.searchWord;
        console.log(searchWord)
        this.props.history.push(`dashboard/${searchWord}`)
    }
    handleChange (event) {
        this.setState({searchWord: event.target.value});
    }
    
    render(){
        return(
            <div className="Home">
                <div className="Logo">
                    <img src={logo} alt={'logo'} width="300px"></img>
                </div>
                <div className="wordSearch">
                    <div className="input">
                    <input
                        type="text"
                        className="inputField"
                        placeholder="busque por horario, usina, locutor..."
                        value={this.state.searchWord}
                        onChange={this.handleChange}
                        onKeyDown={this._handleKeyDown}
                    />
                    </div>
                    <button className="searchButton" onClick={()=>this.applyRedirect()}>Buscar</button>
                </div>
            </div>
        )
    }
}

export default Home