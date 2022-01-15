import React from 'react'
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login/Login'

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
=======
import { Route, Routes } from 'react-router-dom'
// common
import Login from './common/Login'
import Chat from './common/Chat'
import ChatList from './common/ChatList'
// client
import ClientEstimateList from './client/ClientEstimateList'
import ClientHome from './client/ClientHome'
import ClientRequestForm from './client/ClientRequestForm'
import RequestList from './client/RequestList'
import TranslatorDetail from './client/TranslatorDetail'
// translator
import EstimateForm from './translator/EstimateForm'
import MyTranslationList from './translator/MyTranslationList'
import TranslationList from './translator/TranslationList'
import TranslatorEstimateDetail from './translator/TranslatorEstimateDetail'
import TranslatorMyPage from './translator/TranslatorMyPage'
import TranslatorSignupForm from './translator/TranslatorSignupForm'
//all
import All from '../All'

const Router = () => {
  return (
    <div>
      <Routes>
        {/* all */}
        <Route path="/test" element={<All />} />
        {/* common */}
        <Route path="/" element={<Login />} />
        <Route path="/chat/:roomid" element={<Chat />} />
        <Route path="/chat/list" element={<ChatList />} />
        {/* client */}
        <Route path="/client/main" element={<ClientHome />} />
        <Route path="/client/request/list" element={<RequestList />} />
        <Route path="/client/request" element={<ClientRequestForm />} />
        <Route
          path="/client/estimate/list/:id"
          element={<TranslatorDetail />}
        />
        <Route path="/client/estimate/list" element={<ClientEstimateList />} />
        {/* translator */}
        <Route path="/translator/signup" element={<TranslatorSignupForm />} />
        <Route path="/translator/list" element={<TranslationList />} />
        <Route path="/translator/estimate/form" element={<EstimateForm />} />
        <Route path="/translator/mypage" element={<TranslatorMyPage />} />
        <Route
          path="/translator/translation/list"
          element={<MyTranslationList />}
        />
        <Route
          path="/translator/estimate/:id"
          element={<TranslatorEstimateDetail />}
        />
      </Routes>
    </div>
>>>>>>> 133e3377d4e2135f8d4f4237adefaf2ae31268ec
  )
}

export default Router