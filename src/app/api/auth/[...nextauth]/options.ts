import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";


const prisma = new PrismaClient();

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          // Fetch the user from the database by email
          const user = await prisma.user_login.findUnique({
            where: { email }
          });

          // Check if user exists and verify password
          if (user && (await bcrypt.compare(password, user.password))) {
            // Return user object (customize fields as needed)
            return {
              id: user.id.toString(),
              email: user.email,
              isAdmin: user.is_admin,
            };
          } else {
            // Invalid credentials
            return null;
          }
        } catch (error) {
          console.error("Error during user authentication:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
    ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.uid;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
};
