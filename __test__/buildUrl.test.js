import buildSearchByNameUrl from "../src/utils/buildUrl";
import React from "react";

describe("buildSearchByNameUrl", () => {
  const apiKey = process.env.REACT_APP_API_KEY_RA;
  it("should build a URL with default values when no arguments were provided", () => {
    const url = buildSearchByNameUrl({});
    excpect(url).toBe(
      `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&fields=id,school.name,school.city,school.state&page=0&per_page=20`
    );
  });
  it("should include the name when a name is provided", () => {
    const name = "Test College";
    const url = buildSearchByNameUrl({ name });
    expect(url).toContain(`school.name=${encodeURIComponent(name)}`);
  });

  it("should include the id when and id is provided", () => {
    const id = 1234;
    const url = buildSearchByNameUrl({ id });
    expect(url).toContain(`id=${id}`);
  });

  it("should include custom fields when we provide some", () => {
    const fields = [
      "school.school_url",
      "school.price_calculator_url",
      "school.locale",
    ];
    const url = buildSearchByNameUrl({ fields });
    expect(url).toContain(`fields=${fields.join(",")}`);
  });

  it("should use the default fields when we don't provide any fields", () => {
    const url = buildSearchByNameUrl({});
    expect(url).toContain("fields=id,school.name,school.city,school.state");
  });

  it("should calculate the correct page number since we want to display page 1 as the first page, but the API start its index at 0", () => {
    const page = 3;
    const url = buildSearchByNameUrl({ page });
    expect(url).toContain("page=2");
  });
  it("should allow use to increase the default results per page up to 100", () => {
    const perPage = 50;
    const url = buildSearchByNameUrl({ perPage });
    expect(url).toContain(`per_page=${perPage}`);
  });
  it("should not allow use to go over 100 result per page", () => {
    const perPage = 200;
    const url = buildSearchByNameUrl({ perPage });
    expect(url).toContain("per_page=100");
  });

  it("should handle a combination of parameters correctly", () => {
    const name = "Test College";
    const id = 1234;
    const fields = ["school.name", "school.state"];
    const page = 2;
    const perPage = 10;
    const url = buildSearchByNameUrl({ name, id, fields, page, perPage });
    expect(url).toBe(
      `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodeURIComponent(
        name
      )}&id=${id}&fields=${fields.join(",")}&page=${page - 1}&per_page=${perPage}`
    );
  });

  it("should correctly handle special characters in name", () => {
    const name = "College & University";
    const url = buildSearchByNameUrl({ name });
    expect(url).toContain(`school.name=${encodeURIComponent(name)}`);
  });
});
