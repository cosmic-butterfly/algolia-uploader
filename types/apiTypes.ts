export type Article = {
    articleDate: string //format DD-MM-YYYY
    articleTitle: string
    articleImageURL: URL | string
    articleText: string
    articleAuthor: string
    mintStart: bigint //earliest time this article can be minted in unix time (seconds)
    mintEnd: bigint //deadline to mint this article in unix time (seconds)
    tags: string[]
    articleId: bigint
}

// This is the format that lives in Algolia
export type AlgoliaIndexArticle =   {
    name: string;
    description: string;
    external_link: string;
    image:  string;
    author: string;
    date: string;
    title: string;
    text: string;
    tags:Array<string>;
}

// Convert the data to the format that lives in Algolia
// May need to add some additional data down the road.
export const AlgoliaIndexArticleToArticle = (a:AlgoliaIndexArticle):Article => {
    return {
        articleDate: a.date,
        articleTitle: a.title,
        articleImageURL: a.image,
        articleText: a.text,
        articleAuthor: a.author,
        mintStart: BigInt(0),
        mintEnd: BigInt(0),
        tags: a.tags,
        articleId: BigInt(0)
    };
}


/*
{
  "id": 1,
  "articleAuthor": "John Smith",
  "articleTitle": "Amid Strikes, One Question: Are Employers Miscalculating?",
  "articleDate": "Oct. 8, 2023, 5:01 a.m. ET",
  "articleText": "<p>The list of gains that the Hollywood writers secured to end a nearly five-month strike with studios once seemed ludicrously ambitious: not just wage increases, but also minimum staffing levels for shows, new royalties on successful series and restrictions on outsourcing writing duties to artificial intelligence.</p><p>Yet far from an anomaly, the writers’ deal was the latest high-profile  labor standoff that seemed to produce substantial gains for workers, and  to suggest that they have more leverage than in the past.</p> <p>  United Parcel Service employees won large pay increases for part-timers  by pushing the company to the brink of a strike, while the lowest-paid  academic student employees at the University of California won salary  increases of more than 50 percent after a monthlong strike affected  thousands of students.  </p>",
  "articleImageURL": "https://static01.nyt.com/images/2023/10/05/multimedia/00labor-analysis-01-gfzh/00labor-analysis-01-gfzh-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=1200",
  "articleCaption": "The Writers Guild of America’s deal was the latest high-profile labor standoff that seemed to produce substantial gains for workers.",
  "searchable": true,
  "objectID": "131ef11073d6b4_dashboard_generated_id"
}
*/

export const ArticleToAlgoliaIndexArticle = (a:Article):AlgoliaIndexArticle => {
    if (a.articleImageURL === null) {
        throw new Error("ArticleToAlgoliaIndexArticle: articleImageURL is null");
    }

    return {
        name: a.articleTitle,
        description: a.articleText,
        external_link: "https://thedailypepe.com/article/" + a.articleId,
        image: a.articleImageURL.toString(),
        author: a.articleAuthor,
        date: a.articleDate,
        title: a.articleTitle,
        text: a.articleText,
        tags: a.tags,
    }
};

export type ArticlePreview = {
    articleDate: string //format DD-MM-YYYY
    articleTitle: string
    articlePreviewImageURL: URL | string
    articlePreviewText: string
    articleId: bigint
}

export type ArticleNFT = {
    articleNFTImageURL: URL | string
    mintStart: bigint //earliest time this articel can be minted in unix time (seconds)
    mintEnd: bigint //deadline to mint this article in unix time (seconds)
    mintPriceDisplay: number //the approximate mint price in standard units for display (see how ethereum handles decimals for more info)
    mintPriceTrue: bigint //the true mint price in atomic units (to be passed to the write API)
}

export type ArticleNFTPreview = {
    articleNFTPreviewImageURL: URL | string
    articleTitle: string
    articleDate: string //DD-MM-YYYY
    articleId: bigint
}

export type NFTBalance = {
    articleId: bigint,
    balance: bigint,
}

export type TimeRange = {
    start: bigint,
    end: bigint,
}

export type UriV0JsonObj = {
    name: string,
    description: string,
    external_link: string,
    image: string, //the image for the NFT (the article image on a newspaper)
    articleImage: string, //the image for the article (just an image)
    author: string,
    date: string,
    title: string,
    text: string,
    tags: string[],
}

/*
 
{
    "name":"TheDailyPepe Issue: #0",
    "description":"The Daily Pepe is an online news publication for commemorating historic events as they happen (in the form of rare pepes)",
    "external_link": "thedailypepe.com/articles/0",
    "image":imageURL,
    "author":"TopKek McJournalFrog",
    "date":date,
    "title":"The Grand Opening",
    "text":"<p>Today, on "date", frogs from far and wide gathered to celebrate the grand opening of The Daily Pepe, a publication made by frogs, for frogs. Participants were brought to the brink of tears, knowing that they were part of a moment that would be forever immortalized in internet history. At the height of the festivities, a single normie came forward and shouted, \"This is stupid! They're just memes!\" Almost immediately, two meme war veterans, who could only be described as absolute giga chads, responded by replying to all of his tweets with soyjack memes. \"I have never seen a normie realize the error of their ways so quickly,\" said one onlooker. Several zoomers described the outburst as: \"a big yikes\", and \"not bussin'\" When asked for comment, the meme warriors' only response was a single synchronized, \"KEK.\" The celebration continued long into the night without further normie interference.<\\p>",
    "tags":["founding", "opening", "celebration", "first", "rare"]
}
 
*/