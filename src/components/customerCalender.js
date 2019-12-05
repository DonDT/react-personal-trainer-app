import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../App.css";

const CustomerCalender = props => {
  const [show, setShow] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCustomerTrainings();
  }, []);

  const fetchCustomerTrainings = () => {
    const id = props.match.params.id;

    fetch(`https://customerrest.herokuapp.com/api/customers/${id}/trainings`)
      .then(response => response.json())
      .then(response =>
        response.content.forEach(item =>
          data.push({
            title: `${item.activity} | Duration:${item.duration} min`,
            date: `${item.date}`
          })
        )
      )

      .then(response => setShow(true))
      .catch(error => console.log(error));
  };

  return (
    <div>
      {show && (
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={data}
        />
      )}
    </div>
  );
};

export default CustomerCalender;
