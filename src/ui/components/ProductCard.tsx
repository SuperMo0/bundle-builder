import { useState } from 'react'
import type { BundleItem } from '../../types'
import Stepper from './Stepper'
import VariantPicker from './VariantPicker'
import './ProductCard.css'

interface ProductCardProps {
    bundleItem: BundleItem
    quantity: number
    onQuantityChange: (itemId: string, quantity: number) => void
}

function formatPrice(price: number) {
    return price === 0 ? 'FREE' : `$${price.toFixed(2)}`
}

export default function ProductCard({ bundleItem, quantity, onQuantityChange }: ProductCardProps) {
    const { id, name, description, image, price, originalPrice, colors, required } = bundleItem
    const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name)

    const hasDiscount = originalPrice !== undefined && originalPrice > price
    const savingsPercent = hasDiscount
        ? Math.round((1 - price / originalPrice) * 100)
        : null

    return (
        <div className="ProductCard">
            <div className="ProductCard-media">
                {savingsPercent !== null && (
                    <span className="ProductCard-badge">Save {savingsPercent}%</span>
                )}
                <img src={image} alt={name} className="ProductCard-image" />
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
                            onChange={(qty) => onQuantityChange(id, qty)}
                            min={required ? 1 : 0}
                        />

                        <div className="ProductCard-price">
                            {hasDiscount && (
                                <span className="ProductCard-price-original">{formatPrice(originalPrice)}</span>
                            )}
                            <span className="ProductCard-price-current">{formatPrice(price)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
