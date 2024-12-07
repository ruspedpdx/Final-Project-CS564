import React from "react";
import PropTypes from "prop-types";

function CampusLife({ college }) {
  return (
    <div>
      <h2>Campus Life</h2>
      <p>
        {college["school.name"]} offers a vibrant campus life with a variety of
        student clubs, sports, and activities that help students engage outside
        of the classroom.
      </p>
    </div>
  );
}

CampusLife.propTypes = {
  college: PropTypes.shape({
    "school.name": PropTypes.string.isRequired,
  }).isRequired,
};

export default CampusLife;
