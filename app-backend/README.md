# Documentation

## Instructions
### Startup
- To start backend, use `nodemon server`
- To connect database, open two terminals. In the first, type `mongod`, and in the second do `mongosh`

## Current DB setup ideology:

### UNH  
|-> Availability Collection  
|&nbsp;&nbsp;&nbsp;&nbsp;  |-> Parking Lot 1 Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> Parking Lot 2 Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> etc  
|-> Predictions Collection  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> Parking Lot 1 Predictions Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> Parking Lot 2 Predictions Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> etc  
|-> Etc   


### Yale  
|-> Availability Collection  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> Parking Lot 1 Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> Parking Lot 2 Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> etc  
|-> Predictions Collection  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> Parking Lot 1 Predictions Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> Parking Lot 2 Predictions Document  
|&nbsp;&nbsp;&nbsp;&nbsp;   |-> etc  
|-> Etc   

### Etc.


# Future Plans
1. Create two new repos, StraySpaceFrontend and StraySpaceBackend. These will be our two main operating repos
2. Add python scripts into the backend repo (or consider a separate repo, tbd)
3. Create branch structure under each new repo, main/master branch is only ever updated by merging from a separate branch
    - Ideally there will be a "dev" branch where all work is done. When work is tested and verified, it will be checked into main
        - Further, if you are doing something like updating PageX, create a branch called something like "PageXEdit". When edits are complete, merge back into dev branch 