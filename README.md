# オンラインクイズアプリケーション2(仮)

## 紹介:Info
~~~
これはオンライン上でクイズ形式の問題を解答することで学習するためのアプリケーションです。
誰(非ログイン)でも問題に解答することができますが、ユーザ登録することで成績を記録することができ、他のユーザと成績を競ったり学習状況を把握することができます。
問題を作成することも可能ですが、作成するためにはまず権限を得る申請が必要になります。
~~~

~~~
※注意
登録した情報はこのアプリケーションの使用以外の目的では利用しません。
個人で作成しているため、バグが多かったりセキュリティ面が弱いかもしれません。個人情報やパスワードなどは注意してください。

2016年内には完成予定。。。かも知れません。
~~~

---
## 試してみる:Play
現在テストプレイ中です。多くの機能は未実装です。  
2016年5月26日の時点の実装済み機能
  - ユーザ登録、ログイン、ログアウト

https://quizwebapp2.herokuapp.com/

---
## 概要:About
+ Web上で学習するためのWebアプリケーションです。
+ 学習者はパソコンやスマホなどのブラウザ上で動作します。
+ 問題作成は申請後に許可されたユーザのみ可能です。
+ さまざまなクイズ形式の問題を解答することで勉強していきます。
+ 成績などはデータベース(SQLite)に記録され、グラフなどで可視化されます。
+ スマホ版アプリではオフラインでの学習も予定しています。

---
## 開発について:Environment
+ 開発環境は[VisualStudioCode]を利用しています。
+ ソースコードの管理は[GitHub]を利用しています。
+ 実行環境は[Heroku]を利用します。
+ 開発は[Express] ([Node.js])を利用しています。
+ 学習以外の部分はHTMLベース、学習(クイズ)部分はJavascriptベースの予定です。
  + HTMLの表示関連には[AngularJS]を利用しています。
  + クイズの描画には[phina.js]を利用する予定です。
+ スマホアプリへの変換は[Cordova]を利用する予定です。

---
## やるべきこと:ToDo
詳細は[Wiki]を御覧ください。
+ ~~実行環境の準備~~(2016年5月10日完了)
+ 開発環境に関する学習。(随時)
  + [Express]および[AngularJS]について
  + Gitについて
+ 実装する機能
  + ユーザ管理
  + 問題作成
  + 問題検索
  + 成績の管理(可視化など)
+ その他いろいろ

---
## 以前作成したクイズアプリ:Old Version
[オンライン勉強会-ON会-]

[Cloud9]: https://c9.io/
[Ionic]: http://ionicframework.com/
[Node.js]: http://nodejs.jp/
[AngularJS]: https://angularjs.org/
[phina.js]: https://github.com/phi-jp/phina.js
[Cordova]: https://cordova.apache.org/
[Heroku]: https://www.heroku.com/home
[GitHub]: https://github.com "GitHub"
[VisualStudioCode]: https://www.visualstudio.com/ja-jp/products/code-vs.aspx
[Express]: http://expressjs.com/ja/

[Wiki]: https://github.com/snowman8765/quizwebapp/wiki

[オンライン勉強会-ON会-]: http://snowman8765.sakura.ne.jp/onkai/
