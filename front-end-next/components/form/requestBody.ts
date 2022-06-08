import { inputFields, queryBody } from "./types";

export default function returnBodyRequest(inFields: inputFields): queryBody {
    return {
      query: `
        mutation RegisterMyUser{
            registerUser(username: "${inFields.username}", first_name: "${inFields.firstname}" last_name: "${inFields.lastname}", email: "${inFields.email}", password: "${inFields.password}"){
                ... on AuthPayload {
                    token
                    user {
                        id
                        username
                        first_name
                        last_name
                        email
                        ppurl
                    }
                }
                ... on Error {
                    msg
                    code
                }
            }
        }
      `,
    };
  }

  export function returnLoginBody(inFields: inputFields): queryBody{
    return {
        query: `
        mutation LoginUser{
            login(email: "${inFields.username}", password: "${inFields.password}"){
              ... on AuthPayload {
                token
                user {
                    id
                    username
                    first_name
                    last_name
                    email
                    ppurl
                }
              }
              ... on Error {
                msg
                code
              }
            }
          }
        `,
      };
  }