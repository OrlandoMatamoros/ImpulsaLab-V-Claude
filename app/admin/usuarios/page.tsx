'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Users, UserCheck, Calendar, Search, Mail, Phone, Shield } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import AdminAuthWrapper from '../components/AdminAuthWrapper'

interface UserData {
  id: string
  email: string
  name: string
  phone: string
  role: 'public' | 'consultant'
  createdAt: any
}

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const { user, userData } = useAuth()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      
      const usersData: UserData[] = []
      snapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data()
        } as UserData)
      })
      
      setUsers(usersData)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  )

  const consultantCount = users.filter(u => u.role === 'consultant').length
  const publicCount = users.filter(u => u.role === 'public').length

  // Función para exportar a CSV
  const exportToCSV = () => {
    const csvContent = users.map(user => {
      const createdDate = user.createdAt?.toDate?.() 
        ? format(user.createdAt.toDate(), 'dd/MM/yyyy HH:mm', { locale: es })
        : 'Sin fecha'
      
      return `"${user.name || 'Sin nombre'}","${user.email}","${user.phone || '-'}","${user.role === 'consultant' ? 'Consultor' : 'Público'}","${createdDate}"`
    }).join('\n')

    const header = '"Nombre","Email","Teléfono","Tipo","Fecha de Registro"\n'
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `usuarios-impulsa-lab-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  return (
    <AdminAuthWrapper title="Gestión de Usuarios">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios registrados en total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultores</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultantCount}</div>
            <p className="text-xs text-muted-foreground">
              Con código especial
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Públicos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publicCount}</div>
            <p className="text-xs text-muted-foreground">
              Acceso estándar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de búsqueda y exportar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Lista de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Cargando usuarios...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No se encontraron usuarios con ese criterio' : 'No hay usuarios registrados'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Teléfono</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div className="font-medium">{user.name || 'Sin nombre'}</div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{user.phone || '-'}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'consultant' 
                           ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                          }`}>
                          {user.role === 'consultant' ? 'Consultor' : 'Público'}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {user.createdAt?.toDate?.() 
                              ? format(user.createdAt.toDate(), 'dd MMM yyyy', { locale: es })
                              : '-'
                            }
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminAuthWrapper>
  )
}