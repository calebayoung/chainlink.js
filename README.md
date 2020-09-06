# ChainLink.js

A front-end methodology/framework that rejects traditional page scripting and implements object-oriented principles in front-end development. Creates modular, reusable components which handle their own logic and properties internally.

See [this webpage](http://calebayoung.com/chainlink/docs/) for a full explanation of ChainLink, why it exists, and what problems it solves.

## Installation and Usage

The only files necessary to use Chainlink.js are `ExternalTemplate.js` and/or `InternalTemplate.js` (depending on your project structure, you may need one or both). These files can be downloaded and added directly to a project, or this repository can be added as a submodule.

`InternalTemplate` should be extended if the template Handlebars code will be available/included in the page HTML.

`ExternalTemplate` should be extended if the template Handlebars code is saved in separate files (my personal preference).

To take advantage of this framework, each Chainlink module will need these four components:

- A render-target element (usually a `<div>` or other container) with a unique HTML ID
- A Handlebars template - either internal (on the same page) or external (saved in a separate `.hbs` file)
- A JavaScript class extending either `InternalTemplate` or `ExternalTemplate`
- Page driver JavaScript to initialize objects and specify the render-target element

See the code examples below to learn how to write/build each of these components. The examples can also be viewed in action on the [docs webpage](http://calebayoung.com/chainlink/docs/).

## Code Examples

### Paragraph (External)

`index.html` - Loads dependencies and provides the render-target element

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>ChainLink.js Paragraph Example</title>
	</head>
	<body>
		<!-- Render-Target Element -->
		<div id="render-frame"></div>
		<!-- Dependencies -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
		<!-- ChainLink Components -->
		<script src="../ExternalTemplate.js"></script>
		<script src="Paragraph.js"></script>
		<script src="script.js"></script>
	</body>
</html>
```

`paragraph.hbs` - the Handlebars template

```hbs
<p>{{text}}</p> <!-- Pretty simple, right? This is a very basic example -->
```

`Paragraph.js` - extends `ExternalTemplate` and adds `talk()` functionality

```js
class Paragraph extends ExternalTemplate {

	constructor( context, renderTarget ) {
		// If the .hbs file is in a different directory than
		// this class file, specify the relative path in
		// the first parameter of super() (set to null here)
		super( null, 'paragraph', context, renderTarget );

		this.text = context.text;

		$( this.element ).on( 'click', () => {
			this.talk();
		} );
	}

	talk() {
		// talk() is a little contrived, but it illustrates how
		// to add custom functionality inside Chainlink modules
		console.log( 'Hello! Oh yeah, my text says: ' + this.text );
	}

}
```

`script.js` - the driver JavaScript file for the page

```js
jQuery( $ => {

	$( () => {

		// This data is hard-coded here, but imagine loading
		// it from an API or another part of the project
		dynamicContext = {
			text: 'Dynamic class-based front-end templating!'
		};
		secondDynamicContext = {
			text: 'I am here too, I guess'
		};

		// Notice how small this driver code is!
		const firstParagraph = new Paragraph( dynamicContext, $( '#render-frame' ) ),
			secondParagraph = new Paragraph( secondDynamicContext, $( '#render-frame' ) );

		// Again, talk() is a little contrived, but notice
		// how easy it is to trigger custom functionality
		// attached to each individual object
		firstParagraph.talk();
		secondParagraph.talk();
	});

});
```


```
(more examples coming soon)
```