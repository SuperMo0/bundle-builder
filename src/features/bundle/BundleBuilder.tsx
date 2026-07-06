// features/bundle/BundleBuilder.tsx
import BundleAccordion from './BundleAccordion'
import ReviewPanel from './ReviewPanel'
import { useBundleSelection } from './useBundleSelection'
import { bundleSteps } from './bundle.config'

export default function BundleBuilder() {
    const { selections, getSelectedCount, setQuantity } = useBundleSelection(bundleSteps)

    return (
        <>
            <section className="PageSteps" aria-label="Bundle steps">
                <BundleAccordion
                    selections={selections}
                    getSelectedCount={getSelectedCount}
                    setQuantity={setQuantity}
                />
            </section>

            <section className="PageReview">
                <div className="PageReview-inner">
                    <span className="ReviewPanel-eyebrow">Review</span>
                    <ReviewPanel selections={selections} setQuantity={setQuantity} />
                </div>
            </section>
        </>
    )
}
