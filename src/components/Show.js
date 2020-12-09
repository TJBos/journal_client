import React from "react";

const Show = (props) => {
  const { entry } = props;
  return (
    <div>
      <h1>{entry.main}</h1>
      <h3>{entry.date}</h3>
      <h3>{entry.question1}</h3>
      <button
        onClick={() => {
          props.history.push("/edit");
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          props.deleteEntry(entry);
          props.history.push("/");
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Show;
