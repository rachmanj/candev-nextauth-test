"use client";

import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p>Session: {JSON.stringify(session)}</p>
    </div>
  );
};

export default User;
