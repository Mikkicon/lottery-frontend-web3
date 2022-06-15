import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    window.ethereum = {
      request: (_: any) => {},
      on: (_: any) => {},
    };
  });

  test("renders Lottery", () => {
    render(<App />);
    const linkElement = screen.getByText(/Lottery/i);
    expect(linkElement).toBeInTheDocument();
  });
});
