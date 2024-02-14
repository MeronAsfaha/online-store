const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupForm['name'].value;
    const username = signupForm['username'].value;
    const phone = signupForm['phoneNumber'].value;
    const password = signupForm['password'].value; 
    const data = { name, username, phone, password };
    fetch('http://localhost:1001/customers/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(data => {
        // console.log(data);
        document.getElementById('message').innerHTML = "Signup Successful";
        setTimeout(() => {
            window.location.href = "/views/login.html";
        }, 2000);

    }
    ).catch(error => console.log(error.message))
});