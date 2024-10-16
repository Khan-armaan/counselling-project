import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { NEXT_AUTH_CONFIG } from "./api/auth/[...nextauth]/options";

export default async function Page() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/signin')
  }
}
