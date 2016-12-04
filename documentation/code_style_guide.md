# js coding style guide  

## 4 Spaces for indention  
Use 4 spaces for indenting  

## Newlines  
Use UNIX-style newlines (\n)  

## Semicolons  
Always use them, because we don't want to have to think about exceptions to the rule  

## Characters per line  
No specific rule here, but try to keep them below 80 where possible  

## quotes  
Use single quotes for javascript strings, no double quotes, except for json and html  

```javascript
// good
var foo = 'bar';
```

```javascript
// bad
var foo = "bar";
```

## Opening braces  
Put them on the same line as your statement  
Always put braces "{}" around compound statements  

```javascript
// good
if (foo) {

  bar();

}
```

```javascript
// bad
if (foo)
    bar();
```

## Chaining of methods  
Put one method per line  

```javascript
// good
Foo
    .bar()
    .baz();
```

## Variables declarations  
Always declare variables and avoid global variables if possible  
Declare variables using the "var" keyword  

```javascript
// good
var foo;
var bar;
```

Never chain variable declarations  

```javascript
// bad
var a = b = 'foo';
```

## Statements  
Put one statement per line  

```javascript
// good
if (foo) {

    foo();

} else if (bar) {

    bar();

} else {

    baz();

}
```

```javascript
// good
try {

    foo();

} catch (exception) {

    log(exception);

}
```

```javascript
// good
switch (foo) {

    case 'bar':
        bar();
        break;

    default:
        baz();

}
```

## Variables, functions, properties, constants and class names  
Use lowerCamelCase for variables, properties and function names  
Use UpperCamelCase for class names  
Use UPPERCASE for Constants  
Use all_lower_with_underscore for multiword filenames, database table and all sorts of keys  

```javascript
// good
var CONSTANT = {};
var fooBar = new FooBar(bazOptions);

fooBar(CONSTANT);
```

## Names  
Use full names  

```javascript
// good
var configuration = new Configuration(options);
```

```javascript
// bad
var conf = new Conf(opt);
```

## Equality operator  
Use the === and or !== operators  

## Closures / function expressions  
Always give your (closure) functions a name (for meaningful stacktraces without anonymous function)  

```javascript
// good
req.on('end', function onEnd() {

    console.log('this is the end');

});
```

```javascript
// bad
var foo = function() {

};
```

```javascript
// good
var foo = function fooFunction() {

};
```

## Comments  
Add JSDoc comments to your code and explain complex parts of your code using comments  
Use slashes for comments  
One space after the slashes if its a text comment to explain the code  
No space after the slashes if you are commenting out a statement  

## Functions  
Avoid nested functions if possible  
Try to keep functions as small as possible  
Declare functions before they get used  

## Creating new objects and arrays  
Use {} instead of new Object()  
Use [] instead of new Array()  

## Operators  
Use || instead of "OR"  
Use && instead of "AND"  

## Strong typing  
Avoid changing the type of variables (striclty typed)  

```javascript
// good
var foo = 'string';
var bar = 123;
```

```javascript
// bad
var foo = 'string';
var foo = 123;
```

## Booleans  
Don't use use 0 or 1 as boolean replacement, always use true or false  

## null and undefined  
Use null for empty variables, don't set a variable to undefined  
Undefined should be reserved for variables that have not been set to something  

```javascript
// good
var foo = true;
var bar = false;
```

```javascript
// bad
var foo = 1;
var foo = 0;
```

## Spaces  
All operators except for periods ".", parenthesis "(", and brackets "[" should be separated from their operands by a space  

```javascript
// bad
var foo = bar+baz;
```

```javascript
// good
var foo = bar + baz;
```

```javascript
// bad
var foo = bar . baz;
```

```javascript
// good
var foo = bar.baz;
```

```javascript
// bad
var foo = bar [baz];
```

```javascript
// good
var foo = bar[baz];
```

## Assignment expressions  
Don't assign values to variables inside of a "if" and / or "while"  

```javascript
if (foo = bar) {

}
```

## New lines  
Use them when it makes the code more readable  

```javascript
// bad
if (foo) {
    var bar;
    if (foo !== undefined) {
        var fooFoo = 'foo' + foo;
        var bar = baz(fooFoo);
        return bar;
    }
    return null;
}
```

```javascript
// good
if (foo) {

    var bar;

    if (foo !== undefined) {

        var fooFoo = 'foo' + foo;
        var barFoo = 'bar' + foo;

        var bar = baz(fooFoo, barFoo);

        return bar;

    }

    return null;

}
```
