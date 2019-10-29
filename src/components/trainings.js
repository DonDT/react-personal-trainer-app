import React, { useEffect, useState } from "react";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [tran, setTran] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(newData => setTrainings(newData.content))
      .catch(error => console.log(error));
  };

  const renderTrainings = () => {
    if (trainings.length > 0) {
      trainings.forEach((item, i) =>
        fetch(
          `https://customerrest.herokuapp.com/api/customers/${i + 1}/trainings`
        )
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(err => console.log(err))
      );
    }
  };

  return <div>{renderTrainings()}</div>;
}

export default Trainings;
