export type inputFields = {
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    errors: Object,
    setData: (field: string, callbackVal: Function) => any;
  }
export type queryBody = {
    query: string
}
export type formStateManager = {
    setProcess: React.Dispatch<React.SetStateAction<number>>,
    setAnimFinished: React.Dispatch<React.SetStateAction<boolean>>,
    setMounted: React.Dispatch<React.SetStateAction<boolean>>
}
