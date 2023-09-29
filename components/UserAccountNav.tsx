"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

type UserAccountNavProps = {
  username: string;
};

const UserAccountNav = ({ username }: UserAccountNavProps) => {
  const { toast } = useToast();

  return (
    <>
      <div className="text-md mr-2">
        Welcome <b>{username.charAt(0).toUpperCase() + username.slice(1)}</b>
      </div>
      <Button
        size="icon"
        onClick={() => {
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          });
          toast({ variant: "success", description: "Sign out successful" });
        }}
      >
        {/* make this icon smaller */}
        <LogOut size={20} />
      </Button>
    </>
  );
};

export default UserAccountNav;
