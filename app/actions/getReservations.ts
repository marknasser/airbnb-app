import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  const { listingId, userId, authorId } = params;

  console.log("userId", userId);
  console.log("listingId", listingId);
  console.log("authorId", authorId);
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });
    const safeReservations = reservations.map((res) => ({
      ...res,
      createdAt: res.createdAt.toISOString(),
      startDate: res.startDate.toISOString(),
      endDate: res.endDate.toISOString(),
      listing: {
        ...res.listing,
        createdAt: res.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (err: any) {
    throw new Error(err);
  }
}
