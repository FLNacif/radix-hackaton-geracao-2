import React, { Component } from 'react';

import './sidebar.css';
import logo from '../../assets/engievox-logo.png';

class SideBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filters: this.props
		};
	}
	_handleKeyDown = e => {
		if (e.key === 'Enter') {
			this.props.action(e.target.value);
		}
	};

	handleNewContentFilter = (e, filter) => {
		if (e.target.value != '') {
			if (e.key === 'Enter') {
				this.props.action('content',filter);
				e.target.value = '';
			}
		}
	};

	handleNewUsinaFilter = (e, filter) => {
		if (e.target.value != '') {
			if (e.key === 'Enter') {
				this.props.action('usina',filter);
				e.target.value = '';
			}
		}
	};

	handleNewOperadorFilter = (e, filter) => {
		if (e.target.value != '') {
			if (e.key === 'Enter') {
				this.props.action('operador',filter);
				e.target.value = '';
			}
		}
	};

	handleNewOperacaoFilter = (e, filter) => {
		if (e.target.value != '') {
			if (e.key === 'Enter') {
				this.props.action('operacao',filter);
				e.target.value = '';
			}
		}
	};

	render() {
		return (
			<div className="sidebar">
				<div className="Logo">
					<img src={logo} alt={'logo'} width="200px" />
				</div>
				<h1>Ferramentas</h1>
				<hr />
				<form className="sidebarForm">
				<div>
						<label>Conteúdo</label>
						<input
							className="textInput"
							type="text"
							placeholder="Conteúdo"
							value={this.filterContent}
							onKeyDown={e =>
								this.handleNewContentFilter(e, e.target.value)
							}
						/>
					</div><div>
						<label>Usinas</label>
						<input
							className="textInput"
							type="text"
							placeholder="usina"
							value={this.filterUsina}
							onKeyDown={e =>
								this.handleNewUsinaFilter(e, e.target.value)
							}
						/>
					</div>
					<div>
						<label>Locutor</label>
						<input
							className="textInput"
							type="text"
							placeholder="operador"
							value={this.filterOperador}
							onKeyDown={e =>
								this.handleNewOperadorFilter(e, e.target.value)
							}
						/>
					</div>
					<div>
						<label>Operacao</label>
						<input
							className="textInput"
							type="text"
							placeholder="operacao"
							value={this.filterOperacao}
							onKeyDown={e =>
								this.handleNewOperacaoFilter(e, e.target.value)
							}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default SideBar;
