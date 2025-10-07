enum ToastMessageConfig {
	ERROR = 'Something went wrong.',
	ERROR_SERVER = 'Server error, please try again in 5 minutes.',
	ERROR_INTERVAL = 'Internal server error. Try again later.',
	ERROR_USER_NOT_LOGGED_IN = 'User not logged in.',
	ERROR_PLAYLIST_NOT_FOUND = 'Playlist not found.',
	ERROR_PLAYLIST_INSUFFICIENT_PERMISSIONS = 'Insufficient permissions to delete this playlist.',
	SUCCESS_CREATED_USER = 'Successfully created!',
	SUCCESS_LOGIN_USER = 'Successfully logged in.',
	SUCCESS_LOGOUT_USER = 'Successfully logged out.',
	SUCCESS_ADDED_FAVORITE = 'You successfully added this playlist in Favourites.',
	SUCCESS_DELETE_FAVORITE = 'You successfully deleted this playlist in Favourites.',
	SUCCESS_CREATED_PLAYLIST = 'You successfully added this playlist.',
	SUCCESS_DELETE_PLAYLIST = 'You successfully deleted this playlist.',
	SUCCESS_EDIT_PLAYLIST = 'You successfully edit this playlist.'
}

export default ToastMessageConfig
