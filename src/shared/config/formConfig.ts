import z from 'zod'

enum FormConfig {
	REQUIRED_FIELD = 'Required field.',
	TITLE_MUST_BE_LEAST = 'Title must be at least 1 characters'
}

export const addPlaylist = z.object({
	title: z
		.string({
			error: FormConfig.REQUIRED_FIELD
		})
		.min(1, FormConfig.TITLE_MUST_BE_LEAST),
	description: z.string().max(1000).nullable()
})

// export const editPlaylist = addPlaylist.extend({
// 	tagIds: z.array(z.string())
// })
