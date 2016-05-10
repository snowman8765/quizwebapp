# quizwebapp
オンラインクイズアプリケーション

## サンプル
+ 機能は未実装。  
https://quizwebapp2.herokuapp.com/

## 概要
+ Web上で学習するためのWebアプリケーションです。
+ 学習者はパソコンやスマホなどのブラウザ上で動作します。
+ クイズ形式の問題を解答することで勉強していきます。
+ 成績などはデータベース(SQLite)に記録されます。

## 開発について
+ 開発環境は[Cloud9][1]を利用しています。
+ 開発は[ionic][2]([node.js][3])をベースに行う予定です。
+ 学習以外の部分はHTMLベース、学習(クイズ)部分はJavascriptベースの予定です。
+ HTMLの表示関連には[angular.js][4]を利用する予定です。([ionic][2]を利用するため)
+ クイズの描画には[phina.js][5]を利用する予定です。
+ スマホアプリへの変換は[cordova][6]を利用する予定です。

## ToDo
+ いろいろ。

## 更新履歴
+ 2016/05/10
  + Wikiを作成し、開発メモの内容をWikiに移動
+ 2016/05/09
  + サンプルサイトの作成
  + README.mdの新規作成

----
## 以前作成したクイズアプリ
[オンライン勉強会-ON会-](http://snowman8765.sakura.ne.jp/onkai/)

[1]: https://c9.io/ "Cloud9"
[2]: http://ionicframework.com/ "Ionic"
[3]: http://nodejs.jp/ "Node.js 日本ユーザグループ"
[4]: https://angularjs.org/ "AngularJS"
[5]: https://github.com/phi-jp/phina.js "phi-jp/phina.js"
[6]: https://cordova.apache.org/ "Apache Cordova"
