import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Stepper from './Stepper'

const meta = {
    title: 'Components/Stepper',
    component: Stepper,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveStepper(args: React.ComponentProps<typeof Stepper>) {
    const [quantity, setQuantity] = useState(args.quantity)
    return <Stepper {...args} quantity={quantity} onChange={setQuantity} />
}

export const Default: Story = {
    args: { quantity: 1, min: 0, max: 99, onChange: () => {} },
    render: (args) => <InteractiveStepper {...args} />,
}

export const AtMinimum: Story = {
    args: { quantity: 1, min: 1, max: 99, onChange: () => {} },
    render: (args) => <InteractiveStepper {...args} />,
    parameters: { docs: { description: { story: 'A required item — the decrement button disables at its floor.' } } },
}

export const AtMaximum: Story = {
    args: { quantity: 99, min: 0, max: 99, onChange: () => {} },
    render: (args) => <InteractiveStepper {...args} />,
}
