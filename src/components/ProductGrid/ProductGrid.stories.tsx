import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import ProductGrid from './ProductGrid'
import type { QuantityItem } from '../../types'

const items: QuantityItem[] = [
    {
        id: 'cam-a',
        name: 'Cam v4',
        description: 'Color night vision and on-camera AI.',
        image: '/products/wyze-cam-v4.png',
        price: 35.99,
        originalPrice: 45.99,
        colors: [
            { name: 'Black', image: '/products/wyze-cam-v4-black.png' },
            { name: 'White', image: '/products/wyze-cam-v4-white.png' },
        ],
    },
    {
        id: 'hub',
        name: 'Hub',
        description: 'Required to connect all of your devices.',
        image: null,
        price: 0,
        required: true,
        maxQuantity: 1,
    },
]

const meta = {
    title: 'Components/ProductGrid',
    component: ProductGrid,
    parameters: { layout: 'padded' },
} satisfies Meta<typeof ProductGrid>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveGrid() {
    const [quantities, setQuantities] = useState<Record<string, Record<string, number>>>({
        'cam-a': { Black: 1 },
        hub: { default: 1 },
    })

    return (
        <ProductGrid
            items={items}
            quantities={quantities}
            onQuantityChange={(itemId, variantKey, quantity) =>
                setQuantities((prev) => ({ ...prev, [itemId]: { ...prev[itemId], [variantKey]: quantity } }))
            }
            getMinQuantity={(itemId) => (itemId === 'hub' ? 1 : 0)}
            getMaxQuantity={(itemId) => (itemId === 'hub' ? 1 : 99)}
        />
    )
}

export const Default: Story = {
    args: { items, quantities: {}, onQuantityChange: () => {}, getMinQuantity: () => 0, getMaxQuantity: () => 99 },
    render: () => <InteractiveGrid />,
}
