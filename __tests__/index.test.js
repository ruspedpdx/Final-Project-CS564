import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./src/pages/Dashboard";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Dashboard />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
