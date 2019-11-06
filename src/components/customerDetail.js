import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import ReactTable from "react-table";
import AddTraining from "./AddTraining";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Moment from "moment";

const CustomerDetail = props => {
  const [customer, setCustomer] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCustomer();
  }, []);

  //if error, put [], as second argument in useEffect

  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      //.then(response => console.log(response));
      .then(data => setCustomer(data));
  };

  const columns = [
    {
      Header: "Firstname",
      accessor: "customer.firstname"
    },
    {
      Header: "Lasttname",
      accessor: "customer.lastname"
    },
    {
      Header: "Customer Id",
      accessor: "customer.id"
    },
    {
      Header: "Address",
      accessor: "customer.streetaddress"
    },
    {
      Header: "Postcode",
      accessor: "customer.postcode"
    },
    {
      Header: "Firstname",
      accessor: "customer.firstname"
    },
    {
      Header: "City",
      accessor: "customer.city"
    },
    {
      Header: "Email",
      accessor: "customer.email"
    },
    {
      sortable: false,
      filterable: false,
      // accessor: "links[2].href",

      Cell: index => (
        <Link
          to={`/customers/${customer[index.index].customer.id}`}
          //onClick={() => deleteTraining(customer[index.index].id)}
        >
          Calendar
        </Link>
      )
    },
    // {
    //   Header: "Phone",
    //   accessor: "customer.phone"
    // },

    {
      Header: "Date",
      id: "date",
      accessor: row =>
        Moment(row.date)
          .local()
          .format("YYYY-MM-DD")
      //.format("DD - MMM - YYYY")
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
      // Cell: ({ value }) => (
      //   <Button
      //     size="small"
      //     color="primary"
      //     onClick={() => deleteTraining(value)}
      //   >
      //     Delete
      //   </Button>

      Cell: index => (
        <Button
          size="small"
          color="primary"
          onClick={() => deleteTraining(customer[index.index].id)}
        >
          Delete
        </Button>
      )
    }
  ];

  //console.log(customer);

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
          //color="blue"
        />
      )}
    </div>
  );
};

export default withRouter(CustomerDetail);
