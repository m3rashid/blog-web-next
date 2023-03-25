# Device Detection in modern browsers

### Scenario Earlier

The `User-Agent` HTTP Header is used for quite a long time to detect the browser and device information. Besides, with the increasing demand and making it easy to use, it becomes quite a pain in itself to detect efficiently. What I mean is:

Just look at the header’s value in different machines and browser clients. Most of them look almost the same. Now you have to parse it according to your needs and extract useful pieces of information from it.

Examples:

* `Mozilla/5.0 (compatible; Googlebot/2.1; +`[`http://www.google.com/bot.html`](http://www.google.com/bot.html)`)` this is the User-Agent for GoogleBot.
    
* `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36` this is chrome on windows.
    

### More Modern Approach

Gives you proper headers like

```bash
Viewport-Width: 560
Width: 340
Sec-CH-UA: "Chromium";v="84", "Google Chrome";v="84"
Sec-CH-UA-Mobile: ?1
Sec-CH-UA-Full-Version: "84.0.4143.2"
Sec-CH-UA-Platform: "Android"
Sec-CH-UA-Arch: "ARM64"
```

This is possible from special headers `User-Agent Client Hints` or `CH-UA`. Unlike the User-Agent string, User-Agent Client Hints do not transmit all the data to the server by default.

### Steps Involved

* First, the client (browser) sends a request to the server without any hints. This is the initial page load request or navigation.
    
* Then, the server responds by requesting the necessary data about the client. This response includes an `Accept-CH` header and it is responsible for letting the client know what the server needs. like `Accept-CH: Viewport-Width, Width` this means that the server needs to know the client device viewport-width and width.
    
* Once the client receives a response from the server, it will decide what needs to be transmitted, grant access to relevant data, and sends back in all subsequent requests.
    

Following are the headers introduced by Client Hints

* `Sec-CH-UA` : You can request a list of browser brands and their significant version with this hint. (Eg: `“Google Chrome”; v=”84"`)
    
* `Sec-CH-UA-Platform` : Platform for the device, usually the operating system. (Eg:`"Windows"`)
    
* `Sec-CH-UA-Platform-Version` : Version for the platform or OS.
    
* `Sec-CH-UA-Arch` : Underlying architecture for the device. (Eg: `ARM64`)
    
* `Sec-CH-UA-Model` : The device model. (Eg: `“OnePlus 6”`)
    
* `Sec-CH-UA-Mobile` : Boolean indicating if the browser is on a mobile device or not. (`?1` for true, `?0` for false)
    
* `Sec-CH-UA-Full-Version` : The complete version for the browser. (Eg: `“`[`73.1.2343B.TR`](http://73.1.2343B.TR)`”`)
    

### Details

Out of these header hints, `Sec-CH-UA` and `Sec-CH-UA-Mobile` are known as low entropy hints, and these 2 hints will be sent by default with the initial request from the client to the server.

**Step 1.** The client requests the resource webpage with certain `user-agent client-hints` headers. The corresponding request may look something like this

```bash
GET /home HTTP/1.1
Host: myblog.com

Sec-CH-UA: "Chromium";v="84", "Google Chrome";v="84"
Sec-CH-UA-Mobile: ?1
```

**Step 2.** Server requests for more additional data (if, in case) Like so

```bash
HTTP/1.1 200 OK
Accept-CH: Sec-CH-UA-Full-Version, Sec-CH-UA-Platform, Sec-CH-UA-Arch
```

Now the subsequent requests would send these headers by default and the browser essentially caches these settings sent by the server identifying headers that are to be sent.

* The client hints have a certain lifespan which varies on two factors: Until your browser session expires or a different set of hints is requested by the server.
    
* The scope of user agent client hints is limited to the same origin requests. But this can be changed/configured in cross-origin requests by specifying `Feature-Policy` header
    

For example, if you want to get hints from [`https://m3rashid.`](https://yourblog.com)`in` to [`https://hello.com`](https://myblog.com) , your response from [`https://hello.com`](https://myblog.com) should include `Feature-Policy` header in addition to the usual `Accept-CH` header.

```bash
Accept-CH: Sec-CH-UA-Full-Version, DPR
Feature-Policy: ch-ua-full-version m3rashid.in;
```

### Closing Remarks

* User-Agent Client Hints are introduced to prevent privacy concerns and reduce the size of the User-Agent header string.
    
* User-Agent Client Hints have achieved their primary purpose by introducing a new set of hints that we can request on demand.
    
* There are critical cases where the User-Agent string is the most viable option. Therefore, we can’t completely remove the User-Agent string.
    
* User-Agent Client Hints are still not up for situations like fraud detection, content negotiation, etc.
    
* The main idea of introducing User-Agent Client Hints is not to replace the User-Agent string but to reduce the covert tracking activities. So, I think the best option is to use both User-Agent Client Hints and User-Agent string side by side based on the need.