import { useState } from 'react';
import { checkPassword, isUnlocked, persistUnlock } from '../lib/gate';
import { VergeHat } from '../components/VergeLogos';

type Props = {
  onUnlock: () => void;
};

export function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const tryUnlock = () => {
    if (checkPassword(password)) {
      persistUnlock();
      onUnlock();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="gate active verge">
      <div className="inner">
        <div className="brand-select">
          <div className="verge-brand brand-item">
            <VergeHat />
            <span>The Verge</span>
          </div>
        </div>
        <div className="password">
          <span>Enter password:</span>
          <input
            id="password-input"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') tryUnlock();
            }}
            aria-invalid={error}
          />
          <button id="password-button" type="button" onClick={tryUnlock}>
            ➞
          </button>
        </div>
      </div>
    </div>
  );
}

export function useGateState() {
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  return {
    unlocked,
    unlock: () => setUnlocked(true),
  };
}
