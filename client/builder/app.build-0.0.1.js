({
    
    appDir: '../development',
    baseUrl: 'javascript/',
    dir: '../production',
    
    // optimize code minified by UglifyJS
    optimize: "uglify",
    
    //If using UglifyJS for script optimization, these config options can be
    //used to pass configuration values to UglifyJS.
    //See https://github.com/mishoo/UglifyJS for the possible values.
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: false,
        max_line_length: 1000
    },
    
    //Allow CSS optimizations. Allowed values:
    //- "standard": @import inlining, comment removal and line returns.
    //Removing line returns may have problems in IE, depending on the type
    //of CSS.
    //- "standard.keepLines": like "standard" but keeps line returns.
    //- "none": skip CSS optimizations.
    //- "standard.keepComments": keeps the file comments, but removes line
    //returns.  (r.js 1.0.8+)
    //- "standard.keepComments.keepLines": keeps the file comments and line
    //returns. (r.js 1.0.8+)
    optimizeCss: "standard",
    
    // find nested dependencies
    findNestedDependencies: true,
    
    paths: {
        'jquery': 'jquery-1.9.1',
        'configuration': 'configuration-0.0.1',
        'application': 'application-0.0.1'
    },
    
    modules: [
        //Optimize the application files
        {
            name: 'main-0.0.2'
        }
    ]
    
})
