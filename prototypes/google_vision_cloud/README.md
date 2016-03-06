
first, open your console, got to the root of this project and then install the npm depencies:

npm install

create a google cloud vision API account in the google console:

https://console.cloud.google.com/

add your google cloud credentiels json file to the root of the project and rename it to "keyfile.json"

now create a configuration file by copying configuration_example.js to configuration.js and then add your own vision API account informations into the configuration file.

to run the server, type:

node server