// Function to build the full URL for the API request
const buildSearchByNameUrl = ({
  name,
  id,
  fields = [],
  page = 1,
  perPage = 20,
}) => {
  const baseUrl = "https://api.data.gov/ed/collegescorecard/v1/schools";
  const params = new URLSearchParams();
  const apiKey = process.env.REACT_APP_API_KEY_RA;

  // Add the API key
  params.append("api_key", apiKey);

  // Add dynamic filters for name if provided
  if (name) params.append("school.name", name);

  // Add dynamic filters for id if provided
  if (id) params.append("id", id);

  // Dynamically add the fields parameter if provided
  if (fields.length > 0) {
    params.append("fields", fields.join(","));
  } else {
    // Default fields if none are provided
    params.append("fields", "id,school.name,school.city,school.state");
  }

  params.append("page", page - 1);
  const validPerPage = perPage > 100 ? 100 : perPage;
  params.append("per_page", validPerPage);

  // Return the full URL with query parameters
  return `${baseUrl}?${params.toString()}`;
};

export default buildSearchByNameUrl;
