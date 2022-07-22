import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import AppHeader from "../components/AppHeader";
import MainPage from "../pages/MainPage";

describe("AppHeader", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router>
      </RecoilRoot>,
    );
  });

  it("Image and texts are rendered on the AppHeader.", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/life in dot./i)).toBeInTheDocument();
  });

  it("Brand logo redirects users to MainPage", () => {
    const brandLogo = screen.getByText(/life in dot./i);
    expect(brandLogo).toBeInTheDocument();

    userEvent.click(brandLogo);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
