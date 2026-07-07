import { useState } from 'react'
import type { QuantityItem } from '../types'
import { DEFAULT_VARIANT_KEY } from '../types'
import Stepper from './Stepper'
import VariantPicker from './VariantPicker'
import PriceDisplay from './PriceDisplay'
import './Card.css'


interface ProductCardProps {
    bundleItem: QuantityItem
    quantities: Record<string, number>
    onQuantityChange: (itemId: string, variantKey: string, quantity: number) => void
    min: number
}

export default function ProductCard({ bundleItem, quantities, onQuantityChange, min }: ProductCardProps) {
    const { id, name, description, image, price, originalPrice, colors } = bundleItem
    const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name)

    const variantKey = selectedColor ?? DEFAULT_VARIANT_KEY
    const quantity = quantities[variantKey] ?? 0
    const isSelected = Object.values(quantities).some((qty) => qty > 0)

    const hasDiscount = originalPrice !== undefined && originalPrice > price
    const savingsPercent = hasDiscount
        ? Math.round((1 - price / originalPrice) * 100)
        : null

    return (
        <div className="ProductCard" data-selected={isSelected || undefined}>
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
                        <Stepper
                            quantity={quantity}
                            onChange={(qty) => onQuantityChange(id, variantKey, qty)}
                            min={min}
                        />
                        <PriceDisplay price={price} originalPrice={originalPrice} variant="card" />
                    </div>
                </div>
            </div>
        </div>
    )
}