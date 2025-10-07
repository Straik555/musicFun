import { FC, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { SchemaUpdatePlaylistRequestPayload } from '~/shared/api/schema'
import { useEditMutation } from '~/features/playlists/ui/editPlaylist/api/useEditMutation'
import { useEditQuery } from '~/features/playlists/ui/editPlaylist/api/useEditQuery'
import { FormField, FormLayout, Loader } from '~/widgets'
import { Navigate, useRouter } from '@tanstack/react-router'
import { useMeQuery } from '~/features/auth/api/useMeQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { addPlaylist } from '~/shared/config/formConfig'

type EditPlaylistProps = {
	playlistId: string
}

const EditPlaylistForm: FC<EditPlaylistProps> = ({ playlistId }) => {
	const { history } = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<Omit<SchemaUpdatePlaylistRequestPayload, 'tagIds'>>({
		resolver: zodResolver(addPlaylist)
	})
	const {
		data: meData,
		isPending: mePending,
		isLoading: meLoading,
		isFetching: meFetching
	} = useMeQuery()

	const { mutate, isPending: isPendingMutation } = useEditMutation()
	const { isPending, isLoading, data, error } = useEditQuery(playlistId)

	useEffect(() => {
		if (error) {
			history.back()
		}
	}, [error])

	const onSubmit = (
		data: Omit<SchemaUpdatePlaylistRequestPayload, 'tagIds'>
	) => {
		mutate({ ...data, playlistId })
	}

	const isLoadingLayout = useMemo(() => {
		return isPending || isLoading || isPendingMutation
	}, [isPending, isLoading, isPendingMutation])

	if (!meData && ((!mePending && !meFetching) || !meLoading)) {
		return <Navigate to='/' replace />
	}

	return (
		<Loader isLoading={isLoadingLayout}>
			<FormLayout
				onSubmit={handleSubmit(onSubmit)}
				title={'Edit Playlist'}
				buttonText={'Edit'}
			>
				<FormField errors={errors?.title?.message}>
					<input
						type='text'
						{...register('title')}
						defaultValue={data?.data.attributes.title}
					/>
				</FormField>
				<FormField errors={errors?.description?.message}>
					<textarea
						{...register('description')}
						defaultValue={data?.data.attributes.description || ''}
					/>
				</FormField>
			</FormLayout>
		</Loader>
	)
}

export default EditPlaylistForm
