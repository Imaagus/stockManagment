import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { AlertCircle, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'


type InventoryItem = {
  id: number
  name: string
  quantity: number
  price: number
}

type InventoryTableProps = {
  items: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (id: number) => void
  onUpdateQuantity: (id: number, newQuantity: number) => void
}

export function InventoryTable ({ items, onEdit, onDelete, onUpdateQuantity }: InventoryTableProps) {
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null)

  const handleDeleteClick = (item: InventoryItem) => {
    setItemToDelete(item) 
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete.id) 
      setItemToDelete(null) 
    }
  }

  const cancelDelete = () => {
    setItemToDelete(null) 
  }

  return (
    <div>
      
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
            <TableCell className="flex justify-evenly">
            <div className="flex pl-12">
              <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                  className="w-16 mx-2"
                />
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(item)}>
                Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(item)}>
                Eliminar
              </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
     {itemToDelete && (
      <Alert variant="destructive" className="mt-4 ">
        <div className="flex h-24 justify-between items-center">
          <AlertCircle className="h-8 w-8" />
          <div className="text-center">
            <AlertTitle>Confirmar eliminación</AlertTitle>
            <AlertDescription>
              ¿Estás seguro de que deseas eliminar <strong>{itemToDelete.name}</strong> del inventario?
            </AlertDescription>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="ghost" onClick={cancelDelete}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Alert>
    )}
    </div>
  )
}
