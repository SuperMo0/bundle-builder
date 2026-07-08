import type { FallbackProps } from 'react-error-boundary'
import './ErrorFallback.css'

export default function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
    return (
        <div className="ErrorFallback" role="alert">
            <p className="ErrorFallback-title">Something went wrong.</p>
            <p className="ErrorFallback-description">
                Your bundle couldn't be displayed. Try again, or refresh the page.
            </p>
            <button type="button" className="ErrorFallback-retry" onClick={resetErrorBoundary}>
                Try again
            </button>
        </div>
    )
}
