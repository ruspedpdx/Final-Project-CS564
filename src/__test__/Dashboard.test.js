import React from "react";
import { render, screen, fireEvent } from "./test-utils";
import Dashboard from "./pages/Dashboard";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test('should render the "Go Back to Search" button and trigger useNavigate on click', () => {
  render(<Dashboard />);

  // Get by role test
  const goBackButton = screen.getByRole("button", {
    name: /go back to search/i,
  });

  // Verify the button is in the document
  expect(goBackButton).toBeInTheDocument();

  // Simulate a click event on the button
  fireEvent.click(goBackButton);

  // Verify the navigation function is called
  expect(mockNavigate).toHaveBeenCalledWith("/searchByState");
});
