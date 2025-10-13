import { ToastContainer, Zoom } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const NotificationContainer = () => {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-left'}
        rtl={false}
        theme={'dark'}
        transition={Zoom}
      />
    </>
  )
}
