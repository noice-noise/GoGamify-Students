# Dev Notes on Routing

NOTE: Most of the routes below can be accessed only if you're logged in as a student (or admin depending on the nature of route).

> {site-url}: https://gogamify-education.herokuapp.com/

How to test a fetch URL?

- Just copy paste in the address bar, example:
  - https://gogamify-education.herokuapp.com/resource/data/all

### JOURNEY

Assigned: Jaq

| METHOD | FETCH URL                        | DESCRIPTION                           | RETURN   |
| ------ | -------------------------------- | ------------------------------------- | -------- |
| GET    | {site-url}/resource/data/all     | GET all resources available in public | JSON     |
| GET    | {site-url}/resource/data/all/:id | GET one public resource using an ID   | JSON     |
| GET    | {site-url}/resource/all          | WEBPAGE with all public resources     | Redirect |

| METHOD | FETCH URL                          | DESCRIPTION                                                | RETURN |
| ------ | ---------------------------------- | ---------------------------------------------------------- | ------ |
| GET    | {site-url}/student/p/resources     | GET all ongoing resources of a student                     | Array  |
| POST   | {site-url}/student/p/resources     | GET add an ongoing resource of a student                   |        |
| DELETE | {site-url}/student/p/resources/:id | DELETE an ongoing resource of a student (because its done) |        |
|        |                                    |                                                            |        |

### COMMUNITY

Assigned: J-rodd

| METHOD | FETCH URL                           | DESCRIPTION                                     | RETURN |
| ------ | ----------------------------------- | ----------------------------------------------- | ------ |
| GET    | {site-url}/student/community/school | GET all school data with teachers & schoolmates | JSON   |

### COLLECTION

Assigned: Hans

| METHOD | FETCH URL                  | DESCRIPTION                  | RETURN |
| ------ | -------------------------- | ---------------------------- | ------ |
| GET    | {site-url}/student/profile | GET all student profile data | JSON   |
