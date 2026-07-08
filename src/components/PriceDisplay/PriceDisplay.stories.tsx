import type { Meta, StoryObj } from '@storybook/react-vite'
import PriceDisplay from './PriceDisplay'

const meta = {
    title: 'Components/PriceDisplay',
    component: PriceDisplay,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof PriceDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
    args: { price: 35.99, variant: 'card' },
}

export const Discounted: Story = {
    args: { price: 35.99, originalPrice: 45.99, variant: 'card' },
}

export const Free: Story = {
    args: { price: 0, originalPrice: 5.99, variant: 'line' },
}

export const MonthlySuffix: Story = {
    args: { price: 9.99, originalPrice: 14.99, suffix: '/mo', variant: 'line' },
}

export const Total: Story = {
    args: { price: 129.97, originalPrice: 169.97, variant: 'total' },
}
