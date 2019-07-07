import React, {Component} from 'react'

import './searchbar.css'

class Search extends Component{
    state={
        keyword: ''
    };

    setKeyword = e => {
        this.setState({ searchWord: e.target.value });
        this.props.searchFunction({ searchString: e.target.value });
      };

      render() {
        return (
          <div className="Search">
            <input
                type="text"
                className="inputField"
                id="addInput"
                placeholder={this.props.placeholder}
            />
          </div>
        );
      }
    }


    export default Search;
