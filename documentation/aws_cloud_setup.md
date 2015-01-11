# Cloud setup (aws)

The cloud-init configuration script (aws userdata) can be found in the "/cloud/cloud-init/userdata/" directory

The cloud infrastructure diagrams can be found in the cloud/infrastructure directory. 

The xml file(s) can be imported into draw.io

## feedback

If you have feedback about the cloud init scripts or found a bug please report it in the issues tracker: https://github.com/chrisweb/freeMusic.zone/issues

## aws management

login to amazon aws http://aws.amazon.com/

### VPC and Subnets

First in the "Network" section, click on "VPC"

Now setup a default VPC and Subnet using "start vpc wizard"

### mongodb instance

The mongodb cloud init userdata script will create a mongodb users setup script and put it into /etc/mongodb-users-setup.js

It will then use that file to create the mongodb user, when this is dont the script will edit the mongodb conf file and enable auth

You need to edit the cloud/cloud-init/userdata/cloud-config_mongodb.yml and add your own passwords you want to use for the three default users it will create, then edit the server configuration (/server/configuration/configuration.js) file and use the same values there

Now create a new EC2 instance, by clicking the "launch instance" button in your aws console

Choose "Amazon Linux 64" as OS and on the next tab the "t2 micro" instance (or whatever instance you want to create)

In "advanced details" add the mongodb server userdata that can be found in "/cloud/cloud-init/userdata/cloud-config_mongodb.yml", this will setup the instance and install mongodb

Choose a security group that allows connection on port 22 for ssh but only for your own IP, so that you can connect to the server with your ssh client and a second rule that allows TCP traffic to the mongodb port you have defined and only for the IP range of your web servers (as source choose the security group of your webservers, type "sg" and then choose from autocomplete list, the security group of your webservers)

Finally: launch the instance

### redis instance

Cow create a new EC2 instance, by clicking the "launch instance" button in your aws console

Choose "Amazon Linux 64" as OS and on the next tab the "t2 micro" instance (or whatever instance you want to create)

In "advanced details" add the mongodb server userdata that can be found in "/cloud/cloud-init/userdata/cloud-config_redis.yml", this will setup the instance and install redis

Choose a security group that allows connection on port 22 for ssh but only for your own IP, so that you can connect to the server with your ssh client and a second rule that allows TCP traffic to the redis port you have defined and only for the IP range of your web servers (as source choose the security group of your webservers, type "sg" and then choose from autocomplete list, the security group of your webservers)

Finally launch the instance

### twitter harvester

Choose "Amazon Linux 64" as OS and on the next tab the "t2 micro" instance (or whatever instance you want to create)

In "advanced details" add the mongodb server userdata that can be found in "/cloud/cloud-init/userdata/cloud-config-video-audio-harvester.yml", this will setup the instance and install all the required dependencies

Click "continue" until you reach the security groups, choose a security group that has the "http port 80" open and "https port 443" (if you need https) or create a new security group if you haven't already one

Finally launch the instance

Now follow the instructions in "documentation/twitter_harvester.md" to launch the harvester and after a while you might want to launch the mapreduce cron that will create a new database using the aggregated tweets

### videos converter

I use am amazon aws ec2 instance to install the video convertor and the required tools like ffmpeg.

I use the same aws instance for the video convertor then for the twitter harvester, but you can put it on a seperate instance if you prefer

Use the cloud-config userdata script "cloud-config-video-audio-harvester.yml" that is in the "/cloud/cloud-init/userdata/" directory of this project, to create a new ec2 instance (follow the steps described in the harvester section of this document)

Now follow the instructions in "documentation/video_conversion.md" to start converting videos for the fullscreen video homepage

### aws elastic load balancer

Open the aws console and choose "ec2"

In "network and security" choose "load balancers"

Click on "create load balancer"

Set as "name" what ever suits your needs and choose your VPC

Click "continue" until you reach the security groups, choose a security group that has the "http port 80" open and "https port 443" (if you need https) or create a new security group if you haven't already one

Don't choose any ec2 instances just yet (we will add them later)

Click "continue" until you reach the last tab "review" and then click on create

