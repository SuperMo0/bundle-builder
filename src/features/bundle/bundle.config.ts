import type { QuantityItem, PlanItem } from "../../types"
import bundleStepsData from './bundleSteps.json'

/** stepId -> itemId -> variantKey (color name, or DEFAULT_VARIANT_KEY) -> quantity */
export type BundleSelections = Record<string, Record<string, Record<string, number>>>

export interface QuantityStep {
    id: string
    title: string
    icon: string
    selectionMode: 'quantity'
    reviewLabel?: string
    items: QuantityItem[]
}

export interface PlanStep {
    id: string
    title: string
    icon: string
    selectionMode: 'single'
    reviewLabel?: string
    items: PlanItem[]
}

export type BundleStep = QuantityStep | PlanStep
export const bundleSteps = bundleStepsData as BundleStep[]
