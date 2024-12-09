// /* eslint-disable import/no-unresolved */
// // src/hooks/useApiData.test.js
// import { renderHook, act } from "@testing-library/react-hooks";
// import axios from "axios";
// import useApiData from "./hooks/useApiData";

// // Mock axios module
// jest.mock("axios");

// describe("useApiData", () => {
//   it("should fetch data successfully", async () => {
//     const mockData = { results: [] }; // Mock API response
//     axios.get.mockResolvedValue({ data: mockData });

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useApiData("https://api.example.com/data")
//     );

//     // Initially loading is false
//     expect(result.current.isLoaded).toBe(false);
//     expect(result.current.data).toBeNull();

//     // Wait for next update after fetching data
//     await waitForNextUpdate();

//     // Check if data is loaded
//     expect(result.current.isLoaded).toBe(true);
//     expect(result.current.data).toEqual(mockData);
//     expect(result.current.error).toBeNull();
//   });

//   it("should handle error when fetching data fails", async () => {
//     const errorMessage = "Failed to fetch data";
//     axios.get.mockRejectedValue(new Error(errorMessage));

//     const { result, waitForNextUpdate } = renderHook(() =>
//       useApiData("https://api.example.com/data")
//     );

//     // Initially loading is false
//     expect(result.current.isLoaded).toBe(false);
//     expect(result.current.data).toBeNull();

//     // Wait for next update after error occurs
//     await waitForNextUpdate();

//     // Check if error is handled correctly
//     expect(result.current.isLoaded).toBe(true);
//     expect(result.current.data).toBeNull();
//     expect(result.current.error).toBe(`Failed to fetch data: ${errorMessage}`);
//   });

//   it("should do nothing if no URL is provided", () => {
//     const { result } = renderHook(() => useApiData(""));

//     // Initially no data, loading is false
//     expect(result.current.isLoaded).toBe(false);
//     expect(result.current.data).toBeNull();
//     expect(result.current.error).toBeNull();
//   });
// });
