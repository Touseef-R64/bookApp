import {
  faExclamation,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import BookModal from "./bookModal";
import DeleteBook from "./deleteBook";
import { dateformateHandler } from "../../utils/dateformat";
import BookDetailModal from "./bookDetailModal";

interface props {
  bookItem: bookIType;
  execFunc: (book: bookIType, isAction: string) => void;
}

const Book = ({ bookItem, execFunc }: props) => {
  const [openmodal, setOpen] = useState(false);
  const [openDelete, setDelete] = useState(false);
  const [openDetails, setDetails] = useState(false);
  return (
    <div className="w-full border-[1px] border-x-nuetral-100 relative  max-w-[210px] group transition-all overflow-hidden p-[5px] shadow-main rounded-[10px]">
      <div className="absolute top-0 transition-all z-10 flex md:opacity-0 group-hover:opacity-100 items-center justify-end gap-[6px] w-full p-[7px_15px]">
        <button
          onClick={() => {
            setDetails(true);
          }}
          className="text-[#f5f5f5] bg-black/[.40] text-[14px] w-[30px] h-[30px] rounded-full"
        >
          <FontAwesomeIcon icon={faExclamation} />{" "}
        </button>{" "}
        <button
          onClick={() => {
            setDelete(true);
          }}
          className="text-[#f5f5f5] bg-black/[.40] text-[14px] w-[30px] h-[30px] rounded-full"
        >
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
      <div className="w-full relative overflow-hidden h-[240px] rounded-[10px]">
        <Image
          src={
            bookItem?.coverImageName
              ? `/uploads/bookCovers/${bookItem?.coverImageName}`
              : "/defaultCover.jpg"
          }
          fill
          alt="book Cover"
        />
        <div className="absolute z-20 transition-all bottom-0 left-0 group-hover:opacity-100 md:opacity-0">
          <p
            onClick={() => {
              setOpen(true);
            }}
            className="text-[#f5f5f5]   bg-black/[.40] text-[14px] p-[5px_10px] rounded-[5px]"
          >
            {bookItem?.genre}
          </p>
        </div>
      </div>
      <p className="text-[12px] font-[600] text-gray-500 text-right">
        {dateformateHandler(bookItem?.published_date)?.standardDate}
      </p>

      <div className="px-[10px]">
        <p className="text-[20px]  font-[600]">{bookItem?.title}</p>
        <p className="text-[14px] text-neutral-400">{bookItem?.author}</p>
        <p className="font-[500] max-h-[100px] max-w-[100%] overflow-hidden text-ellipsis">
          {bookItem?.description}
        </p>
      </div>
      {openmodal && (
        <BookModal
          book={bookItem}
          execFunc={execFunc}
          title="Add Book"
          open={openmodal}
          setOpen={setOpen}
        />
      )}
      {openDelete && (
        <DeleteBook
          execFunc={execFunc}
          book={bookItem}
          open={openDelete}
          setOpen={setDelete}
        />
      )}
      {openDetails && (
        <BookDetailModal
          book={bookItem}
          open={openDetails}
          setOpen={setDetails}
        />
      )}
    </div>
  );
};

export default Book;
