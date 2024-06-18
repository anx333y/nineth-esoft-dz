const fs = require('fs');
// const fileName = 'users.json';

class LocalFile {
	constructor(fileName) {
		this.fileName = fileName;
	}
	getData = () => {
		try {
			const data = fs.readFileSync(this.fileName);
			const users = JSON.parse(data);
	
			return users;
		} catch(err) {
			throw new Error('Ошибка получения данных', err);
		}
	};
	
	pushData = (content) => {
		try {
			const data = fs.writeFileSync(this.fileName, JSON.stringify(content));
		} catch (err) {
			throw new Error(err);
		}
	};
};


module.exports = LocalFile;