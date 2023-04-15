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

```

#### POST/users/login

```

```

### Image API's

#### POST/images/upload

```

```

#### GET/images/history

```

```

#### POST/images/renameCollection

```

```