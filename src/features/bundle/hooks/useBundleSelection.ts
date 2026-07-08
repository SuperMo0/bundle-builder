import { produce } from 'immer'
import { useState } from 'react'
import { DEFAULT_VARIANT_KEY } from '../../../types'
import type { BundleStep, BundleSelections } from '../bundle.config'

const STORAGE_KEY = 'bundle-builder:selections'

function loadPersistedSelections(): BundleSelections | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as BundleSelections) : null
    } catch {
        return null
    }
}

function minQuantityForItem(steps: BundleStep[], stepId: string, itemId: string): number {
    const item = steps.find((s) => s.id === stepId)?.items.find((i) => i.id === itemId)
    const isRequired = !!item && 'required' in item && item.required
    return isRequired ? 1 : 0
}

function maxQuantityForItem(steps: BundleStep[], stepId: string, itemId: string): number {
    const item = steps.find((s) => s.id === stepId)?.items.find((i) => i.id === itemId)
    const maxQuantity = item && 'maxQuantity' in item ? item.maxQuantity : undefined
    return maxQuantity ?? Infinity
}

function createInitialSelections(steps: BundleStep[]): BundleSelections {
    return Object.fromEntries(
        steps.map((step) => [
            step.id,
            Object.fromEntries(
                step.items.map((item) => {
                    const defaultQty = item.defaultQuantity ?? minQuantityForItem(steps, step.id, item.id)
                    const defaultVariantKey =
                        'colors' in item && item.colors?.length ? item.colors[0].name : DEFAULT_VARIANT_KEY
                    return [item.id, { [defaultVariantKey]: defaultQty }]
                })
            ),
        ])
    )
}
export function useBundleSelection(steps: BundleStep[]) {

    const [selections, setSelections] = useState<BundleSelections>(
        () => loadPersistedSelections() ?? createInitialSelections(steps)
    )

    const setQuantity = (stepId: string, itemId: string, variantKey: string, qty: number) => {
        const step = steps.find((s) => s.id === stepId)
        const clampedQty = Math.max(minQuantityForItem(steps, stepId, itemId), qty)
        const nextQty = Math.min(maxQuantityForItem(steps, stepId, itemId), clampedQty)

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
            .filter((variantQuantities) => Object.values(variantQuantities).some((qty) => qty > 0))
            .length

    const getMinQuantity = (stepId: string, itemId: string) => minQuantityForItem(steps, stepId, itemId)

    const getMaxQuantity = (stepId: string, itemId: string) => maxQuantityForItem(steps, stepId, itemId)

    const saveSnapshot = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selections))
    }

    return { selections, setQuantity, getSelectedCount, getMinQuantity, getMaxQuantity, saveSnapshot }
}
