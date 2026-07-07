import Stepper from './Stepper'
import PriceDisplay from './PriceDisplay'
import './ReviewLineItem.css'

interface ReviewLineItemProps {
    name: string
    image: string | null
    quantity: number
    price: number
    originalPrice?: number
    min?: number
    onQuantityChange: (quantity: number) => void
}

export default function ReviewLineItem({
    name,
    image,
    quantity,
    price,
    originalPrice,
    min,
    onQuantityChange,
}: ReviewLineItemProps) {
    return (
        <div className="ReviewLineItem">
            <img src={image || "/wyze-icon.svg"} alt={name} className="ReviewLineItem-image" />
            <p className="ReviewLineItem-name">{name}</p>
            <Stepper quantity={quantity} onChange={onQuantityChange} min={min} />
            <PriceDisplay price={price} originalPrice={originalPrice} variant="line" />
        </div>
    )
}
