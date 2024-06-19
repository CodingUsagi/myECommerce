"use server";

import prisma from "@/app/db/db";
import { notFound } from "next/navigation";

export async function deleteOrder(id: string) {
  const user = await prisma.order.delete({
    where: { id },
  });

  if (user == null) return notFound();

  return user;
}
