# API Reference — GraphQL

This document summarizes the GraphQL schema for this project (generated at `src/schema.gql`) and provides the entities (types/inputs/enums) and all Query/Mutation endpoints with examples.

## How to reach the API

- GraphQL endpoint: `/graphql` (default for NestJS GraphQL setups in this project).
- When running locally: start the server with `npm run start:dev` and open http://localhost:3000/graphql (replace port if configured differently).
- Use the returned `token` from `login`/`signup` in the `Authorization` header as `Bearer <token>` for protected operations.

---

## Entities (types)

Below are the major GraphQL object types (fields shown in short form). For exact types and required fields refer to `src/schema.gql`.

- AuthResponse
  - token: String!
  - user: User!

- Client
  - id: Int!
  - name: String!
  - email: String
  - phone: String
  - address: String
  - image: String
  - clientTypeId: Int
  - createdAt: String!
  - updatedAt: String!
  - clientType: ClientType

- ClientType
  - id: Int!
  - name: String!
  - image: String
  - clients: [Client]

- Employee
  - id: Int!
  - firstName: String!
  - lastName: String!
  - fatherName: String
  - position: String
  - info: String
  - createdAt: String!
  - updatedAt: String!
  - user: User!

- Milestone
  - id: Int!
  - name: String!
  - projectId: Int!
  - status: Status!
  - date: DateTime
  - dueDate: DateTime
  - description: String
  - createdAt: String!
  - updatedAt: String!
  - project: Project!

- Project
  - id: Int!
  - name: String!
  - description: String
  - overview: String
  - image: String
  - files: String
  - clientId: Int
  - code: String
  - public: Boolean!
  - status: Status!
  - createdAt: String!
  - updatedAt: String!
  - milestones: [Milestone]
  - services: [Service]
  - tasks: [Task]
  - users: [User]
  - client: Client

- Service
  - id: Int!
  - name: String!
  - description: String
  - duration: Int!
  - rate: Float!
  - active: Boolean!
  - createdAt: String!
  - updatedAt: String!

- Task
  - id: Int!
  - title: String!
  - details: String
  - dueDate: DateTime
  - important: Boolean
  - projectId: Int
  - assignedToId: Int
  - completedById: Int
  - createdById: Int
  - visibility: Int
  - createdAt: String!
  - updatedAt: String!
  - assignedTo: User
  - completedBy: User
  - createdBy: User
  - project: Project

- User
  - id: Int!
  - name: String!
  - email: String
  - phone: String
  - image: String
  - position: String
  - accessLevel: Int!
  - companyId: Int
  - createdAt: String!
  - updatedAt: String!
  - company: Client
  - employee: Employee

---

## Inputs

- CreateMilestoneInput
- UpdateMilestoneInput
- CreateProjectInput
- UpdateProjectInput
- CreateTaskInput
- UpdateTaskInput
- CreateUserInput
- LoginInput

(See `src/schema.gql` for exact fields and which are required.)

---

## Enums

- Status
  - Completed
  - InProgress
  - Pending
  - Upcoming

---

## Queries (list)

The schema exposes these top-level queries:

- client(id: Int!): Client!
- clientType(id: Int!): ClientType!
- clientTypes: [ClientType!]!
- clients: [Client!]!
- employee(id: Int!): Employee!
- employees: [Employee!]!
- milestone(id: Int!): Milestone!
- milestones: [Milestone!]!
- project(id: Int!): Project!
- projects: [Project!]!
- service(id: Int!): Service!
- services: [Service!]!
- task(id: Int!): Task!
- tasks: [Task!]!
- user(id: Int!): User!
- users: [User!]!

### Example: get a project (with relations)

```graphql
query GetProject($id: Int!) {
  project(id: $id) {
    id
    name
    description
    status
    client { id name }
    milestones { id name status dueDate }
    services { id name rate }
    tasks { id title important }
  }
}

# Variables
{
  "id": 1
}
```

---

## Mutations (list)

Top-level mutations exposed:

