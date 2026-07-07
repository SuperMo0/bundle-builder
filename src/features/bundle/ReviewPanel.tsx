import { useBundleSteps } from './useBundleSteps'
import type { BundleSelections } from './bundle.config'
import { deriveReviewData } from './deriveReview'
import ReviewLineItem from '../../components/ReviewLineItem'
import PlanRow from '../../components/PlanRow'
import ReviewSummary from '../../components/ReviewSummary'
import './ReviewPanel.css'

interface ReviewPanelProps {
    selections: BundleSelections
    setQuantity: (stepId: string, itemId: string, qty: number) => void
}

export default function ReviewPanel({ selections, setQuantity }: ReviewPanelProps) {
    const bundleSteps = useBundleSteps()
    const { sections, selectedPlan, planLabel, totalPrice, totalOriginalPrice } = deriveReviewData(bundleSteps, selections)

    return (
        <>
            <span className="ReviewPanel-eyebrow">Review</span>
            <div className="ReviewPanel container">
                <div className="ReviewPanel-header">
                    <h2 className="ReviewPanel-title">Your security system</h2>
                    <p className="ReviewPanel-description">
                        Review your personalized protection system designed to keep what matters most safe.
                    </p>
                </div>

                {sections.map(
                    (section) =>
                        section.lineItems.length > 0 && (
                            <div className="ReviewPanel-section" key={section.id}>
                                <span className="ReviewPanel-section-label">{section.label}</span>
                                {section.lineItems.map((lineItem) => (
                                    <ReviewLineItem
                                        key={lineItem.id}
                                        name={lineItem.name}
                                        image={lineItem.image}
                                        quantity={lineItem.quantity}
                                        price={lineItem.price}
                                        originalPrice={lineItem.originalPrice}
                                        onQuantityChange={(qty) => setQuantity(section.id, lineItem.id, qty)}
                                    />
                                ))}
                            </div>
                        )
                )}

                {selectedPlan && (
                    <PlanRow
                        label={planLabel}
                        planTier={selectedPlan.planTier}
                        price={selectedPlan.price}
                        originalPrice={selectedPlan.originalPrice}
                    />
                )}

                <ReviewSummary totalPrice={totalPrice} totalOriginalPrice={totalOriginalPrice} />
            </div>
        </>
    )
}