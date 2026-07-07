import { RadioGroup } from 'radix-ui'
import type { SelectionMode } from '../types'
import { DEFAULT_VARIANT_KEY } from '../types'
import type { ProductCardItem } from './ProductCard'
import ProductCard from './ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
    items: ProductCardItem[]
    quantities: Record<string, Record<string, number>>
    onQuantityChange: (itemId: string, variantKey: string, quantity: number) => void
    getMinQuantity: (itemId: string) => number

    selectionMode: SelectionMode
}

export default function ProductGrid({ items, quantities, onQuantityChange, getMinQuantity, selectionMode }: ProductGridProps) {
    if (selectionMode === 'single') {
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
                        <ProductCard
                            bundleItem={item}
                            quantities={quantities[item.id] ?? {}}
                            onQuantityChange={onQuantityChange}
                            min={getMinQuantity(item.id)}
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
                    quantities={quantities[item.id] ?? {}}
                    onQuantityChange={onQuantityChange}
                    min={getMinQuantity(item.id)}
                    selectionMode={selectionMode}
                />
            ))}
        </div>
    )
}