import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import FieldInput from "../forms/fieldInput";
import Image from "next/image";
import { blob } from "stream/consumers";

interface props {
  book?: bookIType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title?: string;
}

const BookModal = ({ book, title, open, setOpen }: props) => {
  const [documentMouned, setDocumentMounted] = useState(false);
  const [formInfo, setForm] = useState<bookIType | null>(book || null);
  const [file, setFile] = useState();
  const ref = useRef();

  // run after document mounted
  useEffect(() => {
    setDocumentMounted(true);
  }, []);

  const OnSubmit = () => {};

  const handleprofileimg = (e) => {
    const namef = e.target.name;
    let [file] = e.target.files;

    if (file) {
      let limit = file.size / 1024;
      let type = file.type.split("/")[0];
      if (type !== "image") {
        window.alert("Please insert an image");
      } else if (limit > 150) {
        window.alert("File Cannot Be Greater than 150kb");
      } else {
        setForm({ ...formInfo, [namef]: file });
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
    formreqdata.append("published_date", formInfo.published_date);

    try {
      await axios.post(`${urlapi}/profile`, formreqdata).then((res) => {
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
            className="fixed inset-0 flex items-center justify-center"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white shadow-md border-[1px] w-full max-w-[800px]  border-nuetral-100 rounded-[10px] "
            >
              <div className="flex items-center justify-between p-[8px_20px] border-b-[1px] border-nuetral-100">
                <p className="text-[18px] font-[600]">{title}</p>{" "}
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
                }}
              >
                <div className="flex m-[20px_30px] justify-between flex-wrap gap-[20px]">
                  <div className="flex flex-col  w-full max-w-[300px]  gap-[20px]">
                    <FieldInput
                      name="title"
                      setField={setForm}
                      title="Title"
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
                      value={formInfo}
                      placeholder="Add Author"
                      required
                    />
                  </div>
                  <div className="relative ">
                    <div className="w-[140px] overflow-hidden  rounded-[10px] h-[200px] relative">
                      <Image
                        src={
                          (formInfo?.coverImageName &&
                            (typeof formInfo?.coverImageName === "string"
                              ? formInfo?.coverImageName
                              : URL?.createObjectURL(
                                  formInfo?.coverImageName
                                ))) ||
                          "/defaultCover.jpg"
                        }
                        alt="CoverImage"
                        fill
                      />
                    </div>
                    <input
                      ref={ref}
                      onChange={handleprofileimg}
                      type="file"
                      className=""
                      name={"profileImage"}
                    ></input>
                    <button
                      type="button"
                      onClick={() => ref.current.click()}
                      className={``}
                    ></button>
                  </div>

                  <FieldInput
                    name="genre"
                    setField={setForm}
                    title="Genre"
                    type="text"
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
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
};

export default BookModal;
