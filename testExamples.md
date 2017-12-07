# Test examples for game logic
## Create Game Event:
### Should emit game created event
- Given: A user
- When: The user creates a game
- Then: A game created event is emitted
## Join Game Event:
### Should emit game joined event:
- Given: User A and B, A has created a game
- When: User B joins users A game.
- Then: A game joined event is emitted
### Should emit FullGameJoinAttempted when joining a full game
- Given: User A, B and C. A has created a game which B has joined.
- When: User C joins A's game.
- Then: A FullGameJoinAttempted event is emitted.
## Place Move Event:
### Should emit Move Placed on first game move.
- Given: User A and B, A has created a game which B has joined.
- When: User A makes a move.
- then: A MovePlaced event is emitted.
### Should emit IllegalMove when square is already occupied.
- Given: User A and B, A has created a game which B has joined. A has made a move.
- When: User B makes a move on a square that is already occupied.
- Then: A IllegalMove event is emitted.
### Should emit NotYourMove if attempting to make move out of turn.
- Given: User A and B, A has created a game which B has joined. A has made a move.
- When: User A tries to make a move again.
- Then: A NotYourMove event is emitted.
### Should emit game won.
- Given: User A and B, A has created a game which B has joined. A and B have played a game of tic tac toe that is unfinished. Player A is one move from victory, and is the next player to make a move.
- When: User A makes the winning move.
- Then: A MovePlaced and GameWon event is emitted.
### Should not emit game draw if won on last move.
- Given: User A and B, A has created a game which B has joined. A and B have played a game of tic tac toe that one move from finishing. User A is one move from victory, and is the next player to make a move.
- When: User A makes the winning move.
- Then: A MovePlaced and GameWon event is emitted.
### Should emit game draw if not won on last move.
- Given: User A and B, A has created a game which B has joined. A and B have played a game of tic tac toe that one move from finishing. User A cannot make a winning move, and is the next player to make a move.
- When: User A makes the final move.
- Then: A MovePlaced and GameDraw event is emitted.
