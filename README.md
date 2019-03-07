# @wsrast/airbnb-prettier-eslint

## What this Package Does

This is a shortcut for bootstrapping the linting and coding standards on a new project to match the Airbnb and Prettier standards along with ESLint in a way that doesn't conflict and which adds a few preferences of mine. It will:

1. Download all the peer dependencies listed in this package, which add Prettier and its helpers to the Airbnb ESLint tooling.
2. Copies the .editorconfig, .eslintrc.json and .prettierrc files into your project's folder.

### New-Hotness Usage

This new structure allows you to use a single command to do everything. The -Y flag will automatically choose Yarn as the package installer.

```
npx install-peerdeps --dev -Y @wsrast/airbnb-prettier-eslint
```

Go into your package.json and add the following entries to enable the git hook.

```
	"husky": {
		"hooks": {
			"pre-commit": "lint-staged"
		}
	},
	"lint-staged": {
		"*.{js,json,css,md}": [
			"prettier --write",
			"git add"
		]
	},
```

### Old, Cruddy, Manual Way

```
yarn add --dev eslint prettier husky lint-staged eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks

npx install-peerdeps --dev eslint-config-airbnb
```

(opt to use yarn for install)

If you're going against convention and adding this to the top level of a Yarn Workspace, use the following npx command instead.

```
npx install-peerdeps --dev eslint-config-airbnb --extra-deps -W
```

Then, you have to copy the .editorconfig, .eslintrc.json and .prettierrc files from this package.

## Maintenance Notes

I've added both devDependencies and peerDependencies to this package to allow for easier syncing with the most recent versions of the required packages. The steps to update this are:

1. Run `yarn upgrade --latest`. That will update everything, ignoring any version settings in the current package.json.
2. Call `npx syncyarnlock --save`. This will force the syncronizing of the yarn.lock file, overwriting any previous dependencies and devDependencies in the existing package.lock file.
3. Manually copy the devDependencies content over peerDependencies, replacing old values.
4. Version and publish to NPM.
