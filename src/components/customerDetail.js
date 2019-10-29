import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import moment from "moment";

const CustomerDetail = props => {
  const [customer, setCustomer] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchCustomer();
  });

  const fetchCustomer = () => {
    const id = props.match.params.id;
    if (id) {
      fetch(
        `https://customerrest.herokuapp.com/api/customers/${parseInt(id) +
          1}/trainings`
      )
        .then(response => response.json())
        .then(data => setCustomer(data.content))
        .then(setShowTable(true))
        .catch(err => console.log(err));
    }
  };

  const columns = [
    {
      Header: "Date",
      accessor: "date"
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
