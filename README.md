
# Web.Api.ToDoTasks

the project managet tasks list of the users


## API Reference

#### Get all items

```http
  GET ToDoTasks/GetUserTasksList
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `UserName` | `string` | **Required**. Your user name|

#### Get item

```http
  POST /ToDoTasks/CreateTask
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `data`      | `Task` | **Required**. date of task

```http
  PUT /ToDoTasks/UpdateTask
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `data`      | `Task` | **Required**. date of task

```http
  DELETE /ToDoTasks/DeleteTask
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `taskID`      | `string` | **Required**. id of task
| `UserName`      | `string` | **Required**. user of task
## Features

- option to apear task list for user
- option to create new task before user
- option to update exist task
- option of delete task


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server


```bash
  npm run start
```

