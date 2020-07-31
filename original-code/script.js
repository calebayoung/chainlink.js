jQuery( $ => {

    $( () => {

        dynamicContext = {
            text: 'Dynamic class-based front-end templating!'
        };
        secondDynamicContext = {
            text: 'I am here too, I guess'
        };

        const firstParagraph = new Paragraph( dynamicContext, $( '#render-frame' ) ),
            secondParagraph = new Paragraph( secondDynamicContext, $( '#render-frame' ) );

        console.log( firstParagraph );
        console.log( secondParagraph );
    });

});

/**
 * Allows the use of external .hbs template files
 *
 * @param   {string}    name    The name of the .hbs template file
 * @usedby  ExternalTemplate
 * @link    https://stackoverflow.com/questions/23013447/how-to-define-handlebar-js-templates-in-an-external-file
 */
Handlebars.getTemplate = function( name ) {
    if ( Handlebars.templates === undefined || Handlebars.templates[ name ] === undefined ) {
        $.ajax( {
            url : '/chainlink/original-code/' + name + '.hbs',
            success : function( data ) {
                if ( Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[ name ] = Handlebars.compile( data );
            },
            async : false
        } );
    }
    return Handlebars.templates[ name ];
};

class InternalTemplate {

    constructor( templateSelector, context ) {
        let source = $( `#${templateSelector}` ).html(),
            template = Handlebars.compile( source );
        this.renderedTemplate = template( context );
    }

}

class ExternalTemplate {

    constructor( templateSelector, context ) {
        let template = Handlebars.getTemplate( templateSelector );
        this.renderedTemplate = template( context );
    }

}

class Paragraph extends ExternalTemplate {

    constructor( context, renderTarget ) {
        super( 'paragraph', context );

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