import React, {Component} from 'react';
import Operations from '../operation/operation';
import Header from '../header/header';
import History from '../history/history';
import Total from '../total/total';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			transactions: JSON.parse(localStorage.getItem('Budget App')) || [],
			operation: '',
			amount: '',
			type: '',
			balance: '',
			income: '',
			expenses: '',
		};

		this.buttonClickHandler = this.buttonClickHandler.bind(this);
		this.inputChangeHandler = this.inputChangeHandler.bind(this);
		this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
	}

	componentDidMount() {
		this.getBudget();
	}

	componentDidUpdate() {
		this.saveData();
	}

	buttonClickHandler(evt) {
		const {operation, amount} = this.state;
		const target = evt.target;
		const {transactions} = this.state;
		const newTransaction = {
			operation,
			amount,
			type: !!target.classList.contains('operation__btn-add'),
			key: `fr${(+new Date()).toString(16)}`,
		};
		const newState = {
			transactions: [...transactions, newTransaction],
			operation: '',
			amount: '',
			type: '',
		};
		if (operation && amount) {
			this.setState(newState, this.getBudget);
		}
	}

	inputChangeHandler(evt) {
		const value = evt.target.value;
		evt.target.classList.contains('operation__name')
			? this.setState({operation: value})
			: this.setState({amount: value});
	}

	onDeleteClickHandler(key) {
		const transactions = this.state.transactions;
		const index = transactions.findIndex((item) => item.key === key);
		const newTransactions = [...transactions.slice(0, index), ...transactions.slice(index + 1)];
		this.setState({transactions: newTransactions}, this.getBudget);
	}

	getBudget() {
		const {transactions} = this.state;
		let balance = 0,
			income = 0,
			expenses = 0;
		transactions.forEach((item) => {
			const {type, amount} = item;
			if (type) {
				balance += +amount;
				income += +amount;
			} else {
				balance -= +amount;
				expenses += +amount;
			}
		});
		this.setState({balance, income, expenses});
	}

	saveData() {
		localStorage.setItem('Budget App', JSON.stringify(this.state.transactions));
	}

	render() {
		const {transactions, balance, income, expenses, operation, amount} = this.state;
		return (
			<>
				<Header />

				<main>
					<div className="container">
						<Total balance={balance} incomes={income} expenses={expenses} />

						<History transactions={transactions} onDeleteClick={this.onDeleteClickHandler} />

						<Operations
							operation={operation}
							amount={amount}
							onButtonClick={this.buttonClickHandler}
							onInputChange={this.inputChangeHandler}
						/>
					</div>
				</main>
			</>
		);
	}
}
