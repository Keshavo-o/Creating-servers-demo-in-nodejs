//we created a new file called index.js
//why index is a special name?
//because when we import a directory, Node.js will look for index.js by default
const http = require('http');

//we can use the http module to create a server , we can also use express but we will understand how to create a server using the http module as basic understanding
const fs = require('fs');
console.log('Server is starting...');
// console.log(http);
const myserver = http.createServer((req, res) => {
  //req is the request object, it contains information about the request
  //res is the response object, we can use it to send a response back to the client
  console.log("new request received");
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  let log = `Request received at ${new Date().toISOString()} from ${req.socket.remoteAddress} , URL : ${req.url}\n`;
  fs.appendFile('server.txt', log, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
    });
//we prefer to use non blocking methods to avoid blocking the event loop
  //what is writeHead? it is a method that sets the status code and headers of the response
  //200 is the status code for OK, and we are setting the content type to text/plain
  //we can also set other headers like content-length, content-type, etc.
  switch(req.url) {
    case '/': {
        res.end('Welcome to the home page!\n');
        break;
        }
    case '/Hello': {//switch is case sensitive, so /hello and /Hello are different 
        res.end('Hello, World!\nThis is hello page\n');
        break;
        }
    default: {
        res.end('Page not found\n');
    }
    // res.end('My response ended\n');
}
//   res.end('Hello World\n');
});
myserver.listen(3000, () => {
  //listen is a method that tells the server to start listening for requests on a specific port
  console.log('Server is running on port 3000\nWARNING: Server will automatically close after 30 seconds');
  //why callback function is used here?
    //because we want to do something after the server is started, like logging a message
});

setTimeout(() => {
//   console.log('Server is closing after 30 seconds');
  myserver.close(() => {
    console.log('Server closed');
  });
}, 30000); //close the server after 30 seconds



//HEre we are using the fs module to write to a file called server.txt
//we are using the appendFile method to append the log to the file
//we created a mini logger that logs the request details to a file when a new request is received on our server
//Now while accesing the server, we can see the logs in the server.txt file /
//the base page is http://localhost:3000/ 
//in req.url it appears as "/"
//but if we access http://localhost:3000/hello
//then req.url will be "/hello"
//Now you must be wondering why are two requests being logged when we access the page
//This is because the browser makes two requests, one for the page and one for the favicon.ico
//what is favicon.ico?
//Favicon is the icon that appears in the address bar of the browser   


//And you wonder why we used switch case here?  //to create custom responses for different URLs
//we can also use if-else statements, but switch case is more readable when we have multiple cases


//a res.end() is very important, it tells the server that we have finished sending the response - without it, the server will not send the response back to the client and will keep rotating in the event loop