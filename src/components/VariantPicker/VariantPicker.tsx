import { RadioGroup } from 'radix-ui'
import type { ColorVariant } from '../../types'
import './VariantPicker.css'

interface VariantPickerProps {
    options: ColorVariant[]
    value: string
    onChange: (value: string) => void
}

export default function VariantPicker({ options, value, onChange }: VariantPickerProps) {
    return (
        <RadioGroup.Root className="VariantPicker" aria-label="Color" value={value} onValueChange={onChange}>
            {options.map((option) => (
                <RadioGroup.Item key={option.name} value={option.name} asChild>
                    <button type="button" className="VariantPicker-option">
                        <img src={option.image} alt={option.name} className="VariantPicker-swatch" />
                        {option.name}
                    </button>
                </RadioGroup.Item>
            ))}
        </RadioGroup.Root>
    )
}
