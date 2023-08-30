// http://preview.themeforest.net/item/ebazar-ecommerce-bootstrap-admin-template/full_screen_preview/33983389?_ga=2.178555620.1700963504.1653380104-1955816824.1652426447

const stockList = {
    id: 1,
    productId: 1,
    quantity: 2,
};

const infoCategories = {
    id: 1,
    name: "Game",
};

const infoPayments = {
    id: 1,
    name: "Debit Card",
};

const infoOrder = {
    id: 1,
    cart: [
        {
            productId: 1,
            quantity: 4,
        },
    ],
    customerId: 3,
    paymentId: 3,
    price: 2331,
    createdAt: "02/05/2023",
    status: "pendding",
    comment: "aaaaa",
};

const infoProducts = {
    id: 1,
    name: "Oculus VR",
    description: "Long contest",
    price: 1000,
    categoriesId: 1,
    image: "url",
    rate: 5,
};

const infoCustomers = {
    id: 1,
    name: "aaaaaaa",
    regDate: "12/10/2023",
    email: "aaa@bbb.ccc",
    country: "arabic",
    avatar: "url",
    info: "dsadada",
    phone: "02023555",
    birthday: "0205/1995",
    address: "dadad wasinton",
};

const infoSuppliers = {
    id: 1,
    categoriesId: 1,
    name: "aass",
    regDate: "22/12/2002",
    email: "ddsa@dsds.com",
    phone: "023252256",
    address: "dsadsadadad",
};

const infoUser = {
    id: 1,
    settingId: 1,
    username: "ddddd",
    email: "aaa@bbb.ccc",
    password: "1234",
    fullName: "aaaaaaa",
    regDate: "12/10/2023",
    country: "arabic",
    avatar: "url",
    info: "dsadada",
    phone: "02023555",
    birthday: "02/05/1995",
    address: "dadad wasinton",
    lastLogin: "25/11/2023",
};

const infoRole = {
    id: 1,
    title: "Admin",
    right: [1],
};

const infoSetting = {
    id: 1,
    themeId: 1,
    fontId: 1,
};
