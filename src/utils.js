const origin = "https://deep-index.moralis.io";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImIyYjk3YThiLWJjMmUtNDlmMy1hYzg5LWFiM2NiNmM4MTA1YyIsIm9yZ0lkIjoiMzQ3MzYxIiwidXNlcklkIjoiMzU3MDU1IiwidHlwZUlkIjoiMmNmZTg2ZDctYmZiYi00ZTM4LTk4NjEtNjQzYWE0NzgwNWVhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODg4NTQwODYsImV4cCI6NDg0NDYxNDA4Nn0.LWVTXYGxctxmuEKevvoqkTjNOlCHScfyrWCJOdyEztU";

// https://docs.moralis.io/reference/nft-api
export const searchNFTs = async (searchText) => {
  const url = new URL(`${origin}/api/v2/nft/search`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("q", searchText);
  url.searchParams.append("filter", "name");
  url.searchParams.append("limit", "12");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getNFTTrades = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}/trades`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("marketplace", "opensea");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getContractNFTs = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

//JSX (return) -> babel -> React.CreateElement() -> Virtual Dom (object)
//Component render Virtual Dom -> compare difference -> Do Dom update
