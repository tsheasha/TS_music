Please feel free to ask us questions.

**Make your own Github repo named `<YOUR INITIALS>_music`, download this gist and include the files to the repo. Create a README.md file with simple instructions to run it.**

The focus of this assignment is on the **back end** (or **server side**). We will be looking specifically for good practices and your development process.

You are not supposed to solve this problem with the tools you have most skill at, rather it is recommended to use `<OPTION 1>` or alternatively `<OPTION 2>`.

Also, **don't use any DB** for this assignment, all data should be kept in memory and disposed when the server stops - no worries about persistence.

## Fictional MVP!

This fictional client has asked for a recommendation system for his social music player system.  
He wants you to essentially take note of what music the user has listened to.
Which people they follow and from there recommend some songs. There is no like or dislike so far.

- **users**: have an ID, follow N other users, have heard Y musics in the past - try modeling this in a way that makes sense.

### There should be 3 end points

##### `POST /follow`
Add one follow relationship (see `follows.json`)

the request body have 2 params:
- from: \<user ID\>
- to: \<user ID\>

##### `POST /listen`
Add one song as the user has just listened ( see `listen.json` )

the request body have 2 params:
- user: \<user ID\>
- music: \<music ID\>

##### `GET /recommendations`
Return 5 music recommendations to this user, they should be sorted by relevance

Query string has:
- user: \<user ID\>

response looks like:

```json
{
  "list": ["<music ID>", "<music ID>", "<music ID>", "<music ID>", "<music ID>"]
}
```

--

It's supposed to be a simplistic recommendation engine, which takes into account these main components:
- people who the user follow in first degree
- maximize for discovery of new songs

#### make it run!

We expect 2 parts:

1. a server that only has business logic (the endpoints) with a sort of DB in memory (empty at first)
2. a series of commands that load the data through your endpoints and finally get a recommendation (see `script.md`)

Finally, make any type of runner that starts your server and runs the script. Whether the server will be running or not after the results finish is up to you.
It's also ok to have one command to put the server up running and another to run script.

#### hints
- there isn't one right answer, but the modeling of the problem matters
- also, don't worry about finding a perfect solution to this, it's a MVP
- implement the script correctly
- make simple instructions to execute the server and the script

Before you start or shoot us questions (don't hesitate ;) please read and fill `QnA.md`