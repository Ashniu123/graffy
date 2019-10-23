(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{VYVN:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reference/Reference",function(){return a("qD/9")}])},"qD/9":function(e,n,a){"use strict";a.r(n);var t=a("qNsG"),o=a("q1tI"),m=a.n(o),r=a("6qfE"),s=m.a.createElement;n.default=function(e){var n=e.components;Object(t.a)(e,["components"]);return s(r.MDXTag,{name:"wrapper",components:n},s(r.MDXTag,{name:"h1",components:n},"Graffy API Reference"),s(r.MDXTag,{name:"h2",components:n},"@graffy/core"),s(r.MDXTag,{name:"h3",components:n},"new Graffy()"),s(r.MDXTag,{name:"p",components:n},"Constructs a store. Does not accept any arguments."),s(r.MDXTag,{name:"h3",components:n},"store.",s(r.MDXTag,{name:"strong",components:n,parentName:"h3"},"get"),"(query, options)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"Encoding#Queries"}},"query"),", ",s(r.MDXTag,{name:"em",components:n,parentName:"li"},"options")),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: Promise:Graph")),s(r.MDXTag,{name:"p",components:n},"Retrieve data from the store."),s(r.MDXTag,{name:"h3",components:n},"store.",s(r.MDXTag,{name:"strong",components:n,parentName:"h3"},"sub"),"(query, options)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"Encoding#Queries"}},"query"),", ",s(r.MDXTag,{name:"em",components:n,parentName:"li"},"options")),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: AsyncIterable:Graph")),s(r.MDXTag,{name:"h4",components:n},"options"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"raw"),": If false (default), returns full data objects; if true, returns ",s(r.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"Encoding#Changes"}},"changes"),".")),s(r.MDXTag,{name:"h3",components:n},"store.",s(r.MDXTag,{name:"strong",components:n,parentName:"h3"},"put"),"(change, options)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"Encoding#Changes"}},"change"),", ",s(r.MDXTag,{name:"em",components:n,parentName:"li"},"options")),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: Promise of all changes applied")),s(r.MDXTag,{name:"p",components:n},"Writes changes into the store."),s(r.MDXTag,{name:"h3",components:n},"store.",s(r.MDXTag,{name:"strong",components:n,parentName:"h3"},"onGet"),"(path, handler)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"em",components:n,parentName:"li"},s(r.MDXTag,{name:"a",components:n,parentName:"em",props:{href:"Encoding#Paths"}},"path")),", handler")),s(r.MDXTag,{name:"h4",components:n},"handler(query, options, next)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"Encoding#Queries"}},"query"),", options, next"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Expected return value: Promise:Graph")),s(r.MDXTag,{name:"p",components:n},"Called when fulfilling a ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"get()")," that overlaps the path."),s(r.MDXTag,{name:"h4",components:n},"next(nextQuery)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Argument: nextQuery"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: Promise:Graph")),s(r.MDXTag,{name:"p",components:n},"The handler may call ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"next")," to delegate fulfillment of all or part of its query to downstream handlers. It should then incorporate the tree returned by ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"next")," into its own return value."),s(r.MDXTag,{name:"h3",components:n},"store.",s(r.MDXTag,{name:"strong",components:n,parentName:"h3"},"onSub"),"(path, handler)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"em",components:n,parentName:"li"},s(r.MDXTag,{name:"a",components:n,parentName:"em",props:{href:"Encoding#Paths"}},"path")),", handler")),s(r.MDXTag,{name:"h4",components:n},"handler(query, options, next)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"Encoding#Queries"}},"query"),", options, next"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Expected return value: AsyncIterable:Graph")),s(r.MDXTag,{name:"p",components:n},"Called when fulfilling a ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"sub()")," that overlaps the path."),s(r.MDXTag,{name:"p",components:n},"If this handler provides ",s(r.MDXTag,{name:"em",components:n,parentName:"p"},"live query")," semantics, the first value yielded by the returned AsyncIterable must be the full query results. Subsequent values may be partial changes. On the other hand, if the handler provides only a change stream, it must signal this by yielding ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"undefined")," first."),s(r.MDXTag,{name:"h4",components:n},"next(nextQuery)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Argument: nextQuery"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: Promise:Graph")),s(r.MDXTag,{name:"p",components:n},"The handler may call ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"next")," to delegate fulfillment of all or part of its query to downstream handlers. It should then incorporate the stream returned by ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"next")," into its own return value."),s(r.MDXTag,{name:"h3",components:n},"store.",s(r.MDXTag,{name:"strong",components:n,parentName:"h3"},"onPut"),"(path, handler)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"em",components:n,parentName:"li"},s(r.MDXTag,{name:"a",components:n,parentName:"em",props:{href:"Encoding#Paths"}},"path")),", handler")),s(r.MDXTag,{name:"h4",components:n},"handler(change, options, next)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"a",components:n,parentName:"li",props:{href:"Encoding#Changes"}},"change"),", options, next"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Expected return value: Promise")),s(r.MDXTag,{name:"p",components:n},"Called when processing a ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"put()")," that overlaps the path."),s(r.MDXTag,{name:"h4",components:n},"options"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"source"),": A string identifying the source of the change."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"version"),": A numeric timestamp for the change.")),s(r.MDXTag,{name:"h4",components:n},"next(nextChange)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Argument: nextChange"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: Promise of all changes applied")),s(r.MDXTag,{name:"p",components:n},"The handler may call ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"next")," to delegate the application of all or part of its changes, or additional changes that it constructed, to other handlers. It should then incorporate the changes returned by ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"p"},"next")," into its own return value."),s(r.MDXTag,{name:"h3",components:n},"store.",s(r.MDXTag,{name:"strong",components:n,parentName:"h3"},"use"),"(path, provider)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: ",s(r.MDXTag,{name:"em",components:n,parentName:"li"},s(r.MDXTag,{name:"a",components:n,parentName:"em",props:{href:"Encoding#Paths"}},"path")),", provider")),s(r.MDXTag,{name:"p",components:n},"Mounts a provider to the store at the given path."),s(r.MDXTag,{name:"h4",components:n},"provider(shiftedStore)"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Argument: shiftedStore")),s(r.MDXTag,{name:"p",components:n},"Providers receive a Graffy store (shifted to the path) as argument. They typically attach handlers to the store."),s(r.MDXTag,{name:"h2",components:n},"@graffy/common"),s(r.MDXTag,{name:"p",components:n},"This package provides a set of utilities to help work with graph and query data structures."),s(r.MDXTag,{name:"h3",components:n},"Builders"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"graph(object)"),": Constructs a graph."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"query(object)"),": Constructs a query."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"page(object)"),": Constructs a page in a graph."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"link(object)"),": Constructs a link in a graph."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"key(object)"),": Encodes non-string values into a string key.")),s(r.MDXTag,{name:"h3",components:n},"decorate(graph)"),s(r.MDXTag,{name:"p",components:n},"Converts a graph data structure into easier-to-use JS objects and arrays."),s(r.MDXTag,{name:"h3",components:n},"Utilities"),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"makePath(path)"),": Converts JSONPointer strings into key arrays"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"wrap(value, path)"),": Wraps a graph or query in a path. For example, ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"li"},"wrap(42, ['foo', 'bar'])")," gives ",s(r.MDXTag,{name:"inlineCode",components:n,parentName:"li"},"graph({ foo: { bar: 42 } })"),"."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"unwrap(value, path)"),": Unwraps a path using a graph or query. Returns undefined if path is unknown and null if it does not exist."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"isRange(node)"),": Check if graph or query node is a range."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"isBranch(node)"),": Check if graph or query node is a branch."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"isLink(node)"),": Check if graph or query node is a link."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"isOlder(node, version)"),": Check if graph or query node is older than the version."),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},s(r.MDXTag,{name:"strong",components:n,parentName:"li"},"isNewer(node, version)"),": Check if graph or query node is newer than the version.")),s(r.MDXTag,{name:"h3",components:n},"makeStream(initializer)"),s(r.MDXTag,{name:"p",components:n},"Constructs an async iterable. This utility is more convenient than async generator functions for consuming from a callback-based event emitter."),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: initializer"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: AsyncIterable")),s(r.MDXTag,{name:"h4",components:n},"initializer(push, end)"),s(r.MDXTag,{name:"p",components:n},"Called synchronously, the initializer should subscribe to the event emitter and return a function that, when called, unsubscribes from it."),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Arguments: push, end"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Returns: unsubscribe")),s(r.MDXTag,{name:"h4",components:n},"push(value)"),s(r.MDXTag,{name:"p",components:n},"Yield this value from the async iterator. This function is typically called from the event emitter subscription handler."),s(r.MDXTag,{name:"ul",components:n},s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Argument: value"),s(r.MDXTag,{name:"li",components:n,parentName:"ul"},"Return: drainPromise")),s(r.MDXTag,{name:"h4",components:n},"end(error)"),s(r.MDXTag,{name:"p",components:n},"Signal to the consumer of the async iterator that the event emitter has closed. The error argument is optional. This is typically called from the event emitter's close and error handlers."),s(r.MDXTag,{name:"h4",components:n},"unsubscribe(error)"),s(r.MDXTag,{name:"p",components:n},"The unsubscribe function returned by the initializer is called when the consumer of the async iterator stops consuming it. If it stopped consuming due to an error, the error argument will be passed."),s(r.MDXTag,{name:"h4",components:n},"drainPromise"),s(r.MDXTag,{name:"p",components:n},s(r.MDXTag,{name:"strong",components:n,parentName:"p"},"Advanced"),": Async iterators are a pull-based streaming mechanism, whereas event emitters are push-based. If the event emitter is pushing values faster than the consumer is pulling, the internal value buffer used by makeStream might grow too big."),s(r.MDXTag,{name:"p",components:n},'Some event emitters (e.g. Node.js streams) provide a "backpressure" mechanism to pause and resume the push of events. The drainPromise mechanism allows interfacing with this.'),s(r.MDXTag,{name:"p",components:n},"The push function returns a drainPromise when the buffer exceeds a predefined high water mark. (Note that this does not mean the push failed - it continues to accept pushes until the system runs out of memory.) The drainPromise resolves when the buffer falls below a predefined low water mark as it is 'drained' (emptied) by the consumer."),s(r.MDXTag,{name:"p",components:n},"Typically, a backpressure-capable subscription should be paused when push returns a drainPromise, and resumed when that promise resolves."),s(r.MDXTag,{name:"h2",components:n},"@graffy/server"),s(r.MDXTag,{name:"h2",components:n},"@graffy/client"),s(r.MDXTag,{name:"h2",components:n},"@graffy/fill"))}}},[["VYVN",1,0]]]);