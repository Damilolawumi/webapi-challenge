- [ ] Mention two parts of Express that you learned about this week.

<answer/> Middleware and Router

- [ ] Describe Middleware?

<answer/> Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

- [ ] Describe a Resource?

<answer/> A resource is our database, its is where we get our data from. we can perform create, read, update and delete methods (crud) on them using GET, DELETE, POST and PUT.

- [ ] What can the API return to help clients know if a request was successful?

<answer/> The api can return a response with the status code 200 which means ok, or 201 which means created when an item or object was created

- [ ] How can we partition our application into sub-applications?

<answer/> The way we have access to .use() as a router or sub-router, also works on the Express application instance! That means we can create new instances of the Express object, and .use it in another Express object just like a router or other middleware. This allows us to have subapplications within our main express app.