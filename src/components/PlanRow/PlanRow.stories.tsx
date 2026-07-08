import type { Meta, StoryObj } from '@storybook/react-vite'
import PlanRow from './PlanRow'

const meta = {
    title: 'Components/PlanRow',
    component: PlanRow,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof PlanRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { planTier: 'Unlimited', price: 9.99, originalPrice: 14.99 },
}
