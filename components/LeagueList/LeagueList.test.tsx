import { render, waitFor } from "@testing-library/react";
import LeagueList from "./LeagueList";
import swr from "swr";

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockSWR = swr as jest.Mock;

describe("LeagueList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it("shoould show loading state", async () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
    });
    const screen = render(<LeagueList />);
    expect(await screen.findByText("Carregando...")).toBeInTheDocument();
  });

   it("renders correctly", async () => {
      mockSWR.mockReturnValue({
        data: [
          {
            id: "1",
            name: "Série A",
            teams: [
              { id: "1", name: "Time 1" },
              { id: "2", name: "Time 2" },
            ],
          },
          {
            id: "2",
            name: "Liga 2",
            teams: [
              { id: "3", name: "Time 3" },
              { id: "4", name: "Time 4" },
            ],
          },
        ],
        error: null,
      });
      const screen = render(<LeagueList />);

      expect(await screen.findByText("Série A")).toBeInTheDocument();
   });

    it("displays league items", () => {
      const { getByText } = render(<LeagueList />);
      expect(getByText("Série A")).toBeInTheDocument();
       expect(getByText("Liga 2")).toBeInTheDocument();
    });

    it("should show error state", async () => {
      mockSWR.mockReturnValue({
        data: null,
        error: new Error("Failed to fetch"),
      });
  
      const { getByText } = render(<LeagueList />);
      await waitFor(() => {
        expect(getByText("Erro ao carregar ligas.")).toBeInTheDocument();
      });
    });

    it("matches snapshot", () => {
      mockSWR.mockReturnValue({
        data: [
          {
            id: "1",
            name: "Série A",
            teams: [
              { id: "1", name: "Time 1" },
              { id: "2", name: "Time 2" },
            ],
          },
          {
            id: "2",
            name: "Liga 2",
            teams: [
              { id: "3", name: "Time 3" },
              { id: "4", name: "Time 4" },
            ],
          },
        ],
        error: null,
      });
      const { asFragment } = render(<LeagueList />);
      expect(asFragment()).toMatchSnapshot();
    });
});

    