- addServiceToProject(projectId: Int!, serviceId: Int!): Project!
- addUserToProject(projectId: Int!, userId: Int!): Project!
- create(input: CreateTaskInput!): Task!            # create a Task
- createMilestone(input: CreateMilestoneInput!): Milestone!
- createProject(input: CreateProjectInput!): Project!
- login(input: LoginInput!): AuthResponse!
- remove(id: Int!): Boolean!                         # generic remove (used for tasks)
- removeMilestone(id: Int!): Boolean!
- signup(input: CreateUserInput!): AuthResponse!
- update(id: Int!, input: UpdateTaskInput!): Task!    # update a Task
- updateMilestone(id: Int!, input: UpdateMilestoneInput!): Milestone!
- updateProject(id: Int!, input: UpdateProjectInput!): Project!

### Example: login

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user { id name email }
  }
}

# Variables
{
  "input": { "email": "alice@example.com", "password": "secret" }
}
```

### Example: create a project

```graphql
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    status
    createdAt
  }
}

# Variables
{
  "input": { "name": "New Website", "description": "Website revamp", "public": false }
}
```

### Example: create a task

```graphql
mutation CreateTask($input: CreateTaskInput!) {
  create(input: $input) {
    id
    title
    projectId
  }
}

# Variables
{
  "input": { "title": "First draft", "projectId": 1, "createdById": 2 }
}
```

---

## Notes & tips

- `src/schema.gql` is auto-generated and is the canonical source for the GraphQL surface. Use it for exact field names and types.
- Authentication: use the `token` returned from `login`/`signup` in `Authorization: Bearer <token>` header. The project uses JWT and a GraphQL guard (`src/auth/gql-auth.guard.ts`).
- Use GraphQL Playground at the running server's `/graphql` path to explore and test queries/mutations interactively.

---

_Last updated: generated from `src/schema.gql`_

## Detailed per-entity endpoints

Below are the exact resolver method names (as implemented in the code) for each entity. Use these names when constructing queries/mutations in GraphQL Playground.

- Users (`src/users/users.resolver.ts`)
  - Queries
    - users(): [User]
    - user(id: Int!): User
  - Mutations
    - create(input: CreateUserInput!): User
    - update(id: Int!, input: UpdateUserInput!): User
    - remove(id: Int!): Boolean

- Clients (`src/clients/clients.resolver.ts`)
  - Queries
    - clients(): [Client]
    - client(id: Int!): Client
  - Mutations
    - create(input: CreateClientInput!): Client
    - update(id: Int!, input: UpdateClientInput!): Client
    - remove(id: Int!): Boolean

- ClientTypes (`src/clients/clienttypes.resolver.ts`)
  - Queries
    - clientTypes(): [ClientType]
    - clientType(id: Int!): ClientType
  - Mutations
    - create(input: CreateClientTypeInput!): ClientType
    - update(id: Int!, input: UpdateClientTypeInput!): ClientType
    - remove(id: Int!): Boolean

- Employees (`src/employees/employees.resolver.ts`)
  - Queries
    - employees(): [Employee]
    - employee(id: Int!): Employee
  - Mutations
    - create(input: CreateEmployeeInput!): Employee
    - update(id: Int!, input: UpdateEmployeeInput!): Employee
    - remove(id: Int!): Boolean

- Milestones (`src/milestones/milestones.resolver.ts`)
  - Queries
    - milestones(): [Milestone]
    - milestone(id: Int!): Milestone
  - Mutations
    - createMilestone(input: CreateMilestoneInput!): Milestone
    - updateMilestone(id: Int!, input: UpdateMilestoneInput!): Milestone
    - removeMilestone(id: Int!): Boolean

- Projects (`src/projects/projects.resolver.ts`)
  - Queries
    - projects(): [Project]
    - project(id: Int!): Project
  - Mutations
    - createProject(input: CreateProjectInput!): Project
    - updateProject(id: Int!, input: UpdateProjectInput!): Project
    - addUserToProject(projectId: Int!, userId: Int!): Project
    - addServiceToProject(projectId: Int!, serviceId: Int!): Project
    - remove(id: Int!): Boolean

- Services (`src/services/services.resolver.ts`)
  - Queries
    - services(): [Service]
    - service(id: Int!): Service
  - Mutations
    - create(input: CreateServiceInput!): Service
    - update(id: Int!, input: UpdateServiceInput!): Service
    - remove(id: Int!): Boolean

- Tasks (`src/tasks/tasks.resolver.ts`)
  - Queries
    - tasks(): [Task]
    - task(id: Int!): Task
  - Mutations
    - create(input: CreateTaskInput!): Task
    - update(id: Int!, input: UpdateTaskInput!): Task
    - remove(id: Int!): Boolean

- Auth (`src/auth/auth.resolver.ts`)
  - Mutations
    - login(input: LoginInput!): AuthResponse
    - signup(input: CreateUserInput!): AuthResponse

---

## Examples: CRUD operations (GraphQL + JSON)

Below are concrete examples (GraphQL operations, variables in JSON, and sample responses) for Create / Read (single + list) / Update / Delete for each entity. Use these as templates in GraphQL Playground or your client.

Notes:
- Replace `http://localhost:3000/graphql` with your server URL/port.
- Include `Authorization: Bearer <token>` header where required (protected mutations/queries).

