import { FC, ReactNode } from 'react'

type FormLayoutProps = {
	onSubmit: () => void
	buttonText: string
	title: string
	children: ReactNode
}

type FormFieldProps = {
	errors?: string
	children: ReactNode
}

const FormLayout: FC<FormLayoutProps> = ({
	onSubmit,
	buttonText,
	title,
	children
}) => {
	return (
		<form
			className='flex flex-col items-start overflow-hidden'
			onSubmit={onSubmit}
		>
			<h2>{title}</h2>
			{children}
			<button type='submit'>{buttonText}</button>
		</form>
	)
}

const FormField: FC<FormFieldProps> = ({ errors, children }) => {
	return (
		<p className='flex flex-col w-full my-2 pb-1'>
			{children}
			{errors && <span className='text-red-500'>{errors}</span>}
		</p>
	)
}

export { FormLayout, FormField }
