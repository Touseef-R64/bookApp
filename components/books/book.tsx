import Image from "next/image";
import React from "react";

interface props {
  bookItem: bookIType;
}

const Book = ({ bookItem }: props) => {
  return (
    <div className="w-full max-w-[170px] overflow-hidden p-[5px] shadow-main rounded-[20px]">
      <div className="w-full overflow-hidden h-[300px] rounded-[20px]">
        <Image src={bookItem?.coverImageName || ""} fill alt="book Cover" />
      </div>
      <p className="text-[20px] mt-[10px] font-[600]">{bookItem?.title}</p>
      <p className="text-[14px] text-neutral-400">{bookItem?.author?.name}</p>
    </div>
  );
};

export default Book;
