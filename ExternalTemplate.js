class ExternalTemplate {

    constructor( templateUrl, templateName, context, renderTarget ) {
        let template = Handlebars.getTemplate( templateUrl, templateName );
		this.renderedTemplate = template( context );
		this.element = $( this.renderedTemplate ).appendTo( renderTarget );
    }

}

/**
 * Allows the use of external .hbs template files
 *
 * @param	{string}	templateUrl		The location of the template file from the location of this file
 * @param   {string}    name    		The name of the .hbs template file
 * @usedby  ExternalTemplate
 * @link    https://stackoverflow.com/questions/23013447/how-to-define-handlebar-js-templates-in-an-external-file
 */
Handlebars.getTemplate = function( templateUrl, name ) {
	if ( templateUrl ) {
		templateUrl += name + '.hbs';
	} else {
		templateUrl = name + '.hbs';
	}
    if ( Handlebars.templates === undefined || Handlebars.templates[ name ] === undefined ) {
        $.ajax( {
            url : templateUrl,
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
