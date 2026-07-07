import { produce } from 'immer'
import { useState } from 'react'
import type { BundleStep, BundleSelections } from './bundle.config'


function createInitialSelections(steps: BundleStep[]): BundleSelections {
    return Object.fromEntries(
        steps.map((step) => [
            step.id,
            Object.fromEntries(
                step.items.map((item) => [item.id, item.defaultQuantity ?? (item.required ? 1 : 0)])
            ),
        ])
    )
}
export function useBundleSelection(steps: BundleStep[]) {

    const [selections, setSelections] = useState<BundleSelections>(() => createInitialSelections(steps))

    const setQuantity = (stepId: string, itemId: string, qty: number) => {
        const step = steps.find((s) => s.id === stepId)
        const item = step?.items.find((i) => i.id === itemId)
        const minQty = item?.required ? 1 : 0
        const nextQty = Math.max(minQty, qty)

        setSelections(
            produce((draft) => {
                draft[stepId] ??= {}

                if (step?.selectionMode === 'single' && nextQty > 0) {
                    step.items.forEach((sibling) => {
                        draft[stepId][sibling.id] = sibling.id === itemId ? nextQty : 0
                    })
                    return
                }

                draft[stepId][itemId] = nextQty
            })
        )
    }

    const getSelectedCount = (stepId: string) =>
        Object.values(selections[stepId] ?? {}).filter((qty) => qty > 0).length

    return { selections, setQuantity, getSelectedCount }
}
