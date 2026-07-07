import { useState } from 'react'
import './ReviewSummary.css'
import PriceDisplay from './PriceDisplay'

interface ReviewSummaryProps {
    totalPrice: number
    totalOriginalPrice: number
    onSave: () => void
}

function formatPrice(price: number) {
    return `$${price.toFixed(2)}`
}

const SAVED_MESSAGE_DURATION_MS = 2000

export default function ReviewSummary({ totalPrice, totalOriginalPrice, onSave }: ReviewSummaryProps) {
    const savings = totalOriginalPrice - totalPrice
    const [justSaved, setJustSaved] = useState(false)

    const handleSave = () => {
        onSave()
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), SAVED_MESSAGE_DURATION_MS)
    }

    return (
        <div className="ReviewSummary">
            <div className="ReviewSummary-shipping">
                <img src="/carbon_delivery.svg" alt="" className="ReviewSummary-shipping-icon" />
                <p className="ReviewSummary-shipping-label">Fast Shipping</p>
                <PriceDisplay price={0} originalPrice={5.99} variant="line" />
            </div>

            <div className="ReviewSummary-total">
                <img
                    src="/satisfaction-badge.png"
                    alt="100% satisfaction guarantee"
                    className="ReviewSummary-badge"
                />
                <div className="ReviewSummary-total-details">
                    <span className="ReviewSummary-financing">as low as $19.19/mo</span>
                    <PriceDisplay price={totalPrice} originalPrice={totalOriginalPrice} variant="total" />
                </div>
            </div>

            {savings > 0 && (
                <p className="ReviewSummary-savings">
                    Congrats! You&apos;re saving {formatPrice(savings)} on your security bundle!
                </p>
            )}

            <button type="button" className="ReviewSummary-checkout">
                Checkout
            </button>

            <button type="button" className="ReviewSummary-save-for-later" onClick={handleSave}>
                {justSaved ? 'Saved!' : 'Save my system for later'}
            </button>
        </div>
    )
}
