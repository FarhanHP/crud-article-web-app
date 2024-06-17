import { ARTICLE_API_BASE_URL } from "../constants";

const ArticleProvider = {
    getArticle: async (articleWebId) => {
        const response = await fetch(`${ARTICLE_API_BASE_URL}/api/article/${articleWebId}/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseJson = await response.json();
        
        if(responseJson.code !== 200) {
            throw Error("Can't get the article");
        }

        return responseJson;
    },
    getArticles: async (pageNumber, pageSize) => {
        const response = await fetch(`${ARTICLE_API_BASE_URL}/api/article/get?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseJson = await response.json();
        
        if(responseJson.code !== 200) {
            throw Error("Can't get the articles");
        }

        return responseJson;
    },
    deleteArticle: async (articleWebId) => {
        await fetch(`${ARTICLE_API_BASE_URL}/api/article/${articleWebId}/delete`, {method: "DELETE"});
    },
    createArticle: async (title, body) => {
        const response = await fetch(`${ARTICLE_API_BASE_URL}/api/article/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, body
            })
        });
        const responseJson = await response.json();
        
        if(responseJson.code !== 200) {
            throw Error("Create article failed");
        }

        return responseJson;
    },
    editArticle: async (articleWebId, title, body) => {
        const response = await fetch(`${ARTICLE_API_BASE_URL}/api/article/${articleWebId}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, body
            })
        });
        const responseJson = await response.json();
        
        if(responseJson.code !== 200) {
            throw Error("Edit article failed");
        }

        return responseJson;
    },
    getEditHistories: async (articleWebId, pageNumber, pageSize) => {
        const response = await fetch(`${ARTICLE_API_BASE_URL}/api/article/${articleWebId}/getEditHistories?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseJson = await response.json();
        
        if(responseJson.code !== 200) {
            throw Error("Can't get the edit histories");
        }

        return responseJson;
    }
};

export default ArticleProvider;
