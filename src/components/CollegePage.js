/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useParams } from "react-router-dom";
import useApiData from "../hooks/useApiData";
import buildSearchByNameUrl from "../utils/buildUrl";

function CollegePage() {
  const { name } = useParams(); // Get the college name from the URL
  const fields = [
    "school.name",
    "school.city",
    "school.state",
    "latest.student.size",
    "latest.cost.tuition.in_state",
    "latest.cost.tuition.out_of_state",
  ]; // Specify the fields you want to fetch

  const url = buildSearchByNameUrl({ name, fields }); // Build the URL dynamically
  const { data, isLoaded, error } = useApiData(url); // Fetch data with the constructed URL

  return (
    <div>
      {isLoaded ? (
        data && data.results && data.results.length > 0 ? (
          <div>
            <h1>{data.results[0]["school.name"]}</h1>
            <p>
              <strong>Location:</strong> {data.results[0]["school.city"]},{" "}
              {data.results[0]["school.state"]}
            </p>
            <p>
              <strong>Student Size:</strong>{" "}
              {data.results[0]["latest.student.size"]}
            </p>
            <p>
              <strong>Tuition (In-State):</strong>{" "}
              {data.results[0]["latest.cost.tuition.in_state"]}
            </p>
            <p>
              <strong>Tuition (Out-of-State):</strong>{" "}
              {data.results[0]["latest.cost.tuition.out_of_state"]}
            </p>
          </div>
        ) : (
          <p>No data found for this college.</p>
        )
      ) : (
        <p>Loading...</p>
      )}

      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default CollegePage;
