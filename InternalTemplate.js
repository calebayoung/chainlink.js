class InternalTemplate {

    constructor( templateSelector, context, renderTarget ) {
        let source = $( `#${templateSelector}` ).html(),
            template = Handlebars.compile( source );
		this.renderedTemplate = template( context );
		this.element = $( this.renderedTemplate ).appendTo( renderTarget );
    }

}
