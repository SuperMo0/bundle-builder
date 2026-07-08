import { useEffect, useRef, useState } from 'react'
import { useBundleSteps } from '../../hooks/useBundleSteps'
import { StepAccordion, StepAccordionItem } from '../../../../components/StepAccordion/StepAccordion'
import ProductGrid from '../../../../components/ProductGrid/ProductGrid'
import PlanGrid from '../../../../components/ProductGrid/PlanGrid'
import type { BundleSelections } from '../../bundle.config'


interface BundleAccordionProps {
    selections: BundleSelections;
    setQuantity: (stepId: string, itemId: string, variantKey: string, qty: number) => void;
    getSelectedCount: (stepId: string) => number;
    getMinQuantity: (stepId: string, itemId: string) => number;
    getMaxQuantity: (stepId: string, itemId: string) => number;
}
export default function BundleAccordion({ selections, setQuantity, getSelectedCount, getMinQuantity, getMaxQuantity }: BundleAccordionProps) {
    const bundleSteps = useBundleSteps()
    const [activeStep, setActiveStep] = useState(bundleSteps[0].id)
    const itemRefs = useRef(new Map<string, HTMLDivElement>())
    const isFirstRender = useRef(true)
    const prevActiveStepRef = useRef(activeStep)

    useEffect(() => {
        const prevStep = prevActiveStepRef.current
        prevActiveStepRef.current = activeStep

        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const activeItem = itemRefs.current.get(activeStep)
        if (!activeItem) return
        const closingItem = prevStep !== activeStep ? itemRefs.current.get(prevStep) : undefined

        let openDone = false
        let closeDone = !closingItem

        const scrollIfBothDone = () => {
            if (openDone && closeDone) activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
        const onOpenEnd = (event: AnimationEvent) => {
            if (event.animationName !== 'accordion-slide-down') return
            openDone = true
            scrollIfBothDone()
        }
        const onCloseEnd = (event: AnimationEvent) => {
            if (event.animationName !== 'accordion-slide-up') return
            closeDone = true
            scrollIfBothDone()
        }

        activeItem.addEventListener('animationend', onOpenEnd)
        closingItem?.addEventListener('animationend', onCloseEnd)
        return () => {
            activeItem.removeEventListener('animationend', onOpenEnd)
            closingItem?.removeEventListener('animationend', onCloseEnd)
        }
    }, [activeStep])

    return (
        <StepAccordion value={activeStep} onValueChange={setActiveStep}>
            {bundleSteps.map((step, index) => {
                const nextStep = bundleSteps[index + 1]

                return (
                    <StepAccordionItem key={step.id}
                        ref={(el) => {
                            if (el) itemRefs.current.set(step.id, el)
                            return () => { itemRefs.current.delete(step.id) }
                        }}
                        value={step.id}
                        stepNumber={index + 1}
                        totalSteps={bundleSteps.length}
                        icon={step.icon}
                        title={step.title}
                        selectedLabel={`${getSelectedCount(step.id)} selected`}
                        nextTitle={nextStep?.title}
                        onNext={nextStep ? () => setActiveStep(nextStep.id) : undefined}>
                        {step.selectionMode === 'quantity' ? (
                            <ProductGrid
                                key={step.id}
                                items={step.items}
                                quantities={selections[step.id]}
                                onQuantityChange={(itemId, variantKey, quantity) => { setQuantity(step.id, itemId, variantKey, quantity) }}
                                getMinQuantity={(itemId) => getMinQuantity(step.id, itemId)}
                                getMaxQuantity={(itemId) => getMaxQuantity(step.id, itemId)}
                            />
                        ) : (
                            <PlanGrid
                                key={step.id}
                                items={step.items}
                                quantities={selections[step.id]}
                                onQuantityChange={(itemId, variantKey, quantity) => { setQuantity(step.id, itemId, variantKey, quantity) }}
                            />
                        )}
                    </StepAccordionItem>
                )
            })}
        </StepAccordion>
    )
}
