# precomputer

Precomputes API responses for the queue website. This is mostly because generating some API responses takes minutes, but it also helps with resilience.

This imports some files from the adjacent website -- the zod schemas so that they can share a definition.
