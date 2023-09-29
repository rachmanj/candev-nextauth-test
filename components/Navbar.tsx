import Link from "next/link";
import { HandMetal } from "lucide-react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-gray-100 py-2 border-b border-gray-500 w-full fixed z-10 top-0 shadow-md">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <HandMetal />
        </Link>

        <div className="flex items-center">
          {session?.user && <UserAccountNav username={session.user.username} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
