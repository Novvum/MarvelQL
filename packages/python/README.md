
<p align="center">
  <img width="460" height="300" src="https://github.com/Novvum/MarvelQL/blob/python-example/packages/assets/pythonMarvel.png">
</p>

<h1 align="center">
  Query the Marvel API using Python.</br> 
</h1>


### Description

This is an example of python interacting with the Marvel API using graphene and flask. It serves as an example
on how to use graphql with python.

## Built With

- [Graphene 2.1](https://graphene-python.org/)
- [Python 3.7](https://www.python.org/)
- [Flask](http://flask.pocoo.org/)
- [flask-graphql](https://github.com/graphql-python/flask-graphql)
- [Marvelous](https://pythonhosted.org/marvelous/)

### Installation

You need install Flask, Graphene, flask-graphene, and marvelous using pip

`pip install graphene Flask Flask-GraphQL marvelous`

### Usage

In order to run the project, you need to type `python3 server.py` in your terminal
This will start your flask server and return the link http://127.0.0.1:5000/

Click on the link and change it to http://127.0.0.1:5000/graphql so you can start
querying the marvel API.

### Files

There are 4 files that interact with each other.

1. `getData.py` - Retrieves the data from the Marvel API using marvelous
2. `marvelTypes.py` - Has all the types being used for queries
3. `schema.py` - Has the root query that creates the queries and resolvers
4. `server.py` - Has the flask code needed to run the graphql interface to type queries


### Contributing

This is an open source project. To learn how to contribute, please check out our [contributing guide](./CONTRIBUTING.md#contributing-guide).

### License

MIT © [Novvum](https://github.com/novvum)

---

<p align="center">Made with ❤️ by <a href="https://www.novvum.io">Novvum</a></p>
