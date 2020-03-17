import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import { setCurrency } from '../../actions';

class Calc extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			values: [1, 1]
		};
		
		this.handleChangeInput = this.handleChangeInput.bind(this);
	}
	
	componentDidUpdate(prevProps) {
		if ((!isEqual(prevProps.convertList, this.props.convertList)) || ((!isEqual(prevProps.currency, this.props.currency)))) {
			this.handleChangeInput(this.props.currency[0], 'currency', 0);
		}
	}
	
	handleChangeInput(value, type, num) {
		const
			{ values } = this.state,
			{ convertList, currency } = this.props,
			newData = {};
			
		if (type === 'values' && !value) {
			newData.values = ['',''];
		} else if (type === 'values' && !Number(value)) {
			return;
		} else {
			let amount;
			
			if (type === 'values') {
				if (num === 1) {
					amount = (value * convertList[currency[1]]) / convertList[currency[0]];
				} else {
					amount = (value * convertList[currency[0]]) / convertList[currency[1]];
				}
				
				amount = Number(amount.toFixed(5));
				newData.values = num === 1 ? [amount, value] : [value, amount];
			}
			
			if (type === 'currency') {
				this.props.setCurrency(num === 1 ? [currency[0], value] : [value, currency[1]]);
				amount = (values[0] * convertList[value]) / convertList[currency[1]];
				amount = Number(amount.toFixed(5));
				newData.values = [values[0], amount];
			}
		}
		
		this.setState(newData);
	}
	
	render() {
		const
			{ values } = this.state,
			{ convertList, currency } = this.props;
		
		return(
			<div className="Calc">
				<div className="Calc-field">
					<select
						className="Calc-select"
						value={currency[0]}
						onChange={(e) => {this.handleChangeInput(e.currentTarget.value, 'currency', 0)}}
					>
						{Object.keys(convertList).map((key, index) => <option key={index} value={key}>{key}</option>)}	
					</select>
										
					<input
						type="text"
						className="Calc-input"
						value={values[0]}
						onChange={(e) => {this.handleChangeInput(e.currentTarget.value, 'values', 0)}}
					/>
				</div>
				
				<div className="Calc-separate">=</div>
				
				<div className="Calc-field">
					<select
						className="Calc-select"
						value={currency[1]}
						onChange={(e) => {this.handleChangeInput(e.currentTarget.value, 'currency', 1)}}
					>
						{Object.keys(convertList).map((key, index) => <option key={index} value={key}>{key}</option>)}	
					</select>
										
					<input
						type="text"
						className="Calc-input"
						value={values[1]}
						onChange={(e) => {this.handleChangeInput(e.currentTarget.value, 'values', 1)}}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currency: state.setCurrency
});

const mapDispatchToProps = dispatch => ({
	setCurrency: currency => dispatch(setCurrency(currency))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Calc);

// export default Calc;
