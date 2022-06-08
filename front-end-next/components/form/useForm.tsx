import { useState } from "react";
export function passesValidation(errors) {
    if (errors.email && errors.username && errors.firstname && errors.lastname && errors.password.pass) {
        return true;
    }
    return false;
}

export default function UseForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [errors, setErrors] = useState({ email: false, username: false, password: { pass: false, upper: false, lower: false, digit: false, special: false, length: false }, firstname: false, lastname: false });

    let setData = function (field: string, callbackVal: Function): any {
        let val = callbackVal();
        switch (field) {
            case "email":
                let emailTest =
                    /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(
                        val
                    ) && !/['`! #$%^&*()_+"]/.test(val);
                console.log();
                // if (val.includes(" ") || val.includes("'")) emailTest = false;
                if (val.length > 40 || val.length < 3) emailTest = false;

                setErrors({ ...errors, email: emailTest })
                if (val.length <= 40) setEmail(val);
                break;

            case "username":
                let usernameTest = /^[a-zA-Z0-9]+$/.test(val);
                if (val.length > 40 || val.length < 3) usernameTest = false;
                setErrors({ ...errors, username: usernameTest })
                if (val.length <= 40) setUsername(val);
                break;
            case "password":
                let upper = /(?=.*?[A-Z])/.test(val); //tests if it contains at least one upper letter
                let lower = /(?=.*?[a-z])/.test(val); //tests if it contains at least one lower letter
                let digit = /(?=.*?[0-9])/.test(val); //tests if it contains at least one digit
                let special = /(?=.*?[#?!@$%^&*-])/.test(val); //tests if it contains at least one special char
                let length = /.{8,80}/.test(val); //tests the length of the password
                let pass = upper && lower && digit && special && length;
                setErrors({ ...errors, password: { pass: pass, upper, lower, digit, special, length } })
                if (val.length <= 80) setPassword(val);
                break;
            case "firstname":
                let firstnameTest = /^[A-Za-z]+$/.test(val);
                if (val.length > 20) firstnameTest = false;
                if (val.length <= 20) setFirstname(val);
                setErrors({ ...errors, firstname: firstnameTest })
                break;
            case "lastname":
                let lastnameTest = /^[A-Za-z]+$/.test(val);
                if (val.length > 20) lastnameTest = false;
                if (val.length <= 20) setLastname(val);
                setErrors({ ...errors, lastname: lastnameTest })
                break;
            default:
                break;
        }
    }

    return { email, username, password, firstname, lastname, errors, setData };
}