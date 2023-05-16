import request from "@/utils/request";

export function list(data, pageNum, pageSize) {
  return request({
    url: `/books/bk-user/getUser/${pageNum}/${pageSize}`,
    method: "post",
    data,
  });
}

export function add(data) {
  return request({
    url: "/books/bk-user/addUser",
    method: "post",
    data,
  });
}

export function update(data) {
  return request({
    url: "/books/bk-user/upUser",
    method: "post",
    data,
  });
}

export function del(data) {
  return request({
    url: "/books/bk-user/delUser",
    method: "post",
    data,
  });
}