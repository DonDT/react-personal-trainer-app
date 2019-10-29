import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(error => console.log(error));
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
    }
  ];

  return (
    <div>
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
