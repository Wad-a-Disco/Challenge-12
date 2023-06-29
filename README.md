# Employee Tracker

A command-line application built with Node.js, Inquirer, and MySQL to manage a company's employee database.

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). The Employee Tracker is a command-line application that provides a user-friendly interface for business owners to view and manage departments, roles, and employees in their company. It allows them to organize and plan their business efficiently.

The application is developed using Node.js as the runtime environment, Inquirer for command-line interaction, and MySQL for the database management system. It follows a database schema with three main tables: `department`, `role`, and `employee`. These tables are interconnected through foreign key relationships to establish the database structure.

## Features

- View all departments: Displays a formatted table with department names and IDs.
- View all roles: Displays a formatted table with job titles, role IDs, department names, and salaries.
- View all employees: Displays a formatted table with employee details including IDs, first names, last names, job titles, departments, salaries, and manager information.
- Add a department: Prompts the user to enter the name of the department and adds it to the database.
- Add a role: Prompts the user to enter the title, salary, and department for the role and adds it to the database.
- Add an employee: Prompts the user to enter the employee's first name, last name, role, and manager, and adds the employee to the database.
- Update an employee role: Prompts the user to select an employee and their new role, and updates the employee's role in the database.
- Additional functionality (Bonus):
  - Update employee managers: Allows the user to update an employee's manager.
  - View employees by manager: Displays employees based on their manager.
  - View employees by department: Displays employees based on their department.
  - Delete departments, roles, and employees: Provides the ability to delete departments, roles, and employees from the database.
  - View total utilized budget of a department: Shows the combined salaries of all employees in a department.

## Installation

1. Clone the repository: git clone https://github.com/your-username/employee-tracker.git

2. Navigate to the project directory: cd employee-tracker

3. Install the dependencies: npm install
4. Set up the database:

- Use the provided `schema.sql` file to create the necessary database schema.
- If needed, update the MySQL connection details in the `index.js` file with your MySQL username, password, host, and port.

5. Seed the database (optional):

- If you want to pre-populate the database with sample data, you can run the provided `seeds.sql` file.

6. Start the application: node index.js
7. Follow the command-line prompts to interact with the application and manage the employee database.

## Usage

- Upon starting the application, you will be presented with a menu of options to perform various operations on the employee database.
- Use the arrow keys to navigate through the menu and press Enter to select an option.
- Follow the prompts to enter the required information for each operation.






