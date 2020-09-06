class Paragraph extends ExternalTemplate {

    constructor( context, renderTarget ) {
        super( null, 'paragraph', context, renderTarget );

        this.text = context.text;

        $( this.element ).on( 'click', () => {
            this.talk();
        } );
    }

    talk() {
        console.log( 'Hello! Oh yeah, my text says: ' + this.text );
    }

}
