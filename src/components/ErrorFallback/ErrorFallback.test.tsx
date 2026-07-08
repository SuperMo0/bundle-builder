import { describe, it, expect, vi } from 'vitest'
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback'

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) throw new Error('boom')
    return <p>Recovered content</p>
}

function Wrapper() {
    const [shouldThrow, setShouldThrow] = useState(true)

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setShouldThrow(false)}>
            <Bomb shouldThrow={shouldThrow} />
        </ErrorBoundary>
    )
}

describe('ErrorFallback', () => {
    it('renders in place of a child that throws during render', () => {
        // Suppress the expected React error-boundary console.error noise for this test.
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

        render(<Wrapper />)

        expect(screen.getByRole('alert')).toHaveTextContent("Something went wrong.")

        consoleError.mockRestore()
    })

    it('re-renders the children after the user clicks "Try again"', async () => {
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
        const user = userEvent.setup()

        render(<Wrapper />)
        await user.click(screen.getByRole('button', { name: 'Try again' }))

        expect(screen.getByText('Recovered content')).toBeInTheDocument()

        consoleError.mockRestore()
    })
})
