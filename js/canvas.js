/*
* Altered original code from Ram Kulkarni (http://ramkulkarni.com)
*/

function startGuessTimer(){
  roundTimer = setTimeout(endGuessPhase, 30000);
}
var id;
function timer() {
  var elem = document.getElementById('myBar');
  var width = 0;
  id = setInterval(frame, 300);
  function frame() {
	  if (width == 100) {
      clearInterval(id);
	  }
	  else {
      width++;
      elem.style.width = width + '%';
    }
     
  }
}

function startScript()
{
  console.log('starting');
  playbackInterruptCommand = '';

  $(document).bind('ready', function()
  {
    $('#pauseBtn').hide();
    $('#playBtn').hide();

    drawing = new RecordableDrawing('canvas1');

    $('#recordBtn').click(function(){
      var btnTxt = $('#recordBtn').prop('value');
      if (btnTxt == 'Stop'){
        stopRecording();
        // timer.width = 100;
        console.log('iffffffstop');
      }
      else{
        startRecording();
        // setInterval(startRecording(), 300);
        // timer.width = 100;
        console.log('elseeeee start');
        startDrawTimer();
      }
    });

    $('#playBtn').click(function(){
      var btnTxt = $('#playBtn').prop('value');
      if (btnTxt == 'Stop')
        stopPlayback();
      else
        startPlayback();
    });

    $('#pauseBtn').click(function(){
      var btnTxt = $('#pauseBtn').prop('value');
      if (btnTxt == 'Pause')
      {
        pausePlayback();
      } else if (btnTxt == 'Resume')
      {
        resumePlayback();
      }
    });
    $('#clearBtn').click(function(){
      drawing.clearCanvas();
    });
  });

  function stopRecording()
  {
    $('#recordBtn').prop('value','Record');
    $('#playBtn').show();
    $('#pauseBtn').hide();
    $('#clearBtn').show();
    console.log(id + 'id here');

    // console.log('stop');
    // clearInterval(id);
    clearInterval(id);
    drawing.stopRecording();
  }

  function startRecording()
  {
    
    $('#recordBtn').prop('value','Stop');
    $('#playBtn').hide();
    $('#pauseBtn').hide();
    $('#clearBtn').hide();
    console.log('starting for 30 sec');

    drawing.startRecording();
    timer();
    // console.log('start recording w/ timer');
    setTimeout(function(){
      stopRecording();
    }, 30000);


    console.log('stop recording w/ timer');
    // stopRecording();
  }

  function stopPlayback()
  {
    playbackInterruptCommand = 'stop';
  }
  
  // export 
  function startPlayback()
  {
    timer();
    // startGuessTimer();
    drawing.playRecording(function() {
      //on playback start
      $('#playBtn').prop('value','Stop');
      $('#recordBtn').hide();
      $('#pauseBtn').show();
      $('#clearBtn').hide();
      playbackInterruptCommand = '';
    }, function(){
      //on playback end
      $('#playBtn').prop('value','Play');
      $('#playBtn').show();
      $('#recordBtn').show();
      $('#pauseBtn').hide();
      $('#clearBtn').show();
    }, function() {
      //on pause
      $('#pauseBtn').prop('value','Resume');
      $('#recordBtn').hide();
      $('#playBtn').hide();
      $('#clearBtn').hide();
    }, function() {
      //status callback
      return playbackInterruptCommand;
    });
  }


  function pausePlayback()
  {
    playbackInterruptCommand = 'pause';
  }

  function resumePlayback()
  {
    playbackInterruptCommand = '';
    drawing.resumePlayback(function(){
      $('#pauseBtn').prop('value','Pause');
      $('#pauseBtn').show();
      $('#recordBtn').hide();
      $('#playBtn').show();
      $('#clearBtn').hide();
    });
  }
}

