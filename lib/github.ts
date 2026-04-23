import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://api.github.com/graphql";

export const githubClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

export const GET_USER_PROFILE_QUERY = gql`
  query getUserProfile($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      bio
      repositories(
        first: 6
        orderBy: { field: STARGAZERS, direction: DESC }
        isFork: false
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;
