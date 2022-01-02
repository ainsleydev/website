# Deploy

# Check

# Creates a new blog post.
post:
	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
	hugo new --kind post-bundle posts/$(name)
.PHONY: post

# Create as new work post.
work:
	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
	hugo new --kind work-bundle work/$(name)
.PHONY: wprl

## Create as new software post.
#work:
#	@[ "${name}" ] || ( echo ">> name is not set"; exit 1 )
#	hugo new --kind software-bundle software/$(name)
#.PHONY: post
