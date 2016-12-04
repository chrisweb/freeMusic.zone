# mongodb

## analyze mongodb

### mongo top

https://docs.mongodb.org/v3.0/reference/command/top/  

## usefull commands

on the mongo shell , to switch to the "database_name" database (or whatever name you have set in the configuration file) type:  
```
use database_name
```

get the collection names:  
```
db.getCollectionNames()
```

find items in the "users" collection:  
```
db.users.find().pretty()
```

access help to get all methods information:  
```
db.users.help()
```
