# newsAPI

This API allows you to access news objects via HTTP requests.

## Getting started
To access the API, use the following base URL:
```
http://localhost:5252/
```


## Endpoints
### GET /news
To retrieve a list of all news objects, send a GET request to:
```http://localhost:5252/news```
This will return a JSON object with an array of all the news articles.

To retrieve a specific news object, append the news object id to the endpoint, like so:
```http://localhost:5252/news/id```
This will return the JSON object with that ID, if such exists.


### POST /news
To create a new news object, send a POST request to:
```http://localhost:5252/news```

If the request is valid, this will return the created object in the response body and **HTTP code: 201(Created)**. If the request is not valid, then error message with appropirate details will be returned in the response body and **HTTP status code:400(Bad reuqest)**

The request body should contain the following JSON object:
```json
{
    "title": "Title",
    "description": "Short description",
    "text": "Text"
}
```
The **title** and **text** fields are required. The **description** field is optional. The **title** field should be less than 150 characters and not empty and the **text** and **description** field should not be empty.


### PUT /news/id
To update a specific news object, send a PUT request to:
```http://localhost:5252/news/id```
The request body should contain the same JSON object as for the POST request.


### DELETE /news/id
To delete a specific news object, send a DELETE request to:
```http://localhost:5252/news/id```

### Query Parameters
Clients can make GET requests with query parameters to filter or sort news articles.

#### Sorting news articles:
Clients can sort news articles by title or date in ascending or descending order by sending a GET request with a sortBy query parameter. The sortBy parameter should be in this format: 
```sortBy=title~(order)``` or ```sortBy=date~(order)```, where order can be either ***asc*** or ***desc***. Multiple sortBy query parameters are allowed and the order of the sortBy query paramteres matters. 

#### Filtering news articles:
Clients can filter news articles by title or date by sending a GET request with a filterBy query parameter. The filterBy parameter should be in this format:
```filterBy=title~(value)``` or ```filterBy=date~(value)```, where value for title should be a ***string*** and the value for date should be string in the following format: ***YYYY-MM-DD***

Clients can use any combination of sortBy and filterBy query parameters.
<br>***Examples:***<br>
```http://localhost:5252/news?filterBy=title~weather```<br>
```http://localhost:5252/news?filterBy=date~2023-01-01```<br>
```http://localhost:5252/news?sortBy=title~asc```<br>
```http://localhost:5252/news?sortBy=date~asc```<br>
```http://localhost:5252/news?sortBy=title~asc&sortBy=date~desc&filterBy=title~weather```<br>
```http://localhost:5252/news?filterBy=title~weather&filterBy=date~2023-01-01```<br>
```http://localhost:5252/news?sfilterBy=title~weather```<br>
```http://localhost:5252/news?sortBy=title~asc&sortBy=date~desc&filterBy=title~weather```<br>
```http://localhost:5252/news?sortBy=title~asc&sortBy=date~desc&filterBy=title~weather```<br>

### Error Handling
The API will return appropriate HTTP status codes and error messages in case of invalid requests or server errors.

## How to install?
To run the API, clone this repository. Then, using a terminal, navigate to the directory of the project and run the following command ```docker-compose -f compose.yaml up -d```. 
This command starts all the containers and services defined in the Docker Compose file. It will create and start new containers for each service, and link them together so they can communicate. 
After running the command, you are done! You can now access the newsAPI at port ```:5252``` and the database at port ```:27014```. You can use a HTTP client (e.g. Postman) to make HTTP request to the API.

