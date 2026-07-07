export type BillingPeriod = 'once' | 'month'

export type SelectionMode = 'quantity' | 'single'

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