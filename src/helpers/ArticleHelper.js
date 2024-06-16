import { BASE_URL } from "../constants";

const ArticleHelper = {
    createArticleLink: (articleWebId) => `${BASE_URL}/article/${articleWebId}`,
    createLoadingArticleObjects: (count) => Array(count).keys().toArray().map((key) => ({key, isLoading: true, article: {}})),
    toArticleUIObjects: (articleResponses) => articleResponses.map(articleResponse => ({
        key: articleResponse.articleWebId,
        isLoading: false,
        article: articleResponse
    }))
};

export default ArticleHelper;
