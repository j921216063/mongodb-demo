在安裝以及啟動了 MongoDB 以後，可以使用 NodeJS 來進行資料庫的存取，以下會使用 mongoose 模組來進行測試。

## 使用 mongoose 模組

由於原生 mongose 的模組使用起來會出現較多的 callback，因此建議使用 mongoose。首先透過 npm 來安裝 mongoose 模組，接著在程式中引用它，並且透過它連線至資料庫，以下連接本地端的 ==member== 資料庫

``` javascript
const mongoose = require('mongoose');

mongoose.Promise = Promise;

// 連接本地端名為 member 資料庫。若不存在，則會新增並連接它。
mongoose.connect('mongodb://localhost/member', { useMongoClient: true });
```

## 定義 model
---- 

以下定義了一個 model 名字為 ==Product== 的模組，此會在 **Collections** 裡產生 **products**，的 collection。

```javascript
let Product = mongoose.model('Product', {
  title: String,
  price: Number
});
```
## 新增項目

產生新的物件有以下產生方式:

1. **在產生 Product 物件時，也一併加入屬性**

	```javascript
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
	```
	
2. **先產生 Product 物件之後，再指定相對應的屬性來新增**

	``` javascript
	let item = new Product();
	item.title = '冰箱';
	item.price = 5000;

	item.save(function (err) {
	  if (err) {
		console.log('fail');
	  } else {
		console.log('success')
	  }
	})
	```
## 查尋項目

1. 以下查尋 ==title== 為「 電視機 」的結果

	``` javascript
	Product.find({ title: '電視機' }, function (err, products) {
	  for (let index in products) {
		let temp = products[index];
		console.log(temp);
	  }
	})
	```
	
2. 若只想要搜尋片段文字的話，可以使用正規表示式的方法

	``` javascript
	Product.find({ title: /電視/i }, function (err, products) {
	  for (let index in products) {
		let temp = products[index];
		console.log(temp);
	  }
	})
	```

3. 使用特殊記號來表示。以下為指定 ==price== 值為大於等於 ==6000== 元的項目

	``` javascript
	Product.find({ price: { $gte: 6000 } }, function (err, products) {
	  for (let index in products) {
		let temp = products[index];
		console.log(temp);
	  }
	})
	```
## 刪除項目
---

使用搜尋條件來進行刪除

``` javascript
Product.remove({
  title: '電視機'
}, function (err) {
  if (err) {

  } else {
    console.log('成功刪除')
  }
});
```
## 更新項目
---

1. **更新單筆符合資料**

	以下的操作，為搜尋第一筆 ==title== 為 「 冰箱 」的資料，並對 ==title== 和 ==price== 進行修改/新增。

	``` javascript
	Product.update({ title: '冰箱' }, {
	  title: '大冰箱',
	  price: '400000'
	}, function (err) {
	  if (err) {
	  } else {
		console.log('更新')
	  }
	})
	```

2. **更新全部符合資料**

	若要更新所有符合搜尋條件的項目時，只要在第三個參數 opt 加上 ==multi: true== 即可
	``` javascript
	Product.update({
		title: '冰箱'
	  }, {
		title: '大冰箱',
		price: '400000'
	  }, {
		multi: true
	  }, function (err) {
		if (err) {
		} else {
		  console.log('更新')
		}
	})
	```





