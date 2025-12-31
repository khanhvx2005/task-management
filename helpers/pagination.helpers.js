module.exports = (objPagination, query, countDocument) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        objPagination.limitItems = parseInt(query.limit);
    }
    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;
    const totalPage = Math.ceil(countDocument / objPagination.limitItems);
    objPagination.totalPage = totalPage;
    objPagination.countDocument = countDocument;
    objPagination.start = objPagination.skip + 1;
    objPagination.end = Math.min(objPagination.skip + objPagination.limitItems, objPagination.countDocument)
    // Xử lý trường hợp đặc biệt: Nếu không tìm thấy sản phẩm nào (count = 0)
    if (countDocument === 0) {
        objPagination.start = 0;
        objPagination.end = 0;
    }
    return objPagination
}