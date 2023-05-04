/**
 *
 */
export function linksForEntry () {
  return [
    {
      href: '/api/v1',
      rel: 'self',
      type: 'GET',
      description: 'Starting point of the API'
    },
    {
      href: '/api/v1/users/sessions',
      type: 'POST',
      description: 'Register your account.'
    },
    {
      href: '/api/v1/users',
      type: 'POST',
      description: 'Login with your username and password.'
    },
    {
      href: '/api/v1/catches',
      type: 'GET',
      description: 'Get all catches.'
    },
    {
      href: '/api/v1/catches',
      type: 'POST',
      description: 'Add a new catch.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'GET',
      description: 'Get a single catch'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'PUT',
      description: 'Update a catch.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'DELETE',
      description: 'Delete a catch.'
    }
  ]
}
