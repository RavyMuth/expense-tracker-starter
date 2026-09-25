import { useEffect, useState } from 'react'
import './App.css'
import Summary from './Summary'
import { translations, formatMoney, KHR_PER_USD } from './i18n'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") === "km" ? "km" : "en";
    } catch {
      return "en";
    }
  });
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // storage unavailable; language just won't persist
    }
  }, [lang]);

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(tx => tx.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(tx => tx.category === filterCategory);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: lang === "km" ? parseFloat(amount) / KHR_PER_USD : parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };


  return (
    <div className="app">
      <header className="masthead">
        <svg className="prasat" viewBox="0 0 160 70" aria-hidden="true">
          <g fill="currentColor">
            <path d="M80 2c3 5 5 9 6 14l4 4v8l4 3v8l4 3v6H58v-6l4-3v-8l4-3v-8l4-4c1-5 3-9 6-14z" />
            <path d="M52 22c2 3 3 6 4 9l3 3v7l3 2v6H40v-6l3-2v-7l3-3c1-3 2-6 6-9zM108 22c2 3 3 6 4 9l3 3v7l3 2v6h-19v-6l3-2v-7l3-3c1-3 2-6 6-9z" />
            <path d="M28 36c2 3 3 5 3 8l3 2v5h-12v-5l3-2c0-3 1-5 3-8zM132 36c2 3 3 5 3 8l3 2v5h-12v-5l3-2c0-3 1-5 3-8z" />
            <path d="M14 52h132v4H10zM6 58h148v4H6zM0 64h160v6H0z" />
          </g>
        </svg>
        <div className="lang-switch" role="group" aria-label="Language">
          <button type="button" lang="km" aria-pressed={lang === "km"} onClick={() => setLang("km")}>ខ្មែរ</button>
          <button type="button" lang="en" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
        </div>
        <h1>{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </header>

      <Summary transactions={transactions} t={t} lang={lang} />

      <div className="add-transaction">
        <h2>{t.addTransaction}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder={t.amount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">{t.income}</option>
            <option value="expense">{t.expense}</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{t.categories[cat]}</option>
            ))}
          </select>
          <button type="submit">{t.add}</button>
        </form>
      </div>

      <div className="transactions">
        <h2>{t.transactions}</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">{t.allTypes}</option>
            <option value="income">{t.income}</option>
            <option value="expense">{t.expense}</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">{t.allCategories}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{t.categories[cat]}</option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>{t.date}</th>
              <th>{t.description}</th>
              <th>{t.category}</th>
              <th>{t.amount}</th>

            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
                <td>{t.categories[tx.category]}</td>
                <td className={tx.type === "income" ? "income-amount" : "expense-amount"}>
                  {tx.type === "income" ? "+" : "-"}{formatMoney(tx.amount, lang)}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App
