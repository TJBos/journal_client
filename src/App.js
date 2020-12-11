import "./App.css";
import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./components/Display";
import CustomForm from "./components/Form";
import Show from "./components/Show";
import NaviLoggedIn from "./components/NaviLoggedIn";
import Navi from "./components/Navi";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { Button, Card } from "react-bootstrap";

export const GlobalCtx = React.createContext(null);

function App() {
  //variable for url
  const url = "http://localhost:3000";
  //create global state that holds auth token
  const [gState, setgState] = React.useState({
    url: url,
    token: false,
    user: null,
  });

  //Check if logged in and capture token and user
  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    const user = JSON.parse(window.localStorage.getItem("user"));
    console.log(user);
    console.log(token);
    if (token) {
      setgState({ ...gState, token: token, user: user });
    }
  }, [gState.token]);

  //create the state to hold the journal entries
  const [entries, setEntries] = React.useState([]);
  //empty
  const emptyEntry = {
    main: "",
    date: null,
    //user_id: gState.user.id
  };
  //select an entry
  const [selectedEntry, setSelectedEntry] = React.useState({});

  //make function that calls API to get the entries
  const getEntries = () => {
    fetch(url + "/entries/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${gState.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setEntries(data));
  };

  //useEffect to do initial fetch of entries
  React.useEffect(() => getEntries(), [gState.token]);

  //handleCreate function for creating new entries
  const handleCreate = (newEntry) => {
    fetch(url + "/entries/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${gState.token}`,
      },
      body: JSON.stringify(newEntry),
    }).then(() => {
      getEntries();
    });
  };

  const handleUpdate = (entry) => {
    fetch(url + `/entries/${entry.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${gState.token}`,
      },
      body: JSON.stringify(entry),
    }).then(() => {
      // don't need the response from the post but will be using the .then to update the list of entries
      getEntries();
    });
  };

  const selectEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const deleteEntry = (entry) => {
    fetch(url + `/entries/${entry.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${gState.token}`,
      },
    }).then(() => {
      // don't need the response from the post but will be using the .then to update the list
      getEntries();
    });
  };

  const loginCheck = () => {
    if (gState.token) {
      return <NaviLoggedIn />;
    } else {
      return <Navi />;
    }
  };

  return (
    <GlobalCtx.Provider value={{ gState, setgState }}>
      <div className="App">
        {loginCheck()}
        <main>
          <Switch>
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route
              exact
              path="/"
              render={(rp) =>
                gState.token ? (
                  <>
                    <Link to="/create">
                      <Button
                        variant="outline-secondary"
                        size="lg"
                        style={{ marginBottom: "25px" }}
                      >
                        Add Entry
                      </Button>
                    </Link>
                    <Display
                      {...rp}
                      entries={entries}
                      selectEntry={selectEntry}
                      deleteEntry={deleteEntry}
                    />
                  </>
                ) : (
                  <Card className="text-center">
                    <Card.Header>Keep track of your thoughts</Card.Header>
                    <Card.Body>
                      <Card.Title>Intrspect</Card.Title>
                      <Card.Text>
                        Please log in or sign up to get started
                      </Card.Text>
                      <Button
                        variant="secondary"
                        href="/login"
                        style={{ marginRight: "25px" }}
                      >
                        Log in
                      </Button>
                      <Button variant="secondary" href="/signup">
                        Sign up
                      </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                  </Card>
                )
              }
            />
            <Route
              exact
              path="/show"
              render={(rp) => (
                <Show
                  {...rp}
                  entry={selectedEntry}
                  selectEntry={selectEntry}
                  deleteEntry={deleteEntry}
                />
              )}
            />
            <Route
              exact
              path="/create"
              render={(rp) => (
                <CustomForm
                  {...rp}
                  label="create"
                  entry={emptyEntry}
                  handleSubmit={handleCreate}
                />
              )}
            />
            <Route
              exact
              path="/edit"
              render={(rp) => (
                <CustomForm
                  {...rp}
                  label="update"
                  entry={selectedEntry}
                  handleSubmit={handleUpdate}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    </GlobalCtx.Provider>
  );
}

export default App;
