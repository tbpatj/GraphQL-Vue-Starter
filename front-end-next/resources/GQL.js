export function meInfo() {
  return {
    query: `query login{
    me {
      id
      username
      first_name
      last_name
      email
      ppurl
      
    }
  }`,
  };
}
