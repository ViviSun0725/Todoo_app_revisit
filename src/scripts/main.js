import axios from 'axios';

const main = () => ({
    section: "signUp",
    email: "",
    nickname:"",
    password:"",
    showLogin() {
        this.section = "login"
    },
    showSignUp() {
        this.section = "signUp"
    },
    showTask() {
        this.section = "task"
    },
    async signUp() {
        if (this.email !== "" & this.nickname !== "" & this.password !== "") {
            const url = "https://todoo.5xcamp.us/users";
            const userData = {
            user : {
                email: this.email,
                nickname: this.nickname,
                password: this.password
            }
        }
        try {
            const resp = await axios.post(url, userData);
            console.log(resp);
            // 提示視窗 註冊成功
        } catch(err) {
            const errMessage = err.response.data.error.join(" / ");
            console.log(errMessage);
            // 提示視窗 註冊失敗
        }
        
        }
        
    }
});

export default main