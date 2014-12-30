# Cloud setup (aws)

The cloud-init configuration script (aws userdata) can be found in the cloud/cloud-init/userdata directory

The cloud infrastructure diagrams can be found in the cloud/infrastructure directory. The xml file can be imported into draw.io

## aws management

login to amazon aws http://aws.amazon.com/

### mongodb instance

The mongodb cloud init userdata script will create a mongodb users setup script and put it into /etc/mongodb-users-setup.js

It will then use that file to create the mongodb user, when this is dont the script will edit the mongodb conf file and enable auth

You need to edit the cloud/cloud-init/userdata/cloud-config_mongodb.txt and add your own passwords you want to use for the three default users it will create, then edit the server configuration (server/configuration/configuration.js) file and use the same values there

Now create a new EC2 instance, by clicking the "launch instance" button in your aws console

Step1: Choose Amazon Linux 64 as OS

Step2: Choose the instance capacity you want

Step3: In "advanced details" add the mongodb server userdata that can be found in "cloud/cloud-init/userdata/cloud-config_mongodb.txt", this will setup the instance and install mongodb

Step4: Choose a security group that allows connection on port 22 for ssh but only for your own IP, so that you can connect to the server with your ssh client and a second rule that allows TCP traffic to the mongodb port you have defined and only for the IP range of your web servers

Finally: launch the instance

### twitter harvester

now follow the instructions in "documentation/twitter_harvester" to launch the harvester

### main app server for freeMusic.zone

Use the userdata in "cloud/cloud-init/userdata/cloud-config.txt" to setup the instances of the freeMusic.zone server

### aws setup script

This is not done yet

The goal was to use the aws api to create a nodejs cloud setup script "cloud/script/amazon_aws_api_cloud_setup.js", that would automatically setup all the cloud services, like creating security groups, setting up route 53, launch instances using the userdata files

### amazon aws documentation

node.js aws sdk documentation
http://aws.amazon.com/de/sdkfornodejs/

elastic load balancer API
http://docs.aws.amazon.com/ElasticLoadBalancing/latest/APIReference/Welcome.html