(function (document, window) {
    /**
     * Represents a deck of cards.
     * @constructor
     */
    function PlayingCards() {

        // this.cards[0] is the top

        this.cards = [];
        this.num = 0;
        return this;
    }

    /**
     * Represents a card.
     * @constructor
     * @param {string} rank
     * @param {string} suit
     */

    function Card(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.value = this.rankToValue(rank);
    }

    Card.prototype = {

        /**
         * Convert card rank to a numerical value
         * @param {string} rank
         */
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

        /**
         * Creates and shuffles
         * @param {number} num
         */
        init: function(num) {
            this.create(num || 1).shuffle();
            return this;
        },

        /**
         * Creates an ordered deck
         * @param {number} num
         * @option {number} option
         */
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
        
        /**
         * Shuffles card
         */
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
        
        /**
         * Deals card
         * @param {number} num
         */
        deal: function(num) {

            // Draws from top of the card

            num = num || 1;
            if (num < 1 || isNaN(num)) {
                throw new Error('Number must be greater than 0');
            }
            // No more cards in the deck
            if (this.count() < 1) {
                return false;
            }
            return this.cards.splice(0, num);
        },
        
        /**
         * Returns number of cards remaining in the dec
         */
        count: function() {
            return this.cards.length;
        },

        /**
         * Add cards to deck on top/bottom/random.
         * @param {string} cards
         * @param {boolean} position
         */
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
    window.Card = Card;

})(document, window);
