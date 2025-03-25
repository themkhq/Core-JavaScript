function showForm(type) {
    document.getElementById('registerForm').classList.add('d-none');
    document.getElementById('loginForm').classList.add('d-none');
    
    if (type === 'register') {
        document.getElementById('registerForm').classList.remove('d-none');
    } else if (type === 'login') {
        document.getElementById('loginForm').classList.remove('d-none');
    }
}

function register() {
    const fullname = document.getElementById('regFullname').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    if (!fullname) {
        alert("Please enter your full name.");
        return;
    }
    if (!email) {
        alert("Please enter your email.");
        return;
    }
    if (!password) {
        alert("Please enter your password.");
        return;
    }


    const user = { fullname, email, password }
    localStorage.setItem(email, JSON.stringify(user))
    
    alert("Registration successfull!! You can now login")

    document.getElementById('regFullname').value ='';
    document.getElementById('regEmail').value ='';
    document.getElementById('regPassword').value = '';
    
    showForm('login');
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const InputPassword = document.getElementById('loginPassword').value;

    if (!email) {
        alert("Email field is required!")
        return;
    }
    if (!InputPassword) {
        alert("Password field is required!")
    }

    const user = localStorage.getItem(email)
    
    if (!user) {
        alert("User not exist!")
        return;
    }

    const perseUser = JSON.parse(user)
    
    if (InputPassword != perseUser.password) {
        alert("Incorrect Password")
        return;
    }

    alert("Login Successfull!! Welcome " + perseUser.fullname)

    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}