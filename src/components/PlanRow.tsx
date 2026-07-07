import './PlanRow.css'
import PlanImage from './PlanImage'
import PriceDisplay from './PriceDisplay'

interface PlanRowProps {
    label?: string
    planTier?: string
    price: number
    originalPrice?: number
}

export default function PlanRow({ label, planTier, price, originalPrice }: PlanRowProps) {
    return (
        <div className="PlanRow">
            <span className="ReviewPanel-section-label">{label}</span>
            <div className='PlaneLineItem'>
                <PlanImage variantLabel={planTier ?? ''} />
                <PriceDisplay price={price} originalPrice={originalPrice} variant="line" suffix="/mo" />
            </div>
        </div>
    )
}
