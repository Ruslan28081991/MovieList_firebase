import { initializeApp } from "firebase/app";
import { getFirestore, 
         serverTimestamp, 
         updateDoc 
        } from "firebase/firestore";
import { collection,
         setDoc,
         getDocs, 
         doc,
         deleteDoc,
         writeBatch,
         query, 
         orderBy
         } from "firebase/firestore"; 

export class Firebase {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyB33M-u7um1Y6vvR0Xaa7xMyhjrGVj8D0Y",
            authDomain: "movielist-ddc4d.firebaseapp.com",
            projectId: "movielist-ddc4d",
            storageBucket: "movielist-ddc4d.appspot.com",
            messagingSenderId: "215926455522",
            appId: "1:215926455522:web:511548eafcc9d9c08132bb"
          };

          this.app = initializeApp(this.firebaseConfig);
          this.db = getFirestore(this.app);
          this.key = "movies";
    }

    async add(movie) {
        try {
            await setDoc(doc(this.db, this.key, movie.id), {
                title: movie.title,
                done: movie.done,
                createdAt: serverTimestamp(), 
            });
        } catch (e) {
          console.error("Ошибка добавления: ", e);
          throw new Error("Ошибка добавления фильма в базу данных")
        }
    }
    
    async pull() {
        const ref = collection(this.db, this.key)
        const q = query(ref, orderBy("createdAt"));

        try {
            const querySnapshot = await getDocs(q);
            const movies = [];

            querySnapshot.forEach((doc) => {
                    movies.push({
                        title: doc.data().title,
                        done: doc.data().done,
                        id: doc.id
                    });
            });
            return movies;
        } catch (error) {
            console.error("Ошибка загрузки данных", error)
            throw new Error("Ошибка загрузки данных из базы");
            
        }
    }

    async update(movie) {
        const result = doc(this.db, this.key, movie.id);

        try {
            await updateDoc(result, {
                done: movie.done
            });
        } catch (error) {
            console.error("Ошибка обновления", error)
            throw new Error("Ошибка обновления фильма");
            
        }
    }   

    async deleteAll({ moviesIds }) {
        const batch = writeBatch(this.db);

        try {
            moviesIds.forEach(id => {
                const ref = doc(this.db, this.key, id);
                batch.delete(ref)
            })
           await batch.commit();
        } catch (error) {
            console.error("Ошибка удаления списка", error)
            throw new Error("Ошибка удаления списка фильмов");
        }
    }

    async delete(id) {
        try {
            await deleteDoc(doc(this.db, this.key, id));
        } catch (error) {
            console.error("Ошибка удаления", error)
            throw new Error("Ошибка удаления фильма");
        }
    }  
}
