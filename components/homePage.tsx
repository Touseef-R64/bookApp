import axios from "axios";
import React, { useEffect, useState } from "react";
import Book from "./books/book";
import BookModal from "./books/bookModal";

const HomePage = () => {
  const [books, setbooks] = useState<bookIType[]>([]);
  const [openmodal, setOpen] = useState(true);
  const getBooks = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}`).then((res) => {
      if (res.data) {
        setbooks(res.data);
      }
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="w-full  h-full max-w-[1200px] m-auto ">
      <div className="flex items-center p-[10px_20px] border-b-[2px] border-nuetral-100 mt-[50px] ">
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
        <div>
          {books.map((book, idx) => {
            return (
              <React.Fragment key={idx}>
                <Book bookItem={book} />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div> no Books found </div>
      )}
      <BookModal title="Add Book" open={openmodal} setOpen={setOpen} />
    </div>
  );
};

export default HomePage;
