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
