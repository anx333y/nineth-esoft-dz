const LocalFile = require("../config/localFile");

class UserModel {
	constructor(localFile) {
		this.localFile = localFile;
	}

	async getAll() {
		const users = this.localFile.getData();

		return users;
	};

	async create(userData) {
		const users = this.localFile.getData();
		const user = {
			id: String(Date.now()),
			...userData
		};

		users.push(user);
		this.localFile.pushData(users);

		return user;
	};

	async getById(id) {
		const users = this.localFile.getData();

		const user = users.find(user => user.id == id);

		return user;
	};

	async update(id, userData) {
		const users = this.localFile.getData();
		
		const user = users.find(user => user.id == id);
		const userIndex = users.findIndex(user => user.id == id);

		if (userIndex === -1) {
			return;
		}

		const updatedUser = {...user, ...userData};

		users[userIndex] = updatedUser;
		this.localFile.pushData(users);

		return updatedUser;
	};

	async delete(id) {
		const users = this.localFile.getData();
		const user = users.find(user => user.id == id);
		const userIndex = users.findIndex(user => user.id == id);

		if (userIndex === -1) {
			return;
		}
		
		users.splice(userIndex, 1);
		this.localFile.pushData(users);

		return user;
	};

	async getWithParams(param) {
		const users = this.localFile.getData();
		
		const usersWithParams = users.filter(param);

		return usersWithParams;
	};

	// Фильмы
	getFavoriteFilms = async (userId) => {
		const user = await this.getById(userId);

		if (!user) {
			return;
		}

		const films = user.favoriteFilms;
		if (!!films) {
			return films;
		}
	};

	createFavoriteFilm = async (userId, filmData) => {
		const user = await this.getById(userId);

		if (!user) {
			return;
		}

		const films = user.favoriteFilms;

		if (!films) {
			return;
		}

		const film = {id: String(Date.now()), ...filmData};
		films.push(film);
		user.favoriteFilms = films;

		const users = this.localFile.getData();
		const userIndex = users.findIndex(user => user.id == userId);

		if (userIndex === -1) {
			return;
		}

		users[userIndex] = user;

		this.localFile.pushData(users);
		
		return film;
	};

	getFavoriteFilmById = async (userId, filmId) => {
		const user = await this.getById(userId);

		if (!user) {
			return;
		}

		const films = user.favoriteFilms;

		if (!films) {
			return;
		}
		
		const film = films.find(film => film.id == filmId);

		if (!film) {
			return;
		}

		return film;
	};

	updateFavoriteFilm = async (userId, filmId, filmData) => {
		const user = await this.getById(userId);		

		if (!user) {
			return;
		}

		const films = user.favoriteFilms;

		if (!films) {
			return;
		}

		const film = films.find(film => film.id == filmId);
		const filmIndex = films.findIndex(film => film.id == filmId);

		if (filmIndex === -1) {
			return;
		}

		const updatedFilm = {id: filmId, ...film, ...filmData};

		films[filmIndex] = updatedFilm;
		user.favoriteFilms = films;

		const users = this.localFile.getData();
		const userIndex = users.findIndex(user => user.id == userId);

		if (userIndex === -1) {
			return;
		}

		users[userIndex] = user;

		this.localFile.pushData(users);

		return updatedFilm;
	};

	deleteFavoriteFilm = async (userId, filmId) => {
		const user = await this.getById(userId);

		if (!user) {
			return;
		}

		const films = user.favoriteFilms;

		if (!films) {
			return;
		}

		const film = films.find(film => film.id == filmId);
		const filmIndex = films.findIndex(film => film.id == filmId);

		if (filmIndex === -1) {
			return;
		}

		films.splice(filmIndex, 1);
		user.favoriteFilms = films;

		const users = this.localFile.getData();
		const userIndex = users.findIndex(user => user.id == userId);

		if (userIndex === -1) {
			return;
		}

		users[userIndex] = user;

		this.localFile.pushData(users);

		return film;
	};
};

module.exports = UserModel;