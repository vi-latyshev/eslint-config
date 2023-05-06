# eslint-config

## Installing

```bash
yarn add -D @v.latyshev/eslint-config eslint@^8.0.0
```

Then create a file named `.eslintrc.js` with following contents in the root folder of your project:
```js
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: '@v.latyshev'
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};

// or react config

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: '@v.latyshev/eslint-config/react'
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```

That's it! You can override the settings from `eslint-config` by editing the `.eslintrc.js` file.
