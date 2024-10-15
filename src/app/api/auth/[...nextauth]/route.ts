import { NEXT_AUTH_CONFIG } from "./options";
import { Session } from "inspector/promises";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth(NEXT_AUTH_CONFIG)

export { handler as GET, handler as POST }