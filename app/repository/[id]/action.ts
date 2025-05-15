"use server";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getRepositoryData(id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  try {
    const repository = await prisma.repository.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        files: true,
      },
    });

    repository?.files.map((file) => {
      console.log("file.name is ", file.name);
    });

    if (!repository) {
      return null;
    }

    return repository;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return null;
  }
}
