/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUrl = buildSearchByNameUrl({ name: schoolName });
    setUrl(newUrl);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setSchoolName("");
    setUrl("");
  };

  // Automatically navigate to college page if there is one match
  useEffect(() => {
    if (isLoaded && data && data.results.length === 1) {
      const collegeName = data.results[0]["school.name"];
      navigate(`/college/${encodeURIComponent(collegeName)}`);
    }
  }, [data, isLoaded, navigate]);

  return (
    <div className="container">
      {!showResults && <h1>Search for a School</h1>}

      {!showResults && (
        <form onSubmit={handleSubmit} className="my-3">
          <input
            type="text"
            value={schoolName}
            onChange={handleInputChange}
            placeholder="Enter school name"
          />
          <button type="submit">Search</button>
        </form>
      )}

      {showResults && isLoaded && !error && data && (
        <div>
          {data.results.length === 0 ? (
            <div>
              <p>No College Found</p>
              <button onClick={handleBackToSearch}>Back to Search</button>
            </div>
          ) : data.results.length > 1 ? (
            <div>
              <p>Too many matches. Please refine your search.</p>
              <button onClick={handleBackToSearch}>Back to Search</button>
            </div>
          ) : null}
        </div>
      )}

      {!isLoaded && showResults && <div>Loading...</div>}
      {error && showResults && (
        <div>
          <p>Error: {error}</p>
          <button onClick={handleBackToSearch}>Back to Search</button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
