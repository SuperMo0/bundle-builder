import type { BundleItem } from '../types'
import ProductCard from './ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
    items: BundleItem[]
    quantities: Record<string, number>
    onQuantityChange: (itemId: string, quantity: number) => void

    selectionMode: 'quantity' | 'single'
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
