export type pricesPayType = {
  amount: number
  typeDescription: string
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
