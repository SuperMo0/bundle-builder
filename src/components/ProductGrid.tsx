import { RadioGroup } from 'radix-ui'
import type { SelectionMode } from '../types'
import type { ProductCardItem } from './ProductCard'
import ProductCard from './ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
    items: ProductCardItem[]
    quantities: Record<string, number>
    onQuantityChange: (itemId: string, quantity: number) => void

    selectionMode: SelectionMode
}

export default function ProductGrid({ items, quantities, onQuantityChange, selectionMode }: ProductGridProps) {
    if (selectionMode === 'single') {
        const selectedId = Object.keys(quantities).find((id) => quantities[id] > 0)

        return (
            <RadioGroup.Root
                className="ProductGrid"
                value={selectedId}
                onValueChange={(id) => onQuantityChange(id, 1)}
            >
                {items.map((item) => (
                    <RadioGroup.Item key={item.id} value={item.id} asChild>
                        <ProductCard
                            bundleItem={item}
                            quantity={quantities[item.id] ?? 0}
                            onQuantityChange={onQuantityChange}
                            selectionMode={selectionMode}
                        />
                    </RadioGroup.Item>
                ))}
            </RadioGroup.Root>
        )
    }

    return (
        <div className="ProductGrid">
            {items.map((item) => (
                <ProductCard
                    key={item.id}
                    bundleItem={item}
                    quantity={quantities[item.id] ?? 0}
                    onQuantityChange={onQuantityChange}
                    selectionMode={selectionMode}
                />
            ))}
        </div>
    )
}