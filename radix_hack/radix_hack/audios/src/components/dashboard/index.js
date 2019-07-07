import React, { Component } from 'react';
import moment from 'moment';

import MessageMock from './message_mockup';
import SideBar from '../shared/sidebar';
import LowerBar from './lower_bar';
import './index.css';
import axios from 'axios';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		const searchWord = this.props.match.params.searchWord;

		this.handler = this.handler.bind(this);
		this.handleStartDate = this.handleStartDate.bind(this);

		this.state = {
			data: {},
			searchWord: searchWord,
			keywords: [searchWord],
			usinas: [],
			operadores: [],
			operacoes: [],
			startDate: moment()
				.subtract('months', 1)
				.format('LLL'),
			endDate: moment().format('LLL')
		};
	}

	montarQueryBusca() {
		let url =
			'https://search-transcricaohackathon-mdaj6mpvrrijdhusq2ngyfk2xe.sa-east-1.es.amazonaws.com/vitorioso/_search?size=1000';

		if (this.state.keywords.length > 0) {
			url = url.concat('&q=conteudo:' + this.state.keywords.join(' '));
		}
		if (this.state.usinas.length > 0) {
			url = url.concat('&q=usina:' + this.state.usinas.join(' '));
		}
		if (this.state.operacoes.length > 0) {
			url = url.concat('&q=classificacao:' + this.state.operacoes.join(' '));
		}
		if (this.state.operadores.length > 0) {
			url = url.concat(
				'&q=interlocutores:' + this.state.operadores.join(' ')
			);
		}
		return url;
	}

	filtrarAudios() {
		const url = this.montarQueryBusca();
		axios.get(url).then(response => {
			console.log(response);
			this.setState({
				data: response.data.hits.hits
					.map(data => data._source)
					.map(data => {
						return {
							...data,
							timestamp: moment(data.timestamp).format(
								'YYYY/MM/DD HH:MM:SS'
							)
						};
					})
			});
		});
	}

	componentWillMount() {
		this.filtrarAudios();
	}

	handler(tipo, keyword) {
		if (tipo == 'content') {
			this.setState(
				{
					keywords: [...this.state.keywords, keyword]
				},
				() => this.filtrarAudios()
			);
		}
		if (tipo == 'usina') {
			this.setState(
				{
					usinas: [...this.state.usinas, keyword]
				},
				() => this.filtrarAudios()
			);
		}

		if (tipo == 'operador') {
			this.setState(
				{
					operadores: [...this.state.operadores, keyword]
				},
				() => this.filtrarAudios()
			);
		}

		if (tipo == 'operacao') {
			this.setState(
				{
					operacoes: [...this.state.operacoes, keyword]
				},
				() => this.filtrarAudios()
			);
		}
	}

	removeFilter(keyword) {
		var array = [...this.state.keywords]; // make a separate copy of the array
		var index = array.indexOf(keyword);
		if (index !== -1) {
			array.splice(index, 1);
			this.setState({ keywords: array });
		}

		array = [...this.state.usinas]; // make a separate copy of the array
		index = array.indexOf(keyword);
		if (index !== -1) {
			array.splice(index, 1);
			this.setState({ usinas: array });
		}

		array = [...this.state.operacoes]; // make a separate copy of the array
		index = array.indexOf(keyword);
		if (index !== -1) {
			array.splice(index, 1);
			this.setState({ operacoes: array });
		}

		array = [...this.state.operadores]; // make a separate copy of the array
		index = array.indexOf(keyword);
		if (index !== -1) {
			array.splice(index, 1);
			this.setState({ operadores: array });
		}

		this.filtrarAudios();
	}
	
	handleStartDate(date) {
		this.setState({
			startDate: date
		});
	}
	handleEndDate(date) {
		this.setState({
			endDate: date
		});
	}
	isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	}
	render() {
		return (
			<div className="Dashboard">
				<div className="sidebar">
					<SideBar
						filters={this.state.filters}
						action={this.handler}
					/>
					<LowerBar
						date={this.state.startDate}
						action={this.handleStartDate}
					/>
				</div>
				<div className="messageList">
					<div className="filterList">
						<h1>Filtros Aplicados</h1>
						<p className="datetime">
							{this.state.startDate} -- {this.state.endDate}
						</p>
						<ul>
							{this.state.keywords.concat(this.state.usinas).concat(this.state.operacoes).concat(this.state.operadores).map(keyword => (
								<li onClick={() => this.removeFilter(keyword)}>
									x {keyword}
								</li>
							))}
						</ul>
					</div>
					{this.isEmpty(this.state.data)
						? null
						: (console.log(this.state),
						  (
								<MessageMock
									audios={this.state.data}
									searchWord={this.state.searchWord}
								/>
						  ))}
				</div>
				<div className="textCanvas">
					{/* <h1>Mensagens</h1> */}
					{/* <hr></hr> */}
				</div>
			</div>
		);
	}
}
export default Dashboard;
