function PlayingCards() {

    this.cards = [];
    this.num = 0;

}


PlayingCards.prototype = {

    create: function(num) {

        this.num = num;
        
        // reset cards and make new set of decks
        this.cards = [];
        var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        var suits = ['C', 'D', 'H', 'S'];
        var deck = [];
        num = num || 1;
        // deck hold a single complete set
        ranks.forEach(function(rank) {
            suits.forEach(function(suit) {
                deck.push(rank + suit);
            });
        });
        
        // Create decks with num of single deck
        for (i = 0; i < num; i++) {
            this.cards = this.cards.concat(deck);
        }
        
    },
    
    shuffle: function() {
        
        var shuffled = [];
        var index;
        
        while(this.cards.length > 0) {
            // random index to remove
            index = Math.floor(Math.random() * this.cards.length);
            // store randomly picked card to shuffled
            shuffled = shuffled.concat(this.cards.splice(index, 1));
            
            
        }
        this.cards = shuffled;
    },
    
    deal: function(num) {
        num = num || 1;
        if (num < 1 || isNaN(num)) {
            throw {
                name: 'RangeError',
                message: 'Must be larger than 1'
            }

        }


        
        
        return this.cards.splice(0, num);
    },
    
    count: function() {
        return this.cards.length;
    }
};

