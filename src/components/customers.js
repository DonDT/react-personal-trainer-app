import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Snackbar from "@material-ui/core/Snackbar";

import Button from "@material-ui/core/Button";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      //.then(data => console.log(data.content))
      .catch(error => console.log(error));
  };

  const saveCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    })
      .then(res => fetchCustomers())
      .then(res => setMessage(" New Customer Added"))
      .then(res => setOpen(true))
      .catch(err => console.log(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => fetchCustomers())
      .then(res => setMessage("Customer Updated"))
      .then(res => setOpen(true))
      .catch(err => console.log(err));
  };

  const deleteCustomer = link => {
    if (window.confirm("Are you sure you want to delete this car")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchCustomers())
        .then(res => setMessage("Customer Deleted"))
        .then(res => setOpen(true))
        .catch(err => console.log(err));
    }
  };
  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const columns = [
    {
      Header: "Firstname",
      accessor: "firstname"
    },
    {
      Header: "LastName",
      accessor: "lastname"
    },
    {
      Header: "Street_Address",
      accessor: "streetaddress"
    },
    {
      Header: "Post_Code",
      accessor: "postcode"
    },
    {
      Header: "City",
      accessor: "city"
    },
    {
      Header: "Phone",
      accessor: "phone"
    },
    {
      Header: "Email_Address",
      accessor: "email"
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      Cell: row => (
        <EditCustomer customer={row.original} updateCustomer={updateCustomer} />
      )
    },
    {
      sortable: false,
      filterable: false,
      accessor: "links[0].href",
      Cell: ({ value }) => (
        <Button
          size="small"
          color="primary"
          onClick={() => deleteCustomer(value)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <div>
        <AddCustomer saveCustomer={saveCustomer} setOpen={setOpen} />
      </div>
      <ReactTable
        defaultPageSize={10}
        data={customers}
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

export default Customers;
