"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronUp } from "lucide-react";

type ServiceItem = {
  name: string;
  slug: string;
  shortDescription: string | null;
  featuredImage: string | null;
};

type ServicesGridProps = {
  items: ServiceItem[];
  viewAllLabel: string;
};

export const ServicesGrid = ({ items, viewAllLabel }: ServicesGridProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-2 rounded-[20px] border border-text/30 px-8 py-3 text-sm font-medium text-text transition-colors hover:bg-text hover:text-light cursor-pointer"
        >
          {expanded ? <ChevronUp className="size-4" /> : viewAllLabel}
        </button>
      </div>

      <div
        className={`border border-brown/30 rounded-[20px] px-12 ${expanded ? "py-7" : "py-0"} grid grid-cols-1 gap-x-12 gap-y-7 overflow-hidden transition-all duration-500 ease-in-out sm:grid-cols-2 lg:grid-cols-3 ${
          expanded ? "mt-10 max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/services/${item.slug}`}
            className="group flex items-center rounded-[10px] bg-transparent border border-brown/30 transition-colors"
          >
            {item.featuredImage && (
              <div className="relative h-20 w-20 shrink-0 overflow-hidden max-lg:rounded-[10px] lg:rounded-l-[10px]">
                <Image
                  src={item.featuredImage}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            <div className="h-full py-2 rounded-r-[8px] px-4 group-hover:bg-brown duration-300">
              <span className="text-base font-bold text-text group-hover:text-white duration-300">
                {item.name}
              </span>
              {item.shortDescription && (
                <p className="mt-0.5 text-xs text-text/60 line-clamp-2 group-hover:text-white duration-300">
                  {item.shortDescription}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
