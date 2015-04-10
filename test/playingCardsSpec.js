// Jasmine

describe("playing cards test", function() {

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

    it("should return number of cards in deck", function() {
        expect(deck.count()).toBe(52);

    });

    
});