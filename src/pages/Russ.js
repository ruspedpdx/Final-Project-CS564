import React, { useEffect, useState } from "react";

const Russ = ({ title }) => {
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const exchangeRate = 1.2; // Example exchange rate

  useEffect(() => {
    const fetchSchoolData = async () => {
      // Simulated test data
      const testData = [
        {
          id: 1,
          schoolName: "Portland State University",
          schoolCity: "Portland",
          schoolState: "Oregon",
          costTuition: 14946,
          costRoomBoard: 13728,
          costTextSupplies: 2962,
        },
        {
          id: 2,
          schoolName: "Oregon State University",
          schoolCity: "Corvallis",
          schoolState: "Oregon",
          costTuition: 18360,
          costRoomBoard: 12000,
          costTextSupplies: 2500,
        },
      ];

      setTimeout(() => {
        setList(testData);
        setIsLoaded(true);
      }, 1000);
    };

    fetchSchoolData();
  }, []);

  return (
    <main className="container my-4">
      <h1 className="text-center mb-4">{title}</h1>

      {!isLoaded && <div className="text-center">Loading...</div>}

      <ul className="list-unstyled">
        {list.map((item) => (
          <React.Fragment key={item.id}>
            <li className="card mb-4 shadow-sm" style={{ overflow: "hidden" }}>
              <div className="card-body text-center">
                <h2 className="card-title">{item.schoolName}</h2>

                <p className="card-text">
                  <strong>City: </strong>
                  {item.schoolCity}
                  <strong>State: </strong>
                  {item.schoolState}
                </p>

                <p className="card-text">
                  <strong>Cost of Tuition: </strong>
                  {item.costTuition
                    ? `${(item.costTuition * exchangeRate).toFixed(
                        2
                      )} (in converted currency)`
                    : "Not available"}
                </p>
                <p className="card-text">
                  <strong>Cost of Room and Board: </strong>
                  {item.costRoomBoard
                    ? `${(item.costRoomBoard * exchangeRate).toFixed(
                        2
                      )} (in converted currency)`
                    : "Not available"}
                </p>
                <p className="card-text">
                  <strong>Cost of Textbooks and Supplies: </strong>
                  {item.costTextSupplies
                    ? `${(item.costTextSupplies * exchangeRate).toFixed(
                        2
                      )} (in converted currency)`
                    : "Not available"}
                </p>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </main>
  );
};

const styles = {
  chartContainer: {
    maxWidth: "80%",
    width: "100%",
    height: "100%",
    margin: "20px auto",
  },
};
export default Russ;
