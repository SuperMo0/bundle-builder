import type { ComponentProps } from 'react'
import type { PlanItem } from '../types'
import PriceDisplay from './PriceDisplay'
import './Card.css'

interface PlanCardProps extends ComponentProps<'div'> {
    bundleItem: PlanItem
}

export default function PlanCard({ bundleItem, ref, ...radioProps }: PlanCardProps) {
    const { name, description, image, price, originalPrice } = bundleItem

    const hasDiscount = originalPrice !== undefined && originalPrice > price
    const savingsPercent = hasDiscount
        ? Math.round((1 - price / originalPrice) * 100)
        : null

    return (
        <div {...radioProps} ref={ref} className="ProductCard">
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
                    <div className="ProductCard-controls">
                        <PriceDisplay price={price} originalPrice={originalPrice} variant="card" />
                    </div>
                </div>
            </div>
        </div>
    )
}
