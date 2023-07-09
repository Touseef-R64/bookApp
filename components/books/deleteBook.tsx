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
import { blob, json } from "stream/consumers";
import axios from "axios";
import { toast } from "react-toastify";

interface props {
  book: bookIType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  execFunc: (book: bookIType, isAction: string) => void;
}

const DeleteBook = ({ book, open, execFunc, setOpen }: props) => {
  const [documentMouned, setDocumentMounted] = useState(false);

  // run after document mounted
  useEffect(() => {
    setDocumentMounted(true);
  }, []);

  const HandleDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (book?._id)
        await axios
          .delete(`${process.env.NEXT_PUBLIC_BACKENDURL}books/${book?._id}`)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Book deleted successfully", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              execFunc(book, "delete");
              setOpen(false);
            } else {
              toast.error("an error occured pls try again", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
    } catch (err) {
      toast.error(err.response?.data?.message || "error occured", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (open && documentMouned)
    return (
      <div>
        {createPortal(
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="fixed inset-0 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white shadow-md border-[1px] max-h-[80vh] overflow-hidden overflow-y-auto w-[calc(100%-20px)] max-w-[500px]  border-nuetral-100 rounded-[10px] "
            >
              <div className="flex items-center justify-between p-[8px_20px] border-b-[1px] border-nuetral-100">
                <p className="text-[18px] max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap font-[600]">
                  Delete {book?.title}?
                </p>{" "}
                <p
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="text-main-100 font-[14px]"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </p>
              </div>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  HandleDelete(e);
                }}
              >
                <p className="w-[100%] font-[600] mx-[20px] mt-[30px] text-center">
                  Are you sure you wish to delete this book?
                </p>
                <div className="flex items-start gap-[10px] justify-center h-[80px] p-[10px_20px]">
                  <input
                    type="button"
                    value="Cancel"
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="bg-white p-[5px_10px] rounded-[5px] text-black font-[500] shadow-main"
                  ></input>
                  <input
                    type="submit"
                    value="Delete"
                    className="bg-error-100 p-[5px_10px] rounded-[5px] text-white shadow-main"
                  ></input>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
};

export default DeleteBook;
