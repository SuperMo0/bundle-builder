import { RadioGroup } from 'radix-ui'
import type { PlanItem } from '../types'
import { DEFAULT_VARIANT_KEY } from '../types'
import PlanCard from './PlanCard'
import './ProductGrid.css'

interface PlanGridProps {
    items: PlanItem[]
    quantities: Record<string, Record<string, number>>
    onQuantityChange: (itemId: string, variantKey: string, quantity: number) => void
}

export default function PlanGrid({ items, quantities, onQuantityChange }: PlanGridProps) {
    const selectedId = items.find((item) =>
        Object.values(quantities[item.id] ?? {}).some((qty) => qty > 0)
    )?.id

    return (
        <RadioGroup.Root
            className="ProductGrid"
            value={selectedId}
            onValueChange={(id) => onQuantityChange(id, DEFAULT_VARIANT_KEY, 1)}
        >
            {items.map((item) => (
                <RadioGroup.Item key={item.id} value={item.id} asChild>
                    <PlanCard bundleItem={item} />
                </RadioGroup.Item>
            ))}
        </RadioGroup.Root>
    )
}
