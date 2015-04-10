# Playing Cards

## Introduction

Deck contains an array of cards.

A card consist of two letters.  First is the card value and second is the card suit.

ie. 


    "4D" is four of diamonds.

    "KS" is king of spades.


## Baic Usage:

    var deck = new PlayingCards();

Only creates an instance of PlayingCards

You can create a deck of 3 sets of playing cards and shuffle it by:

    deck.create(3).shuffle();

#### create a deck

    deck.create([number of decks]);

#### Shuffle

    deck.shuffle();

Shuffles the deck.

#### Deal a single card

    deck.deal();

Returns a single card.

#### Number of cards remaining

    deck.count();

Returns number of cards left in the deck.


#### Methods to add:

    deck.addCard(card);

