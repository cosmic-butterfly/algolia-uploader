import "dotenv/config";
import { FetchArticleById, FetchLatestArticle } from "./lib/workflows/fetchFromWeb3";
import { getImageBufferFromURL } from "./lib/workflows/fetchImageFromCF";
import { algoliaClient, pushToAlgolia } from "./lib/workflows/pushToAlgolia";
import { pushToR2 } from "./lib/workflows/pushToR2";

const INDEX = "dev_articles";
console.log("Using index: ", INDEX, "for Algolia. You can change this in the .env file.");

(async()=>{
    const client = algoliaClient;
    const indexName = 
        process.env.ALGOLIA_INDEX_NAME == undefined 
        ? "dev_articles" 
        : process.env.ALGOLIA_INDEX_NAME;
    // This is running in mockMode = true. Pulls out a mock article and pushes it to R2 and Algolia
    // You can replace with FetchArticleById
    await FetchArticleById("12", true).then(async (res) => {
        const buffer = await getImageBufferFromURL(res.articleImageURL.toString());
       const key = await pushToR2("daily-pepe-images", res.articleId.toString(), buffer);
        res.articleImageURL = `https://pub-3a1ed1ef0902446fb46790f9a3007b32.r2.dev/${key}`;
        return await pushToAlgolia(client, indexName, [res]);
    }).catch(err => console.log(err));
})();