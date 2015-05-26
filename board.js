// Objects
var Canvas = jQuery("#DrawingBoard");
var Context = Canvas[0].getContext("2d");
var CanvasSm = jQuery("#DrawingBoardNote");
var ContextSm = CanvasSm[0].getContext("2d");

var ColorPalette = jQuery("#ColorPalette");
var MousePosition = {x:0,y:0};

var Palette = ["black", "gray", "lightgray", "white", "red", "orangered", "orange", "gold", "yellow", "limegreen", "green", "seagreen", "blue", "indigo", "rebeccapurple", "violet",  
               "pink", "NavajoWhite", "sandybrown", "peru", "saddlebrown"];

// Vars
var IsDrawing = false;
var DrawingColor = "black";

// Events
jQuery(document).ready(Main);

Canvas.mousemove(function(e){MouseMove(e);});
Canvas.mousedown(function(e){MouseDown(e);});
Canvas.mouseleave(function(e){MouseLeave(e);});
Canvas.mouseup(function(e){MouseUp(e);});

CanvasSm.mousemove(function(e){MouseMove(e);});
CanvasSm.mousedown(function(e){MouseDown(e);});
CanvasSm.mouseleave(function(e){MouseLeave(e);});
CanvasSm.mouseup(function(e){MouseUp(e);});

$(document).on("click", ".ColorChoice", function(){DrawingColor = $(this).css("background-color");});

// Program Flow
function Main() 
{
  Context.fillStyle="#000000";
  ContextSm.fillStyle="#000000";
  
  BuildColorPalette();
}

function MouseMove(e) 
{

  GrabMousePosition(e);
  
  if (IsDrawing)
  {
    Context.strokeStyle=DrawingColor;
    ContextSm.strokeStyle = Context.strokeStyle;
    Context.lineTo(MousePosition.x, MousePosition.y);
    Context.stroke();
    ContextSm.lineTo(MousePosition.x, MousePosition.y);
    ContextSm.stroke();
  }
}

function BuildColorPalette()
{
  Palette.forEach(function(element){AddColor(element);});
}

function AddColor(color) {
  ColorPalette.append("<li class=\"ColorChoice\" id=\""+color+"\">" + color + "</li>");
  $("#" + color).css("background-color", color).text("");
}

function MouseDown(e)
{
  GrabMousePosition(e);
  if (IsDrawing == false)
  {
    Context.beginPath();
    Context.moveTo(MousePosition.x, MousePosition.y);
    ContextSm.beginPath();
    ContextSm.moveTo(MousePosition.x, MousePosition.y);
    IsDrawing = true;
  }
}

function MouseUp(e)
{
  Context.closePath();
  ContextSm.closePath();
  IsDrawing = false;
}

function MouseLeave(e)
{
  Context.closePath();
  ContextSm.closePath();
  IsDrawing = false;
}

function GrabMousePosition(e)
{
  MousePosition.x = e.offsetX;
  MousePosition.y = e.offsetY;
}