RecordableDrawing = function (canvasId)
{
  var self = this;
  this.canvas = null;
  this.width = this.height = 0;
  this.actions = new Array();
  this.ctx = null;
  this.mouseDown = false;
  this.currentRecording = null; //instance of Recording
  this.recordings = new Array(); //array of Recording objects
  this.lastMouseX = this.lastMouseY = -1;
  this.bgColor = 'rgb(255,255,255)';
  var currentLineWidth = 5;
  var drawingColor = 'rgb(0,0,0)';
  var pauseInfo = null;

  onMouseDown = function(event)
  {
    // startRecording();
    drawing.startRecording();
    var canvasX = $(self.canvas).offset().left;
    var canvasY = $(self.canvas).offset().top;

    self.mouseDown = true;
    var x = Math.floor(event.pageX - canvasX);
    var y = Math.floor(event.pageY - canvasY);


    var	currAction = new Point(x,y,0);
    self.drawAction(currAction,true);
    if (self.currentRecording != null)
      self.currentRecording.addAction(currAction);
    event.preventDefault();
    return false;
  };

  onMouseMove = function(event)
  {
    if (self.mouseDown)
    {
      var canvasX = $(self.canvas).offset().left;
      var canvasY = $(self.canvas).offset().top;

      var x = Math.floor(event.pageX - canvasX);
      var y = Math.floor(event.pageY - canvasY);

      var action = new Point(x,y,1);
      if (self.currentRecording != null)
        self.currentRecording.addAction(action);
      self.drawAction(action, true);

      event.preventDefault();
      self.lastMouseX = x;
      self.lastMouseY = y;
      return false;
    }
  };

  onMouseUp = function(event)
  {
    self.mouseDown = false;
    self.lastMouseX = -1;
    self.lastMouseY = -1;
  };

  this.startRecording = function()
  {
    self.currentRecording = new Recording(this);
    self.recordings = new Array();
    self.recordings.push(self.currentRecording);
    self.currentRecording.start();
  };

  this.stopRecording = function()
  {
    if (self.currentRecording != null)
      self.currentRecording.stop();
    self.currentRecording = null;
  };

  this.playRecording = function(onPlayStart, onPlayEnd, onPause, interruptActionStatus)
  {
    if (typeof interruptActionStatus === 'undefined')
      interruptActionStatus = null;

    if (self.recordings.length == 0)
    {
      alert('No recording loaded to play');
      onPlayEnd();
      return;
    }

    self.clearCanvas();

    onPlayStart();

    self.pausedRecIndex = -1;

    for (var rec = 0; rec < self.recordings.length; rec++)
    {
      if (interruptActionStatus != null)
      {
        var status = interruptActionStatus();
        if (status == 'stop') {
          pauseInfo = null;
          break;
        }
        else
        if (status == 'pause') {
          __onPause(rec-1, onPlayEnd, onPause, interruptActionStatus);
          break;
        }
      }
      self.recordings[rec].playRecording(self.drawActions, onPlayEnd, function(){
        __onPause(rec-1, onPlayEnd, onPause, interruptActionStatus);
      }, interruptActionStatus);
    }
  };

  function __onPause(index, onPlayEnd, onPause, interruptActionStatus)
  {
    pauseInfo = {
      'index': index,
      'onPlayend': onPlayEnd,
      'onPause':onPause,
      'interruptActionStatus': interruptActionStatus
    };
    if (onPause)
      onPause();
  }

  this.resumePlayback = function (onResume)
  {
    if (pauseInfo == null) {
      if (onResume)
        onResume(false);
      return;
    }

    var index = pauseInfo.index;
    var onPlayEnd = pauseInfo.onPlayend;
    var interruptActionStatus = pauseInfo.interruptActionStatus;
    var onPause = pauseInfo.onPause;

    if (self.recordings.length == 0)
    {
      alert('No recording loaded to play');
      onPlayEnd();
      return;
    }

    onResume(true);

    pauseInfo = null;

    for (var rec = index; rec < self.recordings.length; rec++)
    {
      if (interruptActionStatus != null)
      {
        var status = interruptActionStatus();
        if (status == 'stop')
          break;
        else if (status == 'pause')
        {
          __onPause(rec-1, onPlayEnd, onPause, interruptActionStatus);
          break;
        }
      }
      self.recordings[rec].playRecording(self.drawActions, onPlayEnd, function(){
        __onPause(rec-1, onPlayEnd, onPause, interruptActionStatus);
      },interruptActionStatus);
    }
  };

  this.clearCanvas = function()
  {
    self.ctx.fillStyle = self.bgColor;
    self.ctx.fillRect(0,0,self.canvas.width,self.canvas.height);
  };

  this.removeAllRecordings = function()
  {
    self.recordings = new Array();
    self.currentRecording = null;
  };

  this.drawAction = function (actionArg, addToArray)
  {
    var x = actionArg.x;
    var y = actionArg.y;

    switch (actionArg.type)
    {
    case 0: //moveto
      self.ctx.beginPath();
      self.ctx.moveTo(x, y);
      self.ctx.strokeStyle = self.drawingColor;
      self.ctx.lineWidth = self.currentLineWidth;
      break;
    case 1: //lineto
      self.ctx.lineTo(x,y);
      self.ctx.stroke();
      break;
    }
    if (addToArray)
      self.actions.push(actionArg);
  };

  __init = function()
  {
    self.canvas = $('#' + canvasId);
    if (self.canvas.length == 0)
    {
      return;
    }
    self.canvas = self.canvas.get(0);
    self.width = $(self.canvas).width();
    self.height = $(self.canvas).height();
    self.ctx = self.canvas.getContext('2d');

    //$(self.canvas).bind("vmousedown", onMouseDown);
    //$(self.canvas).bind("vmouseup", onMouseUp);
    //$(self.canvas).bind("vmousemove", onMouseMove);

    $(self.canvas).bind('mousedown', onMouseDown);
    $(self.canvas).bind('mouseup', onMouseUp);
    $(self.canvas).bind('mousemove', onMouseMove);

    self.clearCanvas();
  };

  __init();
};

