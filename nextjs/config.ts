const apiUrl:string = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' // development api
    : 'http://localhost:3000'; // production api

export {
    apiUrl
};