import request from "@/utils/request";

export function list(data = {}, pageNum = 1, pageSize = 10) {
  return request({
    url: `/books/bk-book-type/getbookType/${pageNum}/${pageSize}`,
    method: "post",
    data,
  });
}

export function add(data) {
  return request({
    url: "/books/bk-book-type/addbookType",
    method: "post",
    data,
  });
}

export function update(data) {
  return request({
    url: "/books/bk-book-type/upbookType",
    method: "post",
    data,
  });
}

export function del(data) {
  return request({
    url: "/books/bk-book-type/delbookType",
    method: "post",
    data,
  });
}
