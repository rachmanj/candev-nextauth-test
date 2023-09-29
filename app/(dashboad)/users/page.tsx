"use client";

import { useSession } from "next-auth/react";

const Users = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Users</h1>
      <div>
        <p>Session: {JSON.stringify(session)}</p>
      </div>
    </div>
  );
};

export default Users;
