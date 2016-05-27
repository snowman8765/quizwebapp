// グローバルに展開
phina.globalize();

// 定数
var ASSETS = {
  image: {},
  font: {
    "honoka": "https://fonts.googleapis.com/css?family=Lobster"
  },
  sound: {},
  script: {}
};

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;
var TITLE_WIDTH = SCREEN_WIDTH - 10;
var TITLE_HEIGHT = SCREEN_HEIGHT / 16;
var SPACE_HEIGHT = TITLE_HEIGHT / 2;

phina.define("TitleArea", {  
  superClass: "RectangleShape",

  init: function(title) {
    this.superInit({
        width: TITLE_WIDTH,
        height: TITLE_HEIGHT,
        fill: "#ffccff",
        stroke: null,
        cornerRadius: 8
    });
    
    var title = Label({
      text: title,
      fontSize: 60,
      fontFamily: "honoka",
      textAlign: "center"
    }).addChildTo(this);
  }
});

phina.define("QuizArea", {  
  superClass: "RectangleShape",

  init: function(title) {
    this.superInit({
        width: SCREEN_WIDTH - 10,
        height: SCREEN_HEIGHT/2 - TITLE_HEIGHT,
        fill: "#ccccff",
        stroke: null,
        cornerRadius: 8
    });
    
    var title = Label({
      text: title,
      fontSize: 48,
      fontFamily: "honoka",
      textAlign: "center"
    }).addChildTo(this);
  }
});

phina.define("AnswerArea", {  
  superClass: "RectangleShape",

  init: function(answer, scene) {
    this.superInit({
      width: SCREEN_WIDTH - 10,
      height: SCREEN_HEIGHT/2 - SPACE_HEIGHT*2,
      fill: "#88ff88",
      stroke: null,
      cornerRadius: 8
    });
    
    var temp_num = answer.length+1;
    var col = 2;
    var row = parseInt(temp_num/2);
    console.log("ans:"+answer.length+",col:"+col+",row:"+row);
    this.group = DisplayElement().addChildTo(this);
    this.gridX = Grid(this.width, col);
    this.gridY = Grid(this.height, row);
    
    var btnHeight = 0;
    for(var ans in answer) {
      var selButton = Button({
        width: this.width/col - 10,
        height: this.height/row - 16,
        text: answer[ans],
        fontSize: 36,
        textAlign: "left"
      }).addChildTo(this.group);
      selButton.setPosition(this.gridX.span(ans%2), this.gridY.span(parseInt(ans/2)));
      selButton.id = parseInt(ans)+1;
      selButton.setInteractive(true);
      selButton.on("pointend", function() {
        console.log("clicked:"+this.id);
        scene.exit({your_answer:this.id});
      }, selButton);
      btnHeight = selButton.height;
    }
    if(answer.length <= 2) {
      this.group.setPosition(-this.gridX.center()/2, 0);
    } else if(answer.length <= 4) {
      this.group.setPosition(-this.gridX.center()/2, -this.gridY.center()/2);
    } else {
      this.group.setPosition(-this.gridX.center()/2, -this.gridY.center()/2-btnHeight/row+16/2);
    }
  }
});

//============================================
// タイトルシーン
//============================================
phina.define("MyTitleScene", {
  superClass: "DisplayScene",
  
  init: function() {
    this.superInit();
    
    this.setInteractive(false)
    
    //console.log(QUIZ_DATA);
    var titleArea = TitleArea(QUIZ_DATA.title).addChildTo(this);
    titleArea.setPosition(
      this.gridX.center(),
      titleArea.height/2
    );
    
    var qArea = QuizArea("aaaaaaaaaaa\nbbbbbbbbbbbbb\nccccccccccccccc").addChildTo(this);// QuizArea(qData.comment);
    qArea.setPosition(
      this.gridX.center(),
      this.gridY.center() - qArea.height/2 + SPACE_HEIGHT
    );
    
    var tempList = [
      QUIZ_DATA.select1,
      QUIZ_DATA.select2,
      QUIZ_DATA.select3,
      QUIZ_DATA.select4,
      QUIZ_DATA.select5,
      QUIZ_DATA.select6
    ];
    var selectList = $.grep(tempList, function(e){return e;}); // 空要素の削除
    var selectArea = AnswerArea(selectList, this).addChildTo(this);
    selectArea.setPosition(
      this.gridX.center(),
      this.gridY.center() + qArea.height/2 + SPACE_HEIGHT*2
    );
  },

  update: function(app) {
  }
});

//============================================
// リザルトシーン
//============================================
phina.define("MyResultScene", {
  superClass: "DisplayScene",
  
  jsonData:null,
  
  init: function(param) {
    this.superInit();
    
    var self = this;
    
    $.getJSON("/quiz/single/answer/"+QUIZ_DATA.id,
      {
        answer: param.your_answer,
        user_id: ""
      },
      function(json){
        console.log(json);
        self.jsonData = json;
        self.label.text = "answer="+json.comment;
      }
    );
    this.label = Label("zzz").addChildTo(this);
    this.label.x = this.gridX.center();
    this.label.y = this.gridY.center();
  },

  update: function(app) {
  },
  
  onclick:function(){
    //次のシーンへ移動
    this.exit();
  }
});


//============================================
// マネージャーシーン
//============================================
phina.define("MyManagerScene" , {
  superClass: "ManagerScene" ,
  init: function() {
    this.superInit({
      scenes: [
        {
          className: "MyTitleScene",
          label: "title",
          nextLabel: "result",
        },
        {
          className: "MyResultScene",
          label: "result",
          nextLabel: "title",
          arguments: {}
        },
      ]
    });
  }
});

phina.main(function() {
  var app = GameApp({
    startLabel: "title",
    assets: ASSETS,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  });
  
  console.log(QUIZ_DATA);
  
  app.replaceScene(MyManagerScene());
  
  app.fps = 30;
  app.run();
});
