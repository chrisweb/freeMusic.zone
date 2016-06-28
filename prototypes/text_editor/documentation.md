# text editor (contenteditable) prototypes

## documentation

w3c contenteditable attribute in the html(5) specification
* https://w3c.github.io/html/editing.html#making-document-regions-editable-the-contenteditable-content-attribute

contenteditable can i use
* http://caniuse.com/#feat=contenteditable

great article that explains the differencies between innerText and textContent 
* http://perfectionkills.com/the-poor-misunderstood-innerText/

the html5 w3c specification recommends to use the style pre-wrap for white-space
* https://w3c.github.io/html/editing.html#best-practices-for-in-page-editors

article from medium about the problems you will get while using contenteditable
* https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480

as inserting images in the contenteditable is all about ranges this could be useful
* https://github.com/timdown/rangy

the createContextualFragment documentation at MDN (first parameter can be a tag(s) string)
* https://developer.mozilla.org/en-US/docs/Web/API/Range/createContextualFragment

the createDocumentFragment (creates an empty DocumentFragment object) documentation at MDN
* https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment

DocumentFragment documentation at MDN
* https://developer.mozilla.org/en/docs/Web/API/DocumentFragment

selectNodeContents could also be very useful when creating an editor
* https://developer.mozilla.org/en-US/docs/Web/API/Range/selectNodeContents

execCommand on MDN
* https://developer.mozilla.org/en/docs/Web/API/Document/execCommand

chrome and firefox different behaviors (old versions of safari used a lot of spans, never safari dont)
* seems like firefox adds two br elements when doing a line break, chrome adds some divs around the text  

## further reading

* I had to dig pretty deep this time, the doal was to create an editor with the best performance possible (as few reflows as possible).
* The createElement approach would have worked, since appending an HTMLElement to the DOM keeps the original reference, but appending a DocumentFragment was a lot trickier
* DocumentFragments have no parent node, so after inserting the fragment into the document dom, the range.setStartAfter(fragment) always failed with an error message "Uncaught InvalidNodeTypeError: Failed to execute 'setEndAfter' on 'Range': the given Node has no parent."
* After the fragments children got added to the dom the fragment is empty
* Both DocumentFragment and HTMLElement are objects that inherit from Node
* Also check out the main.js comments where I describe the problems I encountered and how I solved them

using createContextualFragment by timdown the creator of rangy  
* http://stackoverflow.com/questions/2213376/how-to-find-cursor-position-in-a-contenteditable-div/2213514#2213514

why it's better to use DocumentFragment  
* http://ejohn.org/blog/dom-documentfragments/
* https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
* from a performance point of view, instead of creating a lot of dom inside of the document and having lots of reflows, manipulate the dom inside of the fragment and then add the fragment to the dom  

also a good read, the differences between innertext and innerhtml  
* http://stackoverflow.com/questions/19030742/difference-between-innertext-and-innerhtml-in-javascript/19032002#19032002

jquery also uses fragment (for complex divs)  
* http://stackoverflow.com/questions/10372271/jquery-just-created-empty-div-doesnt-have-document-fragment-as-parent

some info on nodes  
* https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType  