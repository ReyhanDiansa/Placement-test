
# Placemnt Test 

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


#### Register
```http
  POST /user/register
```
| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. your email |
| `name` | `string` | **Required**. your name |
| `password` | `string` | **Required**. your password |
| `Bearer Token`(Authentication) | `string` | **Required**. jwt token from login  |


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

#### Get All Destination Data
```http
  GET /destination/getAll?limit=&page=
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit`(query) | `string` | **Optional** limit perPage, default 10 |
| `page` (query) | `string` | **Optional**. current page, default 1 |


#### Edit Destination
```http
  PUT /destination/updateDestination/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Optional** destination title|
| `description` | `string` | **Optional**. destination description |
| `img` | `string` | **Optional**. image link |
| `Bearer Token`(Authentication) | `string` | **Required**. jwt token from login  |

**fill in only if you want to change**


#### Delete Destination
```http
  DELETE /destination/deleteDestination/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** destination id|
| `Bearer Token`(Authentication) | `string` | **Required**. jwt token from login  |


#### Get Destination Data By ID 
```http
  GET /destination/find/${id}
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` (params) | `string` | **Required** destination id|


#### Get Destination By Title
```http
  POST /destination/findByTitle
```

| Request | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `string` | **Required** movie title|
| `Bearer Token`(Authorization) | `string` | **Required**. jwt token from login  |


## Contact

Reyhan Marsalino Diansa - [@reyhanmd._](https://instagram.com/reyhanmd._) - reyhandiansa@gmail.com - [linkedin](https://www.linkedin.com/in/reyhan-marsalino-diansa-02052a247/)

Project Link: [https://github.com/reyhandiansa/Placement-test](https://github.com/ReyhanDiansa/Placement-test/)
