import React, { Component } from 'react';
import './message_mockup.css';
import {FaComment,FaBullhorn} from 'react-icons/fa';
import Popup from "reactjs-popup";
import moment from 'moment'
 
class MockUp extends Component {
    constructor(props){
        super(props);
    }
    state={
        isActive: false
    }
    render() {
        
      return (
        <div>
          <div>
              <ul>
                {this.props.audios.map(hit => (
                  
                  <li key={hit.id} className={"messageListCard"}>
                      <div>
                          <a>Interlocutor</a>
                          <p>{hit.interlocutores}</p>
                          <p>{hit.timestamp}</p>
                      </div>
                      <div>
                        <a>usina</a>
                        <p>{hit.usina}</p>
                        <p>{hit.destinatario}</p>
                      </div>
                      <div>
                        <a>Operacao</a>
                        <p>{hit.classificacao}</p>
                      </div>
                      <div className="icon">
                      <a href={hit.url} className="textIcon"><FaBullhorn size="30px"/></a>

                        <Popup trigger={<FaComment size="30px"/>} position="right center" className="popup_1">
                            <div className="popup_1">{hit.conteudo}</div>
                        </Popup>
                      </div>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      )
    }
}
  export default MockUp;