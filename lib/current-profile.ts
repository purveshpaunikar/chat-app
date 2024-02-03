import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();

  //   Meaning we cannot find current profile
  if (!userId) {
    return null;
  }

  //   if there is any user id

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
