import { Api } from "./api.js";

export { UserApi, Credentials }

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`;
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl('login'), false, credentials, controller);
    }

    static async logout(controller) {
        await Api.post(UserApi.getUrl('logout'), true, controller);
    }

    static async get(controller) {
        return Api.get(UserApi.getUrl('current'), true, controller);
    }
    
    static async register(username, password, firstName, lastName, email, phone,gender) {
        const data = {username: username, password: password,firstName: firstName, lastName: lastName, email: email, phone: phone,gender:gender};
        return await Api.post(UserApi.getUrl(), false, data);
    }

    static async resendEmail (email) {
        return await Api.post(UserApi.getUrl('resend_verification'), false, {email: email});
    }

    static async verifyEmail (email, code) {
        return await Api.post(UserApi.getUrl('verify_email'), false, {email: email, code: code});
    }

    static async modifiyUser(firstName, lastName, phone, gender){
        const data = {firstName: firstName, lastName: lastName, phone: phone, gender:gender};
        return await Api.put(UserApi.getUrl('current'),true,data);
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}