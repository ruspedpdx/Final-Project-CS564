import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Currencies from "./currencyList"; // currency list
import buildCurrencySearchUrl from "../utils/buildCurrUrl"; // currency url builder list

function CurrencyConverter({ onCurrencyChange }) {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRates, setConversionRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const apiUrl = buildCurrencySearchUrl();

      setLoading(true); // Show loading while fetching
      setError(null);
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("No response");
        }

        const data = await response.json();

        if (data.result === "success") {
          setConversionRates(data.conversion_rates);
          onCurrencyChange("USD", 1);
        } else {
          throw new Error("Unable to retrieve currency data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleCurrencyChange = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);

    if (conversionRates[currency]) {
      onCurrencyChange(currency, conversionRates[currency]);
    } else {
      onCurrencyChange(currency, 1);
    }
  };

  return (
    <div>
      <label htmlFor="currencySelector">
        Select Currency:
        <select
          id="currencySelector"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {Currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </label>

      {loading && <p>Loading...</p>}

      {!loading && error && !conversionRates[selectedCurrency] && (
        <p>Unable to convert.</p>
      )}
    </div>
  );
}

CurrencyConverter.propTypes = {
  onCurrencyChange: PropTypes.func.isRequired,
};

export default CurrencyConverter;
