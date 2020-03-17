import React, { Component } from 'react';
import './App.css';
import Table from './components/table';
import Calc from './components/calc';

const currencies = ['BTC', 'ETH', 'XRP', 'USDT', 'LTC'];

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: true,
			error: false,
			prevData: null,
		};
		
		this.getData = this.getData.bind(this);
	}
	
	componentDidMount() {
		this.getData('start');
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	async getData(start) {
		if (start) {
			this.interval = setInterval(this.getData, 20000);
		}
		
		fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencies.join(',')}&tsyms=USD&api_key=3806d35e9bb2246cd9faee7808f829a36c837a5e59cf9672e42a308fc21628c5`)
		.then(resp => resp.json()).then((data, error) => {
			if (data.error) {
				this.setState({
					error: true,
					loading: false
				});
			} else {
				const formatData = {}, convertList = {};
				
				Object.keys(data).map(key => {
					formatData[key] = data[key]['USD'];
					convertList[key] = data[key]['USD'];
					return null;
				});
				
				convertList['USD'] = 1;
				
				this.setState({
					prevData: this.state.data,
					data: formatData,
					convertList: convertList,
					loading: false,
					error: false
				});
			}
		}).catch(error => {
			this.setState({
				error: true,
				loading: false
			});
		});
	}
	
	render() {
		const { loading, error, data, prevData, convertList } = this.state;

		return (
			<div className="App">
				<div className="App-inside">
					<h1 className="Title">Crypto Currency</h1>
					
					{loading && !error && <div className="Loading"></div>}
					
					{!loading && error && <div className="Error">
						<div className="Error-title">Что то пошло не так...</div>
						<button
							className="Error-btn"
							onClick={() => {
								clearInterval(this.interval);
								this.setState({ loading: true, error: false }, () => {this.getData('start')});
							}}
						>Перезагрузить</button>
					</div>}
					
					{!loading && !error && data && <div className="Main">
						<Table data={data} prevData={prevData} />
						<Calc convertList={convertList} />
					</div>}
				</div>
			</div>
		);
	}
}

export default App;