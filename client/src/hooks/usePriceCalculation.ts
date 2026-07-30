import { useState, useEffect } from 'react'

interface PriceCalculation {
  basePrice: number
  addons: Array<{ name: string; quantity: number; unitPrice: number; total: number }>
  addonsTotal: number
  totalPrice: number
}

export function usePriceCalculation(
  serviceId?: string,
  variationId?: string,
  addons: Array<{ addonId: string; variationId?: string; quantity?: number }> = []
) {
  const [price, setPrice] = useState<PriceCalculation | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!serviceId || !variationId) {
      setPrice(null)
      return
    }

    const calculate = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/v1/price/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serviceId, variationId, addons })
        })

        const resData = await response.json()
        if (!response.ok || !resData.success) {
          throw new Error(resData.message || 'Price calculation failed')
        }

        setPrice(resData.data)
      } catch (err: any) {
        setError(err.message)
        console.error('Price calculation failed:', err)
      } finally {
        setLoading(false)
      }
    }

    calculate()
  }, [serviceId, variationId, JSON.stringify(addons)])

  return { price, loading, error }
}