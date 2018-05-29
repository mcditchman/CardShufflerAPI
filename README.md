# Card Shuffler

Basic API for creating and retrieve shuffled deck of cards. Card Shuffler uses MongoDB to store created decks.

## How to use

``` bash
# Create new shuffled deck. Returns shuffled deck with DB ids
POST /api/shuffleddeck

# Returns ordered deck associated to the given deck ID
POST /api/decks
Payload: { "deckId" : "" }
```
