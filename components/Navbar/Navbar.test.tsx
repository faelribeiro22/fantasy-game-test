import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from 'next-router-mock';
import Navbar from "./Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    mockRouter.push('/dashboard'); // Set the initial URL for each test
  });
  it("renders correctly", () => {
    const { getByText } = render(<Navbar />);
    expect(getByText("Fantasy FC")).toBeInTheDocument();
  });

  it("toggles menu on button click", async () => {
    const { getByLabelText, getByText } = render(<Navbar />);
    const button = getByLabelText("Toggle menu");

    await userEvent.click(button);
    expect(getByText("Dashboard")).toBeVisible();
  });

  it("applies active class to current page link", () => {
    const { getByText } = render(<Navbar />);
    expect(getByText("Dashboard")).toHaveClass("block px-3 py-1 rounded transition-colors font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100");
  });

  it("check if link is active", async () => {
    const { getByText } = render(<Navbar />);
    const link = getByText("Dashboard");
    expect(link).toHaveClass("text-gray-700 hover:text-blue-600 hover:bg-gray-100");
  }
  );
});