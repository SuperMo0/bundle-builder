import type { ColorVariant } from '../../types'
import './VariantPicker.css'

interface VariantPickerProps {
    options: ColorVariant[]
    value: string
    onChange: (value: string) => void
}

export default function VariantPicker({ options, value, onChange }: VariantPickerProps) {
    return (
        <div className="VariantPicker" role="radiogroup" aria-label="Color">
            {options.map((option) => (
                <button
                    key={option.name}
                    type="button"
                    role="radio"
                    aria-checked={option.name === value}
                    className="VariantPicker-option"
                    data-selected={option.name === value || undefined}
                    onClick={() => onChange(option.name)}
                >
                    <img src={option.image} alt={option.name} className="VariantPicker-swatch" />
                    {option.name}
                </button>
            ))}
        </div>
    )
}
