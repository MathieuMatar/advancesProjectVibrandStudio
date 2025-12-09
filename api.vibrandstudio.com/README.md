**API Overview**
- NestJS GraphQL API backed by Prisma and PostgreSQL; Forest Admin agent is mounted for back-office.
- Authentication via JWT, global guards for auth/access, custom decorators `@Public()` and `@Access(level)`.
- Realtime task updates over Socket.IO gateway; REST upload endpoint for media.

**Stack**
- Runtime: Node.js, NestJS, GraphQL (code-first), Apollo driver
- Data: Prisma ORM targeting PostgreSQL
- Auth: Passport JWT strategy; global `GqlAuthGuard` + `AccessGuard`
- Realtime: Socket.IO gateway for task events
- Files: Multer disk storage, served from `/uploads`
- Mail/Templates: Nodemailer with EJS templates (contact, info, newsletter) fed by Config-driven SMTP

**Environment**
- Required env vars (examples):
	- `DATABASE_URL` (PostgreSQL connection string)
	- `JWT_SECRET`
	- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`
	- `FOREST_AUTH_SECRET`, `FOREST_ENV_SECRET`
	- Optional CORS origins are configured in `main.ts`

**Scripts (PowerShell)**
- Install deps: `npm install`
- Dev server (watch): `npm run start:dev`
- Prod build: `npm run build`
- Prod serve (after build): `npm run start:prod`
- Lint: `npm run lint`

**Prisma**
- Generate client: `npx prisma generate`
- Push schema to DB (non-migratory): `npx prisma db push`
- Create migration (when schema changes): `npx prisma migrate dev --name <change>`
- Studio (DB UI): `npx prisma studio`

**GraphQL**
- Schema is auto-generated to `src/schema.gql` (sorted) via code-first decorators.
- Playground is disabled in production config; use a GraphQL client (e.g., Insomnia, Altair) pointing to the Nest HTTP server.

**Auth & Decorators**
- `@Public()` marks resolvers/routes to bypass JWT/auth checks.
- `@Access(level: number)` enforces minimum `accessLevel` after authentication.
- Global guards order: `GqlAuthGuard` (JWT) then `AccessGuard` (access level).

**Entities & Operations (GraphQL)**
- Auth: `login(input: LoginDTO)`, `signup(input: CreateUserDTO)`, `changePassword(input: ChangePasswordDTO)` returning `AuthResponse { token, user }`.
- Users: `users`, `user(id)`, `createUser`, `updateUser`, `removeUser` (access-controlled via guards).
- Services: `services`, `service(id)`, `createService`, `updateService`, `removeService`.
- Clients: `clients`, `client(id)`, `createClient`, `updateClient`, `removeClient`.
- ClientTypes: `clientTypes`, `clientType(id)`, `createClientType`, `updateClientType`, `removeClientType`.
- Employees: `employees`, `employee(id)`, `createEmployee`, `updateEmployee`, `removeEmployee`.
- Projects: `projects` (optionally filtered by JWT-bearing request), `project(id)`, `createProject`, `updateProject`, `removeProject`, `addUserToProject`, `addServiceToProject`.
- Milestones: `milestones`, `milestone(id)`, `createMilestone`, `updateMilestone`, `removeMilestone`.
- Tasks: `tasks`, `task(id)`, `createTask`, `updateTask`, `removeTask`; updates emit Socket.IO `taskUpdated` and deletions emit `taskDeleted`.
- Mail: `joinNewsletter(email)`, `contactUs(input: ContactDTO)` (public mutations sending templated emails).
- Templates live under `src/mail/templates` and are rendered via EJS; transport uses Nodemailer configured from env (`MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`).

**Entity Fields (reference)**
- Users: `id`, `name`, `password` (write-only), `position`, `email`, `phone`, `image`, `accessLevel`, `companyId`, timestamps.
- Services: `id`, `name`, `description`, `rate` (Float), `duration` (Int, weeks), `active`, timestamps.
- Clients: `id`, `name`, `email`, `phone`, `address`, `clientTypeId`, `image`, `animation`, `active`, `public`, timestamps.
- ClientTypes: `id`, `name`, `image`, `clients[]`.
- Employees: `id`, `firstName`, `fatherName`, `lastName`, `position`, `info`, `user`, timestamps.
- Projects: `id`, `name`, `code`, `description`, `clientId`, `overview`, `files`, `image`, `images[]`, `public`, `status` (`Upcoming` | `Pending` | `InProgress` | `Completed`), relations to `milestones`, `tasks`, `services`, `users`, timestamps.
- Milestones: `id`, `projectId`, `name`, `description`, `date`, `dueDate`, `status`, timestamps.
- Tasks: `id`, `projectId`, `createdById`, `assignedToId`, `completedById`, `dueDate`, `title`, `details`, `important`, `visibility`, timestamps.

**GraphQL CRUD examples (query + variables JSON)**
```graphql
# Create user
mutation ($input: CreateUserInput!) {
	createUser(input: $input) { id name email accessLevel }
}
```
```json
{
	"input": {
		"name": "Alice",
		"password": "StrongPass123",
		"email": "alice@example.com",
		"accessLevel": 2,
		"companyId": 1,
		"position": "PM"
	}
}
```
```graphql
# Update user
mutation ($id: Int!, $input: UpdateUserInput!) {
	updateUser(id: $id, input: $input) { id name phone image }
}
```
```json
{ "id": 1, "input": { "name": "Alice Smith", "phone": "+1-555-0100" } }
```

```graphql
# Create service
mutation ($input: CreateServiceInput!) {
	createService(input: $input) { id name rate duration active }
}
```
```json
{
	"input": { "name": "Brand Strategy", "description": "Positioning sprint", "rate": 1500, "duration": 4, "active": true }
}
```
```graphql
# Update service
mutation ($id: Int!, $input: UpdateServiceInput!) {
	updateService(id: $id, input: $input) { id name rate active }
}
```
```json
{ "id": 2, "input": { "rate": 1750, "active": false } }
```

```graphql
# Create client
mutation ($input: CreateClientInput!) {
	createClient(input: $input) { id name email clientTypeId public active }
}
```
```json
{
	"input": {
		"name": "Acme Corp",
		"email": "contact@acme.test",
		"clientTypeId": 1,
		"public": true,
		"active": true,
		"image": "/uploads/client/acme.png"
	}
}
```
```graphql
# Update client
mutation ($id: Int!, $input: UpdateClientInput!) {
	updateClient(id: $id, input: $input) { id name phone address public }
}
```
```json
{ "id": 3, "input": { "phone": "+1-555-0200", "address": "1 Market St" } }
```

```graphql
# Create client type
mutation ($input: CreateClientTypeInput!) {
	createClientType(input: $input) { id name image }
}
```
```json
{ "input": { "name": "Enterprise", "image": "/uploads/clienttype/enterprise.png" } }
```

```graphql
# Create employee
mutation ($input: CreateEmployeeInput!) {
	createEmployee(input: $input) { id firstName lastName position }
}
```
```json
{ "input": { "firstName": "Nora", "lastName": "Jones", "position": "Designer", "info": "Remote" } }
```

```graphql
# Create project
mutation ($input: CreateProjectInput!) {
	createProject(input: $input) { id name status public clientId }
}
```
```json
{
	"input": {
		"name": "Website Redesign",
		"code": "WR-2024",
		"clientId": 1,
		"status": "InProgress",
		"public": false,
		"images": ["/uploads/projects/hero.png"]
	}
}
```
```graphql
# Update project
mutation ($id: Int!, $input: UpdateProjectInput!) {
	updateProject(id: $id, input: $input) { id name status overview }
}
```
```json
{ "id": 5, "input": { "overview": "Phase 2 content", "status": "Pending" } }
```

```graphql
# Create milestone
mutation ($input: CreateMilestoneInput!) {
	createMilestone(input: $input) { id projectId name status dueDate }
}
```
```json
{ "input": { "projectId": 5, "name": "UX Signoff", "status": "Upcoming", "dueDate": "2024-04-15" } }
```

```graphql
# Create task
mutation ($input: CreateTaskInput!) {
	createTask(input: $input) { id title projectId assignedToId important visibility }
}
```
```json
{
	"input": {
		"projectId": 5,
		"createdById": 1,
		"assignedToId": 2,
		"title": "Draft wireframes",
		"details": "Homepage + pricing",
		"important": true,
		"visibility": 1,
		"dueDate": "2024-03-10"
	}
}
```
```graphql
# Update task
mutation ($id: Int!, $input: UpdateTaskInput!) {
	updateTask(id: $id, input: $input) { id title details completedById }
}
```
```json
{ "id": 12, "input": { "details": "Add mobile breakpoints", "completedById": 3 } }
```

```graphql
# Delete examples (pattern)
mutation ($id: Int!) { removeUser(id: $id) }
mutation ($id: Int!) { removeService(id: $id) }
mutation ($id: Int!) { removeClient(id: $id) }
mutation ($id: Int!) { removeProject(id: $id) }
```
**Upload API (REST)**
- Endpoint: `POST /upload` (public)
- Form field: `file` (Multer handled), allowed mime: common image/video types; max size 200MB.
- Response: `{ path: "/<stored-filename>" }` (file saved under `./uploads`).

**Realtime (Socket.IO)**
- Gateway: `TaskGateway` broadcasts:
	- `taskUpdated` with updated task payload after mutations
	- `taskDeleted` with `{ id }` after deletions
- CORS is open (`origin: *`); connect to the same host/port as the API unless proxied.

**Running Locally**
- Ensure PostgreSQL is reachable and `DATABASE_URL` is set.
- `npm install`
- `npx prisma generate`
- `npm run start:dev` (creates `uploads` folder on boot if missing)

**Building & Deploying**
- Build: `npm run build`
- Run built app: `npm run start:prod`
- Apply schema changes to DB before deploy: `npx prisma migrate deploy` (in CI/prod) or `npx prisma db push` for non-migration syncs.

**Notes**
- File uploads are also served statically from `/uploads` via Express in `main.ts`.
- Forest Admin agent is initialized in `main.ts`; ensure its secrets are provided in production.