### Users

Create

```graphql
mutation CreateUser($input: CreateUserInput!) {
  create(input: $input) {
    id
    name
    email
  }
}
```

Variables

```json
{
  "input": { "name": "Alice Example", "email": "alice@example.com", "password": "changeme", "accessLevel": 1 }
}
```

Sample response

```json
{
  "data": {
    "create": { "id": 12, "name": "Alice Example", "email": "alice@example.com" }
  }
}
```

Read (list)

```graphql
query { users { id name email accessLevel } }
```

Read (single)

```graphql
query GetUser($id: Int!) { user(id: $id) { id name email accessLevel } }
```

Variables

```json
{ "id": 12 }
```

Update

```graphql
mutation UpdateUser($id: Int!, $input: UpdateUserInput!) { update(id: $id, input: $input) { id name email } }
```

Variables

```json
{ "id": 12, "input": { "name": "Alice Updated", "position": "Manager" } }
```

Delete

```graphql
mutation { remove(id: 12) }
```

Sample response

```json
{ "data": { "remove": true } }
```

---

### Clients

Create

```graphql
mutation CreateClient($input: CreateClientInput!) { create(input: $input) { id name clientTypeId email } }
```

Variables

```json
{ "input": { "name": "Acme Co", "email": "contact@acme.example", "phone": "555-0100" } }
```

Read (list)

```graphql
query { clients { id name email phone clientType { id name } } }
```

Read (single)

```graphql
query GetClient($id: Int!) { client(id: $id) { id name email phone address image clientType { id name } } }
```

Variables

```json
{ "id": 3 }
```

Update

```graphql
mutation UpdateClient($id: Int!, $input: UpdateClientInput!) { update(id: $id, input: $input) { id name email } }
```

Variables

```json
{ "id": 3, "input": { "name": "Acme Corporation", "phone": "555-0111" } }
```

Delete

```graphql
mutation { remove(id: 3) }
```

---

### ClientTypes

Create

```graphql
mutation CreateClientType($input: CreateClientTypeInput!) { create(input: $input) { id name image } }
```

Variables

```json
{ "input": { "name": "Agency", "image": "agency.png" } }
```

Read (list)

```graphql
query { clientTypes { id name image clients { id name } } }
```

Read (single)

```graphql
query GetClientType($id: Int!) { clientType(id: $id) { id name image clients { id name } } }
```

Update

```graphql
mutation UpdateClientType($id: Int!, $input: UpdateClientTypeInput!) { update(id: $id, input: $input) { id name } }
```

Variables

```json
{ "id": 2, "input": { "name": "Design Agency" } }
```

Delete

```graphql
mutation { remove(id: 2) }
```

---

### Employees

Create

```graphql
mutation CreateEmployee($input: CreateEmployeeInput!) { create(input: $input) { id firstName lastName position } }
```

Variables

```json
{ "input": { "firstName": "John", "lastName": "Doe", "position": "Developer", "userId": null } }
```

Read (list)

```graphql
query { employees { id firstName lastName position user { id name } } }
```

Read (single)

```graphql
query GetEmployee($id: Int!) { employee(id: $id) { id firstName lastName position info } }
```

Update

```graphql
mutation UpdateEmployee($id: Int!, $input: UpdateEmployeeInput!) { update(id: $id, input: $input) { id firstName lastName position } }
```

