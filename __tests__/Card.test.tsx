import { render, screen } from '@testing-library/react'
import Card from '../components/Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Test Content</p>
      </Card>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    const { container } = render(
      <Card>
        <p>Styled Content</p>
      </Card>
    )

    expect(container.firstChild).toHaveClass('p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow mb-4')
  }
  )
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Card>
        <p>Snapshot Content</p>
      </Card>
    )

    expect(asFragment()).toMatchSnapshot()
  })
  it('handles empty children', () => {
    const { container } = render(
      <Card>
        <p></p>
      </Card>
    )

    expect(container.firstChild).toHaveTextContent('')
  }
  )
  it('handles null children', () => {
    const { container } = render(
      <Card>
        {null}
      </Card>
    )

    expect(container.firstChild).toBeEmptyDOMElement()
  }
  )
}
)