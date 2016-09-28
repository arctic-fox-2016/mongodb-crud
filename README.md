# mongodb-crud

## Release 0

#### Create db "library"

```
use library
```

#### Create collection "books"

```
db.books.insert([
  {
    "_id": ObjectId("5715b4f38c41ba33b7fa36e3"),
    "isbn": "978-1-60309-057-5",
    "title": "Dragon Puncher",
    "author": "James Kochalka",
    "category": "All Ages",
    "stock": 3
  },
  {
    "_id": ObjectId("5715b5cd8c41ba33b7fa36e4"),
    "isbn": "978-1-891830-77-8",
    "title": "Every Girl is the End of the World for Me",
    "author": "Jeffry Brown",
    "category": "Mature (16+)",
    "stock": 5
  }
])
```

#### Create collection "transactions"

```
db.transactions.insert(
    {
      "_id": ObjectId("5715ba7b80b065a3dd0ba0ba"),
      "memberid": "CL0001",
      "days": 6,
      "out_date": ISODate("2016-04-19T14:56:59.301Z"),
      "due_date": ISODate("2016-04-25T14:56:59.301Z"),
      "in_date": ISODate("2016-04-27T14:56:59.301Z"),
      "fine": 2000,
      "booklist":[
        {"isbn": "978-1-60309-057-5", "qty": 1},
        {"isbn": "978-1-89183-077-8", "qty": 2}
      ]
    }
)
```

#### Create collection "customers"

```
db.customers.insert([
  {
    "_id": ObjectId("5715b79880b065a3dd0ba0b8"),
    "name": "Rubi Henjaya",
    "memberid": "CL0001",
    "address": "Ujung Berung Bandung",
    "zipcode": "40294",
    "phone": "08112237788"
  },
  {
    "_id": ObjectId("5715b7d880b065a3dd0ba0b9"),
    "name": "Riza Fahmi",
    "memberid": "CL0002",
    "address": "Something in Jakarta",
    "zipcode": "50022",
    "phone": "081122336655"
  }
])
```
