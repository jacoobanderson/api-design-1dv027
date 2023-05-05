/**
 * Links for entry point response.
 *
 * @returns {Array} All the links.
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
      href: '/api/v1/users',
      type: 'POST',
      description: 'Register your account.'
    },
    {
      href: '/api/v1/users/sessions',
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

/**
 * Links for all catches response.
 *
 * @returns {Array} All the links.
 */
export function linksAllCatches () {
  return [
    {
      rel: 'self',
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

/**
 * Links for add catches response.
 *
 * @returns {Array} All the links.
 */
export function linksAddCatch () {
  return [
    {
      rel: 'self',
      href: '/api/v1/catches',
      type: 'POST',
      description: 'Add a new catch.'
    },
    {
      href: '/api/v1/catches',
      type: 'GET',
      description: 'Get all catches.'
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

/**
 * Links for get single catche response.
 *
 * @returns {Array} All the links.
 */
export function linksSingleCatch () {
  return [
    {
      rel: 'self',
      href: '/api/v1/catches/:id',
      type: 'GET',
      description: 'Get a single catch'
    },
    {
      href: '/api/v1/catches',
      type: 'POST',
      description: 'Add a new catch.'
    },
    {
      href: '/api/v1/catches',
      type: 'GET',
      description: 'Get all catches.'
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

/**
 * Links for update catches response.
 *
 * @returns {Array} All the links.
 */
export function linksUpdateCatch () {
  return [
    {
      rel: 'self',
      href: '/api/v1/catches/:id',
      type: 'PUT',
      description: 'Update a catch.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'GET',
      description: 'Get a single catch'
    },
    {
      href: '/api/v1/catches',
      type: 'POST',
      description: 'Add a new catch.'
    },
    {
      href: '/api/v1/catches',
      type: 'GET',
      description: 'Get all catches.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'DELETE',
      description: 'Delete a catch.'
    }
  ]
}

/**
 * Links for delete catches response.
 *
 * @returns {Array} All the links.
 */
export function linksDeleteCatch () {
  return [
    {
      rel: 'self',
      href: '/api/v1/catches/:id',
      type: 'DELETE',
      description: 'Delete a catch.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'PUT',
      description: 'Update a catch.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'GET',
      description: 'Get a single catch'
    },
    {
      href: '/api/v1/catches',
      type: 'POST',
      description: 'Add a new catch.'
    },
    {
      href: '/api/v1/catches',
      type: 'GET',
      description: 'Get all catches.'
    }
  ]
}

/**
 * Links for delete catches response.
 *
 * @returns {Array} All the links.
 */
export function linksLogin () {
  return [
    {
      rel: 'self',
      href: '/api/v1/users/sessions',
      type: 'POST',
      description: 'Login with your username and password.'
    },
    {
      href: '/api/v1/users',
      type: 'POST',
      description: 'Register your account.'
    },
    {
      rel: 'self',
      href: '/api/v1/catches/:id',
      type: 'DELETE',
      description: 'Delete a catch.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'PUT',
      description: 'Update a catch.'
    },
    {
      href: '/api/v1/catches/:id',
      type: 'GET',
      description: 'Get a single catch'
    },
    {
      href: '/api/v1/catches',
      type: 'POST',
      description: 'Add a new catch.'
    },
    {
      href: '/api/v1/catches',
      type: 'GET',
      description: 'Get all catches.'
    }
  ]
}

/**
 * Links for delete catches response.
 *
 * @returns {Array} All the links.
 */
export function linksRegister () {
  return [
    {
      rel: 'self',
      href: '/api/v1/users',
      type: 'POST',
      description: 'Register your account.'
    },
    {
      href: '/api/v1/users/sessions',
      type: 'POST',
      description: 'Login with your username and password.'
    }
  ]
}
