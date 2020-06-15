# Pro Coach Backend

## Tecnologies

* Javascript
* NodeJS
* Express
* MongoDB
* Mongoose


## Documentation

### Models

#### User
    ```
        name: String,
        email: String,
        password_hash: String,
        thumb_url: String,
        pro: Boolean,
        services: ObjectId(ProService)[]
    ```

#### ProService
    ```
        image: String,
        name: String,
        created_at: Date,
        description?: String,
        user: ObjectId,
        price: Number,
        rating?: String,
        active: Boolean,
        comments?: String[],
        game: ObjectId(Game)
    ```

#### Game
    ```
        name: String,
        picture_url: String
    ```

#### Order

    ```
        user: ObjectId(User),
        proService: ObjectId,
        price: Number,
        payment_method: String,
        payment_status: String,
        status: String,
        created_at: Date,
    ```


