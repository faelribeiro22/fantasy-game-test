import useSWR from "swr";
import PlayerList from "../components/PlayerList";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { TeamProvider, useTeam } from "../context/TeamContext";
import swr from "swr";

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockSWR = swr as jest.Mock;

describe("PlayerList", () => {
  const mockPlayers = [
    { id: "1", name: "Jogador 1", position: "Atacante", price: 40 },
    { id: "2", name: "Jogador 2", position: "Meio-campo", price: 20 },
    { id: "3", name: "Jogador 3", position: "Defensor", price: 300 },
  ];

  const mockBuyPlayer = jest.fn();
  const mockBudget = 50;
  const mockRoster = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders player list", async () => {
    mockSWR.mockReturnValue({
      data: mockPlayers,
      error: null,
    });
    render(<TeamProvider><PlayerList /></TeamProvider>);

    expect(screen.getByText("Jogadores — Orçamento: R$100")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Jogador 1")).toBeInTheDocument();
      expect(screen.getByText("Jogador 2")).toBeInTheDocument();
      expect(screen.getByText("Jogador 3")).toBeInTheDocument();
    });
  });

  test("simulate click to buy a player", async () => {
    mockSWR.mockReturnValue({
      data: mockPlayers,
      error: null,
    });
    render(<TeamProvider><PlayerList /></TeamProvider>);
    const buyButtons = screen.getByTestId("buy-player-0");

    await userEvent.click(buyButtons);
    waitFor(() => {
      expect(screen.getByText("Jogador 1")).not.toBeInTheDocument();
    });
  });

  test("shows is note price is greater than budget", async () => {
    mockSWR.mockReturnValue({
      data: mockPlayers,
      error: null,
    });
    render(<TeamProvider><PlayerList /></TeamProvider>);

    waitFor(() => {
      expect(screen.getByTestId("buy-player-2")).toHaveClass("bg-gray-300 text-gray-500 cursor-not-allowed");
    });
  });

  test("shows message carregando if not players", async () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
    });
    render(<TeamProvider><PlayerList /></TeamProvider>);

    waitFor(() => {
      expect(screen.getByText("Carregando...")).toBeInTheDocument();
    });
  })

  test("shows error message", async () => {
    mockSWR.mockReturnValue({
      data: null,
      error: new Error("Falha ao carregar jogadores."),
    });
    render(<TeamProvider><PlayerList /></TeamProvider>);

    waitFor(() => {
      expect(screen.getByText("Falha ao carregar jogadores.")).toBeInTheDocument();
    });
  })
});