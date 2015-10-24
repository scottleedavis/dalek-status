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


=running in embedded mode= ([example](run.sh))

Collect from local sensors, stream to sapi, and display dalek status at http://localhost:3000/

=running in streams client app mode= ([example](run_app_example.sh))

Collect stream from sapi, and display dalek status at http://localhost:3001


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


