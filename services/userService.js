class UserService {
	constructor(userModel) {
		this.userModel = userModel;
	}

	async getAllUsers() {
		return this.userModel.getAll();
	};
	
	async createUser(userData) {
		return this.userModel.create(userData);
	};

	async getSortedAllUsers() {
		const users = await this.userModel.getAll();

		users.sort((a, b) => a.name > b.name ? 1 : -1);

		return users;
	};

	async getUserById(id) {
		return this.userModel.getById(id);
	};

	async updateUser(id, userData) {
		return this.userModel.update(id, userData);
	};

	async deleteUser(id) {
		return this.userModel.delete(id);
	};

	async getOlderUsers(age) {
		return this.userModel.getWithParams(user => user.age > +age);
	};

	async getUsersByDomain(domain) {
		return this.userModel.getWithParams(user => user.email.includes(`@${domain}.`));
	};

	// Фильмы
	getUserFavoriteFilms = async (userId) => {
		return this.userModel.getFavoriteFilms(userId);
	};

	createUserFavoriteFilm = async (userId, filmData) => {
		return this.userModel.createFavoriteFilm(userId, filmData);
	};

	getUserFavoriteFilmById = async (userId, filmId) => {
		return this.userModel.getFavoriteFilmById(userId, filmId);
	};

	updateUserFavoriteFilm = async (userId, filmId, filmData) => {
		return this.userModel.updateFavoriteFilm(userId, filmId, filmData);
	};

	deleteUserFavoriteFilm = async (userId, filmId) => {
		return this.userModel.deleteFavoriteFilm(userId, filmId);
	};
};

module.exports = UserService;