# lru-Frontend

This is a React Applicatiom that consumes the LRU Cache API. The LRU Cache is implemented in Go using the Fiber framework. The LRU Cache is a data structure that can store a fixed number of items and evicts the least recently used item when the cache is full. The LRU Cache has the following operations:

- `get(key)`: Get the value of the key if the key exists in the cache, otherwise return -1.
- `set(key, value)`: Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least recently used item before inserting a new item.

### Deploy

[Link](https://main--lru-cache.netlify.app/)

## Built With

- React
- JavaScript
- Tailwind CSS

## Getting Started

To get a local copy up and running follow these simple example steps.

## Prerequisites

- Have VSCode or other text editor installed. [Link to download VSCode](https://code.visualstudio.com/download)
- Have git installed.[Link to download git](https://git-scm.com/downloads)
- Have node installed. [Link to download node](https://nodejs.org/en/download/)

## Setup

- Use the following commands to clone this repository
- `cd` to the directory where you want to clone the project to.
- `git clone https://github.com/Shubh-Dev/lru-front.git`
- `cd lru-front`

## Run tests

- Run `npm jest` to run the tests

## Run the project

- Run `npm install` to install the dependencies
- Run `npm run dev` to start the server

## Authors

👤 **Shubh M**

- GitHub: [@Shubh-Dev](https://github.com/Shubh-Dev)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/shubhscb/)

## Show your support

Give a ⭐️ if you liked this project!

## Acknowledgments

## 📝 License
