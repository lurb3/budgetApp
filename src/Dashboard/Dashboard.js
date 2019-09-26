import React from 'react';

const dashboard = (props) =>  {
	return (
		<div className="Dashboard">
			<div className="container">
				<div className="Logo">
					<span>$</span>
					<h1>BudgetApp</h1>
				</div>

				<div className="CurrentStats">
					<h3>Current Status</h3>
				</div>

				<div className="TotalBudget">
					<h3>Total Budget: <span>{props.totalBudget}</span> €</h3>
				</div>

				<div className="row">
					<div className="col-6 text-center Income">
						<h3>Income</h3>
						<p>900 € / Month</p>
					</div>
					<div className="col-6 text-center Outcome">
						<h3>Outcome</h3>
						<p>400 € / Month</p>
					</div>
				</div>
				<div className="LatestStatus">
					<h3>Latest Status</h3>
				</div>	

				<div className="LatestTransactions">
					<h3>Latest Transactions</h3>
				</div>

				<div className="row Transactions">
					<div className="col-12">
						<div className="row">
							<div className="col-6 TransactionItem">
								<h4>Seat Leon Fr</h4>
								<p>Jan 26, 2019</p>
							</div>
							<div className="col-6 TransactionCost">
								<p>125 €</p>
							</div>
						</div>
					</div>
				</div>

				<div className="row Transactions">
					<div className="col-12">
						<div className="row">
							<div className="col-6 TransactionItem">
								<h4>Seat Leon Fr</h4>
								<p>Jan 26, 2019</p>
							</div>
							<div className="col-6 TransactionCost">
								<p>125 €</p>
							</div>
						</div>
					</div>
				</div>

				<div className="row LoadTransactions">
					<p>Load more transactions</p>
				</div>
				<div className="row">
					<div className="row BottomMenu">
						<div className="Home">Home</div>
						<div className="NewSpend">+</div>
						<div className="Logout">Logout</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default dashboard;