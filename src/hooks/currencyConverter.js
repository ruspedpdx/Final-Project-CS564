import { useEffect, useState } from "react";
import buildCurrencySearchUrl from "../utils/buildCurrUrl"; // Utility to build API URL

function CurrencyConverter({ selectedCurrency }) {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const apiUrl = buildCurrencySearchUrl();

      if (!apiUrl) return;

      setIsLoaded(false);
      setError(null);

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }

        const data = await response.json();

        if (
          data.result === "success" &&
          selectedCurrency in data.conversion_rates
        ) {
          setExchangeRate(data.conversion_rates[selectedCurrency]);
        } else {
          throw new Error("Invalid currency or data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoaded(true);
      }
    };

    if (selectedCurrency) {
      fetchExchangeRate();
    }
  }, [selectedCurrency]);

  return { exchangeRate, isLoaded, error };
}

export default CurrencyConverter;
