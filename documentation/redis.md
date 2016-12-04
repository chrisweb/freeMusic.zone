# redis

## usefull commands

open your command line tool and then type the following command to open the redis command line utility:
```
redis-cli
```

or open the redis command line utility with a password (if you have set one in your redis configuration):
```
redis-cli -a 'password'
```

switch to the "sessions" database:
```
SELECT 1
```

to list the session keys:
```
KEYS *sess*
```

get a value corresponding to a key:
```
GET <key>
```

monitor redis, exclude all except keyword with grep

```
redis-cli monitor | grep svn
```
