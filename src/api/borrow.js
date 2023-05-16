import request from "@/utils/request";

export function list(data = {}, pageNum = 1, pageSize = 10) {
  return request({
    url: `/records/bk-record/getRecord/${pageNum}/${pageSize}`,
    method: "post",
    data,
  });
}

export function borrow(data) {
  return request({
    url: "/records/bk-record/borrowBook",
    method: "post",
    data,
  });
}

export function returnBook(data) {
  return request({
    url: "/records/bk-record/returnBook",
    method: "post",
    data,
  });
}
