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
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg p-8">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={sendFundsHandler}
        >
          <div className="mb-4">
            <label
              htmlFor="accountName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Account Name
            </label>
            <input
              type="text"
              defaultValue={props.name}
              readOnly
              className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="currency"
            >
              Currency
            </label>
            <input
              type="text"
              defaultValue={props.currency}
              ref={currencyInputRef}
              readOnly
              className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Balance
            </label>
            <input
              type="number"
              placeholder={props.amount}
              ref={amountInputRef}
              step="any"
              onChange={calculateFee}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="recipient"
            >
              To
            </label>
            <input
              type="text"
              placeholder="0x123435634"
              ref={toInputRef}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <input
              type="hidden"
              defaultValue={props.resourcePath}
              ref={resourcePathInputRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fee"
            >
              Fee
            </label>
            <div className="flex items-center ">
              <input
                type="number"
                value={feeAmount}
                ref={feeInputRef}
                step="any"
                placeholder={props.currency}
                readOnly
                className="appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="ml-2 text-gray-500 mr-20">{props.currency}</div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
              Send Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendForm;
