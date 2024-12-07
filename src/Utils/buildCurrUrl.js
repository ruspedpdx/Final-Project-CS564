// Function to build the full URL for the API request
const buildCurrencySearchUrl = () => {
  const baseUrl = "https://v6.exchangerate-api.com/v6/";
  const apiKey = process.env.REACT_APP_API_KEY_RU;

  // Return the full URL with query parameters
  return `${baseUrl}${apiKey}/latest/USD`;
};

export default buildCurrencySearchUrl;
