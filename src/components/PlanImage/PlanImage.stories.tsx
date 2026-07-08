import type { Meta, StoryObj } from '@storybook/react-vite'
import PlanImage from './PlanImage'

const meta = {
    title: 'Components/PlanImage',
    component: PlanImage,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof PlanImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { variantLabel: 'Unlimited' },
}
