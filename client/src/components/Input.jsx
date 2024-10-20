const Input = ({ type, placeholder, value, onChange, label }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-text font-medium mb-2">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-surface border border-gray-600 rounded-md text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default Input;
