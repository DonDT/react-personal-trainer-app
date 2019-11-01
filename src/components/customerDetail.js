import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
//import moment from "moment";
//import moment from "moment";

const CustomerDetail = props => {
  const [customer, setCustomer] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchCustomer();
  });

  const fetchCustomer = () => {
    const id = props.match.params.id;
    if (parseInt(id)) {
      fetch(`${props.link}/trainings`)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(data => setCustomer(data.content))
        .then(setShowTable(true))
        .catch(err => console.log(err));
    }
  };
  console.log(`${props.link}/trainings`);

  const columns = [
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
      <p style={{ cursor: "pointer" }}>View</p>

      {showTable && (
        <ReactTable
          defaultPageSize={10}
          data={customer}
          columns={columns}
          filterable={true}
          style={{ marginTop: "20px" }}
        />
      )}
    </div>
  );
};

export default withRouter(CustomerDetail);
