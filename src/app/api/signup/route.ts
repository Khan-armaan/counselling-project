
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'; // have to create a prisma client 


// request to create the user
export async function POST(request: Request){
    const prisma = new PrismaClient();
    
    try{
     const {email, password} =    await request.json() //this is from the client side requesting from the user 
     const hashedPassword = await bcrypt.hash(password, 10)
     const newUser = await prisma.user_login.create({
        data: {
            email,
            password: hashedPassword,
            is_admin: false
        }
     })
    
    return Response.json({
    success: true,
    message: " User registered successfully "

}, {status: 200})

    } catch (error) {
        console.log('Error registerinng User', Error)
        return Response.json({
            success: false,
            message: "Error registering user"
        },{
            status: 500
        }
    )
    }
}