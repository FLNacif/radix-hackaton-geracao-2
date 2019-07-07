import React, { Component } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

import './action_log.css';

class ActionLog extends Component {

    firstTime = true;

	constructor(props) {
		super(props);
		// const usina_id=this.props.match.params.id;
		const usina = 'Salto Santiago';
		this.state = {
			usina: usina,
			operations: []
		};
	}
	changeStatus(operation, value) {
		const newOperation = { ...operation };
		console.log(newOperation);
		newOperation.estado = value;
		const url = 'http://localhost:5000/api/Comando/Atualizar';

		const config = {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT',
				'Access-Control-Allow-Headers':
					'Origin, Content-Type, X-Auth-Token'
			},
			method: 'post',
			data: newOperation,
			mode: 'cors',
			url: url
		};
		return axios(config);
	}

	buscarComandos() {
		const url = 'http://localhost:5000/api/Comando/fromUsina/';
		axios.get(url.concat(this.state.usina)).then(response => {

            if(this.state.operations.length < response.data.length && !this.firstTime ){
                this.disparaAlerta();
            }

            this.setState({ operations: response.data });
			this.firstTime = false;
			
			this.props.action(response.data);
		});
    }
    
    disparaAlerta(){
        let audio = new Audio('http://soundbible.com/mp3/Door Bell-SoundBible.com-1986366504.mp3');
        audio.play();
    }

	//inicializa as operacoes da usina referente
	componentWillMount() {        
		this.buscarComandos();
		setInterval(() => {
			this.buscarComandos();
		}, 1000);
    }
    
	renderStatus(operation) {
		switch (operation.estado) {
			case 1:
				return (
					<div className="buttons">
						<FaCheck color="green" size="22px" />
					</div>
				);
			case 2:
				return (
					<div className="buttons">
						<FaTimes color="red" size="22px" />
					</div>
				);
			default:
				return (
					<div className="buttons">
						<FaCheck
							color="gray"
							size="22px"
							onClick={() => this.changeStatus(operation, 4)}
						/>
						<FaTimes
							color="gray"
							size="22px"
							onClick={() => this.changeStatus(operation, 2)}
						/>
					</div>
				);
		}
	}
	render() {
		return (
			<div className="actionLog">
				{this.state.operations.map(operation => (
					<li className="actionLogCard">
						<p>{operation.destino}</p>
						<p>{operation.acao}</p>
						<p>{operation.valor}</p>
						<div className="confirmacao">
							<div className="acceptButton">
								<div>{this.renderStatus(operation)}</div>
							</div>
						</div>
					</li>
				))}
			</div>
		);
	}
}

export default ActionLog;
