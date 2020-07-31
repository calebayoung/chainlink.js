jQuery( $ => {

    $( () => {

        dynamicContext = {
            text: 'Dynamic class-based front-end templating!'
        };
        secondDynamicContext = {
            text: 'I am here too, I guess'
        };

        const firstParagraph = new Paragraph( dynamicContext, $( '#here-please' ) ),
            secondParagraph = new Paragraph( secondDynamicContext, $( '#here-please' ) );

        console.log( firstParagraph );
        console.log( secondParagraph );
    });

});

class Template {

    constructor( templateSelector, context ) {
        let source = $( templateSelector ).html(),
            template = Handlebars.compile( source ),
            renderedTemplate = template( context );
        this.renderedTemplate = renderedTemplate;
    }

}

class Paragraph extends Template {

    constructor( context, renderTarget ) {
        super( '#paragraph-template', context );

        this.text = context.text;
        this.element = $( this.renderedTemplate ).appendTo( renderTarget );
        $( this.element ).on( 'click', () => {
            this.talk();
        } );
    }

    talk() {
        console.log( 'Hello! Oh yeah, my text says: ' + this.text );
    }

}