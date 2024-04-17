"use client";
import { Listing, Reservation } from "@prisma/client";
// import { Listing } from "@/app/types";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import Heading from "../Heading";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "../hooks/useCountries";
import { format } from "date-fns";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  currentUser?: SafeUser | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  actionId = "",
  actionLabel,
  currentUser,
  onAction,
  reservation,
  disabled,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handelCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "pp")} - ${format(end, "pp")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => {
        router.push(`/listings/${data.id}`);
      }}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt="listing"
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light  text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold ">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handelCancel}
          />
        )}
      </div>

      {/* <Heading title={data.title} subtitle={data.category} />
      <div></div> */}
    </div>
  );
};

export default ListingCard;
