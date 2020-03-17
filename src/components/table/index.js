import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrency } from '../../actions';
import cx from 'classnames';

class Table extends Component {
	getFullName(name) {
		switch(name) {
			case 'BTC':
				return 'Bitcoin';
			case 'ETH':
				return 'Ethereum';
			case 'XRP':
				return 'XRP';
			case 'USDT':
				return 'Tether';
			case 'LTC':
				return 'Litecoin';
			default:
				return 'Unnamed';
		}
	}
	
	setConvert(currency) {
		this.props.setCurrency([currency]);
	}
	
	render() {
		const { data, prevData } = this.props;
		
		return(
			<div className="Table">
				<div className="Table-row">
					<div className="Table-cell">#</div>
					<div className="Table-cell">Name</div>
					<div className="Table-cell">Price</div>
				</div>

				{Object.keys(data).map((key, index) => <div
					key={index}
					className={cx(
						'Table-row',
						{'Table-row--up': prevData && Number(data[key]) > Number(prevData[key])},
						{'Table-row--down': prevData && Number(data[key]) < Number(prevData[key])}
					)}
					onClick={() => {this.setConvert(key)}}
				>
					<div className="Table-cell">{index + 1}</div>
					<div className="Table-cell">{this.getFullName(key)}</div>
					<div className="Table-cell">
						<div className="Table-price">{data[key]} $</div>
					</div>
				</div>)}
			</div>
		);
	}
}


const mapDispatchToProps = dispatch => ({
	setCurrency: currency => dispatch(setCurrency(currency))
});

export default connect(
  null,
  mapDispatchToProps
)(Table);