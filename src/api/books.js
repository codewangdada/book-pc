import request from "@/utils/request";

export function list(data, pageNum, pageSize) {
  return request({
    url: `/books/bk-book/getbook/${pageNum}/${pageSize}`,
    method: "post",
    data,
  });
}

export function add(data) {
  return request({
    url: "/books/bk-book/addbook",
    method: "post",
    data,
  });
}

export function update(data) {
  return request({
    url: "/books/bk-book/upbook",
    method: "post",
    data,
  });
}

export function del(data) {
  return request({
    url: "/books/bk-book/delbook",
    method: "post",
    data,
  });
}