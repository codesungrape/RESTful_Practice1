# **Brief**

Welcome to the **Build a REST API Hackathon**! Over the past week, you've been learning how to build APIs, handle incoming requests, and serve responses. Now, it's time to apply what you've learned. Your challenge is to design, develop, and demonstrate a fully functional API around a theme of your choice.

## **Objective**

- **Build a REST API** around a resource of your choice.
- This means you'll need to think of the most interesting application and find data to support it.

**Remember**: The goal is to solve the problem before you start coding in JavaScript. Think of the actual code as simply translating your well-thought-out plan into syntax the computer understands. Working this way will make the development process more organized. Good software development is as much about planning and understanding as it is about writing code – with a good enough plan, code can be automated.

## **Technical Requirements**

- **Programming Language**: JavaScript
- **Environment**: Node.js
- **UI**: None (Postman/API responses)
- **Data Source**: Create a **JSON** file with your data. Your data can be anything, from anywhere – but it should be stored in JSON so it's easy to interact with based on your learning in this module. Here are 3 examples of sites where you can find cool data:
  - Kaggle
  - Google Datasets
  - Awesome Datasets
- **Response Specification**: All JSON responses from your API should adhere to the **JSend specification**. This specification provides a consistent response structure, making your API more predictable and easier to interact with.

## **API Endpoints**

The API will feature the following endpoints:

| **HTTP Method** | **Path** | **Request Body (JSON)**                      | **Response Body (JSON)**     | **Status Code** | **Result**                           |
| --------------- | -------- | -------------------------------------------- | ---------------------------- | --------------- | ------------------------------------ |
| GET             | /        |                                              | An array of all data objects | 200             | Gets all data                        |
| GET             | /:name   |                                              | A matching data object       | 200             | Gets data with a matching date       |
| GET             | /filter  |                                              | All matching data objects    | 200             | Gets data which catches filter query |
| POST            | /        |                                              | A newly created data object  | 201             | Creates new data                     |
| PATCH           | /        | `The population in ${date} was ${popByDate}` | An edited data object        | 200             | Updates data                         |
| DELETE          | /        |                                              | A deleted data object        | 200             | Deletes data                         |

## **Milestones**

- **Planning out your API routes and resources**: Create and complete your own requirements table first, similar to the one above.
- **Setting up a basic Express server** with a test route.
- **Implementing CRUD operations**.
- **Polishing and stretching your application**.

## **Stretch Goals**

The stretch goals below are optional, so feel free to come up with your own too.

### **Advanced Routing with Query Parameters:**

- **Search**: Add a search feature on the `/resource` endpoint. For instance, `/resource?name=ResourceName` could return resources with names matching the query.
- **Sorting**: Allow sorting of resources. For example, `/resource?sort=name` could return resources sorted alphabetically by name.

### **Error Handling and Responses**

- If a resource with a specific ID isn't found, return a **404 Not Found** status code and a clear error message.
- For other errors, such as server errors or bad request data, return appropriate status codes like **500 Internal Server Error** or **400 Bad Request**, along with clarifying error messages.

# **RESTful_Practice1**
