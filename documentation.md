URIS

GET
/api/v1
- Entry point of the api, lists all possible functionality.

POST
/api/v1/users
- Creates a new user account (body should include username, password and email in JSON).

POST
/api/v1/users/sessions
- Logs in and returns a JWT (body should include username and password in JSON).

GET
/api/v1/catches
- Gets all the catches.

POST
/api/v1/catches
- Creates a new catch (should include position ([number, number]), lake, city, species, weight (number), length (number), imageUrl in JSON).

GET
/api/v1/catches/:id
- Gets a single catch resource.

PUT
/api/v1/catches/:id
- Updates a single catch (Only updates the fields you put in your body in JSON).

DELETE
/api/v1/catches/:id
- Deletes a single catch.

POST
/api/v1/webhooks
- Adds a subscriber to the webhook (Needs URL in JSON body).