import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
//import moment from "moment";

const CustomerDetail = props => {
  const [customer, setCustomer] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchCustomer();
  }, []);

  //if error, put [], as second argument in useEffect

  // const fetchCustomer = () => {
  //   const id = props.match.params.id;
  //   if (id) {
  //     fetch(
  //       `https://customerrest.herokuapp.com/api/customers/${12 +
  //         parseInt(id)}/trainings`
  //     )
  //       .then(response => response.json())
  //       //.then(response => console.log(response))
  //       .then(data => setCustomer(data.content))
  //       .then(setShowTable(true))
  //       .catch(err => console.log(err));
  //   }
  // };

  const fetchCustomer = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      //.then(response => console.log(response))
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
      Header: "Phone",
      accessor: "customer.phone"
    },

    {
      Header: "Date",
      accessor: "date"
      // id: "date",
      // accessor: row => moment(customer.date).format("YYYY-MM-DD"),
      // Cell: row => moment(customer.date).format("DD - MMM - YYYY")
      //       accessor: row => moment(row.start).format('x'),
      // Cell: row => moment(row.original.start).format('lll'),
    },
    {
      Header: "Duration",
      accessor: "duration"
    },
    {
      Header: "Activity",
      accessor: "activity"
    }
  ];

  return (
    <div>
      <ReactTable
        defaultPageSize={10}
        data={customer}
        columns={columns}
        filterable={true}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default withRouter(CustomerDetail);
