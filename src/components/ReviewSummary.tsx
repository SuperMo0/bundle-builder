import './ReviewSummary.css'
import PriceDisplay from './PriceDisplay'

interface ReviewSummaryProps {
    totalPrice: number
    totalOriginalPrice: number
}

function formatPrice(price: number) {
    return `$${price.toFixed(2)}`
}

export default function ReviewSummary({ totalPrice, totalOriginalPrice }: ReviewSummaryProps) {
    const savings = totalOriginalPrice - totalPrice

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

            <a href="#" className="ReviewSummary-save-for-later">
                Save my system for later
            </a>
        </div>
    )
}
