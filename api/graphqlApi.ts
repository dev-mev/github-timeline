import { graphql } from "@octokit/graphql";
import express from "express";

require("dotenv").config();

async function main(req: express.Request, res: express.Response) {

  const result = await graphql({
    query: `query($number_of_repos:Int!, $username: String!){
      user(login: $username) {
        name
         repositories(first: $number_of_repos, orderBy: {field: CREATED_AT, direction: DESC}) {
           nodes {
             name
             createdAt
             description
           }
         }
       }
    }`,
    username: 'dev-mev',
    number_of_repos: 10,
    headers: {
      authorization: `token ${process.env.TOKEN}`
    }
  })
  res.json(result);
}

export = main;