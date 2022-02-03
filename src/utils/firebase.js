// firebaseInstance.js
import { initializeApp } from 'firebase/app'
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage'

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

// file 업로드
export const uploadFile = (file, fileName) => {
  const storageRef = ref(storage, fileName)
  uploadBytes(storageRef, file).then(() => {
    alert('Uplode file')
  })
}

// url 받기
export const getDownloadUrl = (folder, fileName) => {
  if (folder !== 'file' && folder !== 'profile') return 'wrong folder'
  return `https://firebasestorage.googleapis.com/v0/b/translation-talk-efa1a.appspot.com/o/${folder}%2F${fileName}?alt=media`
}

// file 삭제
export const deleteFile = (folder, fileUrl) => {
  if (folder !== 'file' && folder !== 'profile') return 'wrong folder'
  // Url에서 fileName만 가져옴
  const fileName = fileUrl.match(/(?<=%2F)(.*?)(?=\?)/g)

  const storageRef = ref(storage, `${folder}/${fileName}`)

  deleteObject(storageRef)
    .then(() => {
      console.log(`${fileName} deleted successfully`)
    })
    .catch(error => {
      console.log(error)
    })
}
