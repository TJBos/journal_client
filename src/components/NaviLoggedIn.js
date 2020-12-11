import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { GlobalCtx } from "../App";
//import "./Navigation.css"

const NaviLoggedIn = ({ history }) => {
  const { gState, setgState } = React.useContext(GlobalCtx);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="/">Journal Entries</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav className="justify-content-center">
            <Navbar.Text>Signed in as: {gState.user.username} </Navbar.Text>
          </Nav>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link
              href="/"
              onClick={() => {
                window.localStorage.removeItem("token");
                setgState({ ...gState, token: false, user: null });
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NaviLoggedIn;
