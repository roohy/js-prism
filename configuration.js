/**
 * Created by Ruhollah on 7/10/2015.
 */
prism = prism || {};
prism.core = prism.core || {};

PRISM_PROJECT = PRISM_PROJECT || {};

//Define Dispatcher Type Here
PRISM_PROJECT.dispatcher = prism.core.roundRobinDispatcher;

//Define Scheduler Here
PRISM_PROJECT.scheduler = prism.core.FIFOScheduler;

PRISM_PROJECT.name = "The Architecture Name"


