function SendForm(props) {
  return (
    <form className="w-full max-w-lg ml-8">
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
          <input type="text" defaultValue={props.currency} readOnly />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Balance
          </label>
          <input type="number" defaultValue={props.amount} />
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="recipient"
          >
            To
          </label>
          <input type="text" placeholder="0x123435634" />
        </div>
        <div>
          <input type="hidden" value="resourcePath" />
        </div>
      </div>
    </form>
  );
}

export default SendForm;
