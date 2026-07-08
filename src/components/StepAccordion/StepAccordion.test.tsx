import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepAccordion, StepAccordionItem } from './StepAccordion'

describe('StepAccordionItem', () => {
    it('announces the selected-count label through an aria-live region', () => {
        render(
            <StepAccordion value="cameras" onValueChange={() => {}}>
                <StepAccordionItem
                    value="cameras"
                    stepNumber={1}
                    totalSteps={2}
                    icon="/icons/livestream.svg"
                    title="Choose your cameras"
                    selectedLabel="2 selected"
                />
            </StepAccordion>
        )

        const liveRegion = screen.getByText('2 selected')
        expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    })
})
