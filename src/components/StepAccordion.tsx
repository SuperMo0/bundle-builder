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
    nextTitle?: string
    onNext?: () => void
    children?: ReactNode
}

export function StepAccordionItem({
    value,
    stepNumber,
    totalSteps,
    icon,
    title,
    selectedLabel,
    nextTitle,
    onNext,
    children,
}: StepAccordionItemProps) {
    return (
        <Accordion.Item className="AccordionItem" value={value}>
            <span className="StepAccordion-eyebrow">
                STEP {stepNumber} OF {totalSteps}
            </span>
            <Accordion.Header className="AccordionHeader">
                <Accordion.Trigger className="AccordionTrigger StepAccordion-trigger">
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
                <div className="StepAccordion-panel">
                    {children}
                    {onNext && (
                        <button type="button" className="StepAccordion-next" onClick={onNext}>
                            Next: {nextTitle}
                        </button>
                    )}
                </div>
            </Accordion.Content>
        </Accordion.Item>
    )
}

interface StepAccordionProps {
    value: string
    onValueChange: (value: string) => void
    children: ReactNode
}

export function StepAccordion({ value, onValueChange, children }: StepAccordionProps) {
    return (
        <Accordion.Root type="single" collapsible value={value} onValueChange={onValueChange}>
            {children}
        </Accordion.Root>
    )
}
