---
title: Hooks
heading: Hooks
description: Payload CMS hooks for data transformation and business logic patterns
weight: 4
publishdate: 2025-10-27
lastmod: 2025-10-27
draft: false
pageColour: white
scripts:
  - js/pages/guidelines.ts
---

Use hooks for data transformation and business logic. Hooks should be placed in a separate file under `hooks/{file}.ts`
within the collection folder and have a test along side it.

**Example**:

`src/collections/{collection}/setConnectedAt.ts`

```typescript
export const setConnectedAt: CollectionBeforeChangeHook<Connection> = async (args) => {
	const { data, originalDoc } = args

	// Only process if status field exists in the data.
	if (!data?.status) {
		return data
	}

	// If status is being changed to 'accepted', set the connectedAt timestamp.
	if (data.status === 'accepted' && originalDoc?.status !== 'accepted') {
		data.connectedAt = new Date().toISOString()
	}

	// If status is changed from 'accepted' to something else, clear the connectedAt timestamp.
	if (data.status !== 'accepted' && originalDoc?.status === 'accepted') {
		data.connectedAt = null
	}

	return data
}
```

`src/collections/{collection}/setConnectedAt.test.ts`

```typescript
import { getPayload, Payload } from 'payload'
import { describe, it, beforeAll, expect, beforeEach } from 'vitest'

import config from '@/payload.config'
import { createTestPlayer } from '@/test/fixtures'
import { teardown } from '@/test/util'

let payload: Payload

describe('setConnectedAt hook', () => {
	beforeAll(async () => {
		const payloadConfig = await config
		payload = await getPayload({ config: payloadConfig })
	})

	beforeEach(async () => {
		await teardown(payload)
	})

	it('Sets connectedAt timestamp when connection is accepted', async () => {
		const player1 = await createTestPlayer(payload)
		const player2 = await createTestPlayer(payload)

		const connection = await payload.create({
			collection: 'connections',
			data: {
				requester: player1.id,
				recipient: player2.id,
				status: 'pending',
			},
		})

		// Initially should not have connectedAt.
		expect(connection.connectedAt).toBeFalsy()

		// Update to accepted status.
		const updated = await payload.update({
			collection: 'connections',
			id: connection.id,
			data: {
				status: 'accepted',
			},
		})

		// Should now have connectedAt timestamp.
		expect(updated.connectedAt).toBeDefined()
		expect(typeof updated.connectedAt).toBe('string')
	})
})
```
