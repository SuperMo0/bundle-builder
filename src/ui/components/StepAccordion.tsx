import { Accordion } from 'radix-ui'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import type { ReactNode } from 'react'
import './StepAccordion.css'

interface StepAccordionItemProps {
    value: string
    stepNumber: number
    totalSteps: number
    icon: string
    title: string
    selectedLabel: string
    children?: ReactNode
}

export function StepAccordionItem({
    value,
    stepNumber,
    totalSteps,
    icon,
    title,
    selectedLabel,
    children,
}: StepAccordionItemProps) {
    return (
        <Accordion.Item className="AccordionItem container" value={value}>
            <Accordion.Header className="AccordionHeader">
                <Accordion.Trigger className="AccordionTrigger StepAccordion-trigger">
                    <span className="StepAccordion-eyebrow">
                        STEP {stepNumber} OF {totalSteps}
                    </span>
                    <span className="StepAccordion-row">
                        <img src={icon} className="StepAccordion-icon" alt='icon'></img>
                        <span className="StepAccordion-title">{title}</span>
                        <span className="StepAccordion-meta">
                            {selectedLabel}
                            <ChevronDownIcon className="AccordionChevron" aria-hidden />
                        </span>
                    </span>
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="AccordionContent">
                {children}
            </Accordion.Content>
        </Accordion.Item>
    )
}

export function StepAccordion({ children }: { children: ReactNode }) {
    return (
        <Accordion.Root type="single" collapsible defaultValue="cameras">
            {children}
        </Accordion.Root>
    )
}
