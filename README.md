# piq-translations-worker

clone they project and then run

```
npm install
```

```
npm start //starts a nodemon on http://localhost:3000
```
## Endpoints

### Insert new item. Requires messageKey and locale. Auto-creates incremented index as key.
```
{
  path: /messagekey,
  method: POST
  payload: {
   messageKey: 'somekey',
   locale: 'sv_SE'
  }
}
```

### Get all unique keys (filters out duplicates)
```
{
  path: /messagekey,
  method: GET
}
```



