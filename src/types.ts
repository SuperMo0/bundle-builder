export type BillingPeriod = 'once' | 'month'

export interface ColorVariant {
    name: string
    image: string
}

export interface BundleItem {
    id: string
    name: string
    description: string
    image: string
    price: number
    originalPrice?: number
    billingPeriod?: BillingPeriod
    required?: boolean
    defaultQuantity?: number
    colors?: ColorVariant[]
}