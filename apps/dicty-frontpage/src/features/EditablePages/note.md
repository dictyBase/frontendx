When to save editor data?

When to clear editor data?

# Editor Life Cycle

## Create

Create Content Page should have its own storage key (per application)

### Page Open

- empty: Nothing to worry about, periodically save entry (~5 min)
- existing: Display preview of saved data. Ask if user wants to restore.

### Submit 

- onFailure: save entry
- onSuccess: clean up entry

### Page Close (navigate away)

- use `beforeunload` listener
- IF there is data present, save the data.

## Edit

Each entry should be identified by the slug

### Page Open

- empty: Nothing to worry about, periodically save entry (~5 min)
- existing local: Display preview of locally saved data. Ask if user wants to restore.
- existing remote, older: 

### Submit 

- onFailure: save entry
- onSuccess: clean up entry

### Page Close (navigate away)

- use `beforeunload` listener
- IF there is data present, save the data.

