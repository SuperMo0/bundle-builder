import './Stepper.css'

interface StepperProps {
    quantity: number
    onChange: (quantity: number) => void
    min?: number
    max?: number
}

export default function Stepper({ quantity, onChange, min = 0, max = 99 }: StepperProps) {
    const decrement = () => onChange(Math.max(min, quantity - 1))
    const increment = () => onChange(Math.min(max, quantity + 1))

    return (
        <div className="Stepper">
            <button
                type="button"
                className="Stepper-button"
                onClick={decrement}
                disabled={quantity <= min}
                aria-label="Decrease quantity"
            >
                −
            </button>
            <span className="Stepper-value" aria-live="polite">
                {quantity}
            </span>
            <button
                type="button"
                className="Stepper-button"
                onClick={increment}
                disabled={quantity >= max}
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    )
}
