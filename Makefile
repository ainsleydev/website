setup: # Setup dependencies
	npm install
	husky install
	npm i -g vercel
	npm -g install svgo
	brew install ffmpeg
	go mod tidy
	go install github.com/deepmap/oapi-codegen/cmd/oapi-codegen@latest
	go generate ./...

setup-vercel: # Temp setup for Vercel
	sh ./bin/os.sh
	npm install
	npm -g install svgo
.PHONY: setup-vercel

serve: # Serve the application
	npm run serve
.PHONY: serve

deploy-prod: # Deploy production to Vercel
	vercel --prod
.PHONY: deploy-prod

deploy-staging: # Deploy staging to Vercel
	vercel --name staging
.PHONY: deploy-staging

post: # Creates a new work post.
	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
	hugo new --kind post-bundle posts/$(name)
.PHONY: post

work: # Creates a new work post.
	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
	hugo new --kind work-bundle work/$(name)
.PHONY: work

sdk: # Generates the Go & Typescript API SDKs
	oapi-codegen --package=sdk openapi/spec.yaml > api/_sdk/api.gen.go
	swagger-typescript-api --path openapi/spec.yaml --output assets/js/api --templates openapi/templates --name SDK --module-name-first-tag
.PHONY: sdk

clean: # Remove unused entries, dependencies and cache
	hugo mod clean
	rm -rf public
.PHONY: clean

lint: # Run linter
	cd ./api/_pkg && golangci-lint run --fix ./...
.PHONY: lint

format: # Run gofmt
	go fmt ./...
.PHONY: format

excluded := grep -v /gen/ | grep -v /mocks/ | github.com/ainsleyclark/ainsley.dev

test: # Test uses race and coverage
	cd ./api/_pkg && go test ./... -race $$(go list ./... | $(excluded)) -coverprofile=../../coverage.out -covermode=atomic && cd ../../
.PHONY: test

mock: # Make mocks keeping directory tree
	rm -rf gen/mocks \
	&& mockery --dir=api/_pkg --all --exported=true --output=./api/_mocks
.PHONY: mock

all: # Make format, lint and test
	$(MAKE) format
	$(MAKE) lint
	$(MAKE) test
.PHONY: all

cover: test # Run all the tests and opens the coverage report
	go tool cover -html=coverage.out
.PHONY: cover

todo: # Show to-do items per file
	$(Q) grep \
		--exclude=Makefile.util \
		--exclude=TODO.md \
		--exclude-dir=vendor \
		--exclude-dir=.vercel \
		--exclude-dir=.gen \
		--exclude-dir=.idea \
		--exclude-dir=public \
		--exclude-dir=node_modules \
		--text \
		--color \
		-nRo \
		-E '\S*[^\.]TODO.*' \
		.
.PHONY: todo

help: # Display this help
	$(Q) awk 'BEGIN {FS = ":.*#"; printf "Usage: make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?#/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
.PHONY: help
