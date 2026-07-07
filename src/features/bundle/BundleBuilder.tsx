import BundleAccordion from './BundleAccordion'
import ReviewPanel from './ReviewPanel'
import { useBundleSelection } from './useBundleSelection'
import { useBundleSteps } from './useBundleSteps'
import "./BundleBuilder.css"

export default function BundleBuilder() {
    const steps = useBundleSteps()
    const { selections, getSelectedCount, setQuantity, getMinQuantity, saveSnapshot } = useBundleSelection(steps)

    return (
        <div className="BundleBuilder">
            <section className="BundleBuilder-steps" aria-label="Bundle steps">
                <BundleAccordion
                    selections={selections}
                    getSelectedCount={getSelectedCount}
                    setQuantity={setQuantity}
                    getMinQuantity={getMinQuantity}
                />
            </section>

            <section className="BundleBuilder-review">
                <div className="BundleBuilder-review-inner">
                    <ReviewPanel
                        selections={selections}
                        setQuantity={setQuantity}
                        getMinQuantity={getMinQuantity}
                        saveSnapshot={saveSnapshot}
                    />
                </div>
            </section>
        </div>
    )
}
