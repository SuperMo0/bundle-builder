import BundleAccordion from './BundleAccordion'
import ReviewPanel from './ReviewPanel'
import { useBundleSelection } from './useBundleSelection'
import { useBundleSteps } from './useBundleSteps'
import "./BundleBuilder.css"

export default function BundleBuilder() {
    const steps = useBundleSteps()
    const { selections, getSelectedCount, setQuantity } = useBundleSelection(steps)

    return (
        <div className="BundleBuilder">
            <section className="BundleBuilder-steps" aria-label="Bundle steps">
                <BundleAccordion
                    selections={selections}
                    getSelectedCount={getSelectedCount}
                    setQuantity={setQuantity}
                />
            </section>

            <section className="BundleBuilder-review">
                <div className="BundleBuilder-review-inner">
                    <ReviewPanel selections={selections} setQuantity={setQuantity} />
                </div>
            </section>
        </div>
    )
}
