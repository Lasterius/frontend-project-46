setup: install-deps
	sudo npm link

install-deps:
	sudo npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm run jest-watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

start:
	bin/cli.js -h

gendiff-format:
	node bin/cli.js --format plain ./__fixtures__/file3.yaml ./__fixtures__/file4.json

gendiff:
	node bin/cli.js ./__fixtures__/file3.json ./__fixtures__/file4.yaml