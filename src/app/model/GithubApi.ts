import { GithubIssue } from "./GithubIssue";

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}
