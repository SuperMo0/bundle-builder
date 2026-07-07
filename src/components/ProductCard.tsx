import { useState } from 'react'
import type { ComponentProps } from 'react'
import type { BundleItem, ColorVariant, SelectionMode } from '../types'
import Stepper from './Stepper'
import VariantPicker from './VariantPicker'
import PriceDisplay from './PriceDisplay'
import './ProductCard.css'

export interface ProductCardItem extends BundleItem {
    colors?: ColorVariant[]
    required?: boolean
}

interface ProductCardProps extends ComponentProps<'div'> {
    bundleItem: ProductCardItem
    quantity: number
    onQuantityChange: (itemId: string, quantity: number) => void

    selectionMode: SelectionMode
}

export default function ProductCard({
    bundleItem,
    quantity,
    onQuantityChange,
    selectionMode,
    ref,
    ...radioProps
}: ProductCardProps) {
    const { id, name, description, image, price, originalPrice, colors, required } = bundleItem
    const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name)

    const hasDiscount = originalPrice !== undefined && originalPrice > price
    const savingsPercent = hasDiscount
        ? Math.round((1 - price / originalPrice) * 100)
        : null

    return (
        <div
            {...radioProps}
            ref={ref}
            className="ProductCard"
            data-selected={quantity > 0 || undefined}
        >
            <div className="ProductCard-media">
                {savingsPercent !== null && (
                    <span className="ProductCard-badge">Save {savingsPercent}%</span>
                )}
                <img src={image || "/wyze-icon.svg"} alt={name} className="ProductCard-image" />
            </div>

            <div className="ProductCard-content">
                <div className="ProductCard-meta">
                    <p className="ProductCard-name">{name}</p>
                    <p className="ProductCard-description">
                        {description} <a href="#" className="ProductCard-learn-more">Learn More</a>
                    </p>
                </div>

                <div className="ProductCard-footer">
                    {colors && selectedColor && (
                        <VariantPicker options={colors} value={selectedColor} onChange={setSelectedColor} />
                    )}

                    <div className="ProductCard-controls">
                        {selectionMode === 'quantity' && (
                            <Stepper
                                quantity={quantity}
                                onChange={(qty) => onQuantityChange(id, qty)}
                                min={required ? 1 : 0}
                            />
                        )}
                        <PriceDisplay price={price} originalPrice={originalPrice} variant="card" />
                    </div>
                </div>
            </div>
        </div>
    )
}