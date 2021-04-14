import  { useState, useEffect } from 'react'
import { firestore } from '../firebase'

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection(collection)
        .onSnapshot((snap) => {
            let documents = [];
            snap.forEach(doc => {
                documents.push({
                    id: doc.id,
                    ...doc.data()
                })
            });
            setDocs(documents);
        })
        return () => unsubscribe()  //callback when unmounted
    }, [collection])
}

export default useFirestore;