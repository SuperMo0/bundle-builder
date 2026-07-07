export type BillingPeriod = 'once' | 'month'

export type SelectionMode = 'quantity' | 'single'

/** Variant key used for items with no color options — a single implicit variant. */
export const DEFAULT_VARIANT_KEY = 'default'

export interface ColorVariant {
    name: string
    image: string
}

export interface BundleItem {
    id: string
    name: string
    description: string
    image: string | null
    price: number
    originalPrice?: number
    defaultQuantity?: number
}