# Ticket Manager:

## client:

### Introduction

This is the frontend of a ticket managing web-application. It has been developed using [Angular](https://angular.io/).

### Licence

The entire code is under the [MIT](https://en.wikipedia.org/wiki/MIT_License) licence, you are totally free to re-use it for whatever purpose you want.

### Installation

#### - Prerequisites:

````
sudo apt update
sudo apt upgrade
````
Be sure to have the latest of version [Node.js](https://nodejs.org/en/), to be sure check your node version with the following command line:
````
node -v
````
If you don't have node, you have to follow the instruction on [nodejs.org](https://nodejs.org/en/).

Also don't forget to clone!
````
https://github.com/LaurentColoma/TicketManager-client.git
````
On the server side, you will need to do the following command to populate the database
````
Sudo docker-compose exec web ./manage.py loaddata ./server/tracker/imports/json/*.json
````
**do this after the while the server is on**

After cloning the project set yourself in the folder **tracker** and do

````
npm start
````

Your terminal should display the following:
````
> tracker@0.0.0 start /$PATH/TicketManager-client/tracker
> ng serve

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
                                                                                          
Date: 2018-11-08T14:30:28.176Z
Hash: be52a1a1465df1c58fd8
Time: 30376ms
chunk {main} main.js, main.js.map (main) 165 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 226 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.22 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 16.3 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 4.11 MB [initial] [rendered]
ℹ ｢wdm｣: Compiled successfully.
````

Feedback appreciated.
