import axios from "axios";
import React, { useEffect, useState } from "react";
import Book from "./books/book";
import BookModal from "./books/bookModal";

const HomePage = () => {
  const [books, setbooks] = useState<bookIType[]>([]);
  const [openmodal, setOpen] = useState(false);
  const getBooks = () => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}`).then((res) => {
        if (res.data) {
          console.log(res.data.books);
          setbooks(res.data.books);
        }
      });
    } catch {}
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleChange = (book: bookIType, isAction: string) => {
    if (isAction === "delete") {
      setbooks((prev) => prev.filter((curr) => curr?._id !== book?._id));
    } else if (isAction === "edit") {
      let arr = books;
      arr[arr.findIndex((curr) => curr?._id === book?._id)] = book;
      console.log(arr);
      setbooks([...arr]);
    } else if (isAction === "add") {
      let arr = books;
      arr.unshift(book);
      setbooks([...arr]);
    }
  };

  return (
    <div className="w-[calc(100%-60px)] pb-[100px]  h-full max-w-[1200px] m-auto ">
      <div className="flex  items-center p-[10px_20px] border-b-[2px] border-nuetral-100 mt-[50px] ">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="shadow-main font-[600] text-[14px] rounded-[5px] p-[5px_10px] hover:translate-y-[-5px] transition-all   "
        >
          Add Book
        </button>
      </div>
      {books.length > 0 ? (
        <div className="flex flex-wrap py-[40px] justify-evenly gap-[20px]">
          {books.map((book, idx) => {
            return (
              <React.Fragment key={idx}>
                <Book execFunc={handleChange} bookItem={book} />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div> no Books found </div>
      )}
      {openmodal && (
        <BookModal
          execFunc={handleChange}
          title="Add Book"
          open={openmodal}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default HomePage;
