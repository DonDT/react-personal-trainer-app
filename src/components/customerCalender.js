import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { withRouter } from "react-router-dom";
import "../App.css";

const CustomerCalender = props => {
  // const [date, setDate] = useState([]);
  // const [activity, setActivity] = useState([]);
  // const [duration, setDuration] = useState([]);
  const [data, setData] = useState([{ date: "", activity: "", duration: "" }]);

  useEffect(() => {
    fetchCustomerTrainings();
  }, []);

  const fetchCustomerTrainings = () => {
    const id = props.match.params.id;

    fetch(`https://customerrest.herokuapp.com/api/customers/${id}/trainings`)
      .then(response => response.json())
      //.then(response => response.content)
      //.then(response => setActivity(response.content.activity))
      .then(response => setItems(response.content))
      //.then(response => console.log(response.content))
      .catch(error => console.log(error));
  };

  const setItems = items => {
    return items.forEach(item =>
      setData(...data, {
        date: item.date,
        activity: item.activity,
        duration: item.duration
      })
    );
  };

  // const setState = data => {

  //   data.forEach(arrayItem => setActivity(...activity, arrayItem.activity));
  //   data.forEach(arrayItem => setDate(...date, arrayItem.date));
  //   data.forEach(arrayItem => setDuration(...duration, arrayItem.duration));
  // };
  return (
    <FullCalendar
      defaultView="dayGridMonth"
      plugins={[dayGridPlugin]}
      events={[{ title: "Swimming", date: "2019-11-11" }]}
    />
  );
};

export default withRouter(CustomerCalender);
