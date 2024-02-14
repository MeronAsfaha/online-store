const customerRepository = require('../repository/CustomerRepository');

module.exports.signup = (customer) => {
    return customerRepository.signup(customer);
}


module.exports.login = (loginDetails) => {
    return customerRepository.login(loginDetails);
}

module.exports.getAllCustomers = () => {
    return customerRepository.getAllCustomers();
}