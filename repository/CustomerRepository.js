const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "./data/customers.txt");
const bcrypt = require("bcrypt");
const salt = 10;

module.exports.generateCustomers = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      username: "john",
      phone: "1234567890",
      password: "john",
    },
    {
      id: 2,
      name: "Jane Doe",
      username: "jane",
      phone: "2015236644",
      password: "jane",
    },
    {
      id: 3,
      name: "Jim Doe",
      username: "jim",
      phone: "2066548798",
      password: "jim",
    },
    {
      id: 4,
      name: "Josh Smith",
      username: "josh",
      phone: "9714526585",
      password: "josh",
    },
    {
      id: 5,
      name: "Jill Smith",
      username: "jill",
      phone: "4568521245",
      password: "jill",
    },
  ];
  if (this.getAllCustomers().length === 0)
    customers.forEach((customer) => this.signup(customer));
};

module.exports.getAllCustomers = () => {
  try {
    const data = fs.readFileSync(fileName);
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.getCustomerById = (id) => {
  const customer = this.getAllCustomers().find((c) => c.id === id);
  if (!customer) {
    throw new Error("Customer not found");
  }
  return customer;
};

module.exports.signup = (customer) => {
  if (
    !customer.name ||
    !customer.username ||
    !customer.password ||
    !customer.phone
  ) {
    throw new Error("All customer information is required");
  }

  try {
    const customers = this.getAllCustomers();
    if (customers.length === 0) {
      customer.id = 1;
    } else {
      const ids = customers.map((c) => c.id);
      const id = Math.max(...ids) + 1;
      customer.id = id;
    }
    const usernameExists = customers
      .map((c) => c.username)
      .includes(customer.username);
    if (usernameExists) {
      throw new Error("Duplicate username is not allowed");
    }

    const hashedPassword = bcrypt.hashSync(customer.password, salt);
    customer.password = hashedPassword;
    customers.push(customer);
    fs.writeFileSync(fileName, JSON.stringify(customers));

    return {
      ...customer,
      password: undefined,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.login = (loginDetails) => {
    console.log(loginDetails);
  if (!loginDetails.username || !loginDetails.password) {
    throw new Error("Username and Password are required");
  }
  const customer = this.getAllCustomers().find(
    (c) => c.username === loginDetails.username
  );
  console.log(customer);
  if (!customer) {
    throw new Error("Username doesn't exist");
  }
  const passwordMatch = bcrypt.compareSync(
    loginDetails.password,
    customer.password
  );
  if (!passwordMatch) {
    throw new Error("Password is incorrect");
  }
  console.log(customer);
  return { ...customer, password: undefined };
};
