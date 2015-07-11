$(document).ready(function() {
  var countDown = 10;
  var limit = 50;
  var solutionGlobal;
  var score=0;
  var firstTime = true;
  solutionGlobal = generateQuestion(limit);

  function addTime() {
    countDown++;
  }

  function minusTime() {
    countDown--;
  }

  function updateTime() {
    var plural;
    if (countDown == 1) {
      plural = ""
    } else {
      plural = "s"
    }

    $('#timer').html(countDown + " second" + plural + " left!");
  }

  function buildOptions() {
    var array = [];
    $('.math-options').each(function() {
      if ($(this).is(':checked')) {
        array.push($(this).val());
      }
    })
    return array;
  }


  $('#arithmetic').change(function() {
    arithmeticArray = buildOptions();
  })


  function generateQuestion() {
    var arithmeticArray = buildOptions();
    var limit = $('#the-limit').val();
    if (limit!=0) {
      var number1 = limit;
      var number2 = limit;
      var arithmeticSelect = Math.floor(Math.random()*arithmeticArray.length);
      while(number1>=limit || number2>=limit) {
        number1 = Math.floor(Math.random()*limit);
        number2 = Math.floor(Math.random()*limit); 
      }
      var question = number1 + " " + arithmeticArray[arithmeticSelect] + " " + number2
      $('#question').html(question);
      return eval(question);
    } else {
      window.alert("Limit cannot be 0");
    }
  }

  function checkAnswer(answer,solution) {
    if ((answer===solution)&&countDown) {
      return true;
    }
  }

  $('#the-limit').change(function() {
    $('#show-limit').html($(this).val());
    console.log($(this).val());
  })

  $('#submit-answer').keyup(function() {
    var answer = Number($(this).val());
    if(checkAnswer(answer,solutionGlobal)) {
      solutionGlobal = generateQuestion(limit);
      $(this).val("");
      if(firstTime){
        var timer = setInterval(function() {
          minusTime();
          updateTime();
          changeColor();
          if (countDown<=0) {
            clearInterval(timer);
            $('#timer').html('GAME OVER');
            $('#question').html('Your Score is: ' + score);
          }
        },1000);
        firstTime=false;
      }
      var catify = $('#catify').is(':checked');
      addTime();
      updateTime();
      solutionGlobal = generateQuestion(limit);
      score++;
      if (catify) {
        createCats();
      }
    }
  })

  function changeColor() {
    switch (countDown) {
      case 5:
        $('body').css({ "background-color": "rgba(39, 174, 96,1.0)"});
        break;
      case 4:
        $('body').css({ "background-color": "rgba(69, 150, 85 ,1.0)"}  );
        break;
      case 3:
        $('body').css({ "background-color": "rgba(100, 127, 74,1.0)"});
        break;
      case 2:
        $('body').css({ "background-color": "rgba(130, 103, 64,1.0)"});
        break;
      case 1:
        $('body').css({ "background-color": "rgba(161, 80, 53,1.0)"});
        break;
      case 0:
        $('body').css({ "background-color": "rgba(192, 57, 43 ,1.0)"});
        break;
    }
  }

  //FUN
  function createCats() {
    //generate 3 random numbers
    var catGrabber = Math.floor(Math.random()*8)+1;
    var catX = Math.floor(Math.random()*1200);
    var catY = Math.floor(Math.random()*600);
    document.getElementById('player').play()

    //seelect container and add in cats
    $('.container-fluid').append('<img src="img/cats/cat'+ catGrabber + '.png" style="top:'+ catY + 'px; left:'+ catX + 'px">');
  }

});
