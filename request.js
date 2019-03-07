const request = require('request');
const fs = require('fs');

const filesPath =
	'https://raw.githubusercontent.com/wsrast/airbnb-prettier-eslint/master/';
const fileNames = ['.editorconfig', '.eslintrc.json', '.prettierrc'];

fileNames.forEach(fileName => {
	const url = `${filesPath}${fileName}`;
	request(url).pipe(fs.createWriteStream(fileName));
});
