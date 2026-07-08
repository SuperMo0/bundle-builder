import type { Meta, StoryObj } from '@storybook/react-vite'
import ErrorFallback from './ErrorFallback'

const meta = {
    title: 'Components/ErrorFallback',
    component: ErrorFallback,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { error: new Error('Something broke'), resetErrorBoundary: () => {} },
}
