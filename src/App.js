import "./App.css";
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./components/Display";

function App() {
  //variable for url
  const url = "http://localhost:3000";
  //create the state to hold the entries
  const [entries, setEntries] = React.useState([]);
  //empty
  //const emptyDog = {
  //name: "",
  //age: 0,
  //};
  //select an entry
  const [selectedEntry, setSelectedEntry] = React.useState({});

  //make function that calls API to get the entries
  const getEntries = () => {
    fetch(url + "/entries/")
      .then((response) => response.json())
      .then((data) => setEntries(data));
  };

  //useEffect to do initial fetch of entries
  React.useEffect(() => getEntries(), []);
  /*
  //handleCreate function for creating new dogs
  const handleCreate = (newDog) => {
    fetch(url + "/dog/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    }).then(() => {
      getDogs();
    });
  };

  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    }).then(() => {
      // don't need the response from the post but will be using the .then to update the list of dogs
      getDogs();
    });
  };

  const selectDog = (dog) => {
    setSelectedDog(dog);
  };

  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      // don't need the response from the post but will be using the .then to update the list of dogs
      getDogs();
    });
  };
*/
  return (
    <div className="App">
      <h1>Journal</h1>
    </div>
  );
}

export default App;
