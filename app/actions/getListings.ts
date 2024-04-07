import prisma from "@/app/libs/prismadb";

interface getListingsPros {}

export async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(listings);
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
