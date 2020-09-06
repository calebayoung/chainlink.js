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

		firstParagraph.talk();
		secondParagraph.talk();
    });

});
