import React from "react";
import PropTypes from "prop-types";

function Costs({ college }) {
  return (
    <div>
      <h2>Costs</h2>
      <p>
        Tuition at {college["school.name"]} varies. For in-state students, the
        tuition is {college["latest.cost.tuition.in_state"]}, and for
        out-of-state students, the tuition is{" "}
        {college["latest.cost.tuition.out_of_state"]}.
      </p>
    </div>
  );
}

Costs.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
    "latest.cost.tuition.in_state": PropTypes.string.isRequired,
    "latest.cost.tuition.out_of_state": PropTypes.string.isRequired,
  }).isRequired,
};

export default Costs;
