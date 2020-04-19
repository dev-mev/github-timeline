import { graphql } from "@octokit/graphql";
import express from "express";

require("dotenv").config();

const router = express.Router();

async function getUserData(username: string) {
  const result = await graphql({
    query: `query($number_of_repos:Int!, $username: String!){
      user(login: $username) {
        name
          repositories(first: $number_of_repos, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              name
              createdAt
              description
              url
            }
          }
        }
    }`,
    username: username,
    number_of_repos: 100,
    headers: {
      authorization: `token ${process.env.TOKEN}`
    }
  });
  return result;
}

router.get("/api/users/:username", async function (req: express.Request, res: express.Response) {
  try {
    res.json(await getUserData(req.params.username));
  } catch {
    res.sendStatus(404);
  }
});

module.exports = router;