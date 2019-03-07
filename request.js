const request = require('request');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
console.log(`cwd**: ${cwd}`);
const filesPath =
	'https://raw.githubusercontent.com/wsrast/airbnb-prettier-eslint/master/';
const fileNames = ['.editorconfig', '.eslintrc.json', '.prettierrc'];

fileNames.forEach(fileName => {
	const url = `${filesPath}${fileName}`;
	request(url).pipe(fs.createWriteStream(path.join(cwd, fileName)));
});
