import { useRef } from 'react';
//need to add validation and create an idem field onSubmit

function SendForm(props) {
  const toInputRef = useRef();
  const currencyInputRef = useRef();
  const amountInputRef = useRef();
  const resourcePathInputRef = useRef();

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
