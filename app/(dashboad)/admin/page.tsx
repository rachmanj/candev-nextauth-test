"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h3 className="text-4xl">
        Welcome Back {session?.user.username} as {session?.user.role}
      </h3>
    </div>
  );
};

export default AdminPage;
