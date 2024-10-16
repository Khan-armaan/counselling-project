'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    X_per: 0,
    XII_per: 0,
    father_name: '',
    pref_1: '',
    pref_2: '',
    pref_3: '',
    user_id: 0,
  })
  const [registeredUserId, setRegisteredUserId] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'X_per' || name === 'XII_per' || name === 'user_id' ? parseInt(value, 10) : value,
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Student registered successfully!",
        })
        setRegisteredUserId(formData.user_id.toString())
        setFormData({
          name: '',
          email: '',
          address: '',
          X_per: 0,
          XII_per: 0,
          father_name: '',
          pref_1: '',
          pref_2: '',
          pref_3: '',
          user_id: 0,
        })
      } else {
        console.error('Server response:', data)
        toast({
          title: "Error",
          description: data.message || 'Failed to register student.',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Student Registration</CardTitle>
        <CardDescription>Enter your details to register as a student.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="father_name">Father's Name</Label>
              <Input id="father_name" name="father_name" value={formData.father_name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="X_per">X Percentage</Label>
              <Input id="X_per" name="X_per" type="number" value={formData.X_per} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="XII_per">XII Percentage</Label>
              <Input id="XII_per" name="XII_per" type="number" value={formData.XII_per} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_id">User ID</Label>
              <Input id="user_id" name="user_id" type="number" value={formData.user_id} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Branch Preferences</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select onValueChange={handleSelectChange('pref_1')} value={formData.pref_1}>
                <SelectTrigger>
                  <SelectValue placeholder="Preference 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS">Computer Science</SelectItem>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="ECE">Electronics and Communication</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={handleSelectChange('pref_2')} value={formData.pref_2}>
                <SelectTrigger>
                  <SelectValue placeholder="Preference 2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS">Computer Science</SelectItem>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="ECE">Electronics and Communication</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={handleSelectChange('pref_3')} value={formData.pref_3}>
                <SelectTrigger>
                  <SelectValue placeholder="Preference 3" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS">Computer Science</SelectItem>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="ECE">Electronics and Communication</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Button type="submit" className="w-full">Register Student</Button>
          {registeredUserId && (
            <Alert>
              <AlertTitle>Registration Successful</AlertTitle>
              <AlertDescription>
                Your User ID is: <span className="font-bold">{registeredUserId}</span>
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
      <Toaster title={''} description={''} />
    </Card>
  )
}