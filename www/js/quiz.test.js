// グローバルに展開
phina.globalize();

// 定数
var ASSETS = {
  image: {},
  font: {
    //'honoka': 'https://fonts.googleapis.com/css?family=Lobster'
  },
  sound: {},
  script: {}
};
var SCREEN_WIDTH =640;
var SCREEN_HEIGHT = 960;

//============================================
// タイトルシーン
//============================================
phina.define('MyTitleScene', {
  superClass: 'DisplayScene',
  
  init: function() {
    this.superInit();
    
    var titleArea = RectangleShape(
      {
        width: SCREEN_WIDTH - 10,
        height: SCREEN_HEIGHT/16,
        fill: "#ffccff",
        stroke: null,
        cornerRadius: 8,
      }
    ).addChildTo(this);
    titleArea.x = this.gridX.center();
    titleArea.y = titleArea.height/2;
    
    var title = Label({
      text:QUIZ_DATA[0].title,
      fontSize:40,
      fontFamily:"honoka",
      textAlign: "center"
    }).addChildTo(titleArea);
    //title.x = this.gridX.center();
    //title.y = this.gridY.center()-SCREEN_HEIGHT/4;
    
    var qArea = RectangleShape(
      {
        width: SCREEN_WIDTH - 10,
        height: SCREEN_HEIGHT/2 - titleArea.height,
        fill: "#ccccff",
        stroke: null,
        cornerRadius: 8,
      }
    ).addChildTo(this);
    qArea.x = this.gridX.center();
    qArea.y = SCREEN_HEIGHT/2 - qArea.height/2 + titleArea.height/2;
    
    var qComment = Label({
      //text:QUIZ_DATA[0].comment,
      text:"aaaaaaaaaaa\nbbbbbbbbbbbbb\nccccccccccccccc",
      fontSize:40,
      fontFamily:"honoka",
      textAlign: "left"
    }).addChildTo(qArea);
    //qComment.x = this.gridX.center();
    //qComment.y = this.gridY.center()+SCREEN_HEIGHT/4;
    
    var selectArea = RectangleShape(
      {
        width: SCREEN_WIDTH - 10,
        height: SCREEN_HEIGHT/2 - titleArea.height,
        fill: "#88ff88",
        stroke: null,
        cornerRadius: 8,
      }
    ).addChildTo(this);
    selectArea.x = this.gridX.center();
    selectArea.y = SCREEN_HEIGHT/2 + selectArea.height/2 + titleArea.height;
    
    
    var qGroup = DisplayElement().addChildTo(selectArea);
    //qGroup.setPosition(-selectArea.width/4,-selectArea.height/4);
    var qGridX = Grid({
      width: selectArea.width,
      columns: 3
    });
    var qGridY = Grid({
      width: selectArea.height,
      columns: 2
    });
    var selectButton = [
      Button({
        text:QUIZ_DATA[0].select1,
        fontSize:40,
        textAlign: "left"
      }),
      Button({
        text:QUIZ_DATA[0].select2,
        fontSize:40,
        textAlign: "left"
      }),
      Button({
        text:QUIZ_DATA[0].select3,
        fontSize:40,
        textAlign: "left"
      }),
      Button({
        text:QUIZ_DATA[0].select4,
        fontSize:40,
        textAlign: "left"
      }),
      Button({
        text:QUIZ_DATA[0].select5,
        fontSize:40,
        textAlign: "left"
      }),
      Button({
        text:QUIZ_DATA[0].select6,
        fontSize:40,
        textAlign: "left"
      })
    ];
    var i=0,j=0,k=0;
    Array.range(3).each(function(spanY) {
      Array.range(2).each(function(spanX) {
        var button = selectButton[k++];
        button.addChildTo(qGroup);
        button.setPosition(qGridX.span(spanX), qGridY.span(spanY));
      });
    });
    
    //console.log(QUIZ_DATA[0]);
  },

  update: function(app) {
  },
  
  onclick:function(){
    //次のシーンへ移動
    this.exit();
  }
});


//============================================
// メインシーン
//============================================
phina.define('MyMainScene', {
  superClass: 'DisplayScene',
  
  init: function() {
    this.superInit();
    
    var gx = this.gridX;
    var gy = this.gridY;
    
    var circle = CircleShape().addChildTo(this);
    circle.setPosition(gx.center(-4), gy.center(-2));
    
    var rect = RectangleShape().addChildTo(this);
    rect.setPosition(gx.center(), gy.center(-2));
    
    var triangle = TriangleShape().addChildTo(this);
    triangle.setPosition(gx.center(4), gy.center(-2));
    
    var plygon = PolygonShape().addChildTo(this);
    plygon.setPosition(gx.center(-4), gy.center(2));
    
    var star = StarShape().addChildTo(this);
    star.setPosition(gx.center(0), gy.center(2));
    
    var heart = HeartShape().addChildTo(this);
    heart.setPosition(gx.center(4), gy.center(2));
  },
  onclick:function(){
    //次のシーンへ移動
    this.exit();
  }
});

//============================================
// リザルトシーン
//============================================
phina.define('MyResultScene', {
  superClass: 'DisplayScene',
  
  init: function() {
    this.superInit();
    
    var label = Label('MyResultScene').addChildTo(this);
    label.x = this.gridX.center();
    label.y = this.gridY.center();
  },
  onclick:function(){
    //次のシーンへ移動
    this.exit();
  }
});


//============================================
// マネージャーシーン
//============================================
phina.define('MyManagerScene' , {
  superClass: 'ManagerScene' ,
  init: function() {
    this.superInit({
      scenes: [
        {
          className: 'MyTitleScene',
          label: 'title',
          nextLabel: 'main',
        },
        {
          className: 'MyMainScene',
          label: 'main',
          nextLabel: 'result',
        },
        {
          className: 'MyResultScene',
          label: 'result',
          nextLabel: 'title',
        },
      ]
    });
  }
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'title',
    assets: ASSETS,       // アセット読み込み
  });
  
  app.replaceScene(MyManagerScene());
  
  app.run();
});
