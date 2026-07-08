import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Stepper from './Stepper'

describe('Stepper', () => {
    it('disables the decrement button once quantity reaches min', () => {
        render(<Stepper quantity={0} onChange={vi.fn()} min={0} />)

        expect(screen.getByLabelText('Decrease quantity')).toBeDisabled()
    })

    it('disables the increment button once quantity reaches max', () => {
        render(<Stepper quantity={99} onChange={vi.fn()} max={99} />)

        expect(screen.getByLabelText('Increase quantity')).toBeDisabled()
    })

    it('clamps onChange to min when decrementing at the floor', async () => {
        const onChange = vi.fn()
        const user = userEvent.setup()
        render(<Stepper quantity={1} onChange={onChange} min={1} />)

        // Button is disabled at the floor, so the click cannot fire onChange.
        await user.click(screen.getByLabelText('Decrease quantity'))

        expect(onChange).not.toHaveBeenCalled()
    })

    it('calls onChange with quantity + 1 when incrementing below max', async () => {
        const onChange = vi.fn()
        const user = userEvent.setup()
        render(<Stepper quantity={2} onChange={onChange} max={99} />)

        await user.click(screen.getByLabelText('Increase quantity'))

        expect(onChange).toHaveBeenCalledWith(3)
    })

    it('calls onChange with quantity - 1 when decrementing above min', async () => {
        const onChange = vi.fn()
        const user = userEvent.setup()
        render(<Stepper quantity={2} onChange={onChange} min={0} />)

        await user.click(screen.getByLabelText('Decrease quantity'))

        expect(onChange).toHaveBeenCalledWith(1)
    })
})
