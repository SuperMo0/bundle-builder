export type BillingPeriod = 'once' | 'month'

export type SelectionMode = 'quantity' | 'single'

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

export interface QuantityItem extends BundleItem {
    required?: boolean
    colors?: ColorVariant[]
}

export interface PlanItem extends BundleItem {
    billingPeriod?: BillingPeriod
    planTier?: string
}