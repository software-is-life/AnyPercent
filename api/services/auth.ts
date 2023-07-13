// export const retrieveGithubAuthorization = async (requestToken: string) {
//     const githubUrl = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID_LOCAL}&client_secret=${process.env.GITHUB_OAUTH_SECRET_LOCAL}&code=${requestToken}`
//     const options = {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//         },
//     };
//     fetch(githubUrl, options)
//         .then((response) => response.json())
//         .catch((err) => console.error(err));
// };