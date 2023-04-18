# converter-img-to-pdf

## Tables

### User Table

```
    user_id int not null auto_increment primary key,
    name varchar(30),
    email varchar(30),
    mobile varchar(10),
    password varchar(60)
```

### Image Collection Table

```
    image_id int not null auto_increment primary key,
    name varchar(200),
    user_id int,
    foreign key(user_id) references user(user_id)
```

### Image Url Table

```
    image_url_id int not null auto_increment primary key,
    name varchar(200),
    image_id int,
    image_url varchar(200),
    foreign key(image_id) references image(image_id)
```

## API's

### User API's

#### POST/users/register

```
* Take the credentials of user from image requiest body.
* Check the validation of credentials.
* If all the data are valid check that the email and mobile are already resistered or not.
* If any of email and mobile already resistered send response with status code 400 with apropreate error message.
* If all the data are correct and not duplicate credential create new profile and send response with status code 200.
```

#### POST/users/login

```
* Take email and password from request body.
* If any of the data is not available then send response with status code 400 and apropreate error message.
* If both data are available check that email is registered or not.
* If email is not registered send response with status code 400 with apropreate error message.
* If any user found with that email then validate the user with password provided in request body.
* If user is not valid send response with status code 400 and apropreate error message.
* If all the data are valid genrate token and send token in response with apropreate status code and message.
```

### Image API's

#### POST/images/upload

```
* This API is protected so check the token is available in headers.
* Take images from request files.
* Upload data aws.
* Upload links in mysql database.'
* return response with apropreate status code and message.
```

#### GET/images/history

```
* This API is protected so check the token is available in headers.
* Find all the images with user id which is available in token.
* Send all the images in response.
```

#### POST/images/renameCollection

```
* This API is protected so check the token is available in headers.
* Take name and collection name from request body.
* Update cllection name in database.
* Send response with apropreate status code and message.
```