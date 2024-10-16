'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface AppBarProps {
  userEmail: string
  SignOut: () => void
}

export function AppBar({ userEmail, SignOut }: AppBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

 

  return (
    <div className="bg-primary text-primary-foreground shadow-md mb-14">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-semibold">Counselling Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userEmail} />
                    <AvatarFallback>{userEmail.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex flex-col items-start">
                  <div className="text-xs text-muted-foreground">{userEmail}</div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={SignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
