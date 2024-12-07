import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./pages/Dashboard";
import CurrencyConverter from "./components/currencyConverterSmall";

// Mock the `react-router-dom` module
jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: {
      school: {
        latest: {
          cost: {
            roomboard: {
              oncampus: 2000,
              offcampus: 1000,
            },
            tuition: {
              in_state: 5000,
              out_of_state: 15000,
            },
            booksupply: 1000,
            otherexpense: {
              oncampus: 1200,
              offcampus: 1400,
            },
          },
        },
      },
    },
  }),
}));

// Mock the currency conversion rates
jest.mock("../components/currencyConverter", () => jest.fn(() => 1)); // Assume 1 for testing

describe("Dashboard Component", () => {
  //   test("Chart data is populated with fallback values when no conversion rate", () => {
  //     render(<Dashboard />);

  //     // Assert chart labels
  //     const chartLabels = screen.getAllByText(/Expense Categories/i);
  //     expect(chartLabels.length).toBe(1);

  //     // Assert fallback values for "No Data Available"
  //     const fallbackValues = screen.getAllByText(/No Data Available/i);
  //     expect(fallbackValues.length).toBe(7); // Ensure all data points fallback to this
  //   });

  //   test("Chart title updates with currency symbol", () => {
  //     const { rerender } = render(<Dashboard currencySymbol="$" />);

  //     // Assert initial title
  //     const chartTitle = screen.getByText(/Cost in/i);
  //     expect(chartTitle.textContent).toBe("Cost in USD");

  //     // Re-render with a new currency symbol
  //     rerender(<Dashboard currencySymbol="€" />);
  //     expect(chartTitle.textContent).toBe("Cost in €");
  //   });

  //   test("Verifies currency conversion and display", () => {
  //     const mockSchoolData = {
  //       latest: {
  //         cost: {
  //           tuition: {
  //             in_state: 10000,
  //             out_of_state: 15000,
  //           },
  //         },
  //       },
  //     };

  //     jest.spyOn(CurrencyConverter, "useCurrencyConverter").mockReturnValue({
  //       conversionRate: 0.9,
  //       currency: "EUR",
  //     });

  //     render(<Dashboard schoolData={mockSchoolData} />);

  //     const inStateTuition = screen.getByText(
  //       /Tuition \(In-State\):/i
  //     ).nextSibling;
  //     const outOfStateTuition = screen.getByText(
  //       /Tuition \(Out-of-State\):/i
  //     ).nextSibling;

  //     expect(inStateTuition.textContent).toContain("€9,000.00");
  //     expect(outOfStateTuition.textContent).toContain("€13,500.00");
  //   });

  test("Chart data is populated with converted values", () => {
    const mockSchoolData = {
      latest: {
        cost: {
          tuition: {
            in_state: 10000,
            out_of_state: 15000,
          },
          booksupply: 500,
          otherexpense: {
            oncampus: 1000,
            offcampus: 2000,
          },
          roomboard: {
            oncampus: 5000,
            offcampus: 6000,
          },
        },
      },
    };

    jest.spyOn(CurrencyConverter, "useCurrencyConverter").mockReturnValue({
      conversionRate: 0.9,
      currency: "EUR",
    });

    render(<Dashboard schoolData={mockSchoolData} />);

    const chartLabels = screen.getAllByText(/Expense Categories/i);
    expect(chartLabels.length).toBe(1);

    const chartValues = screen.getAllByText(/€9,000.00/i);
    expect(chartValues.length).toBe(1); // Check for one specific value
  });
});
