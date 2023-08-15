import React from "react";
import { useAlbum } from "../hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { Album, Navbar, Loader } from "./";
import styles from '../styles/app.module.css';

function App() {
  
  const data = useAlbum();
  const [text, setText] = useState("");

  const handleAddToalbum = async () => {
      if (text.length <= 1) {
        return toast.error("Please fill the album name to add");
      }
      const userId = 101;
      const title = text;
      const response = await data.addDataToAlbum(userId, title);
      setText("");
      if (response) {
        toast.success("album created...");
      } else {
        toast.error("please try again");
      }
  };

  // used to adding the album to albums list
  
  if (data.loading) {
    return <Loader />
  }

  return (
    <>
      <Navbar />
      <div className={styles.app}>
        
        <div className={styles.inputContainer}>
          <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
          />
          <div className={styles.addBtn} onClick={handleAddToalbum}>
            <img
                src="https://cdn-icons-png.flaticon.com/128/1237/1237946.png"
                alt="add"
            />
            <span>Add</span>
          </div>
        </div>

        <div className={styles.albumList}>
          {/* {console.log(albums)} */}
          {data.albums.map((album, i) => {
            return <Album album={album} data={data} key={`album${i}`} />;
          })}
        </div>
        
      </div>
    </>
  );
}

export default App;