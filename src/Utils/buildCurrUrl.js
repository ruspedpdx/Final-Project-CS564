// Function to build the full URL for the API request
const buildCurrencySearchUrl = () => {
  const baseUrl = "https://v6.exchangerate-api.com/";
  const params = new URLSearchParams();
  const apiKey = process.env.REACT_APP_API_KEY_RU;

  // Add the API key
  params.append("api_key", apiKey);

  // Return the full URL with query parameters
  return `${baseUrl}?/latest/USD`;
};

export default buildCurrencySearchUrl;
