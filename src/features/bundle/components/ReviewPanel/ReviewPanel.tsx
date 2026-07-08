import { useBundleSteps } from '../../hooks/useBundleSteps'
import type { BundleSelections } from '../../bundle.config'
import { deriveReviewData } from '../../deriveReview'
import ReviewLineItem from '../../../../components/ReviewLineItem/ReviewLineItem'
import PlanRow from '../../../../components/PlanRow/PlanRow'
import ReviewSummary from '../../../../components/ReviewSummary/ReviewSummary'
import './ReviewPanel.css'

interface ReviewPanelProps {
    selections: BundleSelections
    setQuantity: (stepId: string, itemId: string, variantKey: string, qty: number) => void
    getMinQuantity: (stepId: string, itemId: string) => number
    getMaxQuantity: (stepId: string, itemId: string) => number
    saveSnapshot: () => void
}

export default function ReviewPanel({ selections, setQuantity, getMinQuantity, getMaxQuantity, saveSnapshot }: ReviewPanelProps) {
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
                                        min={getMinQuantity(section.id, lineItem.itemId)}
                                        max={getMaxQuantity(section.id, lineItem.itemId)}
                                        onQuantityChange={(qty) =>
                                            setQuantity(section.id, lineItem.itemId, lineItem.variantKey, qty)
                                        }
                                    />
                                ))}
                            </div>
                        )
                )}

                {selectedPlan && (
                    <>
                        <div className="ReviewPanel-section" key={selectedPlan.id}>
                            <span className="ReviewPanel-section-label">{planLabel}</span>
                            <PlanRow
                                planTier={selectedPlan.planTier}
                                price={selectedPlan.price}
                                originalPrice={selectedPlan.originalPrice}
                            />
                        </div>
                    </>
                )}

                <ReviewSummary
                    totalPrice={totalPrice}
                    totalOriginalPrice={totalOriginalPrice}
                    onSave={saveSnapshot}
                />
            </div>
        </>
    )
}