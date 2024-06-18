const express = require('express');

module.exports = (userController) => {
	const router = express.Router();

	router.route('/users')
		.get(userController.getAllUsers)
		.post(userController.createUser);
	router.route('/users/sorted')
		.get(userController.getSortedAllUsers);
	router.route('/users/:userId')
		.get(userController.getUserById)
		.put(userController.updateUser)
		.delete(userController.deleteUser);
	router.route('/users/age/:age')
		.get(userController.getOlderUsers)
	router.route('/users/domain/:domain')
		.get(userController.getUsersByDomain);
	router.route('/users/:userId/favoriteFilms')
		.get(userController.getUserFavoriteFilms)
		.post(userController.createUserFavoriteFilm);
	router.route('/users/:userId/favoriteFilms/:filmId')
		.get(userController.getUserFavoriteFilmById)
		.put(userController.updateUserFavoriteFilm)
		.delete(userController.deleteUserFavoriteFilm);

	return router;
};