Aws documentation for creating an aws elastic load balancer http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/GettingStarted.html

### aws route 53

(you need to create an elastic load balancer first)

Obviously you need to register a domain name, for example at name.com

Then open the aws console and choose the route 53 service

Now click on "create hosted zone"

Enter the domain name and an optional comment and choose "public hosted zone"

Aws documentation for creating hosted zones (http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingHostedZone.html)

Now the domain should show up in your list of "hosted zones", click on the row to select it

On the right the details get displayed, you can see four nameservers have been defined, now login at the registrar where you bought the domain, in your domain condiguration add the nameservers from route 53

Now select your domain row again on the "hosted zones" page, then click on the button on the top of the "hosted zones" page that is labelled "go to record sets"

In the name field set nothing as you want the user to use example.com as domain, you could also add "www" if you want www.example.com to be your domain

As type choose "A - IPv4 address" and as for the next row "alias" choose yes

In the next field "alias target" choose the name of your load balancer, something like myLoadBalancer-gsdhgdsdsgg.eu-west-2.elb.amazonaws.com

As "routing policy" choose "simple" and as for "evaluate target health" choose no (I checked no as Im pointed to a load balancer that will only include healthy instances but if you point directly to ec2 instances you migth want to set this to yes so that traffic only gets send to healthy instances)

Finally click on "create" and your are done

Use the userdata in "cloud/cloud-init/userdata/cloud-config.yml" to setup the instances of the freeMusic.zone server

### create a launch configuration / auto scaling group

Open the aws console and choose "ec2"

In "auto scaling" choose "launch condifurations"

Click on "create auto scaling group"

Click on "create launch configuration"

Choose "Amazon Linux 64" as OS and on the next tab the "t2 micro" instance (or whatever instance you want to create)

Click on "next: configure details"

Set a name for your launch configuration, enable monitoring, 

Edit the "/cloud/cloud-init/userdata/cloud-config.yml" file that gets will get used to setup the server, edit the "write_files" section that creates a configuration file for the server and add your personal credentials

In "advanced details" add the mongodb server userdata that can be found in "/cloud/cloud-init/userdata/cloud-config.yml" to setup the instance(s) of the freeMusic.zone web server(s)

In "advanced details" for the "IP address type" choose "Do not assign a public IP address to any instances"

Click "next" until you reach the "configure security groups" tab, choose a security group that has the "http port 80" open and "https port 443" (if you need https) or create a new security group if you haven't already one

Click on "review"

Finally click on "create launch configuration"

Choose your aws key and click on "create launch configuration"

Now you must create the "auto scaling group"

Enter a "name", choose the amount of instances you want to start with (for example 2), choose your "VPC" in "network" and in "subnet" your subnet

Open the "advanced details" section, check the "receive traffic from elastic load balancer(s)" checkbox and choose your load balancer(s)

Click on "next", then choose "use scaling policies to adjust the capacity of this group" and define the rules you want (I choosed scale from 2 to 3 instances, I set it to increase by one instance if the alarm detects that the cpu is above 60% and decrese by one if the cpu alarm is below 40%)

Click on "next" until you reach the "tags" tab and then click on review

Now click on "create auto scaling group" and then go back to your "ec2 dashboard", you will see that aws has launched two (or the amount of instances you have defined to get started at launch) new instances for you

### debugging the userdata cloud init scripts

If the server setup fails, connect via ssh to the server using a ssh tool like putty

You can find the logs at "/var/log/cloud-init-output.log"

Must of the time, when the server setup fails, its because the cloud init script is not well formatted, cloud-init scripts are YAML, check if your file is formatted correctly by yaml linting tool, for example http://yaml-online-parser.appspot.com/ or http://www.yamllint.com/

### aws "automatic setup" script

This is not done yet

The goal was to use the aws api to create a nodejs cloud setup script "cloud/script/amazon_aws_api_cloud_setup.js", that would automatically setup all the cloud services, like creating security groups, setting up route 53, launch instances using the userdata files

node.js aws sdk documentation
http://aws.amazon.com/de/sdkfornodejs/

There is an aws sdk package on npmjs.com at https://www.npmjs.com/package/aws-sdk