import { render, screen } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import YearPage from "../pages/YearPage";

describe("YearPage", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Router>
          <YearPage />
        </Router>
      </RecoilRoot>,
    );
  });

  it("YearPage renders with year-svg", () => {
    expect(screen.getByRole("svg")).toBeInTheDocument();
  });
});
