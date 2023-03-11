import { useRef, useState } from 'react';
//need to add validation and create an idem field onSubmit

const CURRENCY_FEE_STRUCTURE = {
  BTC: { type: 'flat', value: 0.0001 }, // flat fee of 0.0001 BTC
  ETH: { type: 'flat', value: 0.0015 }, // flat fee of 0.0015 ETH
  USDT: { type: 'flat', value: 3 }, // flat fee of 3 USDT
  USDC: { type: 'flat', value: 3 }, // flat fee of 3 USDC
  MATIC: { type: 'variable', value: 0.002 }, // 0.2% variable fee for MATIC
  // Add more currencies and corresponding fees as needed
};

function SendForm(props) {
  const [feeAmount, setFeeAmount] = useState(0);
  const toInputRef = useRef();
  const currencyInputRef = useRef();
  const amountInputRef = useRef();
  const resourcePathInputRef = useRef();
  const feeInputRef = useRef();

  function calculateFee() {
    const enteredAmount = parseFloat(amountInputRef.current.value);
    if (isNaN(enteredAmount)) {
      setFeeAmount(0);
      return;
    }
    const feeStructure = CURRENCY_FEE_STRUCTURE[props.currency];
    if (!feeStructure) {
      setFeeAmount(0.002 * enteredAmount); // Default to 0.2% fee if currency not found
      return;
    }
    if (feeStructure.type === 'flat') {
      const fee = feeStructure.value;
      setFeeAmount(fee);
    } else if (feeStructure.type === 'variable') {
      const fee = enteredAmount * feeStructure.value;
      setFeeAmount(fee);
    }
  }

  function sendFundsHandler(event) {
    event.preventDefault();
    const enteredTo = toInputRef.current.value;
    const enteredCurrency = currencyInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;
    const enteredResourcePath = resourcePathInputRef.current.value;

    console.log(enteredAmount, enteredCurrency, enteredResourcePath, enteredTo);

    props.onInitiateSend({
      amount: enteredAmount,
      currency: enteredCurrency,
      to: enteredTo,
      resourcePath: enteredResourcePath,
      fee: feeAmount,
    });
  }

  return (
    <form className="w-full max-w-lg ml-8" onSubmit={sendFundsHandler}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            htmlFor="accountName"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Account Name
          </label>
          <input type="text" defaultValue={props.name} readOnly />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="currency"
          >
            Currency
          </label>
          <input
            type="text"
            defaultValue={props.currency}
            ref={currencyInputRef}
            readOnly
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Balance
          </label>
          <input
            type="number"
            defaultValue={props.amount}
            ref={amountInputRef}
            step="any"
            onChange={calculateFee}
          />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="recipient"
          >
            To
          </label>
          <input type="text" placeholder="0x123435634" ref={toInputRef} />
        </div>
        <div>
          <input
            type="hidden"
            defaultValue={props.resourcePath}
            ref={resourcePathInputRef}
          />
        </div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="fee"
        >
          Fee
        </label>
        <input
          type="number"
          value={feeAmount}
          ref={feeInputRef}
          step="any"
          readOnly
        />
        <div>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-base rounded px-4">
            Send Funds
          </button>
        </div>
      </div>
    </form>
  );
}

export default SendForm;
