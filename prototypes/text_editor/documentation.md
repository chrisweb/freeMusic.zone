# text editor (contenteditable) prototypes

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

the createContextualFragment documentation at MDN
* https://developer.mozilla.org/en-US/docs/Web/API/Range/createContextualFragment

using createContextualFragment by timdown the creator of rangy
* http://stackoverflow.com/questions/2213376/how-to-find-cursor-position-in-a-contenteditable-div/2213514#2213514

execCommand on MDN
* https://developer.mozilla.org/en/docs/Web/API/Document/execCommand

chrome and firefox different behaviors  
* seems like firefox adds two br elements when doing a line break, chrome adds some divs around the text  