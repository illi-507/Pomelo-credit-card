export function Textarea({ value, onChange, errorMsg }) {
  return (
    <div className="textarea-container">
      Credit Card Summary Input
      <span style={{ fontSize: "15px", marginLeft: "10px" }}>
        (Note: please enter a valid json object and follow the format){" "}
      </span>
      <textarea
        className="user-input-section"
        rows="5"
        value={value}
        onChange={onChange}
      />
      <span style={{ fontSize: "10px", color: "red" }}>{errorMsg}</span>
    </div>
  );
}
