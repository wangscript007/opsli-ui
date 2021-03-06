import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/api/v1/sys/menu/findList",
    method: "get",
    data,
  });
}

export function getTree(data) {
  return request({
    url: "/api/v1/sys/menu/findMenuTreePage",
    method: "get",
    params: data,
  });
}

export function doInsert(data) {
  return request({
    url: "/api/v1/sys/menu/insert",
    method: "post",
    data,
  });
}

export function doUpdate(data) {
  return request({
    url: "/api/v1/sys/menu/update",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/api/v1/sys/menu/del",
    method: "post",
    params: data,
  });
}

export function getMenuAndPermsTree(data) {
  return request({
    url: "/api/v1/sys/menu/getMenuAndPermsTree",
    method: "get",
    params: data,
  });
}
