import React from "react";
import PropTypes from "prop-types";

function Admissions({ college }) {
  return (
    <div>
      <h2>Admissions</h2>
      <p>
        To apply to {college["school.name"]}, prospective students must submit
        an application through the online portal, including necessary
        documentation such as transcripts and test scores.
      </p>
    </div>
  );
}

Admissions.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
  }).isRequired,
};

export default Admissions;
