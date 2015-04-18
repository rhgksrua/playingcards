(function (document, window) {
    function PlayingCards() {

        // this.cards[0] is the top

        this.cards = [];
        this.num = 0;
        return this;
    }

    function Card(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.value = this.rankToValue(rank);
    }

    Card.prototype = {
        rankToValue: function (rank) {
            var val;
            switch(rank) {
                case 'A':
                    val = 11;
                    break;
                case 'K':
                case 'Q':
                case 'J':
                    val = 10;
                    break;
                default:
                    val = +rank;
            }
            return val;
        }


    }

    PlayingCards.prototype = {

        init: function(num) {
            
            this.create(num || 1).shuffle();
            return this;
        },

        create: function(num, option) {

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
                    switch (option) {
                        case 1:
                            deck.push([rank, suit]);
                            break;
                        case 2:
                            deck.push({rank: suit});
                            break;
                        case 3:
                            deck.push(new Card(rank, suit));
                            break;
                        default:
                            deck.push(rank + suit);
                    }
                });
            });
            
            // Create decks with num of single deck
            for (i = 0; i < num; i++) {
                this.cards = this.cards.concat(deck);
            }
            return this;
            
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
            return this
        },
        
        deal: function(num) {

            // Draws from top of the card

            num = num || 1;
            if (num < 1 || isNaN(num)) {
                throw new Error('Number must be greater than 0');
            }
            return this.cards.splice(0, num);
        },
        
        count: function() {
            return this.cards.length;
        },

        addCards: function(cards, position) {
            // true top
            // false bottom
            // undefined random
            var index;

            var self = this;
            
            cards.forEach(function(card) {
                if (position === undefined) {
                    index = Math.floor(Math.random() * self.cards.length);
                } else if (position) {
                    index = 0;
                } else {
                    index = self.cards.length;
                }
                self.cards = self.cards.slice(0, index).concat(card, self.cards.slice(index));
            })
            return this;
        }
    };

    // Add to global
    window.PlayingCards = PlayingCards;
})(document, window);
