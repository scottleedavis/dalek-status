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

Usage
-----
```
./run.sh
```

Multimode
---------

* embedded mode - running on a raspberry pi, collecting flow sensor data.
* streams viz mode - portfolio streams client application as source ( embedded --sapi-->  viz )

Viewing Stream titles
---------------------
passing http parameters to titles (orange, green, yellow) 
```
http://<servername>:3000/?orange=Budweiser&green=Pabst&yellow=Ninkasi%20IPA
```


