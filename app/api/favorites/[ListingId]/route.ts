import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  ListingId?: string;
}
// something is wrong here when i sent ListingId it is getting re-formated to upper case param var
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { ListingId } = params;

  if (!ListingId || typeof ListingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(ListingId);

  const user = await prisma?.user.update({
    where: { id: currentUser?.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { ListingId } = params;

  if (!ListingId || typeof ListingId !== "string") {
    console.log("errorrr");
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = currentUser.favoriteIds.filter((id) => id !== ListingId);

  const user = await prisma?.user.update({
    where: { id: currentUser?.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}
