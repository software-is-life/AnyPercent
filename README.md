# AnyPercent

AnyPercent is a web application that is mix of a map / geolocation & the collect-a-thons you have in games such as Donkey Kong 64 and other similar platformer games
built with Typescript, React, and Node.js.

### Design Doc
I have also included a Google Doc [here](https://docs.google.com/document/d/e/2PACX-1vTDgnJTyBvHYzMpGlhr-M9T-xRlTf24Xdt4l5IuIBid_VNH5BetokkzNuML966b3bzmiwA1nProgzrt/pub)

### Related Blog Post Series
This project was built in the open & blogged about each day
starting June 24th, 2023 until July 24th, 2023 (over a 30 day period).

Here is the blog post [series](https://software-is-life.ghost.io/blogging-again/).

### Technologies Used
- Google S2 with Radar's Node.js wrapper
- Typescript
- React
- Node.js
- Postgresql with TypeORM
- Mapbox and react-web-gl
- Next.js for SSR

### Questions
- Is there a way to create an api and port open street maps to a postgres db with postgis extension?

### Setup

Run docker compose to get postgres database locally up and running
```text
docker-compose up -d
```

Start AnyPercent program
```text
npm run start
```

Call different endpoints with cURL or Postman. Locally, npm run start will be running on port :8080
```text
curl -X GET localhost:8080/api/v1/users/get/9
curl -X POST -d '{"firstName": "John", "lastName": "Doe", "age": 25 }' -H "Content-Type: application/json" localhost:8080/api/v1/users/create
curl -X PUT -d '{"age": 36 }' -H "Content-Type: application/json" localhost:8080/api/v1/users/update/1
curl -X DELETE localhost:8080/api/v1/users/delete/2 
```

#TODO
- [ ] Write batch processing logic for clearing up null rows from tables due to no foreign key constraints.
- [ ] Double check API local routes and see if there are any issues with api implementation.
- [ ] Fill out redis auth flow
- [ ] Fill out readme documentation for local running with redis and planet scale
- [ ] create prod infra resources for backend api, elasticache redis, api gateway, loadbalancer, etc.
- 