
# Placement Test 

## Deployment
Deployment link:[ https://placement-test-api.vercel.app/](https://placement-test-api.vercel.app/)


## Run Locally

Clone the project

Go to the project directory

Install dependencies

```bash
  npm install
```

create env file and and enter the contents by copying the contents of the file .env.example

Start the server
```bash
  http://localhost:8000
```

## Technology

- Nodejs
- MongoDB
- Express
- mongoose
- cors 
- dotenv
- jsonwebtoken


## API Reference

### Authentication

#### Login 
```http
  POST /user/login
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. your email |
| `password` | `string` | **Required**. your password |

ex.
```http
{
    "email": "reyhan@gmail.com",
    "password": "123"
}
```

response success:
```http
{
    "message": "successful login",
    "data": {
        "token": "your token"
    },
    "success": true
}
```


#### Register
```http
  POST /user/register
```
| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. your email |
| `name` | `string` | **Required**. your name |
| `password` | `string` | **Required**. your password |

ex.
```http
{
    "name": "diansa",
    "email": "diansa@gmail.com",
    "password": "123"
}
```

response success:
```http
{
    "message": "Success add User",
    "data": {
        "name": "marsalino",
        "email": "marsalino@gmail.com",
        "password": "userpassword",
        "_id": "iduser",
        "__v": 0
    },
    "success": true
}
```

### Destination

#### Add Destination
```http
  POST /destination/addDestination
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** destination title|
| `description` | `string` | **Required**. destination description |
| `img` | `string` | **Required**. image link |
| `Bearer Token`(Authentication) | `string` | **Required**. jwt token from login  |

ex.
```http
{
    "title":"Pantai",
    "description":"Pantai Indah",
    "img":"https://asset.kompas.com/crops/H7yCdCIVeOO_5NSoFljLeSsrxoY=/0x0:780x390/750x500/data/photo/2019/01/11/15632785941.jpg"
}
```
response success:
```http
{
    "message": "Success add Destination",
    "data": {
        "title": "Pantai",
        "description": "Pantai Indah",
        "img": "https://asset.kompas.com/crops/H7yCdCIVeOO_5NSoFljLeSsrxoY=/0x0:780x390/750x500/data/photo/2019/01/11/15632785941.jpg",
        "_id": "653b5470be3c3b9c9587be4c",
        "__v": 0
    },
    "success": true
}
```


#### Get All Destination Data
```http
  GET /destination/getAll?limit=&page=
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit`(query) | `string` | **Optional** limit perPage, default 10 |
| `page` (query) | `string` | **Optional**. current page, default 1 |

response success:
```http
{
    "data": [
        {
            "_id": "653b31b4440fae4c9eaf46d4",
            "title": "mm",
            "description": "null",
            "img": "https://assets-a1.kompasiana.com/items/album/2023/06/05/whatsapp-image-2023-06-05-at-16-21-28-647dac1d08a8b559e02e8013.jpeg",
            "__v": 0
        },
        {
            "_id": "653b5470be3c3b9c9587be4c",
            "title": "Gunung n",
            "description": "mm",
            "img": "https://asset.kompas.com/crops/H7yCdCIVeOO_5NSoFljLeSsrxoY=/0x0:780x390/750x500/data/photo/2019/01/11/15632785941.jpg",
            "__v": 0
        }
    ],
    "totalItems": 6,
    "currentPage": 3,
    "totalPages": 3,
    "itemsPerPage": 2,
    "success": true
}
```

#### Edit Destination
```http
  PUT /destination/updateDestination/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** destination id|
| `title` | `string` | **Optional** destination title|
| `description` | `string` | **Optional**. destination description |
| `img` | `string` | **Optional**. image link |
| `Bearer Token`(Authentication) | `string` | **Required**. jwt token from login  |

**fill in only if you want to change**
ex. 
```http
{
    "title":"sungai",
    "img":"https://assets-a1.kompasiana.com/items/album/2023/06/05/whatsapp-image-2023-06-05-at-16-21-28-647dac1d08a8b559e02e8013.jpeg"
}
```

response success:
```http
{
    "message": "Success update",
    "data": {
        "_id": "653b31b4440fae4c9eaf46d4",
        "title": "sungai",
        "description": "sungai indah",
        "img": "https://assets-a1.kompasiana.com/items/album/2023/06/05/whatsapp-image-2023-06-05-at-16-21-28-647dac1d08a8b559e02e8013.jpeg",
        "__v": 0
    },
    "success": true
}
```


#### Delete Destination
```http
  DELETE /destination/deleteDestination/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** destination id|
| `Bearer Token`(Authentication) | `string` | **Required**. jwt token from login  |

response success:
```http
{
    "message": "Success delete destination",
    "success": true
}
```

#### Get Destination Data By ID 
```http
  GET /destination/find/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** destination id|

response success:
```http
{
    "data": {
        "_id": "653b2f72c03b2d003cdb499d",
        "title": "dnu",
        "description": "null",
        "img": "https://assets-a1.kompasiana.com/items/album/2023/06/05/whatsapp-image-2023-06-05-at-16-21-28-647dac1d08a8b559e02e8013.jpeg",
        "__v": 0
    },
    "success": true
}
```


#### Get Destination By Title
(will display the title containing the letters entered by the user)

```http
  POST /destination/findByTitle
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** destination title|
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login  |

ex.
```http
{
    "title":"d"
}
```

response success:
```http
{
    "data": [
        {
            "_id": "653b2f72c03b2d003cdb499d",
            "title": "dnu",
            "description": "null",
            "img": "https://assets-a1.kompasiana.com/items/album/2023/06/05/whatsapp-image-2023-06-05-at-16-21-28-647dac1d08a8b559e02e8013.jpeg",
            "__v": 0
        },
        {
            "_id": "653b318f440fae4c9eaf46d0",
            "title": "Danau",
            "description": "null",
            "img": "https://assets-a1.kompasiana.com/items/album/2023/06/05/whatsapp-image-2023-06-05-at-16-21-28-647dac1d08a8b559e02e8013.jpeg",
            "__v": 0
        }
    ],
    "success": true,
    "currentPage": "1",
    "totalPages": 1,
    "totalItems": 2,
    "itemsPerPage": 2
}
```

## Contact

Reyhan Marsalino Diansa - [@reyhanmd._](https://instagram.com/reyhanmd._) - reyhandiansa@gmail.com - [linkedin](https://www.linkedin.com/in/reyhan-marsalino-diansa-02052a247/)

Project Link: [https://github.com/reyhandiansa/Placement-test](https://github.com/ReyhanDiansa/Placement-test/)
