import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
    <div className="App">
      <Calendar onChange={onChange} onClickDay={onClick} value={value} />
    </div>
  );
};

export default CalendarView;