Variables

```json
{ "id": 5, "input": { "position": "Senior Developer" } }
```

Delete

```graphql
mutation { remove(id: 5) }
```

---

### Milestones

Create

```graphql
mutation CreateMilestone($input: CreateMilestoneInput!) { createMilestone(input: $input) { id name projectId status dueDate } }
```

Variables

```json
{ "input": { "name": "Design Complete", "projectId": 1, "dueDate": "2025-12-01T00:00:00Z", "status": "Upcoming" } }
```

Read (list)

```graphql
query { milestones { id name projectId status dueDate } }
```

Read (single)

```graphql
query GetMilestone($id: Int!) { milestone(id: $id) { id name description status dueDate project { id name } } }
```

Update

```graphql
mutation UpdateMilestone($id: Int!, $input: UpdateMilestoneInput!) { updateMilestone(id: $id, input: $input) { id name status } }
```

Variables

```json
{ "id": 7, "input": { "name": "Design Review", "status": "InProgress" } }
```

Delete

```graphql
mutation { removeMilestone(id: 7) }
```

---

### Projects

Create

```graphql
mutation CreateProject($input: CreateProjectInput!) { createProject(input: $input) { id name status client { id name } } }
```

Variables

```json
{ "input": { "name": "New Website", "description": "Website revamp", "public": false, "status": "Pending" } }
```

Read (list)

```graphql
query { projects { id name status client { id name } } }
```

Read (single)

```graphql
query GetProject($id: Int!) { project(id: $id) { id name description status milestones { id name } services { id name } tasks { id title } } }
```

Update

```graphql
mutation UpdateProject($id: Int!, $input: UpdateProjectInput!) { updateProject(id: $id, input: $input) { id name status } }
```

Variables

```json
{ "id": 1, "input": { "name": "Website Revamp", "status": "InProgress" } }
```

Add user/service to project

```graphql
mutation AddUserToProject($projectId: Int!, $userId: Int!) { addUserToProject(projectId: $projectId, userId: $userId) { id users { id name } } }
```

Variables

```json
{ "projectId": 1, "userId": 12 }
```

Delete

```graphql
mutation { remove(id: 1) }
```

---

### Services

Create

```graphql
mutation CreateService($input: CreateServiceInput!) { create(input: $input) { id name rate active } }
```

Variables

```json
{ "input": { "name": "Design Package", "description": "UI/UX design", "duration": 10, "rate": 120.0, "active": true } }
```

Read (list)

```graphql
query { services { id name description rate active } }
```

Read (single)

```graphql
query GetService($id: Int!) { service(id: $id) { id name rate description active } }
```

Update

```graphql
mutation UpdateService($id: Int!, $input: UpdateServiceInput!) { update(id: $id, input: $input) { id name rate } }
```

Variables

```json
{ "id": 4, "input": { "rate": 150.0, "active": false } }
```

Delete

```graphql
mutation { remove(id: 4) }
```

---

### Tasks

Create

```graphql
mutation CreateTask($input: CreateTaskInput!) { create(input: $input) { id title projectId important } }
```

Variables

```json
{ "input": { "title": "Write draft", "projectId": 1, "createdById": 12, "important": true } }
```

Read (list)

```graphql
query { tasks { id title projectId important } }
```

Read (single)

```graphql
query GetTask($id: Int!) { task(id: $id) { id title details dueDate important assignedTo { id name } } }
```

Update

```graphql
mutation UpdateTask($id: Int!, $input: UpdateTaskInput!) { update(id: $id, input: $input) { id title important } }
```

Variables

```json
{ "id": 10, "input": { "title": "Write first draft", "important": false } }
```

Delete

```graphql
mutation { remove(id: 10) }
```

---

### Auth (login/signup)

Login

```graphql
mutation Login($input: LoginInput!) { login(input: $input) { token user { id name email } } }
```

Variables

```json
{ "input": { "email": "alice@example.com", "password": "changeme" } }
```

Signup

```graphql
mutation Signup($input: CreateUserInput!) { signup(input: $input) { token user { id name email } } }
```

Variables

```json
{ "input": { "name": "New User", "email": "new@example.com", "password": "pwd1234", "accessLevel": 1 } }
```

---
