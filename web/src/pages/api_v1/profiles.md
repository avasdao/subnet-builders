---
title: Profiles
description: Requests profile information from the specified Subnet.
---

Quasi sapiente voluptates aut minima non doloribus similique quisquam. In quo expedita ipsum nostrum corrupti incidunt. Et aut eligendi ea perferendis.

## Libraries

Choose your preferred library to begin interacting with our REST API.

### Node.js

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

```js
/* Set endpoint.  */
const ENDPOINT = 'https://api.subnet.builders/v1'

/**
 * Get Subnet Information
 *
 * Make RPC request to API server.
 */
async function getSubnetInfo {
  /* Initialize local variables. */
  let error
  let result

  /* Set target. */
  const target = `${ENDPOINT}/profiles`

  /* Make remote request. */
  const response = await fetch(target)
    .catch(err => {
        if (err) {
            console.error(err)

            /* Set error. */
            error = err
        }
    })

  /* Validate response. */
  if (response && response.success) {
      /* Set result. */
      result = response.body
  }
}
```

Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste. Provident nam asperiores vel laboriosam omnis ducimus enim nesciunt quaerat. Minus tempora cupiditate est quod.

### Python

Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus.

Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias.
