const express = require('express');
const swaggerSetup = require('./swagger');

const userRoutes = require('./routes/userRouter');
const UserController = require('./controllers/userController');
const UserService = require('./services/userService');
const UserModel = require('./models/userModel');
const LocalFile = require('./config/localFile');

const localFile = new LocalFile('./users.json');
const userModel = new UserModel(localFile);
const userService = new UserService(userModel);
const userController = new UserController(userService);

const app = express();

app.use(express.json());
app.use('/api', userRoutes(userController));


app.listen(3000, 'localhost', () => {
	console.log('started on link http://localhost:3000')
});

swaggerSetup(app);