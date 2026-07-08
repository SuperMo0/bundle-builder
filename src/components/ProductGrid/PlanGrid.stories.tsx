import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import PlanGrid from './PlanGrid'
import type { PlanItem } from '../../types'
import { DEFAULT_VARIANT_KEY } from '../../types'

const items: PlanItem[] = [
    {
        id: 'basic',
        name: 'Basic Plan',
        description: '14-day event video history for one camera.',
        image: null,
        price: 0,
        planTier: 'Basic',
    },
    {
        id: 'unlimited',
        name: 'Unlimited Plan',
        description: '14-day event video history for unlimited cameras.',
        image: null,
        price: 9.99,
        originalPrice: 14.99,
        planTier: 'Unlimited',
    },
]

const meta = {
    title: 'Components/PlanGrid',
    component: PlanGrid,
    parameters: { layout: 'padded' },
} satisfies Meta<typeof PlanGrid>

export default meta
type Story = StoryObj<typeof meta>

function InteractivePlanGrid() {
    const [quantities, setQuantities] = useState<Record<string, Record<string, number>>>({
        basic: { [DEFAULT_VARIANT_KEY]: 1 },
        unlimited: { [DEFAULT_VARIANT_KEY]: 0 },
    })

    return (
        <PlanGrid
            items={items}
            quantities={quantities}
            onQuantityChange={(itemId, variantKey, quantity) =>
                setQuantities(
                    Object.fromEntries(items.map((item) => [item.id, { [variantKey]: item.id === itemId ? quantity : 0 }]))
                )
            }
        />
    )
}

export const Default: Story = {
    args: { items, quantities: {}, onQuantityChange: () => {} },
    render: () => <InteractivePlanGrid />,
    parameters: { docs: { description: { story: 'Selecting one plan zeroes out its sibling — only one plan can be active at a time.' } } },
}
