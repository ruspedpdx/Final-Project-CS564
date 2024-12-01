import React, { useEffect, useState } from "react";

const CurrencyConverter = ({ title }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const basePrice = 1.0;

  const currencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
  ];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const apiUrl =
        "https://v6.exchangerate-api.com/v6/596e420d956e4e62b48103eb/latest/USD";

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

    fetchExchangeRate();
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
        {currencies.map((currency) => (
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
};

export default CurrencyConverter;
