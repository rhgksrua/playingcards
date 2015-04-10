describe("playing cards test", function() {

    describe("using a deck with single set of playing cards", function() {

        var deck = null;

        // Create a deck before each test
        beforeEach(function() {

            // New instance of deck before each test.
            deck = new PlayingCards();

            // Watch create
            spyOn(deck, 'create').and.callThrough();

            deck.create();
        });

        it("tracks create", function() {
            expect(deck.create).toHaveBeenCalled();

        });

        it("should create a deck with 52 cards", function() {
            expect(deck.cards.length).toBe(52);
        });


        it("should shuffle the cards", function() {

            // random returns 0.  Shuffled cards are not actually shuffled.
            spyOn(Math, 'random').and.returnValue(0);
            deck.shuffle();

            var newDeck = new PlayingCards();
            newDeck.create();

            expect(Math.random()).toBe(0);
            expect(deck.cards).toEqual(newDeck.cards);


        });

        it("should deal a single card", function() {
            var card = deck.deal();
            
            // Dealt cards are popped from array
            expect(deck.cards).not.toContain(card);
            expect(deck.cards.length).toBe(51);


        });

        it("should deal multiple cards", function() {
            var cards = deck.deal(4);
            var i;
            for (i = 0, len = cards.length; i < len; i++) {
                expect(deck.cards).not.toContain(cards[i]);
            }
            expect(cards.length).toEqual(4);
        });


        it("should throw errors for dealing negative number of cards", function() {
            var fn = function() {
                deck.deal(-4);
            };
            expect(fn).toThrow();
        });

        it("should return number of cards in deck", function() {
            expect(deck.count()).toBe(52);
        });
    });

    describe("Testing method chaining", function() {
        var deck,
            newDeck;

        beforeEach(function() {
            deck = new PlayingCards();
            newDeck = new PlayingCards();
            newDeck.create();
        });



        it("should return a single card using method chaining", function() {
            expect(deck.create().deal()).toEqual(newDeck.deal());
        });

        it("should return a shuffled deck", function() {
            spyOn(Math, 'random').and.returnValue(0);
            newDeck.shuffle();

            expect(deck.create().shuffle().cards).toEqual(newDeck.cards);
           
        });

        it("should return a 3 set of playing cards, shuffled", function() {
            spyOn(Math, 'random').and.returnValue(0);
            newDeck.create(3).shuffle();
            
            expect(deck.create(3).shuffle().cards).toEqual(newDeck.cards);
            expect(deck.create(3).shuffle().count()).toEqual(3 * 52);

        });
    });
});
