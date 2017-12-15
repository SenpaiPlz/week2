# Assignment Day 1 - Week 3
## TicTacToe-game-player.js
### Explain how this apparently sequential code can function to play two sides.
It has to do with the usage of function chaining, event queueing and how node handles blocking. In the case of the user object, the user object will always return itself after a function is ran in order to allow function chaining. The user object will also always setup the expected events on a waitingFor stack, this makes the user object *block* when waiting for events.

Lets take a look at a part of a run through this code to get a better view of what's happening.
-userA calls the expectGameCreated() function that adds the GameCreated to its waitingfor stack
-userA then calls the createGame() function which issues the CreateGame event to the server.
    - Note at this point user A will "async block" while waiting for the server to issue the GameCreated.
-userA will pop the GameCreated event from its waitingFor stack and un-block once the server has issued the GameCreated event. This in turn will make the userA object return itself and trigger the chained then() function call.

By now it should be clear that by using callbacks, event queueing and function chaining, that this code can play both sides.

### Run load tests. See them succeed a couple of times. Move expectMoveMade() and expectGameJoined() after joinGame() call, and expectGameCreated() after createGame() call. Run load tests again. They should fail. Explain why they fail.

I could not get the tests to fail on my box after doing multiple re-orderings, it wasnt until I removed a call that something borked.
This is very surprising to me, I would have expected the tests to fail as we would be popping off events that are not on the waitingFor stack.
As to why the tests pass I dont have a clear answer yet.

## TicTacToe.loadtest.js
### Find appropriate numbers to configure the load test so it passes on your buildserver under normal load.
On my box the timelimit 7500 and count 100 worked well under normal load.

## test-api.js
### Trace this call - back and forth - through the code
1. calling waitForCleanDatabse
2. pushing expectDatabaseCleaned to waitingFor stack
3. waiting for databaseCleaned event
4. returning from waitForCleanDatabase
5. Entered cleanDataBase
6. about to call routing context with clearDatbase Type
7. called routing context returning from cleanDataBase
8. Entering then
9. calling waitlonger
10. popping expectDatabaseCleaned
11. calling whenClean
12. calling whenDonewaiting

## user-api.js
### Ekplain what the push/pop functions do for this API. What effect would it have on the fluent API if we did not have them?
The push/pop functions push and pop events off the waitingFor stack, that is they queue the expected control flow on the waitingFor stack and pop them back off once the api recieves the expected message.
If the fluent API would not have them then the API would be less testable as this pushing and popping allows us to create a flow of messenges.
