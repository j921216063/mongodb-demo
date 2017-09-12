const mongoose = require('mongoose');

mongoose.Promise = Promise;

// 連接本地端名為 member 資料庫。若不存在，則會新增並連接它。
mongoose.connect('mongodb://localhost/member', {
  useMongoClient: true,
  /* other options */
});

let Product = mongoose.model('Product', {
  title: String,
  price: Number
});

// 第一種方法
let item = new Product({
  title: '電視機',
  price: 10000,
})

item.save(function (err) {
  if (err) {
    console.log('fail');
  } else {
    console.log('success')
  }
})

// 第二種方法
// let item = new Product();
// item.title = '冰箱';
// item.price = 5000;

// item.save(function (err) {
//   if (err) {
//     console.log('fail');
//   } else {
//     console.log('success')
//   }
// })

// 查詢第一種方法
// Product.find({
//   title: '冰箱'
// }, function (err, products) {
//   for (let index in products) {
//     let temp = products[index];
//     console.log(temp);
//   }
// })

// 查詢第二種方法
// Product.find({ title: /電視/i }, function (err, products) {
//   for (let index in products) {
//     let temp = products[index];
//     console.log(temp);
//   }
// })

// 查詢第三種方法
// Product.find({ price: { $gte: 6000 } }, function (err, products) {
//   for (let index in products) {
//     let temp = products[index];
//     console.log(temp);
//   }
// })

// 刪除特定項目
// Product.remove({
//   title: '電視機'
// }, function (err) {
//   if (err) {

//   } else {
//     console.log('成功刪除')
//   }
// });

// 更新第一筆
// Product.update({ title: '冰箱' }, {
//   title: '大冰箱',
//   price: '400000'
// }, function (err) {
//   if (err) {
//   } else {
//     console.log('更新')
//   }
// })

// // 更新全部搜尋到的資料
// Product.update({
//   title: '冰箱'
// }, {
//     title: '大冰箱',
//     price: '400000'
//   }, {
//     multi: true
//   }, function (err) {
//     if (err) {
//     } else {
//       console.log('更新')
//     }
//   })

Product.find({}, function (err, products) {
  for (let index in products) {
    let temp = products[index];
    console.log(temp);
  }
})