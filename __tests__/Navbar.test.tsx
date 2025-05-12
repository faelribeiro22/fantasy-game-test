import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { usePathname } from 'next/navigation';

// Mock do usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    // Reset do mock do usePathname antes de cada teste
    (usePathname as jest.Mock).mockReset();
  });

  it('deve renderizar o logo e os links de navegação', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    render(<Navbar />);

    // Verifica se o logo está presente
    expect(screen.getByText('Fantasy FC')).toBeInTheDocument();

    // Verifica se todos os links estão presentes
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Meu Time')).toBeInTheDocument();
    expect(screen.getByText('Ligas')).toBeInTheDocument();
  });

  it('deve destacar o link ativo corretamente', () => {
    (usePathname as jest.Mock).mockReturnValue('/team');
    render(<Navbar />);

    // Verifica se o link "Meu Time" está ativo
    const activeLink = screen.getByText('Meu Time');
    expect(activeLink).toHaveClass('bg-blue-600');
    expect(activeLink).toHaveClass('text-white');

    // Verifica se os outros links não estão ativos
    const inactiveLinks = [screen.getByText('Dashboard'), screen.getByText('Ligas')];
    inactiveLinks.forEach(link => {
      expect(link).not.toHaveClass('bg-blue-600');
      expect(link).not.toHaveClass('text-white');
    });
  });

  it('deve alternar o menu mobile quando o botão é clicado', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    render(<Navbar />);

    // Verifica se o menu está inicialmente fechado
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('hidden');

    // Clica no botão do menu
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    // Verifica se o menu está aberto
    expect(nav).toHaveClass('flex');
    expect(nav).not.toHaveClass('hidden');

    // Clica novamente para fechar
    fireEvent.click(menuButton);

    // Verifica se o menu está fechado
    expect(nav).toHaveClass('hidden');
    expect(nav).not.toHaveClass('flex');
  });

  it('deve mostrar o menu em formato horizontal em telas maiores', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    render(<Navbar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('md:flex-row');
    expect(nav).toHaveClass('md:flex');
  });
});