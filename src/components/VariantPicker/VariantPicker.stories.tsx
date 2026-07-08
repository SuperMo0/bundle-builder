import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import VariantPicker from './VariantPicker'

const colors = [
    { name: 'Black', image: '/products/cam-black.png' },
    { name: 'White', image: '/products/cam-white.png' },
]

const meta = {
    title: 'Components/VariantPicker',
    component: VariantPicker,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof VariantPicker>

export default meta
type Story = StoryObj<typeof meta>

function InteractivePicker(args: React.ComponentProps<typeof VariantPicker>) {
    const [value, setValue] = useState(args.value)
    return <VariantPicker {...args} value={value} onChange={setValue} />
}

export const Default: Story = {
    args: { options: colors, value: 'Black', onChange: () => {} },
    render: (args) => <InteractivePicker {...args} />,
}
