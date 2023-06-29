const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'employee_db',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');

  // Call the function to start the application prompts
  startPrompt();
});

// Function to start the initial prompt
function startPrompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      // Based on the user's choice, call the corresponding function
      switch (answers.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          connection.end();
          console.log('Connection closed.');
          break;
        default:
          console.log('Invalid choice.');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Implement the rest of the functions for each action, such as viewDepartments(), viewRoles(), addDepartment(), etc.

// Function to view all departments
function viewDepartments() {
  // TODO: Implement SQL query to fetch all departments from the database
  // Execute the query and display the results
}

// Function to view all roles
function viewRoles() {
  // TODO: Implement SQL query to fetch all roles from the database
  // Execute the query and display the results
}

// Function to view all employees
function viewEmployees() {
  // TODO: Implement SQL query to fetch all employees from the database
  // Execute the query and display the results
}

// Function to add a department
function addDepartment() {
  // TODO: Implement inquirer prompt to get the department details from the user
  // Retrieve the user input and execute the SQL query to add the department to the database
}

// Function to add a role
function addRole() {
  // TODO: Implement inquirer prompt to get the role details from the user
  // Retrieve the user input and execute the SQL query to add the role to the database
}

// Function to add an employee
function addEmployee() {
  // TODO: Implement inquirer prompt to get the employee details from the user
  // Retrieve the user input and execute the SQL query to add the employee to the database
}

// Function to update an employee's role
function updateEmployeeRole() {
  // TODO: Implement inquirer prompt to get the employee and new role details from the user
  // Retrieve the user input and execute the SQL query to update the employee's role in the database
}
