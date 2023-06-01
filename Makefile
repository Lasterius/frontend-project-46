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
