import { bundleSteps } from './bundle.config'
import ReviewLineItem from '../../components/ReviewLineItem'
import PlanRow from '../../components/PlanRow'
import ReviewSummary from '../../components/ReviewSummary'
import type { BundleSelections } from './bundle.config'
import './ReviewPanel.css'

interface ReviewLineItemData {
    id: string
    name: string
    image: string | null
    quantity: number
    price: number
    originalPrice?: number
}

interface ReviewPanelProps {
    selections: BundleSelections
    setQuantity: (stepId: string, itemId: string, qty: number) => void
}

export default function ReviewPanel({ selections, setQuantity }: ReviewPanelProps) {
    const quantitySteps = bundleSteps.filter((step) => step.selectionMode === 'quantity')
    const planStep = bundleSteps.find((step) => step.selectionMode === 'single')
    const selectedPlan = planStep?.items.find(
        (item) => (selections[planStep.id]?.[item.id] ?? 0) > 0
    )

    const sections = quantitySteps.map((step) => {
        const lineItems = step.items
            .map((item): ReviewLineItemData | null => {
                const quantity = selections[step.id]?.[item.id]
                if (quantity === 0) return null

                const price = item.price * quantity
                const originalPrice = item.originalPrice !== undefined ? item.originalPrice * quantity : undefined

                return { id: item.id, name: item.name, image: item.image, quantity, price, originalPrice }
            })
            .filter((lineItem) => lineItem !== null)

        return { id: step.id, label: step.reviewLabel, lineItems }
    })

    const lineItemTotals = sections.reduce(
        (totals, section) =>
            section.lineItems.reduce(
                (acc, lineItem) => ({
                    price: acc.price + lineItem.price,
                    originalPrice: acc.originalPrice + (lineItem.originalPrice ?? lineItem.price),
                }),
                totals
            ),
        { price: 0, originalPrice: 0 }
    )

    const totalPrice = lineItemTotals.price + (selectedPlan?.price ?? 0)
    const totalOriginalPrice =
        lineItemTotals.originalPrice + (selectedPlan ? selectedPlan.originalPrice ?? selectedPlan.price : 0)

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
                    <>
                        <PlanRow
                            variant={selectedPlan.id === 'cam-unlimited' ? 'unlimited' : 'basic'}
                            price={selectedPlan.price}
                            originalPrice={selectedPlan.originalPrice}
                        />
                    </>
                )}

                <ReviewSummary totalPrice={totalPrice} totalOriginalPrice={totalOriginalPrice} />
            </div>
        </>
    )
}
