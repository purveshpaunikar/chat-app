import { currentProfile } from "@/lib/current-profile";

import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { root } from "postcss";
import { redirect } from "next/navigation";
import ServerSidebar from "@/components/server/server-sidebar";

const serverIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      // here we have write serverId bacuase we have return folder name as serverId
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  //   if someone is not from this server or ther server is deleted
  if (!server) {
    return redirect("/");
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col  fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>

      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default serverIdLayout;
