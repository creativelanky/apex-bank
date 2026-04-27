import { createContext, useContext, useState } from 'react';
import { transactions as init, user as initUser } from '../data/mockData';

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [balance, setBalance]         = useState(initUser.balance);
  const [currencies, setCurrencies]   = useState(initUser.currencies);
  const [transactions, setTransactions] = useState(init);
  const [hideBalance, setHideBalance] = useState(false);
  const [theme, setTheme]             = useState('light');

  // Admin-controlled states
  const [suspended, setSuspended]         = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [userAlert, setUserAlert]         = useState(null); // { type: 'error'|'warning'|'info'|'success', text }
  const [sendRestricted, setSendRestricted] = useState(false);
  const [sendRestrictMsg, setSendRestrictMsg] = useState('');

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
      note,
    }, ...prev]);
  }

  // Admin functions
  function adminSetBalance(amount) {
    setBalance(Number(amount));
  }

  function adminSetCurrencyBalance(code, amount) {
    setCurrencies(prev => prev.map(c => c.code === code ? { ...c, balance: Number(amount) } : c));
  }

  function adminSuspend(value, reason = '') {
    setSuspended(value);
    setSuspendReason(reason);
  }

  function adminSetAlert(alert) {
    setUserAlert(alert);
  }

  function adminSetSendRestricted(value, msg = '') {
    setSendRestricted(value);
    setSendRestrictMsg(msg);
  }

  function adminAddTransaction(tx) {
    const amount = Number(tx.amount);
    setTransactions(prev => [{ ...tx, id: `t${Date.now()}`, amount }, ...prev]);
    if (tx.type === 'credit') setBalance(b => b + amount);
    if (tx.type === 'debit')  setBalance(b => b - amount);
  }

  return (
    <Ctx.Provider value={{
      balance, currencies, transactions, hideBalance,
      toggleHide: () => setHideBalance(v => !v),
      send,
      theme,
      toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
      // admin-controlled
      suspended, suspendReason,
      userAlert, dismissAlert: () => setUserAlert(null),
      sendRestricted, sendRestrictMsg,
      // admin actions
      adminSetBalance,
      adminSetCurrencyBalance,
      adminSuspend,
      adminSetAlert,
      adminSetSendRestricted,
      adminAddTransaction,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
