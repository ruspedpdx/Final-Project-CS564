// Function to build the full URL for the API request
const buildSearchByNameUrl = ({ name, fields = [] }) => {
  const baseUrl = "https://api.data.gov/ed/collegescorecard/v1/schools";
  const params = new URLSearchParams();
  const apiKey = process.env.REACT_APP_API_KEY;

  // Add the API key
  params.append("api_key", apiKey);

  // Add dynamic filters for name if provided
  if (name) params.append("school.name", name);

  // Dynamically add the fields parameter if provided
  if (fields.length > 0) {
    params.append("fields", fields.join(","));
  } else {
    // Default fields if none are provided
    params.append("fields", "id,school.name,latest.student.size");
  }

  // Return the full URL with query parameters
  return `${baseUrl}?${params.toString()}`;
};

export default buildSearchByNameUrl;
