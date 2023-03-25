# Environment Variables in React

It is a very common and encouraged practice, not to store any API key or secret in your react apps. This is quite a nice suggestion because you want your API keys to be secure and un-exposed.

This is even suggested by the CRA team and I quote

> Your project can consume variables declared in your environment as if they were declared locally in your JS files. By default, you will have `NODE_ENV` defined for you, and any other environment variables starting with `REACT_APP_`.
> 
> > WARNING: Do not store any secrets (such as private API keys) in your React app!
> > 
> > Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.
> 
> **The environment variables are embedded during the build time**. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime. To read them at runtime, you would need to load HTML into memory on the server and replace placeholders in runtime, as [described here](https://create-react-app.dev/docs/title-and-meta-tags#injecting-data-from-the-server-into-the-page). Alternatively, you can rebuild the app on the server anytime you change them.

In the end, you compile your code into an optimized build and at this moment, react embeds those API keys from your .env files to the written code. This is dangerous as it will be sent to the user’s browsers and you can expect all sorts of nasty things going on here.

### So, What is the solution

Frankly speaking, there isn’t any solid solution to this other than doing all this heavy lifting server side. Or if you have any, please suggest in the comments.

This comes at a cost at the code level. You have to introduce some level of complexity in your codebase to handle such events of calling those APIs from the server rather than from the client itself.

* This adds up a bit of latency in getting the response
    
* If the API needs to have any data from the data, however bulky it is, needs to be sent to the server also.
    
* If the API wants to store session/cookie in the user’s browser, you need to handle this in your server-side code and return the response securely to the client without any tampering
    

So, make a thumb rule of not storing any valuable secret key inside of your react app thinking it is secure just because you stored it in .env file and gitignored it. No, its not secure