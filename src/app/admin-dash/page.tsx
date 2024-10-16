'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Student {
  reg_id: number
  name: string
  email: string
  address: string
  X_per: number
  XII_per: number
  branch_assign: string | null
  father_name: string
  pref_1: string
  pref_2: string
  pref_3: string
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin-s')
      if (!response.ok) {
        throw new Error('Failed to fetch students')
      }
      const data = await response.json()
      setStudents(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load students. Please try again later.')
      setLoading(false)
    }
  }

  const assignBranch = async (reg_id: number, branch_assign: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/branch-assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reg_id, branch_assign }),
      })
      if (!response.ok) {
        throw new Error('Failed to assign branch')
      }
      setSuccessMessage(`Branch assigned successfully for student with ID ${reg_id}`)
      setTimeout(() => setSuccessMessage(null), 3000)
      fetchStudents() // Refresh the student list
    } catch (err) {
      setError('Failed to assign branch. Please try again.')
      setTimeout(() => setError(null), 3000)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <Card className="w-full max-w-6xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert variant="default" className="mb-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reg ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>X %</TableHead>
                <TableHead>XII %</TableHead>
                <TableHead>Assigned Branch</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.reg_id}>
                  <TableCell>{student.reg_id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.X_per}</TableCell>
                  <TableCell>{student.XII_per}</TableCell>
                  <TableCell>{student.branch_assign || 'Not assigned'}</TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) => assignBranch(student.reg_id, value)}
                      defaultValue={student.branch_assign || ''}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assign Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={student.pref_1}>{student.pref_1}</SelectItem>
                        <SelectItem value={student.pref_2}>{student.pref_2}</SelectItem>
                        <SelectItem value={student.pref_3}>{student.pref_3}</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}