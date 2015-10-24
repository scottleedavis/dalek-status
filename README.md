dalek-status
==========

![initial](initial.png)
![initial](black_box.png)

Overview
--------

An embedded flow state tracking system that leverages [Webtrends Streams™](http://www.webtrends.com/products/streams/).



Requirements
------------

[nodejs](https://nodejs.org/) >= v0.10.x


Installation
-------------

```
npm install
```

Client/Server Usage
-----


**running in embedded mode** ([example](run.sh))

Collect from local sensors, stream to sapi, and display dalek status at http://<servername>:3000/

**running in streams client app mode** ([example](run_app_example.sh))

Collect stream from [SAPI](http://sapi.webtrends.com/) and display dalek status at http://<servername>:3001/

*Note: you will need to provide account id, oauth client id/secret*


Setting Stream titles
---------------------
passing http parameters to titles (orange, green, yellow) 
```
http://<servername&port>/?orange=Budweiser&green=Pabst&yellow=Ninkasi%20IPA
```


