import './PlanRow.css'
import PlanImage from '../PlanImage/PlanImage'
import PriceDisplay from '../PriceDisplay/PriceDisplay'

interface PlanRowProps {
    planTier?: string
    price: number
    originalPrice?: number
}

export default function PlanRow({ planTier, price, originalPrice }: PlanRowProps) {
    return (
        <div className='PlanLineItem'>
            <PlanImage variantLabel={planTier ?? ''} />
            <PriceDisplay price={price} originalPrice={originalPrice} variant="line" suffix="/mo" />
        </div>
    )
}
