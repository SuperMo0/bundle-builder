import { bundleSteps } from './bundle.config'
import { StepAccordion, StepAccordionItem } from '../../components/StepAccordion'
import ProductGrid from '../../components/ProductGrid';


interface BundleAccordion {
    selections: Record<string, Record<string, number>>;
    setQuantity: (stepId: string, itemId: string, qty: number) => void;
    getSelectedCount: (stepId: string) => number;
}
export default function BundleAccordion({ selections, setQuantity, getSelectedCount }: BundleAccordion) {

    return (
        <StepAccordion>
            {bundleSteps.map((step, index) => (
                <StepAccordionItem key={step.id}
                    value={step.id}
                    stepNumber={index + 1}
                    totalSteps={bundleSteps.length}
                    icon={step.icon}
                    title={step.title}
                    selectedLabel={`${getSelectedCount(step.id)} selected`}>
                    <ProductGrid
                        key={step.id}
                        items={step.items}
                        quantities={selections[step.id]}
                        onQuantityChange={(itemId, quantity) => { setQuantity(step.id, itemId, quantity) }}
                    />
                </StepAccordionItem>
            ))}
        </StepAccordion>
    )
}
