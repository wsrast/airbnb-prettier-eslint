const request = require('request');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
const filesPath =
	'https://raw.githubusercontent.com/wsrast/airbnb-prettier-eslint/master/';
const fileNames = ['.editorconfig', '.eslintrc.json', '.prettierrc'];

const projRoot = cwd.split('node_modules')[0];
console.log(`Installing to project folder: `, projRoot);

fileNames.forEach(fileName => {
	const url = `${filesPath}${fileName}`;
	/* The relative hops to parent folders are necessary because
	 * the postinstall script is executing relative to this package,
	 * not the parent package.
	 * So, test for the existence of the node_modules folder in the
	 * cwd, which means it's being installed, and not worked on. */
	const relativePath = path.join(projRoot, fileName);

	if (projRoot !== cwd) {
		request(url).pipe(fs.createWriteStream(path.resolve(relativePath)));
	}
});
