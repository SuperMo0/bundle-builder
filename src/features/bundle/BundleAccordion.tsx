import { bundleSteps } from './bundle.config'
import { StepAccordion, StepAccordionItem } from '../../ui/components/StepAccordion'
import { useBundleSelection } from './useBundleSelection'
import ProductGrid from '../../ui/components/ProductGrid';

export default function BundleAccordion() {

    const { selections, getSelectedCount, setQuantity } = useBundleSelection(bundleSteps);
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
