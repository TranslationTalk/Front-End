import React from 'react'
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
import ReviewForm from './client/ReviewForm'
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
        <Route
          path="/client/request/text"
          element={<ClientRequestForm isText={true} />}
        />
        <Route
          path="/client/request/youtube"
          element={<ClientRequestForm isText={false} />}
        />
        <Route path="/client/estimate/detail" element={<TranslatorDetail />} />
        <Route path="/client/estimate/list" element={<ClientEstimateList />} />
        <Route path="/client/review" element={<ReviewForm />} />
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
  )
}

export default Router
