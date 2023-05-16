const normalMenu = [
  {
    id: 1,
    name: "图书查询",
    content: ["根据图书编号、图书名称查询图书信息","可查询图书的编号、名称、分类、作者、价格、在馆数量等"],
    path: "/books",
  },
  {
    id: 2,
    name: "借阅信息",
    content: ["可查询除图书的基本信息、借阅日期、截止还书日期、超期天教等"],
    path: "/borrow",
  },
  {
    id: 3,
    name: "借阅历史",
    content: ["查询自己以往的借阅历史，包括哪些图书等具体信息"],
    path: "/history",
  }
];

const adminMenu = [
  {
    id: 1,
    name: "图书管理",
    content: ["根据图书编号、图书名称查询图书基本信息", "添加、修改、删除图书"],
    path: "/books",
  },
  {
    id: 2,
    name: "图书分类管理",
    content: ["根据分类名称查询图书分类信息", "添加、修改、删除图书分类"],
    path: "/types",
  },
  {
    id: 3,
    name: "图书借阅",
    content: ["展示所有正在借阅图书的信息"],
    path: "/borrow-all",
  },
  {
    id: 4,
    name: "图书归还",
    content: ["展示所有已归还图书的信息"],
    path: "/return-all",
  },
  {
    id: 5,
    name: "读者管理",
    content: ["根据账号、姓名查询读者基本信息", "添加、修改、删除读者信息"],
    path: "/users",
  },
];

export {
    adminMenu,
    normalMenu
}