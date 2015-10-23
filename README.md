dalek-status
==========

![initial](initial.png)
![initial](black_box.png)

Overview
--------

An embedded flow state tracking server that streams information to [Webtrends Streams™](http://www.webtrends.com/products/streams/)


Requirements
------------

[nodejs](https://nodejs.org/) >= v0.10.x


Installation
-------------

```
npm install
```

Usage
-----
```
./run.sh
```

Multimode
---------

* embedded mode - on board a raspberry pi, collecting flow information from three kegs.
* streams viz mode - portfolio client app that displays live streams feed from the embedded device.

Viewing Stream titles
---------------------
passing http parameters to titles (orange, green, yellow) 
```
http://<servername>:3000/?orange=Budweiser&green=Pabst&yellow=Ninkasi%20IPA
```


