import { render } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Navbar />);
    expect(getByText("Fantasy FC")).toBeInTheDocument();
  });

  it("toggles menu on button click", () => {
    const { getByLabelText, getByText } = render(<Navbar />);
    const button = getByLabelText("Toggle menu");
    button.click();
    expect(getByText("Dashboard")).toBeVisible();
  });

  it("applies active class to current page link", () => {
    const { getByText } = render(<Navbar />);
    expect(getByText("Dashboard")).toHaveClass("block px-3 py-1 rounded transition-colors font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100");
  });
});