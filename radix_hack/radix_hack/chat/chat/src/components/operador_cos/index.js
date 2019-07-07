import React, { Component } from 'react';

import chart from '../../assets/grafico-de-linhas-excel.png';
import ActionLog from './action_log';
import { Line } from 'react-chartjs-2';

import './index.css';

class OperadorCOS extends Component {
	vetor = new Array(100);

	valoresY = new Array(100).fill().map(x => Math.random() * 142);

	constructor(props) {
		super(props);

		for (let i = 0; i < 100; i++) {
			this.vetor[i] = new Date(new Date() - i * 10000000);
		}

		this.state = {
			comandos: [],
			data: {}
		};
	}

	geraData() {
		return {
			labels: this.vetor,
			datasets: [
				{
					label: 'Energia Gerada MWh',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(75,192,192,0.4)',
					borderColor: 'rgba(75,192,192,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(75,192,192,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.valoresY
				},
				{
                    yAxisID: 'B',
					label: 'Comandos',
					fill: false,
					pointRadius: 10,
					backgroundColor: 'rgba(255,100,100,0.6)',
					pointHitRadius: 20,
					pointHoverRadius: 20,
					data: this.generateCommandMark()
				}
			]
		};
	}

	generateCommandMark() {
		let vetorDeMarcas = new Array(100).fill();
		this.state.comandos.forEach(comando => {
			let i = this.vetor.findIndex(x => x < new Date(comando.timestamp));
			if (i >= 0) {
				if (vetorDeMarcas[i]) {
					vetorDeMarcas[i]++;
				} else {
					vetorDeMarcas[i] = 1;
				}
			}
		});
		return vetorDeMarcas;
	}

	function(command) {
		this.setState({ comandos: command });
		this.setState({ data: this.geraData() });
	}

	xAxes = {
		scales: {
			xAxes: [
				{
					type: 'time',
					time: {
						unit: 'month'
					}
				}
			],
			yAxes: [
				{
					id: 'A',
					type: 'linear',
					position: 'left'
				},
				{
					id: 'B',
					type: 'linear',
					position: 'right'
				}
			]
		}
	};

	render() {
		return (
			<div className="engie">
				<div className="chart">
					<Line
						data={this.state.data}
						options={this.xAxes}
						height={60}
					/>
				</div>
				<div className="actionLog">
					<ActionLog action={this.function.bind(this)} />
				</div>
			</div>
		);
	}
}

export default OperadorCOS;
