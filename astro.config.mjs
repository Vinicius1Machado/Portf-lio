import { defineConfig } from "astro/config";

const repository = process.env.GITHUB_REPOSITORY ?? "";
const [owner, repo] = repository.split("/");
const isUserOrOrgPage = owner && repo?.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const githubPagesConfig = owner
  ? {
      site: `https://${owner}.github.io`,
      ...(repo && !isUserOrOrgPage ? { base: `/${repo}` } : {})
    }
  : {};

export default defineConfig(githubPagesConfig);
