import { produce } from 'immer'
import { useState } from 'react'
import type { BundleStep } from './bundle.config'


function createInitialSelections(steps: BundleStep[]): Record<string, Record<string, number>> {
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

    const [selections, setSelections] = useState<Record<string, Record<string, number>>>(() => createInitialSelections(steps))

    const setQuantity = (stepId: string, itemId: string, qty: number) => {
        const item = steps.find((s) => s.id === stepId)?.items.find((i) => i.id === itemId)
        const minQty = item?.required ? 1 : 0
        const nextQty = Math.max(minQty, qty)

        setSelections(
            produce((draft) => {
                draft[stepId] ??= {}
                draft[stepId][itemId] = nextQty
            })
        )
    }

    const getSelectedCount = (stepId: string) =>
        Object.values(selections[stepId] ?? {}).filter((qty) => qty > 0).length

    return { selections, setQuantity, getSelectedCount }
}
