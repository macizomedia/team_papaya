import React from "react";

const InputSearch = React.createClass({
  render() {
    const { value, handleChange } = this.props;

    return (
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />{" "}
        <p>Current value: {value}</p>
      </div>
    );
  },
});
