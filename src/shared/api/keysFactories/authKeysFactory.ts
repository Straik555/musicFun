enum KeyType {
	AUTH = 'auth',
	ME = 'me'
}

export const authKey = {
	all: [KeyType.AUTH],
	me: () => [...authKey.all, KeyType.ME]
}
