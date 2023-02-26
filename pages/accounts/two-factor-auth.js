import { useState } from 'react';

function TwoFactorAuth() {
  const [twoFactorCode, setTwoFactoreCode] = useState('');

  function handleTwoFactorSubmit() {
    event.preventDefault();

    setTwoFactoreCode('');
  }

  function handleTwoFactorChange(event) {
    setTwoFactoreCode(event.target.value);
  }

  return (
    <form onSubmit={handleTwoFactorSubmit}>
      <label>
        2FA Code:
        <input
          type="text"
          value={twoFactorCode}
          onChange={handleTwoFactorChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TwoFactorAuth;
