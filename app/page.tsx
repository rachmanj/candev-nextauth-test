import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import User from "@/components/User";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h2 className="text-3xl">HOME</h2>
      <Link href="/admin" className="hover:underline">
        Admin Page
      </Link>
      <div className="mt-2">
        <h2>Client Session</h2>
        <User />
      </div>
      <div className="mt-2">
        <h2>Server Session</h2>
        <p>Session: {JSON.stringify(session)}</p>
      </div>
    </div>
  );
}
