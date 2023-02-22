function UserAsset(props) {
  const { name, amount, currency } = props;

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mb-4">
      <div>
        <div className="text-xl font-medium text-black">{name}</div>
        <p className="text-slate-500">
          {amount} {currency}
        </p>
      </div>
    </div>
  );
}

export default UserAsset;
