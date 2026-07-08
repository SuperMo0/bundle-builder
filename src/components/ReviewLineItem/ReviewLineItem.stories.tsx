import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ReviewLineItem from './ReviewLineItem'

const meta = {
    title: 'Components/ReviewLineItem',
    component: ReviewLineItem,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof ReviewLineItem>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveRow(args: React.ComponentProps<typeof ReviewLineItem>) {
    const [quantity, setQuantity] = useState(args.quantity)
    return <ReviewLineItem {...args} quantity={quantity} onQuantityChange={setQuantity} />
}

export const Default: Story = {
    args: {
        name: 'Cam v4 — Black',
        image: '/products/wyze-cam-v4-black.png',
        quantity: 2,
        price: 35.99,
        originalPrice: 45.99,
        onQuantityChange: () => {},
    },
    render: (args) => <InteractiveRow {...args} />,
}

export const RequiredMinimum: Story = {
    args: {
        name: 'Hub',
        image: null,
        quantity: 1,
        price: 0,
        min: 1,
        onQuantityChange: () => {},
    },
    render: (args) => <InteractiveRow {...args} />,
}
