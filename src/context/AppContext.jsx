import { createContext, useContext, useState } from 'react';
import { transactions as init, user as initUser } from '../data/mockData';

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [balance, setBalance] = useState(initUser.balance);
  const [transactions, setTransactions] = useState(init);
  const [hideBalance, setHideBalance] = useState(false);

  function send(contact, amount, note) {
    setBalance(b => b - amount);
    setTransactions(prev => [{
      id: `t${Date.now()}`,
      type: 'debit',
      name: contact.name,
      avatar: contact.avatar,
      amount,
      date: new Date().toISOString().slice(0, 10),
      category: 'Transfer',
      icon: '👤',
      note,
    }, ...prev]);
  }

  return (
    <Ctx.Provider value={{ balance, transactions, hideBalance, toggleHide: () => setHideBalance(v => !v), send }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
