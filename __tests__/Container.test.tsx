import { render } from "@testing-library/react";
import Container from "../components/Container";

describe('Container', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <p>Test Content</p>
      </Container>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    const { container } = render(
      <Container>
        <p>Styled Content</p>
      </Container>
    );

    expect(container.firstChild).toHaveClass(
      'max-w-4xl mx-auto w-full p-6 bg-white shadow-md rounded-lg'
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Container>
        <p>Snapshot Content</p>
      </Container>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles empty children', () => {
    const { container } = render(
      <Container>
        <p></p>
      </Container>
    );

    expect(container.firstChild).toHaveTextContent('');
  });

  it('handles null children', () => {
    const { container } = render(
      <Container>{null}</Container>
    );

    expect(container.firstChild).toBeEmptyDOMElement();
  });
}
);