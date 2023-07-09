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
  title?: string;
  execFunc: (book: bookIType, isAction: string) => void;
}

const BookModal = ({ book, title, open, execFunc, setOpen }: props) => {
  const [documentMouned, setDocumentMounted] = useState(false);
  const [formInfo, setForm] = useState<bookIType | null>(book || null);
  const [file, setFile] = useState();
  const ref = useRef();

  // run after document mounted
  useEffect(() => {
    setDocumentMounted(true);
  }, []);

  const handleprofileimg = (e) => {
    const namef = e.target.name;
    let [file] = e.target.files;

    if (file) {
      let limit = file.size / 1024;
      let type = file.type.split("/")[0];
      if (type !== "image") {
        window.alert("Please insert an image");
      } else if (limit > 15000) {
        window.alert("File Cannot Be Greater than 1.5mb");
      } else {
        setFile(file);
      }
    }
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formreqdata = new FormData();

    formreqdata.append("file", file);

    formreqdata.append("title", formInfo.title);
    formreqdata.append("author", formInfo.author);
    formreqdata.append("description", formInfo.description);
    formreqdata.append("genre", formInfo.genre);
    formreqdata.append(
      "published_date",
      JSON.stringify(formInfo.published_date)
    );

    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKENDURL}books/`, formreqdata)
        .then((res) => {
          if (res.status === 200) {
            toast.success("data added successful", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            execFunc(formInfo, "add");
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

  const UpdateHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formreqdata = new FormData();

    formreqdata.append("file", file);

    formreqdata.append("title", formInfo.title);
    formreqdata.append("author", formInfo.author);
    formreqdata.append("description", formInfo.description);
    formreqdata.append("genre", formInfo.genre);
    formreqdata.append(
      "published_date",
      JSON.stringify(dateformateHandler(formInfo.published_date).standardDate)
    );

    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_BACKENDURL}books/${book?._id}`,
          formreqdata
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Book updated successfully", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            execFunc(formInfo, "edit");

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
            className="fixed inset-0 z-10 flex items-center cursor-pointer justify-center"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white cursor-default shadow-md border-[1px] max-h-[80vh]  overflow-hidden overflow-y-auto w-[calc(100%-20px)] max-w-[800px]  border-nuetral-100 rounded-[10px] "
            >
              <div className="flex items-center justify-between p-[8px_20px] border-b-[1px] border-nuetral-100">
                <p className="text-[18px] font-[600]">{title}</p>{" "}
                <p
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="text-main-100 font-[14px] cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </p>
              </div>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (book?._id) {
                    UpdateHandler(e);
                  } else submitHandler(e);
                }}
              >
                <div className="flex m-[20px_30px] justify-between flex-wrap gap-[20px]">
                  <div className="flex flex-col  w-full max-w-[300px]  gap-[20px]">
                    <FieldInput
                      name="title"
                      setField={setForm}
                      title="Title"
                      pattern="^[a-zA-Z0-9\s]+$"
                      type="text"
                      value={formInfo}
                      placeholder="Add Title"
                      required
                    />
                    <FieldInput
                      name="author"
                      setField={setForm}
                      title="Author"
                      type="text"
                      pattern="/^[a-zA-Z0-9.()]+$/"
                      value={formInfo}
                      placeholder="Add Author"
                      required
                    />
                  </div>
                  <div className="relative ">
                    <div className="w-[140px] overflow-hidden  rounded-[10px] h-[200px] relative">
                      <Image
                        src={
                          !file
                            ? formInfo?.coverImageName
                              ? `/uploads/bookCovers/${formInfo?.coverImageName}`
                              : "/defaultCover.jpg"
                            : URL?.createObjectURL(file)
                        }
                        alt="CoverImage"
                        fill
                      />
                      <input
                        ref={ref}
                        onChange={handleprofileimg}
                        type="file"
                        className=" w-[2px] h-[1px] absolute"
                        name={"file"}
                        accept="images"
                      ></input>
                    </div>

                    <button
                      type="button"
                      onClick={() => ref.current.click()}
                      className={` absolute bottom-0 right-0 rounded-full bg-white shadow-main text-main-100 text-[20px] cursor-pointer mr-[-15px] mb-[-15px] w-[50px] h-[50px]`}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>

                  <FieldInput
                    name="genre"
                    setField={setForm}
                    title="Genre"
                    type="text"
                    pattern="^[a-zA-Z\s]+$"
                    value={formInfo}
                    placeholder="Add Genre"
                    required
                  />
                  <FieldInput
                    name="published_date"
                    setField={setForm}
                    title="Published Date"
                    type="date"
                    value={formInfo}
                    placeholder="Add Published Date"
                    required
                  />
                  <FieldInput
                    name="description"
                    setField={setForm}
                    title="Description"
                    type="textarea"
                    value={formInfo}
                    placeholder="Add Description"
                    required
                  />
                </div>
                <div className="flex items-center justify-end p-[10px_20px]">
                  <button className="bg-main-100 p-[5px_10px] rounded-[5px] text-white shadow-main">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
};

export default BookModal;
