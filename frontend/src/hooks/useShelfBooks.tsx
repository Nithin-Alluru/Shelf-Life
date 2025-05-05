import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { BookItem, work_ids } from "../types";
import { Bounce, toast } from "react-toastify";


// helper method for getting the list of books in a user's bookshelf
export const useShelfBooks = (username:string, shelfName:string) => {
  const [shelfBooksList, setShelfBooksList] = useState<BookItem[]>([]);
  const [loadingBookshelf, setLoadingBookshelf] = useState(false); // provide loading feedback
  const [bookshelfError, setBookshelfError] = useState(''); // handle errors gracefully
  const token = sessionStorage.getItem("access_token");
  var bookid_list:string[] = [];
  var bookList:BookItem[] = [];

  useEffect(() => {
    const fetchShelfBooks = async () => {
      setLoadingBookshelf(true);
      setBookshelfError('');

      try {
        const shelfResponse = await 
          axios.get(`/shelf/${username}/${shelfName}`, {
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
          },
        });

        const list:work_ids[]= shelfResponse.data[0].books;
        bookid_list = (list.flatMap((item:work_ids)=> item.work_id));

        console.log(bookid_list)

        const bookList:BookItem[] = (
          await Promise.all(
          bookid_list.map(async (work_id): Promise<BookItem | null> => {
            try {
              const bookRes = await axios.get(`/book/${work_id}`);
                return bookRes.data;
            } catch {
              console.error(`Error fetching book with work id: ${work_id} in shelf: ${shelfName}`);
              return null;
            }
          }
        )
        ).then((books) => books.filter((b):b is BookItem => b !== null)));

        setShelfBooksList(bookList);
      } 
      catch (error) {
        console.log(`Error loading books from shelf ${shelfName}`);
        // show error- oops were having trouble getting your read books list
        toast.error(`Failed to load shelf: ${shelfName}. Please try again later.`)
        setBookshelfError('Failed to load shelf books.');
      } 
      finally {
        setLoadingBookshelf(false);
      }
    };

    // check that both parameters were provided
    if (username && shelfName) {
      fetchShelfBooks();
    }

    }, [username, shelfName])
    return {shelfBooksList, loadingBookshelf, bookshelfError}
  }

export default useShelfBooks;
