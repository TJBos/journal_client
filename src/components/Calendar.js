import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CalendarView = (props) => {
  const [value, onChange] = React.useState(new Date());

  const onClick = (value, event) => {
    const date = value.toISOString().slice(0, 10);
    props.entries.forEach((entry) => {
      if (entry.date == date) {
        props.selectEntry(entry);
        props.history.push("/show");
      }
    });
  };

  return (
    <div className="calendar">
      <Link to="/create">
        <Button
          variant="outline-secondary"
          size="lg"
          style={{ marginBottom: "25px" }}
        >
          Add Entry
        </Button>
      </Link>
      <h5 style={{ textAlign: "left", color: "darkgray" }}>
        Click the day in the calendar to view the entry of that day
      </h5>
      <Calendar onChange={onChange} onClickDay={onClick} value={value} />
    </div>
  );
};

export default CalendarView;
