import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import CustomerDetail from "./customerDetail";
import { Link } from "react-router-dom";
import AddCustomer from "./AddCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      //.then(response => console.log(text))
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
      .catch(err => console.log(err));
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
      Cell: index => (
        <Link to={`/customers/${index.index}`}>
          <CustomerDetail link={customers[index.index].links[0].href} />
        </Link>
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
    </div>
  );
};

export default Customers;
