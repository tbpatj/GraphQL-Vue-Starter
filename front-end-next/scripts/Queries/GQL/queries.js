const getUsers = {
  query: `
    query ExampleQuery {
        allUsers {
            id
            username
            email
            first_name
            last_name
            ppurl
        }
    }
  `,
};

export { getUsers };
