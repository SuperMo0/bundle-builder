import { produce } from 'immer'
import { useState } from 'react'
import { DEFAULT_VARIANT_KEY } from '../../types'
import type { BundleStep, BundleSelections } from './bundle.config'


function createInitialSelections(steps: BundleStep[]): BundleSelections {
    return Object.fromEntries(
        steps.map((step) => [
            step.id,
            Object.fromEntries(
                step.items.map((item) => {
                    const isRequired = 'required' in item && item.required
                    const defaultQty = item.defaultQuantity ?? (isRequired ? 1 : 0)
                    const defaultVariantKey =
                        'colors' in item && item.colors?.length ? item.colors[0].name : DEFAULT_VARIANT_KEY
                    return [item.id, { [defaultVariantKey]: defaultQty }]
                })
            ),
        ])
    )
}
export function useBundleSelection(steps: BundleStep[]) {

    const [selections, setSelections] = useState<BundleSelections>(() => createInitialSelections(steps))

    const setQuantity = (stepId: string, itemId: string, variantKey: string, qty: number) => {
        const step = steps.find((s) => s.id === stepId)
        const item = step?.items.find((i) => i.id === itemId)
        const isRequired = !!item && 'required' in item && item.required
        const minQty = isRequired ? 1 : 0
        const nextQty = Math.max(minQty, qty)

        setSelections(
            produce((draft) => {
                draft[stepId] ??= {}

                if (step && step.selectionMode === 'single' && nextQty > 0) {
                    step.items.forEach((sibling) => {
                        draft[stepId][sibling.id] = { [DEFAULT_VARIANT_KEY]: sibling.id === itemId ? nextQty : 0 }
                    })
                    return
                }

                draft[stepId][itemId] ??= {}
                draft[stepId][itemId][variantKey] = nextQty
            })
        )
    }

    const getSelectedCount = (stepId: string) =>
        Object.values(selections[stepId] ?? {})
            .flatMap((variantQuantities) => Object.values(variantQuantities))
            .filter((qty) => qty > 0).length

    return { selections, setQuantity, getSelectedCount }
}
