import { calculateTotalCost } from ".src/components/Costs";
import { getCostOfAttendance } from "./src/utils/collegeData";

jest.mock("../utils/collegeData", () => ({
  getCostOfAttendance: jest.fn(),
}));

describe("Costs Component Logic", () => {
  let mockCostDetails;
  let conversionRates;

  beforeEach(() => {
    mockCostDetails = {
      inStateTuition: 10000,
      outOfStateTuition: 20000,
      onCampusRoomAndBoard: 12000,
      offCampusRoomAndBoard: 10000,
      withFamilyOtherExpenses: 3000,
      offCampusOtherExpenses: 4000,
      onCampusOtherExpenses: 5000,
      bookAndSupplies: 1000,
    };

    conversionRates = 1;
    getCostOfAttendance.mockReturnValue(mockCostDetails);
  });

  test("should calculate total cost for in-state student living on-campus", () => {
    const {
      tuition,
      roomAndBoard,
      otherExpenses,
      booksAndSupplies,
      totalCost,
    } = calculateTotalCost(
      mockCostDetails,
      "inState",
      "onCampus",
      conversionRates
    );

    expect(tuition).toBe(10000);
    expect(roomAndBoard).toBe(12000);
    expect(otherExpenses).toBe(5000);
    expect(booksAndSupplies).toBe(1000);
    expect(totalCost).toBe(10000 + 12000 + 5000 + 1000);
  });

  test("should calculate total cost for out-of-state student living off-campus", () => {
    const {
      tuition,
      roomAndBoard,
      otherExpenses,
      booksAndSupplies,
      totalCost,
    } = calculateTotalCost(
      mockCostDetails,
      "outOfState",
      "offCampus",
      conversionRates
    );

    expect(tuition).toBe(20000);
    expect(roomAndBoard).toBe(10000);
    expect(otherExpenses).toBe(4000);
    expect(booksAndSupplies).toBe(1000);
    expect(totalCost).toBe(20000 + 10000 + 4000 + 1000);
  });

  test("should handle when some values are N/A for living arrangements", () => {
    mockCostDetails.onCampusRoomAndBoard = "N/A";
    mockCostDetails.offCampusRoomAndBoard = "N/A";
    mockCostDetails.withFamilyOtherExpenses = "N/A";

    const {
      tuition,
      roomAndBoard,
      otherExpenses,
      booksAndSupplies,
      totalCost,
    } = calculateTotalCost(
      mockCostDetails,
      "inState",
      "withFamily",
      conversionRates
    );

    expect(tuition).toBe(10000);
    expect(roomAndBoard).toBe(0);
    expect(otherExpenses).toBe(3000);
    expect(booksAndSupplies).toBe(1000);
    expect(totalCost).toBe(10000 + 0 + 3000 + 1000);
  });

  test("should handle missing values", () => {
    mockCostDetails.inStateTuition = null;
    mockCostDetails.outOfStateTuition = null;
    mockCostDetails.onCampusRoomAndBoard = null;

    const {
      tuition,
      roomAndBoard,
      otherExpenses,
      booksAndSupplies,
      totalCost,
    } = calculateTotalCost(
      mockCostDetails,
      "inState",
      "onCampus",
      conversionRates
    );

    expect(tuition).toBeNull();
    expect(roomAndBoard).toBeNull();
    expect(otherExpenses).toBeNull();
    expect(booksAndSupplies).toBe(1000);
    expect(totalCost).toBe(1000);
  });

  test("should convert costs using the conversion rates", () => {
    const newConversionRates = 1.2;
    const {
      tuition,
      roomAndBoard,
      otherExpenses,
      booksAndSupplies,
      totalCost,
    } = calculateTotalCost(
      mockCostDetails,
      "outOfState",
      "offCampus",
      newConversionRates
    );

    expect(tuition).toBe(24000);
    expect(roomAndBoard).toBe(12000);
    expect(otherExpenses).toBe(4800);
    expect(booksAndSupplies).toBe(1200);
    expect(totalCost).toBe(24000 + 12000 + 4800 + 1200);
  });
});
