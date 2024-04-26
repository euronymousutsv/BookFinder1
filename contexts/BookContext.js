import { createContext,useContext, useState } from "react";
const BookContext = createContext();

export const useBook = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
    const [bookId, setBookId] = useState(null);

    const updateBookId = (id) => {
        setBookId(id);
    };

    return (
        <BookContext.Provider value={{ bookId, updateBookId }}>
            {children}
        </BookContext.Provider>
    );
};