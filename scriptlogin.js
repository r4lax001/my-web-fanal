class AuthSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataPerson = JSON.parse(localStorage.getItem('users')) || [];
        this.isLoggedIn = false;
        this.currentUser = null;
        this.initialize();
    }

    initialize() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            this.isLoggedIn = true;
            this.currentUser = loggedInUser;
            this.updateNavbarUser(loggedInUser.name);
        }
        this.attachPanelToggleEvents();
    }

    attachPanelToggleEvents() {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');

        signUpButton.addEventListener('click', () => {
            this.container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            this.container.classList.remove('right-panel-active');
        });
    }

    addNewUser(event) {
        event.preventDefault();
        const newName = document.getElementById('newName').value.trim();
        const newMail = document.getElementById('newMail').value.trim();
        const newPass = document.getElementById('newPass').value.trim();
        const conPass = document.getElementById('conPass').value.trim();

        if (!newName || !newMail || !newPass || !conPass) {
            alert("กรุณาใส่ข้อมูลให้ครบค่ะ");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(newMail)) {
            alert("กรุณากรอกอีเมลให้ถูกต้อง");
            return;
        }

        if (newPass !== conPass) {
            alert("รหัสผ่านไม่ตรงกันค่ะ");
            return;
        }

        if (this.dataPerson.some(person => person.email === newMail)) {
            alert("อีเมลนี้ถูกใช้แล้ว");
            return;
        }

        this.dataPerson.push({ 
            name: newName, 
            email: newMail, 
            password: newPass 
        });
        
        localStorage.setItem('users', JSON.stringify(this.dataPerson));
        alert("สมัครสมาชิกสำเร็จ");
        
        this.container.classList.remove('right-panel-active');
    }

    loginUser(event) {
        event.preventDefault();
        const getUser = document.getElementById('id_mail').value.trim();
        const getPass = document.getElementById('id_pass').value.trim();

        if (!getUser || !getPass) {
            alert("กรุณาใส่ชื่อหรือรหัสผ่านให้ครบค่ะ");
            return;
        }

        const user = this.dataPerson.find(
            person => person.email === getUser && person.password === getPass
        );

        if (user) {
            alert(`เข้าสู่ระบบสำเร็จ, ยินดีต้อนรับ ${user.name}`);
            
            this.isLoggedIn = true;
            this.currentUser = user;
            
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            this.updateNavbarUser(user.name);
            
            window.location.href = "index.html";
        } else {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
    }

    updateNavbarUser(userName) {
        const loginLink = document.querySelector('.nav-links a[href="login.html"]');
        if (loginLink) {
            loginLink.innerHTML = `<i class="fa-solid fa-user"></i> ${userName}`;
        }
    }

    logoutUser() {
        this.isLoggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('loggedInUser');
        this.updateNavbarUser("เข้าสู่ระบบ");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const auth = new AuthSystem('container');

    document.getElementById('signupForm').addEventListener('submit', (e) => auth.addNewUser(e));
    document.getElementById('signinForm').addEventListener('submit', (e) => auth.loginUser(e));

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        auth.updateNavbarUser(loggedInUser.name);
    }
});