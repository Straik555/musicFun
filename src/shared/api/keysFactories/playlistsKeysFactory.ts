import { SchemaGetPlaylistsRequestPayload } from '~/shared/api/schema'

enum KeyType {
	MY = 'my',
	PLAYLISTS = 'playlists',
	DETAILS = 'details',
	LISTS = 'lists'
}

export const playlistKeys = {
	all: [KeyType.PLAYLISTS],
	lists: () => [...playlistKeys.all, KeyType.LISTS],
	myList: (id: string) => [...playlistKeys.lists(), KeyType.MY, id],
	myListDetails: (playlistId: string) => [
		...playlistKeys.lists(),
		KeyType.DETAILS,
		playlistId
	],
	list: (filters: Partial<SchemaGetPlaylistsRequestPayload>) => [
		...playlistKeys.lists(),
		filters
	]
}
