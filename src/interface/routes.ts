export enum RouteTypes {
  LOGIN = `/login`,
  PROFILE = `/users/:login`,
  PROFILE_DETAIL = `/users/:id/repos`,
  COMMIT_DETAIL = `/users/:login/repos/:repo/commits`,
  ROOT = `/`,
}