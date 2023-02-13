# Deploy

# Check


post: # Creates a new work post.
	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
	hugo new --kind post-bundle posts/$(name)
.PHONY: post

work: # Creates a new work post.
	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
	hugo new --kind work-bundle work/$(name)
.PHONY: wprl

todo: # Show to-do items per file
	$(Q) grep \
		--exclude=Makefile.util \
		--exclude=TODO.md \
		--exclude-dir=vendor \
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
