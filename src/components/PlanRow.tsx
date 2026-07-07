import './PlanRow.css'
import PlanImage from './PlanImage'

interface PlanRowProps {
    variant: 'basic' | 'unlimited'
    price: number
    originalPrice?: number
}

function formatPrice(price: number) {
    return price === 0 ? 'FREE' : `$${price.toFixed(2)}`
}

export default function PlanRow({ variant, price, originalPrice }: PlanRowProps) {
    const planLabel = variant === 'unlimited' ? 'Unlimited' : 'Basic'

    return (
        <div className="PlanRow">
            <span className="ReviewPanel-section-label">HOME MONITORING PLANE</span>
            <div className='PlaneLineItem'>
                <PlanImage variantLabel={planLabel} />
                <div className="ReviewLineItem-price">
                    {originalPrice !== undefined && (
                        <span className="PlanRow-price-original">{formatPrice(originalPrice)}/mo</span>
                    )}
                    <span className="PlanRow-price-current">{formatPrice(price)}/mo</span>
                </div>
            </div>
        </div>
    )
}
