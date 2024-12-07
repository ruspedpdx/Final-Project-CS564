/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
<<<<<<< HEAD:src/Utils/currencyConverter.js
=======
/* eslint-disable react/jsx-filename-extension */
>>>>>>> d183cd9fc5efe9a5d556635cad597f38a02512c5:src/pages/Russ.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Currencies from "../components/currencyList"; // currency list

function CurrencyConverter() {
  const location = useLocation();
  const school = location.state && location.state.school; // Safely extract school data

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const basePrice = 1.0;
  const apiKeyRu = process.env.REACT_APP_API_KEY_RU;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKeyRu}/latest/USD`;

      setLoading(true); // Show loading while fetching
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("No response");
        }

        const data = await response.json();

        // Check for success and set the conversion rate for the selected currency
        if (
          data.result === "success" &&
          selectedCurrency in data.conversion_rates
        ) {
          setConversionRate(data.conversion_rates[selectedCurrency]);
        } else {
          console.error("Currency not found or API response not successful");
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedCurrency) {
      fetchExchangeRate();
    }
  }, [selectedCurrency]); // Re-fetch data when the selected currency changes
  if (!school) {
    return <div>No school data available</div>; // Handle case where no data was passed
  }

  return (
    <>
      <div>
        <h1>{school.name}</h1>
        <p>{school.city}</p>
      </div>
      <div>
        <h1>Currency Converter</h1>
        <label htmlFor="currency">Select Currency:</label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {Currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        {loading ? (
          <p>Loading...</p>
        ) : conversionRate ? (
          <p>
            Price in {selectedCurrency}:{" "}
            <strong>
              {selectedCurrency} {(basePrice * conversionRate).toFixed(2)}
            </strong>
          </p>
        ) : (
          <p>{basePrice.toFixed(2)}: Unable to convert.</p>
        )}
      </div>
    </>
  );
}
export default CurrencyConverter;

// import { useLocation } from "react-router-dom";

// function Russ() {
//   const location = useLocation(); 
//   const school = location.state?.school;

//   return (
//     <div>
//       <h1>{school?.name}</h1>
//       <p>{school?.city}</p>
//     </div>
//   );
// }
