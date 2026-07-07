import type { BundleItem } from '../../types'
import type { BundleStep, BundleSelections } from './bundle.config'

export interface ReviewLineItemData {
    id: string
    name: string
    image: string | null
    quantity: number
    price: number
    originalPrice?: number
}

export interface ReviewSection {
    id: string
    label?: string
    lineItems: ReviewLineItemData[]
}

export interface ReviewData {
    sections: ReviewSection[]
    selectedPlan?: BundleItem
    totalPrice: number
    totalOriginalPrice: number
}

export function deriveReviewData(steps: BundleStep[], selections: BundleSelections): ReviewData {
    const quantitySteps = steps.filter((step) => step.selectionMode === 'quantity')
    const planStep = steps.find((step) => step.selectionMode === 'single')
    const selectedPlan = planStep?.items.find(
        (item) => (selections[planStep.id]?.[item.id] ?? 0) > 0
    )

    const sections = quantitySteps.map((step): ReviewSection => {
        const lineItems = step.items
            .map((item): ReviewLineItemData | null => {
                const quantity = selections[step.id]?.[item.id] ?? 0
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

    return { sections, selectedPlan, totalPrice, totalOriginalPrice }
}