import './PlanRow.css'
import PlanImage from './PlanImage'
import PriceDisplay from './PriceDisplay'

interface PlanRowProps {
    variant: 'basic' | 'unlimited'
    price: number
    originalPrice?: number
}

export default function PlanRow({ variant, price, originalPrice }: PlanRowProps) {
    const planLabel = variant === 'unlimited' ? 'Unlimited' : 'Basic'

    return (
        <div className="PlanRow">
            <span className="ReviewPanel-section-label">HOME MONITORING PLANE</span>
            <div className='PlaneLineItem'>
                <PlanImage variantLabel={planLabel} />
                <PriceDisplay price={price} originalPrice={originalPrice} variant="line" suffix="/mo" />
            </div>
        </div>
    )
}
