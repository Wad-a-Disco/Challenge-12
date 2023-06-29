-- Department seed data
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Finance');

-- Role seed data
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 70000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Coordinator', 55000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Finance Manager', 90000, 4);

-- Employee seed data
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Johnson', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Williams', 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('David', 'Brown', 5, 3);

-- Additional functionality

-- Update employee managers
UPDATE employee SET manager_id = 2 WHERE id = 3;
UPDATE employee SET manager_id = 1 WHERE id = 4;

-- View employees by manager
SELECT 
  m.id AS manager_id, 
  m.first_name AS manager_first_name, 
  m.last_name AS manager_last_name, 
  e.id AS employee_id, 
  e.first_name AS employee_first_name, 
  e.last_name AS employee_last_name 
FROM employee AS e
JOIN employee AS m ON e.manager_id = m.id
ORDER BY m.id;

-- View employees by department
SELECT 
  d.id AS department_id, 
  d.name AS department_name, 
  e.id AS employee_id, 
  e.first_name AS employee_first_name, 
  e.last_name AS employee_last_name 
FROM employee AS e
JOIN role AS r ON e.role_id = r.id
JOIN department AS d ON r.department_id = d.id
ORDER BY d.id;

-- Delete departments, roles, and employees
DELETE FROM employee WHERE id = 5;
DELETE FROM role WHERE id = 5;
DELETE FROM department WHERE id = 4;

-- View the total utilized budget of a department
SELECT 
  d.id AS department_id, 
  d.name AS department_name, 
  SUM(r.salary) AS total_budget 
FROM department AS d
JOIN role AS r ON d.id = r.department_id
JOIN employee AS e ON r.id = e.role_id
GROUP BY d.id;
