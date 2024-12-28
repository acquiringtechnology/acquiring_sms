export const NormalInput = ({label='',placeholder=''}) => {
  return (
    <div className="form-group">
      <label for="exampleInputUsername1">{label}</label>
      <input
        type="text"
        className="form-control"
        id="exampleInputUsername1"
        placeholder={placeholder}
      />
    </div>
  );
};
