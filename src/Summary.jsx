import { formatMoney } from './i18n'

function Summary({ transactions, t: labels, lang }) {
  const totalIncome = transactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>{labels.income}</h3>
        <p className="income-amount">{formatMoney(totalIncome, lang)}</p>
      </div>
      <div className="summary-card">
        <h3>{labels.expenses}</h3>
        <p className="expense-amount">{formatMoney(totalExpenses, lang)}</p>
      </div>
      <div className="summary-card">
        <h3>{labels.balance}</h3>
        <p className="balance-amount">{formatMoney(balance, lang)}</p>
      </div>
    </div>
  );
}

export default Summary
