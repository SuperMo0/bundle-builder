import Stepper from './Stepper'
import './ReviewLineItem.css'

interface ReviewLineItemProps {
    name: string
    image: string | null
    quantity: number
    price: number
    originalPrice?: number
    onQuantityChange: (quantity: number) => void
}

function formatPrice(price: number) {
    return price === 0 ? 'FREE' : `$${price.toFixed(2)}`
}

export default function ReviewLineItem({
    name,
    image,
    quantity,
    price,
    originalPrice,
    onQuantityChange,
}: ReviewLineItemProps) {
    return (
        <div className="ReviewLineItem">
            <img src={image || "/wyze-icon.svg"} alt={name} className="ReviewLineItem-image" />
            <p className="ReviewLineItem-name">{name}</p>
            <Stepper quantity={quantity} onChange={onQuantityChange} />
            <div className="ReviewLineItem-price">
                {originalPrice !== undefined && (
                    <span className="ReviewLineItem-price-original">{formatPrice(originalPrice)}</span>
                )}
                <span className="ReviewLineItem-price-current">{formatPrice(price)}</span>
            </div>
        </div>
    )
}
