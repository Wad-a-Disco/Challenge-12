const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your_mysql_password',
  database: 'employee_tracker',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the employee_tracker database.\n');
  startPrompt();
});

// Function to start the application prompt
function startPrompt() {
  inquirer
    .prompt({
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
        'View the total utilized budget of a department',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
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
        case 'View the total utilized budget of a department':
          viewDepartmentBudget();
          break;
        case 'Delete a department':
          deleteDepartment();
          break;
        case 'Delete a role':
          deleteRole();
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'Exit':
          console.log('Exiting the application.');
          connection.end();
          break;
        default:
          console.log('Invalid action. Please try again.');
          startPrompt();
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to view all departments
function viewDepartments() {
  const query = 'SELECT * FROM department';

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.log('\nDepartments:\n');
    console.table(res);

    startPrompt();
  });
}

// Function to view all roles
function viewRoles() {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `;

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.log('\nRoles:\n');
    console.table(res);

    startPrompt();
  });
}

// Function to view all employees
function viewEmployees() {
  const query = `
    SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title AS job_title, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `;

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.log('\nEmployees:\n');
    console.table(res);

    startPrompt();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      const query = 'INSERT INTO department SET ?';

      connection.query(query, { name: answer.departmentName }, (err, res) => {
        if (err) throw err;

        console.log(`\nDepartment "${answer.departmentName}" added successfully!\n`);

        startPrompt();
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary of the role:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO role SET ?';

      connection.query(
        query,
        {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.departmentId,
        },
        (err, res) => {
          if (err) throw err;

          console.log(`\nRole "${answer.roleTitle}" added successfully!\n`);

          startPrompt();
        }
      );
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'roleId',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'input',
        name: 'managerId',
        message: "Enter the employee's manager ID (if applicable):",
      },
    ])
    .then((answer) => {
      const query = 'INSERT INTO employee SET ?';

      connection.query(
        query,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId || null,
        },
        (err, res) => {
          if (err) throw err;

          console.log(`\nEmployee "${answer.firstName} ${answer.lastName}" added successfully!\n`);

          startPrompt();
        }
      );
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: "Enter the employee's ID:",
      },
      {
        type: 'input',
        name: 'newRoleId',
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answer) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';

      connection.query(query, [answer.newRoleId, answer.employeeId], (err, res) => {
        if (err) throw err;

        console.log(`\nEmployee role updated successfully!\n`);

        startPrompt();
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to view the total utilized budget of a department
function viewDepartmentBudget() {
  const query = `
    SELECT 
      department.id,
      department.name AS department,
      SUM(role.salary) AS utilized_budget
    FROM department
    LEFT JOIN role ON department.id = role.department_id
    LEFT JOIN employee ON role.id = employee.role_id
    GROUP BY department.id, department.name
  `;

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.log('\nDepartment Budgets:\n');
    console.table(res);

    startPrompt();
  });
}

// Function to delete a department
function deleteDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentId',
      message: 'Enter the ID of the department you want to delete:',
    })
    .then((answer) => {
      const query = 'DELETE FROM department WHERE id = ?';

      connection.query(query, answer.departmentId, (err, res) => {
        if (err) throw err;

        console.log(`\nDepartment with ID "${answer.departmentId}" deleted successfully!\n`);

        startPrompt();
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to delete a role
function deleteRole() {
  inquirer
    .prompt({
      type: 'input',
      name: 'roleId',
      message: 'Enter the ID of the role you want to delete:',
    })
    .then((answer) => {
      const query = 'DELETE FROM role WHERE id = ?';

      connection.query(query, answer.roleId, (err, res) => {
        if (err) throw err;

        console.log(`\nRole with ID "${answer.roleId}" deleted successfully!\n`);

        startPrompt();
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Function to delete an employee
function deleteEmployee() {
  inquirer
    .prompt({
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to delete:',
    })
    .then((answer) => {
      const query = 'DELETE FROM employee WHERE id = ?';

      connection.query(query, answer.employeeId, (err, res) => {
        if (err) throw err;

        console.log(`\nEmployee with ID "${answer.employeeId}" deleted successfully!\n`);

        startPrompt();
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}
