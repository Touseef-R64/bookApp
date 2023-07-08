import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import BookModal from "./bookModal";

interface props {
  bookItem: bookIType;
}

const Book = ({ bookItem }: props) => {
  const [openmodal, setOpen] = useState(false);
  return (
    <div className="w-full relative  max-w-[210px] group transition-all overflow-hidden p-[5px] shadow-main rounded-[20px]">
      <div className="absolute top-0  z-10 flex opacity-0 group-hover:opacity-100 items-center justify-end gap-[6px] w-full p-[7px_15px]">
        <button className="text-[#f5f5f5] bg-black/[.40] text-[14px] w-[30px] h-[30px] rounded-full">
          <FontAwesomeIcon icon={faTrash} />{" "}
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-[#f5f5f5] bg-black/[.40] text-[14px] w-[30px] h-[30px] rounded-full"
        >
          <FontAwesomeIcon icon={faPen} />{" "}
        </button>{" "}
      </div>
      <div className="w-full relative overflow-hidden h-[240px] rounded-[20px]">
        <Image
          src={`/uploads/bookCovers/${bookItem?.coverImageName}` || ""}
          fill
          alt="book Cover"
        />
      </div>
      <div className="p-[5px_10px]">
        <p className="text-[20px] mt-[10px] font-[600]">{bookItem?.title}</p>
        <p className="text-[14px] text-neutral-400">{bookItem?.author}</p>
        <p>{bookItem?.description}</p>
      </div>
      {openmodal && (
        <BookModal
          book={bookItem}
          title="Add Book"
          open={openmodal}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default Book;
