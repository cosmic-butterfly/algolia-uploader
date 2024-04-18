
import { Article } from "../../types/apiTypes";
import { fetchArticle, fetchLatestArticleId } from "../dataSource/api";

export async function FetchLatestArticle(mockMode?: Boolean): Promise<Article> {
    if (mockMode) {
        return {
            articleDate: "11-11-2024",
            articleTitle: "test article with testing data",
            articleImageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWE0_7x4SsOmqqAzOoJwJnHG4P1bo2t372lOtxsQtn2A&s",
            articleText: "Lorem Ipsum Ipsum Lorem Textum Nextum",
            articleAuthor: "Lord Myles Rutleg",
            mintStart: BigInt(10),
            mintEnd: BigInt(10),
            tags: ["test", "data", "mock"],
            articleId: BigInt(11),
        };
    }
    return fetchLatestArticleId().then((res) => {
        if (res == null) throw new Error("FetchLatestArticle: articleId is null");
        return fetchArticle(res).then((res) => {
            if (res == null) throw new Error("FetchLatestArticle: article is null");
            return res;
        });
    });
}

export async function FetchArticleById(articleId: string | bigint, mockMode?: Boolean): Promise<Article> {
    if (mockMode) {
        return {
            articleDate: "11-11-2024",
            articleTitle: "test article with testing data",
            articleImageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWE0_7x4SsOmqqAzOoJwJnHG4P1bo2t372lOtxsQtn2A&s",
            articleText: "Lorem Ipsum Ipsum Lorem Textum Nextum",
            articleAuthor: "Lord Myles Rutleg",
            mintStart: BigInt(10),
            mintEnd: BigInt(10),
            tags: ["test", "data", "mock"],
            articleId: BigInt(articleId),
        };
    }
    return fetchArticle(articleId).then((res) => {
        if (res == null) throw new Error("FetchLatestArticle: article is null");
        return res;
    });
}