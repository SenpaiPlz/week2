const fs = require('fs');

module.exports=function(injected){


    const io = injected('io');
    const RoutingContext = injected('RoutingContext');

    const incomingEventLogFile="./test-api-incoming-events.log";
    const outgoingCommandLogFile="./test-api-outgoing-commands.log";

    let connectCount =0;

    function testAPI(){
        let waitingFor=[];
        let commandId=0;

        let routingContext = RoutingContext(inject({
            io,
            env:"test",
            incomingEventLogger: function(verb, message){
                fs.appendFile(incomingEventLogFile,verb + " - " + JSON.stringify(message) + "\n", function(err){
                    if(err){
                        console.error("Error writing to log file " + incomingEventLogFile + "Error:\n" + err);
                    }
                });
            },
            outgoingCommandLogger: function(verb, message){
                fs.appendFile(outgoingCommandLogFile,verb + " - " + JSON.stringify(message) + "\n", function(err){
                    if(err){
                        console.error("Error writing to log file " + outgoingCommandLogFile + "Error:\n" + err);
                    }
                });
            }
        }));

        connectCount++;
        const me = {
            // Assignment: Trace this call - back and forth - through the code.
            // Put in log statements that enable you to trace the messages going back and forth.
            // Result is a list of modules/functions in this source code which get invoked when cleanDatabase is called.
            cleanDatabase:()=>{
                console.log("Entered cleanDataBase");
                let cmdId = commandId++;
                console.log("about to call routing context with clearDatbase Type");
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"cleanDatabase"});
                console.log("called routing context returning from cleanDataBase");
                return me;

            },
            waitForCleanDatabase:(whenClean)=>{
                console.log("entering waitForCleanDatabse");
                console.log("pushing expectDatabaseCleaned to waitingFor stack");
                waitingFor.push("expectDatabaseCleaned");
                console.log("waiting for databaseCleaned event");
                routingContext.eventRouter.on('databaseCleaned', function(chatMessage){
                    console.log("popping expectDatabaseCleaned");
                    waitingFor.pop(); // expectDatabaseCleaned
                    console.log("calling whenClean");
                    whenClean && whenClean();
                });
                console.log("returning from waitForCleanDatabase");
                return me;

            },
            then:(whenDoneWaiting)=>{
                console.log("Entering then");
                function waitLonger(){
                    if(waitingFor.length>0){
                        setTimeout(waitLonger, 0);
                        return;
                    }
                    console.log("calling whenDonewaiting");
                    whenDoneWaiting();
                }
                console.log("calling waitlonger");
                waitLonger();
                return me;
            },
            disconnect:function(){
                routingContext.socket.disconnect();
            }

        };
        return me;
    }

    return testAPI;
};
