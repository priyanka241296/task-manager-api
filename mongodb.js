// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");
const id = new ObjectID();
console.log(id);

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    // const db = client.db(databaseName);

    // const updatePromises = db.collection("users").updateOne(
    //   {
    //     _id: new ObjectID("601266a24a9360145c91baa1"),
    //   },
    //   {
    //     $set: {
    //       name: "Andrew Sir",
    //     },
    //   }
    // );
    // updatePromises
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch(error);
    // {
    //   console.log(error);
    // }
    const db = client.db(databaseName);

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("601266a24a9360145c91baa1"),
    //     },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error)=>
    //{
    //   console.log(error);
    // }
    //

    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: false,
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection("users")
      .deleteMany({
        age: 27,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("tasks")
      .deleteOne({
        description: "Clean the house",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
