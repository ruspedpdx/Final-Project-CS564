// Import necessary testing libraries
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import NavMenu from "./components/Navbar";

import Raghad from "./pages/Raghad";


describe("Raghad Page", () => {
  test("navigates to Raghad page when clicking on the Raghad link", () => {
    render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Router>
        <App />
      </Router>
    );

    // Simulate navigation to the "Raghad" page by clicking on the link
    fireEvent.click(screen.getByText(/Raghad Page/i));

    // Check if the Raghad page content is rendered
    expect(screen.getByText(/Raghad/i)).toBeInTheDocument();
  });
});
