class UserController {
	constructor(userService) {
		this.userService = userService;
	}

	// Работа со списком пользователей
	getAllUsers = async (req, res) => {
		try {
			const users = await this.userService.getAllUsers();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};
	
	createUser = async (req, res) => {
		try {
			const userData = req.body;
			if (!userData.name || !userData.email || !userData.age) {
				res.status(400).json({error: 'Неполные данные'});
				return;
			}
			const newUser = await this.userService.createUser(req.body);
			res.status(201).json(newUser);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	getSortedAllUsers = async (req, res) => {
		try {
			const users = await this.userService.getSortedAllUsers();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	getOlderUsers = async (req, res) => {
		try {
			const users = await this.userService.getOlderUsers(req.params.age);
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	getUsersByDomain = async (req, res) => {
		try {
			const users = await this.userService.getUsersByDomain(req.params.domain);
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	// Работа с одним пользователем
	getUserById = async (req, res) => {
		try {
			const user = await this.userService.getUserById(req.params.userId);
			if (!!user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({error: 'User not found'})
			}
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	updateUser = async (req, res) => {
		try {
			const user = await this.userService.updateUser(req.params.userId, req.body);
			if (!!user) {
				res.status(201).json(user);
			} else {
				res.status(404).json({error: 'User not found'})
			}
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	deleteUser = async (req, res) => {
		try {
			const user = await this.userService.deleteUser(req.params.userId);
			if (!!user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({error: 'User not found'})
			}
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	// Работа с любимыми фильмами пользователя
	getUserFavoriteFilms = async (req, res) => {
		try {
			const films = await this.userService.getUserFavoriteFilms(req.params.userId);
			if (!films) {
				res.status(400).json({error: 'User or films not found'});
			}
			res.status(200).json(films);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	createUserFavoriteFilm = async (req, res) => {
		try {
			const userId = req.params.userId;
			const film = await this.userService.createUserFavoriteFilm(userId, req.body);
			if (!film) {
				res.status(400).json({error: 'User not found'});
			}
			res.status(200).json(film);
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	getUserFavoriteFilmById = async (req, res) => {
		try {
			const { userId, filmId } = req.params;
			const film = await this.userService.getUserFavoriteFilmById(userId, filmId);
			if (!!film) {
				res.status(200).json(film);
			} else {
				res.status(404).json({error: 'Film not found'})
			}
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	updateUserFavoriteFilm = async (req, res) => {
		try {
			const { userId, filmId } = req.params;
			const film = await this.userService.updateUserFavoriteFilm(userId, filmId, req.body);
			if (!!film) {
				res.status(200).json(film);
			} else {
				res.status(404).json({error: 'Film not found'})
			}
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};

	deleteUserFavoriteFilm = async (req, res) => {
		try {
			const { userId, filmId } = req.params;
			const film = await this.userService.deleteUserFavoriteFilm(userId, filmId);
			if (!!film) {
				res.status(200).json(film);
			} else {
				res.status(404).json({error: 'Film not found'})
			}
		} catch (error) {
			res.status(500).json({error: error.message});
		}
	};
};

module.exports = UserController;