import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SchemaCreatePlaylistRequestPayload } from '~/shared/api/schema'
import { useAddMutation } from '~/features/playlists/ui/addPlaylist/api/useAddMutation'
import { FormField, FormLayout, Loader } from '~/widgets'
import { addPlaylist } from '~/shared/config/formConfig'
import { zodResolver } from '@hookform/resolvers/zod'

const AddPlayListForm: FC = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors }
	} = useForm<SchemaCreatePlaylistRequestPayload>({
		resolver: zodResolver(addPlaylist)
	})
	const { mutate, isPending, isSuccess } = useAddMutation()

	useEffect(() => {
		if (isSuccess) {
			reset()
		}
	}, [isSuccess])
	const onSubmit = (data: SchemaCreatePlaylistRequestPayload) => {
		mutate(data)
	}

	return (
		<Loader isLoading={isPending}>
			<FormLayout
				onSubmit={handleSubmit(onSubmit)}
				title={'Add new Playlist'}
				buttonText={'Create'}
			>
				<FormField errors={errors?.title?.message}>
					<input type='text' {...register('title')} />
				</FormField>
				<FormField errors={errors?.description?.message}>
					<textarea {...register('description')} />
				</FormField>
			</FormLayout>
		</Loader>
	)
}

export default AddPlayListForm
