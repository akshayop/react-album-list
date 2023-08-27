import React from "react";
import { useState } from "react";
import { useAlbum } from "../hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styles from '../styles/app.module.css';

function Album({ album }) { 
  const data = useAlbum(); 
  const [title, setTitle] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(album.title);
  }, [album]);

  async function handleUpdateAlbum() {
    if (title.length <= 1) {
      toast.error("empty name cannot be update...");
      return;
    }
    setIsLoading(true);
    const { userId, id } = album;
    const response = await data.updateAlbum(id, title, userId);
    setIsEditable(false);
    if (response) {
      toast.success("Album Updated successfull...");
    } else {
      toast.error("Album Updated successfull...");
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.albumContainer}>
      <div className={styles.leftComponent}>
        <img src="https://images.pexels.com/photos/7751832/pexels-photo-7751832.jpeg?auto=compress&cs=tinysrgb&w=600" alt="coverPhoto" />
      </div>
      <div className={styles.rightComponent}>
        <div className={styles.topBody}>
          <span className={styles.title}> Title : </span>
          {isEditable ? (
            <input type="text" value={isLoading ? "Please wait..." : {title}} onChange={(e) => setTitle(e.target.value)} />
          ) : (
            <span> {title} </span>
          )}
        </div>
        <div className={styles.bottomBody}>
          {isEditable ? (
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <button className={styles.updateBtn} onClick={() => { handleUpdateAlbum(); }} > Update{" "} </button>
                </div>
                <div className={styles.flipCardBack}>
                  <button className={styles.updateBtn} onClick={() => { handleUpdateAlbum(); }} >
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828743.png" alt="update" />
                  </button>
                </div>
              </div>
            </div>
          ) : (

            <div className={styles.flipCard}>
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>
                  <button className={styles.editBtn} onClick={() => { setIsEditable(!isEditable); }} > Edit </button>
                  </div>
                  <div className={styles.flipCardBack}>
                    <button className={styles.editBtn} onClick={() => { setIsEditable(!isEditable); }} > 
                      <img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png" alt="edit" />
                    </button>
                  </div>
                </div>
              </div>
            
            
          )}


          <div className={styles.flipCard}>
            <div className={styles.flipCardInner}>
              <div className={styles.flipCardFront}>
              <button className={styles.removeBtn} onClick={async () => { 
                  await data.removeAlbumFromList(album);
                  toast.success("removed success full...");
              }}>
                Delete{" "}
              </button>
              </div>
              <div className={styles.flipCardBack}>
                <button className={styles.removeBtn} onClick={async () => { 
                    await data.removeAlbumFromList(album);
                    toast.success("removed success full...");
                }}>
                  <img src="https://cdn-icons-png.flaticon.com/128/3221/3221845.png" alt="delete" />
                </button>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Album;