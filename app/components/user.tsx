import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/token/authOptions";
const User = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="text-center">Welcome {session && session?.user?.name}</div>
  );
};

export default User;