Recording = function (drawingArg)
{
  var self = this;
  this.drawing = drawingArg;
  this.timeSlots = new Object(); //Map with key as time slot and value as array of Point objects

  this.buffer = new Array(); //array of Point objects
  this.timeInterval = 100; //10 miliseconds
  this.currTime = 0;
  this.started = false;
  this.intervalId = null;
  this.currTimeSlot = 0;
  this.actionsSet = null;
  this.currActionSet = null;
  this.recStartTime = null;
  this.pauseInfo = null;

  this.start = function()
  {
    self.currTime = 0;
    self.currTimeSlot = -1;
    self.actionsSet = null;
    self.pauseInfo = null;

    self.recStartTime = (new Date()).getTime();
    self.intervalId = window.setInterval(self.onInterval, self.timeInterval);
    self.started = true;
  };

  this.stop = function()
  {
    if (self.intervalId != null)
    {
      window.clearInterval(self.intervalId);
      self.intervalId = null;
    }
    self.started = false;
  };

  this.onInterval = function()
  {
    if (self.buffer.length > 0)
    {
      var timeSlot = (new Date()).getTime() - self.recStartTime;

      if (self.currActionSet == null)
      {
        self.currActionSet = new ActionsSet(timeSlot, self.buffer);
        self.actionsSet = self.currActionSet;
      }
      else
      {
        var tmpActionSet = self.currActionSet;
        self.currActionSet = new ActionsSet(timeSlot, self.buffer);
        tmpActionSet.next = self.currActionSet;
      }

      self.buffer = new Array();
    }
    self.currTime += self.timeInterval;
  };

  this.addAction = function(actionArg)
  {
    if (!self.started)
      return;
    self.buffer.push(actionArg);
  };

  this.playRecording = function(callbackFunctionArg, onPlayEnd, onPause, interruptActionStatus)
  {
    if (self.actionsSet == null)
    {
      if (typeof onPlayEnd !== 'undefined' && onPlayEnd != null)
        onPlayEnd();
      return;
    }

    self.scheduleDraw(self.actionsSet,self.actionsSet.interval,callbackFunctionArg, onPlayEnd, onPause, true, interruptActionStatus);
  };

  this.scheduleDraw = function (actionSetArg, interval, callbackFunctionArg, onPlayEnd, onPause, isFirst, interruptActionStatus)
  {
    window.setTimeout(function(){
      var status = '';
      if (interruptActionStatus != null)
      {
        status = interruptActionStatus();
        if (status == 'stop')
        {
          self.pauseInfo = null;
          onPlayEnd();
          return;
        }
      }

      if (status == 'pause')
      {
        self.pauseInfo = {
          'actionset':actionSetArg,
          'callbackFunc':callbackFunctionArg,
          'onPlaybackEnd':onPlayEnd,
          'onPause':onPause,
          'isFirst':isFirst,
          'interruptActionsStatus':interruptActionStatus
        };

        if (onPause)
          onPause();
        return;
      }

      var intervalDiff = -1;
      var isLast = true;
      if (actionSetArg.next != null)
      {
        isLast = false;
        intervalDiff = actionSetArg.next.interval - actionSetArg.interval;
      }
      if (intervalDiff >= 0)
        self.scheduleDraw(actionSetArg.next, intervalDiff, callbackFunctionArg, onPlayEnd, onPause, false,interruptActionStatus);

      self.drawActions(actionSetArg.actions, onPlayEnd, isFirst, isLast);
    },interval);
  };

  this.resume = function()
  {
    if (!self.pauseInfo)
      return;

    self.scheduleDraw(self.pauseInfo.actionset, 0,
      self.pauseInfo.callbackFunc,
      self.pauseInfo.onPlaybackEnd,
      self.pauseInfo.onPause,
      self.pauseInfo.isFirst,
      self.pauseInfo.interruptActionsStatus);

    self.pauseInfo = null;
  };

  this.drawActions = function (actionArray, onPlayEnd, isFirst, isLast)
  {
    for (var i = 0; i < actionArray.length; i++)
      self.drawing.drawAction(actionArray[i],false);

    if (isLast)
    {
      onPlayEnd();
    }
  };
};

Action = function()
{
  var self = this;
  this.actionType; // 1 - Point, other action types could be added later
  this.x = 0;
  this.y = 0;
  this.isMovable = false;
  this.index = 0;

  if (arguments.length > 0)
  {
    self.actionType = arguments[0];
  }
  if (arguments.length > 2)
  {
    self.x = arguments[1];
    self.y = arguments[2];
  }
};

Point = function (argX,argY,typeArg)
{
  var self = this;
  this.type = typeArg; //0 - moveto, 1 - lineto

  Action.call(this,1,argX,argY);
};

Point.prototype = new Action();

ActionsSet = function (interalArg, actionsArrayArg)
{
  var self = this;

  this.actions = actionsArrayArg;
  this.interval = interalArg;
  this.next = null;
};
