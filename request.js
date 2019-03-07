const request = require('request');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
const filesPath =
	'https://raw.githubusercontent.com/wsrast/airbnb-prettier-eslint/master/';
const fileNames = ['.editorconfig', '.eslintrc.json', '.prettierrc'];

fileNames.forEach(fileName => {
	const url = `${filesPath}${fileName}`;
	/* The relative hops to parent folders are necessary because
	 * the postinstall script is executing relative to this package,
	 * not the parent package.
	 * So, test for the existence of the node_modules folder in the
	 * cwd, which means it's being installed, and not worked on. */
	const relativePath = cwd.indexOf('node_modules')
		? path.resolve(cwd, '..', '..', '..', fileName)
		: path.resolve(cwd, fileName);

	request(url).pipe(fs.createWriteStream(path.resolve(relativePath)));
});
