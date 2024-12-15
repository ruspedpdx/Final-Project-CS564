import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Dashboard />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
