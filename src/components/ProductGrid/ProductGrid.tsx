import type { QuantityItem } from '../../types'
import ProductCard from '../Card/ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
    items: QuantityItem[]
    quantities: Record<string, Record<string, number>>
    onQuantityChange: (itemId: string, variantKey: string, quantity: number) => void
    getMinQuantity: (itemId: string) => number
    getMaxQuantity: (itemId: string) => number
}

export default function ProductGrid({ items, quantities, onQuantityChange, getMinQuantity, getMaxQuantity }: ProductGridProps) {
    return (
        <div className="ProductGrid">
            {items.map((item) => (
                <ProductCard
                    key={item.id}
                    bundleItem={item}
                    quantities={quantities[item.id] ?? {}}
                    onQuantityChange={onQuantityChange}
                    min={getMinQuantity(item.id)}
                    max={getMaxQuantity(item.id)}
                />
            ))}
        </div>
    )
}