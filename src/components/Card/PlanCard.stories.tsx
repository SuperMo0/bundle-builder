import type { Meta, StoryObj } from '@storybook/react-vite'
import PlanCard from './PlanCard'
import type { PlanItem } from '../../types'

const basic: PlanItem = {
    id: 'basic',
    name: 'Basic Plan',
    description: '14-day event video history for one camera.',
    image: null,
    price: 0,
    planTier: 'Basic',
}

const unlimited: PlanItem = {
    id: 'unlimited',
    name: 'Unlimited Plan',
    description: '14-day event video history for unlimited cameras.',
    image: null,
    price: 9.99,
    originalPrice: 14.99,
    planTier: 'Unlimited',
}

const meta = {
    title: 'Components/PlanCard',
    component: PlanCard,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof PlanCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
    args: { bundleItem: basic },
}

export const WithDiscount: Story = {
    args: { bundleItem: unlimited },
}
