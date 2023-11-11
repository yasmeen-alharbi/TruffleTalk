# TruffleTalk

To start the frontend server, navigate to the `react_native_app` directory and run one of the following npm commands
- `npm run android`
- `npm run ios`
  - Might have to run the following command first: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- `npm run web`

To start the backend Laravel API using Docker, install these dependencies:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Read up on [Laravel Sail](https://laravel.com/docs/10.x/sail) and set a shell alias for ease of use

Then run these commands:
- `cd laravel-api`
- `sail up`

To stop the Laravel API, run:
- `sail stop`

**For Development**
- To use ESLint on JS files, run: `npx eslint <filename>`
- You can add rules in `.eslintrc.js`
- If you don't see `node_modules` or `package-lock.json` in `./react_native_app`, run `npm install` before starting the frontend server
