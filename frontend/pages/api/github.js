import { Octokit } from 'octokit';


export default async (req, res) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN
  });

  const contents = await octokit.rest.repos.getContent({
    owner: 'joefearnley',
    repo: 'joeymarinara',
    path: 'posts/markdown'
  });

  console.log(contents);

  // grab all of the posts
  // order by name
  // page by page number
  // limit 10

}