# Firebase Worker Demo

This is an experimental demo that will demonstrate the usage of `enablePersistence` on web workers.

### Why ?

Inspired on [I dropped 95% of my Firebase bundle size using this one weird trick](https://davidea.st/articles/firebase-bundle-size) article, most of the devs out there want to have improve their apps.


## Get started

1. Run the `index.html` using a development server.

**Recommendation**: 
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for vscode users

2. Open the index.html on your browser and see the logs


## Flows

Over firebase firestore is a collection of `projects`. The idea of this mini-poc is to test the 
flow in common scenarios 

### Query Data
1. Get the projects from the worker

**Result**: Working as expected

### Save Data
1. Get the projects from the worker and go offline _(disable network connection)_
2. Create a new project
3. Retrieve the projects 
4. Go online and sync the projects _(automatically)_

**Result**: Working as expected

### Sync Data (advance)
1. Get the projects from the worker and go offline _(disable network connection)_
2. Create a new project
3. Retrieve the projects 
4. Close the browser tab 
5. Open the browser tab and go online _(enable network connection)_
6. Sync the projects _(automatically)_

**Result**: Not working




