export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const username = "SB-Siba";

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: "GITHUB_TOKEN not configured" });
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-graph",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    const json = await response.json();

    if (json.errors) {
      return res.status(500).json({ error: json.errors });
    }

    const c = json.data.user.contributionsCollection;

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(200).json({
      totalContributions: c.contributionCalendar.totalContributions,
      weeks: c.contributionCalendar.weeks,
      breakdown: {
        commits: c.totalCommitContributions,
        issues: c.totalIssueContributions,
        pullRequests: c.totalPullRequestContributions,
        reviews: c.totalPullRequestReviewContributions,
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
}