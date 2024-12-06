/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import Currencies from "./currencyList"; // currency list
import buildCurrencySearchUrl from "../utils/buildCurrUrl"; // currency url builder list

function CurrencyConverter() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const basePrice = 1.0;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const apiUrl = buildCurrencySearchUrl();

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

  return (
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
  );
}
export default CurrencyConverter;