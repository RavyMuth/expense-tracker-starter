export const translations = {
  en: {
    title: "Finance Tracker",
    subtitle: "Track your income and expenses",
    income: "Income",
    expenses: "Expenses",
    expense: "Expense",
    balance: "Balance",
    addTransaction: "Add Transaction",
    description: "Description",
    amount: "Amount",
    add: "Add",
    transactions: "Transactions",
    allTypes: "All Types",
    allCategories: "All Categories",
    date: "Date",
    category: "Category",
    categories: {
      food: "Food",
      housing: "Housing",
      utilities: "Utilities",
      transport: "Transport",
      entertainment: "Entertainment",
      salary: "Salary",
      other: "Other",
    },
  },
  km: {
    title: "កម្មវិធីតាមដានហិរញ្ញវត្ថុ",
    subtitle: "តាមដានចំណូល និងចំណាយរបស់អ្នក",
    income: "ចំណូល",
    expenses: "ចំណាយ",
    expense: "ចំណាយ",
    balance: "សមតុល្យ",
    addTransaction: "បន្ថែមប្រតិបត្តិការ",
    description: "ការពិពណ៌នា",
    amount: "ចំនួនទឹកប្រាក់",
    add: "បន្ថែម",
    transactions: "ប្រតិបត្តិការ",
    allTypes: "គ្រប់ប្រភេទ",
    allCategories: "គ្រប់ចំណាត់ថ្នាក់",
    date: "កាលបរិច្ឆេទ",
    category: "ចំណាត់ថ្នាក់",
    categories: {
      food: "អាហារ",
      housing: "លំនៅដ្ឋាន",
      utilities: "ទឹកភ្លើង",
      transport: "ដឹកជញ្ជូន",
      entertainment: "កម្សាន្ត",
      salary: "ប្រាក់ខែ",
      other: "ផ្សេងៗ",
    },
  },
};

// Amounts are stored in USD; Khmer mode displays and accepts riel.
export const KHR_PER_USD = 4000;

export function formatMoney(usd, lang) {
  if (lang === "km") {
    return `${Math.round(usd * KHR_PER_USD).toLocaleString("en-US")}៛`;
  }
  return `$${Number(usd.toFixed(2)).toLocaleString("en-US")}`;
}
