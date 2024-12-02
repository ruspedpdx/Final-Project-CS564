/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import useApiData from "../hooks/useApiData";
import buildSearchByNameUrl from "../utils/buildUrl";

function SearchPage() {
  const [schoolName, setSchoolName] = useState("");
  const [url, setUrl] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { data, isLoaded, error } = useApiData(url);

  const handleInputChange = (e) => {
    setSchoolName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUrl = buildSearchByNameUrl({ name: schoolName });
    setUrl(newUrl);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setSchoolName("");
  };

  return (
    <div className="container">
      {!showResults && <h1>Search for a School</h1>}

      {!showResults && (
        <form onSubmit={handleSubmit} className="my-3">
          {/* <label>School Name: </label> */}
          <input
            type="text"
            value={schoolName}
            onChange={handleInputChange}
            placeholder="Enter school name"
          />
          <br />
          <button type="submit">Search</button>
        </form>
      )}

      {showResults && isLoaded && !error && data && (
        <div>
          {data.results.length === 1 ? (
            <div>
              <h2>College Information</h2>
              <p>
                <strong>Name:</strong> {data.results[0]["school.name"]}
              </p>
              <p>
                <strong>Student Size:</strong>{" "}
                {data.results[0]["latest.student.size"]}
              </p>
            </div>
          ) : data.results.length === 0 ? (
            <p>No College Found</p>
          ) : (
            <p>Too many matches. Please refine your search.</p>
          )}
          <button onClick={handleBackToSearch}>Back to Search</button>
        </div>
      )}

      {isLoaded && !data && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default SearchPage;
