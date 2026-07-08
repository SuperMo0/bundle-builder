import Stepper from '../Stepper/Stepper'
import PriceDisplay from '../PriceDisplay/PriceDisplay'
import { publicAsset } from '../../lib/publicAsset'
import './ReviewLineItem.css'

interface ReviewLineItemProps {
    name: string
    image: string | null
    quantity: number
    price: number
    originalPrice?: number
    min?: number
    max?: number
    onQuantityChange: (quantity: number) => void
}

export default function ReviewLineItem({
    name,
    image,
    quantity,
    price,
    originalPrice,
    min,
    max,
    onQuantityChange,
}: ReviewLineItemProps) {
    return (
        <div className="ReviewLineItem">
            <img src={publicAsset(image || "/icons/product-placeholder.svg")} alt={name} className="ReviewLineItem-image" />
            <p className="ReviewLineItem-name">{name}</p>
            <Stepper quantity={quantity} onChange={onQuantityChange} min={min} max={max} />
            <PriceDisplay price={price} originalPrice={originalPrice} variant="line" />
        </div>
    )
}
