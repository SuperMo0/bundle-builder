import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepAccordion, StepAccordionItem } from './StepAccordion'

const meta = {
    title: 'Components/StepAccordion',
    component: StepAccordionItem,
    parameters: { layout: 'padded' },
} satisfies Meta<typeof StepAccordionItem>

export default meta
type Story = StoryObj<typeof meta>

function TwoSteps() {
    const [active, setActive] = useState('cameras')

    return (
        <StepAccordion value={active} onValueChange={setActive}>
            <StepAccordionItem
                value="cameras"
                stepNumber={1}
                totalSteps={2}
                icon="/icons/livestream.svg"
                title="Choose your cameras"
                selectedLabel="1 selected"
                nextTitle="Choose your plan"
                onNext={() => setActive('plan')}
            >
                <p>Step content goes here — normally a ProductGrid or PlanGrid.</p>
            </StepAccordionItem>
            <StepAccordionItem
                value="plan"
                stepNumber={2}
                totalSteps={2}
                icon="/icons/plan.svg"
                title="Choose your plan"
                selectedLabel="0 selected"
            >
                <p>Step content goes here.</p>
            </StepAccordionItem>
        </StepAccordion>
    )
}

export const Default: Story = {
    args: { value: 'cameras', stepNumber: 1, totalSteps: 2, icon: '/icons/livestream.svg', title: 'Choose your cameras', selectedLabel: '1 selected' },
    render: () => <TwoSteps />,
    parameters: { docs: { description: { story: 'The "N selected" label is an aria-live region — it announces itself to screen readers when the count changes.' } } },
}
