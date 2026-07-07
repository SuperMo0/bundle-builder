import type { BundleStep, BundleSelections, QuantityStep, PlanStep } from './bundle.config'
import type { PlanItem } from '../../types'

export interface ReviewLineItemData {
    id: string
    itemId: string
    variantKey: string
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
    selectedPlan?: PlanItem
    planLabel?: string
    totalPrice: number
    totalOriginalPrice: number
}

export function deriveReviewData(steps: BundleStep[], selections: BundleSelections): ReviewData {
    const quantitySteps = steps.filter((step): step is QuantityStep => step.selectionMode === 'quantity')
    const planStep = steps.find((step): step is PlanStep => step.selectionMode === 'single')
    const selectedPlan = planStep?.items.find((item) =>
        Object.values(selections[planStep.id]?.[item.id] ?? {}).some((qty) => qty > 0)
    )

    const sections = quantitySteps.map((step): ReviewSection => {
        const lineItems = step.items.flatMap((item): ReviewLineItemData[] => {
            const variantQuantities = selections[step.id]?.[item.id] ?? {}

            return Object.entries(variantQuantities)
                .filter(([, quantity]) => quantity > 0)
                .map(([variantKey, quantity]): ReviewLineItemData => {
                    const color = item.colors?.find((c) => c.name === variantKey)
                    const price = item.price * quantity
                    const originalPrice =
                        item.originalPrice !== undefined ? item.originalPrice * quantity : undefined

                    return {
                        id: `${item.id}::${variantKey}`,
                        itemId: item.id,
                        variantKey,
                        name: color ? `${item.name} — ${color.name}` : item.name,
                        image: color?.image ?? item.image,
                        quantity,
                        price,
                        originalPrice,
                    }
                })
        })

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

    return { sections, selectedPlan, planLabel: planStep?.reviewLabel, totalPrice, totalOriginalPrice }
}