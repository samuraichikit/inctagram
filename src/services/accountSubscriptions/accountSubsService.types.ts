export type DescriptionType = 'DAY' | 'MONTHLY' | 'WEEKLY'

export type pricesPayType = {
  amount: number
  typeDescription: DescriptionType
}

export type ResponseGetPricesPay = {
  data: pricesPayType[]
}

export type PaymentType = 'PAYPAL' | 'STRIPE'

export type RequestPostSubscriptions = {
  amount: number
  baseUrl: string
  paymentType: PaymentType
  typeSubscription: string
}

export type myPaymentType = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

export type ResponseCurrPaymentSubs = {
  data: RootObjectData[]
  hasAutoRenewal: boolean
}
export type RootObjectData = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}
