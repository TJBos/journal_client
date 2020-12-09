import React from "react";

const Form = (props) => {
  //STATE FOR THE FORM
  // for create this will be set to an "empty entry"
  // for update this will be set to current entry
  const [formData, setFormData] = React.useState(props.entry);

  //FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {" "}
        Thoughts
        <textarea
          rows="10"
          name="main"
          value={formData.main}
          onChange={handleChange}
        />
      </label>
      <input
        label="date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input type="submit" value={props.label} />
    </form>
  );
};

export default Form;
