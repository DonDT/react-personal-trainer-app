import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ReactTable from "react-table";
import AddTraining from "./AddTraining";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { FaTrashAlt } from "react-icons/fa";
import { GiCalendar } from "react-icons/gi";
import Moment from "moment";

const CustomerDetail = props => {
  const [customer, setCustomer] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setCustomer(data));
  };

  const columns = [
    {
      Header: "Firstname",
      accessor: "customer.firstname"
    },
    {
      Header: "Lastname",
      accessor: "customer.lastname"
    },
    {
      Header: "Customer Id",
      accessor: "customer.id"
    },
    // {
    //   Header: "Address",
    //   accessor: "customer.streetaddress"
    // },
    // {
    //   Header: "Postcode",
    //   accessor: "customer.postcode"
    // },
    // {
    //   Header: "City",
    //   accessor: "customer.city"
    // },
    // {
    //   Header: "Email",
    //   accessor: "customer.email"
    // },
    {
      Header: "Date",
      id: "date",
      accessor: row =>
        Moment(row.date)
          .local()
          .format("YYYY-MM-DD")
    },
    {
      Header: "Duration",
      accessor: "duration"
    },
    {
      Header: "Activity",
      accessor: "activity"
    },
    {
      sortable: false,
      filterable: false,
      Cell: index => (
        <Link
          to={`/customers/${customer[index.index].customer.id}`}
          style={{ textDecoration: "none", color: "#3880ff" }}
        >
          View <GiCalendar style={{ paddingTop: "2px" }} />
        </Link>
      )
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: index => (
        <AddTraining
          link={customer[index.index].customer.id}
          saveTraining={saveTraining}
          deleteTraining={deleteTraining}
        />
      )
    },
    {
      sortable: false,
      filterable: false,
      accessor: "links[2].href",

      Cell: index => (
        <Button
          size="small"
          color="primary"
          onClick={() => deleteTraining(customer[index.index].id)}
        >
          <FaTrashAlt />
        </Button>
      )
    }
  ];

  const saveTraining = (newTraining, id) => {
    fetch(`https://customerrest.herokuapp.com/api/trainings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: new Date(),
        activity: newTraining.activity,
        duration: newTraining.duration,
        customer: `https://localhost:3000/api/customers/${id}`
      })
    })
      .then(res => fetchCustomer())
      .then(res => setMessage(" New Training Added"))
      .then(res => setOpen(true))
      .catch(err => console.log(err));
  };

  const deleteTraining = link => {
    if (window.confirm("Are you sure you want to delete this car")) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${link}`, {
        method: "DELETE"
      })
        .then(res => fetchCustomer())
        .then(res => setMessage("Training Deleted"))
        .then(res => setOpen(true))
        .catch(err => console.log(err));
    }
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div>
      <ReactTable
        defaultPageSize={10}
        data={customer}
        columns={columns}
        filterable={true}
        style={{ marginTop: "20px" }}
      />
      {message && (
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
        />
      )}
    </div>
  );
};

export default withRouter(CustomerDetail);
