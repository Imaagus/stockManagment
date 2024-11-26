import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Item } from "@/types"

interface LowStockAlertProps {
  products: Item[]
  threshold: number
}

export function LowStockAlert({ products, threshold }: LowStockAlertProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [notifiedProducts, setNotifiedProducts] = useState<Set<string>>(new Set()) // Productos ya notificados

  const lowStockProducts = products.filter(product => product.quantity <= threshold)
  const newLowStockProducts = lowStockProducts.filter(
    product => !notifiedProducts.has(product.xata_id)
  )

  useEffect(() => {
    if (newLowStockProducts.length > 0) {
      setShowAlert(true)
    }
  }, [newLowStockProducts])

  const handleClose = () => {
    // Añade los productos actuales a la lista de notificados y oculta la alerta
    setNotifiedProducts(prev => {
      const updated = new Set(prev)
      newLowStockProducts.forEach(product => updated.add(product.xata_id))
      return updated
    })
    setShowAlert(false)
  }

  if (!showAlert || newLowStockProducts.length === 0) {
    return null
  }

  return (
    <Alert variant="destructive" className="mt-6 mb-6 flex">
      <AlertCircle className="h-4 w-4" />
      <div>
        <AlertTitle>Alerta de Stock Bajo</AlertTitle>
        <AlertDescription>
          Los siguientes productos tienen un stock bajo:
          <ul className="mt-2 list-disc list-inside">
            {newLowStockProducts.map(product => (
              <li key={product.xata_id}>
                {product.name} - Cantidad: {product.quantity}
              </li>
            ))}
          </ul>
          <div>
            <Button
                className="mt-4 w-20"
                variant="outline"
                onClick={handleClose} 
            >
                OK
            </Button>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  )
}