const EditArticleHistoryHelper = {
    createLoadingArticleHistoriesObj: (count) => 
        Array(count).keys().toArray()
            .map((key) => ({
                key, 
                isLoading: true, 
                title: "",
                body: "",
                createdAt: 0
            })),
    toEditHistoryUIObjects: (editHistoryResponses) => editHistoryResponses.map(editHistoryResponse => ({
        key: editHistoryResponse.createdAt,
        isLoading: false,
        title: editHistoryResponse.title,
        body: editHistoryResponse.body,
        createdAt: editHistoryResponse.createdAt
    }))
};

export default EditArticleHistoryHelper;
