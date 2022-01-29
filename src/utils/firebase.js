// firebaseInstance.js
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

import 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(
  app,
  'gs://translation-talk-efa1a.appspot.com',
)

//업로드
export const uploadFile = (file, fileName) => {
  const storageRef = ref(storage, fileName)
  uploadBytes(storageRef, file).then(() => {
    alert('Uplode file')
  })
}

//다운로드
export const downloadFile = fileName => {
  const storageDonwnloadRef = ref(storage, fileName)
  getDownloadURL(storageDonwnloadRef).then(url => {
    return url
  })
}
