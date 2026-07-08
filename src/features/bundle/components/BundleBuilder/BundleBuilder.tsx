import BundleAccordion from '../BundleAccordion/BundleAccordion'
import ReviewPanel from '../ReviewPanel/ReviewPanel'
import { useBundleSelection } from '../../hooks/useBundleSelection'
import { useBundleSteps } from '../../hooks/useBundleSteps'
import "./BundleBuilder.css"

export default function BundleBuilder() {
    const steps = useBundleSteps()
    const { selections, getSelectedCount, setQuantity, getMinQuantity, getMaxQuantity, saveSnapshot } = useBundleSelection(steps)

    return (
        <div className="BundleBuilder">
            <section className="BundleBuilder-steps" aria-label="Bundle steps">
                <BundleAccordion
                    selections={selections}
                    getSelectedCount={getSelectedCount}
                    setQuantity={setQuantity}
                    getMinQuantity={getMinQuantity}
                    getMaxQuantity={getMaxQuantity}
                />
            </section>

            <section className="BundleBuilder-review">
                <div className="BundleBuilder-review-inner">
                    <ReviewPanel
                        selections={selections}
                        setQuantity={setQuantity}
                        getMinQuantity={getMinQuantity}
                        getMaxQuantity={getMaxQuantity}
                        saveSnapshot={saveSnapshot}
                    />
                </div>
            </section>
        </div>
    )
}
