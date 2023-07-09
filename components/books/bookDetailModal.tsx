import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import FieldInput from "../forms/fieldInput";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { dateformateHandler } from "../../utils/dateformat";

interface props {
  book?: bookIType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const BookDetailModal = ({ book, open, setOpen }: props) => {
  const [documentMouned, setDocumentMounted] = useState(false);

  // run after document mounted
  useEffect(() => {
    setDocumentMounted(true);
  }, []);

  if (open && documentMouned)
    return (
      <div>
        {createPortal(
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="fixed inset-0 z-10 flex items-center cursor-pointer justify-center"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white cursor-default shadow-md border-[1px] max-h-[80vh]  overflow-hidden overflow-y-auto w-[calc(100%-20px)] max-w-[600px]  border-nuetral-100 rounded-[10px] "
            >
              <div className="flex items-center justify-between p-[8px_20px] border-b-[1px] border-nuetral-100">
                <p className="text-[18px] font-[600]">Book Details</p>{" "}
                <p
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="text-main-100 font-[14px] cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </p>
              </div>

              <div className="flex m-[20px_30px]  flex-wrap gap-[20px]">
                <div className="relative ">
                  <div className="w-[240px] overflow-hidden  rounded-[10px] h-[320px] relative">
                    <Image
                      src={
                        book?.coverImageName
                          ? `/uploads/bookCovers/${book?.coverImageName}`
                          : "/defaultCover.jpg"
                      }
                      alt="CoverImage"
                      fill
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-end  w-fit  gap-[1px]">
                  <p className="text-[26px]  font-[600]">{book?.title}</p>
                  <p className="text-[18px] text-neutral-400">
                    By {book?.author}
                  </p>
                  <p className="font-[500] text-[12px] max-h-[100px] max-w-[100%] overflow-hidden text-ellipsis">
                    <span className="text-gray-400">Published: </span>
                    {dateformateHandler(book?.published_date)?.standardDate}
                  </p>
                  <p className="font-[500] text-[12px] max-h-[100px] max-w-[100%] overflow-hidden text-ellipsis">
                    <span className="text-gray-400">genre: </span>
                    {book?.genre}
                  </p>
                </div>

                <p className="font-[500] max-h-[100px] max-w-[100%] overflow-hidden text-ellipsis">
                  <span className="text-gray-400">Description: </span> <br />{" "}
                  {book?.description}{" "}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
};

export default BookDetailModal;
