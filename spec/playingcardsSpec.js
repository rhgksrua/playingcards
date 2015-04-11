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
            var dealtCards = deck.create().deal();
            expect(dealtCards).toEqual(newDeck.deal());
            expect(dealtCards.length).toBe(1);
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
    describe("Adding cards to a deck", function() {
        // Create a deck before each test
        beforeEach(function() {
            deck = new PlayingCards();

            // Math.random() returns 0
            spyOn(Math, 'random').and.returnValue(0);

            deck.create();
        });

        it("should add a single card to a deck", function() {
            expect(deck.addCards(["2C"]).cards.length).toBe(53);
            expect(deck.cards[0]).toBe("2C");
        });
        it("should add multiple cards to a deck randomly", function() {
            expect(deck.addCards(["2C", "3D", "4S"]).cards.length).toBe(55);
            expect(deck.cards.slice(0, 3)).toContain("4S");
            expect(deck.cards.slice(0, 3)).toContain("3D");
            expect(deck.cards.slice(0, 3)).toContain("2C");
            expect(deck.cards[0]).toBe("4S");
            expect(deck.cards[1]).toBe("3D");
            expect(deck.cards[2]).toBe("2C");
        });
        it("should add a card(s) to top of the deck", function() {
            deck.addCards(["2C"], true);
            expect(deck.cards[0]).toBe("2C");
            expect(deck.cards.length).toBe(53);

            deck.addCards(["2C", "3C", "4D"], true);
            expect(deck.cards[0]).toBe("4D");
            expect(deck.cards[1]).toBe("3C");
            expect(deck.cards[2]).toBe("2C");
            expect(deck.cards.length).toBe(56);
        });

        it("should add a card(s) to bottom of the deck", function() {
            deck.addCards(["2C"], false);
            expect(deck.cards[deck.cards.length - 1]).toBe("2C");
            expect(deck.cards.length).toBe(53);

            deck.addCards(["2C", "3C", "4D"], false);
            expect(deck.cards[deck.cards.length - 1]).toBe("4D");
            expect(deck.cards[deck.cards.length - 2]).toBe("3C");
            expect(deck.cards[deck.cards.length - 3]).toBe("2C");
            expect(deck.cards.length).toBe(56);

        });

    });

});
