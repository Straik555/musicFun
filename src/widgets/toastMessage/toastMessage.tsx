import React, { FC } from 'react'
import cn from 'classnames'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import s from './toastMessage.module.css'

const ToastMessage: FC = () => {
	return (
		<ToastContainer
			className={cn(s.toastWrapper)}
			toastClassName='!p-[14px]'
			position='top-center'
			autoClose={2000}
			newestOnTop
			hideProgressBar
			icon={false}
			closeButton={false}
		/>
	)
}

export default ToastMessage
