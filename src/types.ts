export type BillingPeriod = 'once' | 'month'

export interface BundleItem {
    id: string
    name: string
    image: string
    price: number
    originalPrice?: number
    billingPeriod?: BillingPeriod
    /** Locked at quantity 1 and cannot be removed (e.g. a required hub). */
    required?: boolean
    colors?: string[]
}