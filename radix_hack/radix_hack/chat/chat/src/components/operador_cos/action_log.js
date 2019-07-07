import React, { Component } from 'react';
import { FaPaperPlane, FaTimes, FaTimesCircle, FaCheck } from 'react-icons/fa';
import axios from 'axios';

import './action_log.css';

class ActionLog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			operations: []
		};
	}
	
    

	renderStatus(operation) {
		switch (operation.estado) {
			case 0:
				return (
					<div className="buttons">
						<FaPaperPlane
							color="black"
							size="22px"
							onClick={() => this.changeStatus(operation, 3)}
						/>
						<FaTimesCircle
							color="black"
							size="22px"
							onClick={()=> this.changeStatus(operation, 1)}
						/>
					</div>
				);
			case 1:
				return (
					<div className="buttons">
						<FaPaperPlane color="gray" size="22px" />
						<FaTimesCircle color="red" size="22px" />
					</div>
				);
			case 2:
				return (
					<div className="buttons">
						<FaTimes color="red" size="22px" />
					</div>
				);
			case 3:
				return (
					<div className="buttons">
						<FaPaperPlane color="green" size="22px" />
						<FaTimesCircle color="gray" size="22px" />
					</div>
				);
			case 4:
				return (
					<div className="buttons">
						<FaCheck color="green" size="22px" />
					</div>
				);
			default:
				return null;
		}
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
        const url = 'http://localhost:5000/api/Comando/All';
            axios.get(url).then(response => {
                console.log(response);
				this.setState({ operations: response.data });
				this.props.action(response.data);
            });
    }

	//inicializa as operacoes
	componentWillMount() {
        this.buscarComandos();
        setInterval(()=>{
            this.buscarComandos();
        }, 1000)
    }
    
	render() {
		return (
			<div className="actionLog">
				{this.state.operations.map(operation =>
					operation.estado == 0 ? (
						<li className="formLogCard">
							<input type="text" value={operation.destino} />
							<input type="text" value={operation.acao} />
							<input type="text" value={operation.valor} />
							<div className="acceptButton">
								<div>{this.renderStatus(operation)}</div>
							</div>
						</li>
					) : (
						<li className="actionLogCard">
							<p>{operation.destino}</p>
							<p>{operation.acao}</p>
							<p>{operation.valor}</p>
							<div className="confirmacao">
								<div className="acceptButton">
									<div>
										{this.renderStatus(operation)}
									</div>
								</div>
							</div>
						</li>
					)
				)}
			</div>
		);
	}
}

export default ActionLog;
