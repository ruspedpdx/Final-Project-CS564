import React from "react";
import PropTypes from "prop-types";

function Academics({ college }) {
  return (
    <div>
      <h2>Academics</h2>
      <p>
        {college["school.name"]} offers a range of academic programs, including
        undergraduate and graduate degrees in various fields such as business,
        engineering, and humanities.
      </p>
    </div>
  );
}

Academics.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
  }).isRequired,
};

export default Academics;
