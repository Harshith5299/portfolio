import { useState, useEffect } from 'react';
import './SpringBankPreview.css';

const ACCOUNTS = [
  { name: 'Alice Morgan', id: 'ACC-1042', balance: 24_850.0 },
  { name: 'Bob Carter', id: 'ACC-2371', balance: 8_340.0 },
];

const TRANSFER_AMOUNT = 1_500;

export default function SpringBankPreview() {
  const [phase, setPhase] = useState<'idle' | 'sending' | 'done'>('idle');
  const [balances, setBalances] = useState([ACCOUNTS[0].balance, ACCOUNTS[1].balance]);

  useEffect(() => {
    const start = () => {
      setPhase('sending');
      setTimeout(() => {
        setBalances([ACCOUNTS[0].balance - TRANSFER_AMOUNT, ACCOUNTS[1].balance + TRANSFER_AMOUNT]);
        setPhase('done');
        setTimeout(() => {
          setBalances([ACCOUNTS[0].balance, ACCOUNTS[1].balance]);
          setPhase('idle');
        }, 2200);
      }, 900);
    };

    const id = setInterval(start, 4000);
    start();
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sbp">
      <div className="sbp__accounts">
        {ACCOUNTS.map((acc, i) => (
          <div key={acc.id} className={`sbp__account${phase === 'done' ? ` sbp__account--${i === 0 ? 'debit' : 'credit'}` : ''}`}>
            <div className="sbp__account-avatar">{acc.name[0]}</div>
            <div className="sbp__account-info">
              <span className="sbp__account-name">{acc.name}</span>
              <span className="sbp__account-id">{acc.id}</span>
            </div>
            <div className="sbp__balance">
              ${balances[i].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>

      <div className={`sbp__transfer${phase !== 'idle' ? ' sbp__transfer--active' : ''}`}>
        <span className={`sbp__transfer-arrow${phase === 'sending' ? ' sbp__transfer-arrow--moving' : ''}`}>→</span>
        <span className="sbp__transfer-amount">${TRANSFER_AMOUNT.toLocaleString()}</span>
      </div>

      <div className="sbp__stack">
        <span className="sbp__tech">Spring Boot</span>
        <span className="sbp__sep">·</span>
        <span className="sbp__tech">MySQL</span>
        <span className="sbp__sep">·</span>
        <span className="sbp__tech">React</span>
      </div>
    </div>
  );
}
