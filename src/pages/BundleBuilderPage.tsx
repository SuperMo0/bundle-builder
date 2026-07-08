import { ErrorBoundary } from "react-error-boundary";
import BundleBuilder from "../features/bundle/components/BundleBuilder/BundleBuilder";
import ErrorFallback from "../components/ErrorFallback/ErrorFallback";
import './BundleBuilderPage.css'

export default function BundleBuilderPage() {
    return (
        <>
            <header className="PageHeader">
                <h1 className="PageHeader-title">Let's get started!</h1>
            </header>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <BundleBuilder />
            </ErrorBoundary>
        </>
    )
}
