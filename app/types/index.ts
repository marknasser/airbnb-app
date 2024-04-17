import { User, Listing } from "@prisma/client";
// to sanitize and not to sending dangerous object like Date
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & { createdAt: string };

// export type Listing = {
//   id: string;
//   title: string;
//   description: string;
//   imageSrc: string;
//   createdAt: Date;
//   category: string;
//   roomCount: number;
//   bathroomCount: number;
//   guestCount: number;
//   locationValue: string;
//   userId: string;
//   price: number;
// };
