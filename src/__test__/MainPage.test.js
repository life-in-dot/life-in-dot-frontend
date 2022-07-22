import { render, screen, renderHook } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";

import MainPage from "../pages/MainPage";
import birthdayState from "../lib/recoil/userYears";

describe("MainPage", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Router>
          <MainPage />
        </Router>
      </RecoilRoot>,
    );
  });

  it("MainPage renders with the default birthday state value.", () => {
    const { result } = renderHook(() => useRecoilValue(birthdayState), {
      wrapper: RecoilRoot,
    });

    const userBirthday = result.current;
    const { year, month, date } = userBirthday;

    const birthYear = year.toString();
    const birthMonth = month.toString();
    const birthDate = date.toString();

    expect(screen.getByDisplayValue(birthYear)).toBeInTheDocument();
    expect(screen.getByDisplayValue(birthMonth)).toBeInTheDocument();
    expect(screen.getByDisplayValue(birthDate)).toBeInTheDocument();
  });
});
