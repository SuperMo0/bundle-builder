import type { Meta, StoryObj } from '@storybook/react-vite'
import ReviewSummary from './ReviewSummary'

const meta = {
    title: 'Components/ReviewSummary',
    component: ReviewSummary,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof ReviewSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { totalPrice: 129.97, totalOriginalPrice: 169.97, onSave: () => {} },
    parameters: { docs: { description: { story: 'Click "Save my system for later" — it flips to "Saved!" for 2 seconds, backed by the component\'s own internal state.' } } },
}

export const NoSavings: Story = {
    args: { totalPrice: 129.97, totalOriginalPrice: 129.97, onSave: () => {} },
}
