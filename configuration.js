/**
 * Created by Ruhollah on 7/10/2015.
 */
var prism = prism || {};
prism.core = prism.core || {};

var PRISM_PROJECT = PRISM_PROJECT || {};

//Define Dispatcher Type Here
PRISM_PROJECT.dispatcher = prism.core.roundRobinDispatcher;
PRISM_PROJECT.threadCount = 2;

//Define Scheduler Here
PRISM_PROJECT.scheduler = prism.core.FIFOScheduler;
PRISM_PROJECT.maxSize = 100;
PRISM_PROJECT.name = "The Architecture Name";

//add abstract implementation files
PRISM_PROJECT.implementations = ['./component/server.js','./component/client.js'];


