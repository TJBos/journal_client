import React from "react";

const Display = (props) => {
  const { entries } = props;

  const loaded = () => {
    return (
      <div style={{ textAlign: "center" }}>
        {entries.map((item) => (
          <article>
            <h1>{item.date}</h1>
            <h3>{item.main}</h3>
            <button
              onClick={() => {
                props.selectEntry(item);
                props.history.push("/show");
              }}
            >
              View Entry
            </button>
          </article>
        ))}
      </div>
    );
  };

  const loading = <h1>Loading...</h1>;

  return entries.length > 0 ? loaded() : loading;
};

export default Display;
