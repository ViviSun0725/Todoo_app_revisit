import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const USER_TOKEN = "user-token";

const main = () => ({
    section: "signUp",
    email: "",
    nickname:"",
    password:"",
    isLogin: false,
    showLogin() {
        this.section = "login"
    },
    showSignUp() {
        this.section = "signUp"
    },
    showTask() {
        this.section = "task"
    },
    clearInput() {
        this.email = "";
        this.nickname = "";
        this.password = "";
    },
    init() {
        const token = localStorage.getItem(USER_TOKEN);
        if(token) {
            this.isLogin = true;
            this.showTask();
        } else {
            this.showSignUp();
        }
    },
    async signUp() {
        if (this.email !== "" && this.nickname !== "" && this.password !== "") {
            const url = "https://todoo.5xcamp.us/users";
            const userData = {
            user : {
                email: this.email,
                nickname: this.nickname,
                password: this.password
            }
        }
        try {
            console.log(userData);
            const resp = await axios.post(url, userData);
            console.log("ok");
            console.log(resp);

            this.clearInput();
            this.showLogin();

            Toastify({
                text: "註冊成功",
                duration: 3000,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();

        } catch(err) {
            if (err.response.data) {
                const errMessage = err.response.data.error.join(" / ");

                Toastify({
                    text: errMessage,
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                      background: "linear-gradient(to right, #FF6A88, #FF99AC)",
                    }
                  }).showToast();
            }
        }
        
        }
        
    },
    async login(){
        if (this.email !== "" && this.password !== "") {
            const url = "https://todoo.5xcamp.us/users/sign_in";
            const userData = {
                user: {
                    email: this.email,
                    password: this.password
                }
            }
            try {
                const resp = await axios.post(url, userData);
                const token = resp.headers.authorization;
                console.log(token);
                localStorage.setItem(USER_TOKEN, token);
                this.isLogin = true;
                Toastify({
                    text: "登入成功",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                  }).showToast();
            } catch(err) {
                console.log(err);
                Toastify({
                    text: "登入失敗",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                      background: "linear-gradient(to right, #FF6A88, #FF99AC)",
                    }
                  }).showToast();
            }
        }

    }
});

export default main