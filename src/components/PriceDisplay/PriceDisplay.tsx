import './PriceDisplay.css'

export type PriceDisplayVariant = 'card' | 'line' | 'total'

interface PriceDisplayProps {
    price: number
    originalPrice?: number
    suffix?: string
    variant?: PriceDisplayVariant
}

function formatPrice(price: number) {
    return price === 0 ? 'FREE' : `$${price.toFixed(2)}`
}

export default function PriceDisplay({ price, originalPrice, suffix, variant = 'line' }: PriceDisplayProps) {
    const hasDiscount = originalPrice !== undefined && originalPrice > price

    return (
        <div className="PriceDisplay" data-variant={variant}>
            {hasDiscount && (
                <span className="PriceDisplay-original">
                    {formatPrice(originalPrice)}{suffix}
                </span>
            )}
            <span className="PriceDisplay-current">
                {formatPrice(price)}{suffix}
            </span>
        </div>
    )
}