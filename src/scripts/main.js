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
    todos: [1,2,3],
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
            this.getTodos();
        } else {
            this.showLogin();
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
        
        } else {
            // 提示使用者必填欄位
        }
        
    },
    async login(){
        // 是否要檢查已登入
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

                localStorage.setItem(USER_TOKEN, token);
                this.isLogin = true;
                this.showTask();

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
        } else {
            // 提示使用者必填欄位
        }

    },
    async logOut() {
        const url = "https://todoo.5xcamp.us/users/sign_out";
        const token = localStorage.getItem(USER_TOKEN);
        const config = {
            headers: {
                Authorization: token
            }
        };
        try {
            const resp = await axios.delete(url, config);
        } catch(err) {
            console.log(err);
        } finally {
            localStorage.removeItem(USER_TOKEN);
            this.isLogin = false;
            this.clearInput();
            this.showLogin();


            Toastify({
                text: "已登出",
                duration: 3000,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
        }
    },
    async getTodos() {
        const url = "https://todoo.5xcamp.us/todos/";
        const token = localStorage.getItem(USER_TOKEN);
        const config = {
            headers: {
                Authorization: token
            }
        };

        try {
            const {data: {todos}} = await axios.get(url, config);
            this.todos = todos;
            //問題 授權
        } catch(err) {
            console.log(err);
            // 系統忙碌中，請稍後再試
        }

    }
});

export default main