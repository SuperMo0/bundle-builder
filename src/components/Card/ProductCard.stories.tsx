import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ProductCard from './ProductCard'
import type { QuantityItem } from '../../types'

const camera: QuantityItem = {
    id: 'cam-a',
    name: 'Cam v4',
    description: 'Color night vision, on-camera AI, and a built-in spotlight.',
    image: '/products/wyze-cam-v4.png',
    price: 35.99,
    originalPrice: 45.99,
    colors: [
        { name: 'Black', image: '/products/wyze-cam-v4-black.png' },
        { name: 'White', image: '/products/wyze-cam-v4-white.png' },
    ],
}

const hub: QuantityItem = {
    id: 'hub',
    name: 'Hub',
    description: 'Required to connect all of your devices.',
    image: null,
    price: 0,
    required: true,
}

const meta = {
    title: 'Components/ProductCard',
    component: ProductCard,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveCard(args: React.ComponentProps<typeof ProductCard>) {
    const [quantities, setQuantities] = useState(args.quantities)
    return (
        <ProductCard
            {...args}
            quantities={quantities}
            onQuantityChange={(_itemId, variantKey, quantity) =>
                setQuantities((prev) => ({ ...prev, [variantKey]: quantity }))
            }
        />
    )
}

export const WithColorVariants: Story = {
    args: { bundleItem: camera, quantities: { Black: 1 }, onQuantityChange: () => {}, min: 0 },
    render: (args) => <InteractiveCard {...args} />,
}

export const Unselected: Story = {
    args: { bundleItem: camera, quantities: { Black: 0 }, onQuantityChange: () => {}, min: 0 },
    render: (args) => <InteractiveCard {...args} />,
}

export const RequiredItem: Story = {
    args: { bundleItem: hub, quantities: { default: 1 }, onQuantityChange: () => {}, min: 1 },
    render: (args) => <InteractiveCard {...args} />,
    parameters: { docs: { description: { story: 'Required items floor at quantity 1 — the stepper cannot decrement below it.' } } },
}
