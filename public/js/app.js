
var NavItem = React.createClass({
  render:function(){
    return(
      <button type="button" className="btn btn-default" id={this.props.id}>
        <span >{this.props.name}</span>
      </button>
    );
  }
});
var NavItemToolBar = React.createClass({
  render:function(){
    return(
      <button type="button">
        <span className={this.props.className}></span>
      </button>
    );
  }
});
var NavBar = React.createClass({
  buildItemList: function(menuItems) {
    var items=[];
    menuItems.forEach(function(item,i){
      items.push(
        <NavItem name={item.name} key={i} />
      );
    });
    return items;
  },
  buildItemsToolBar: function(menuBarTool) {
    var itemsToolBar=[];
    menuBarTool.forEach(function(item,i){
      itemsToolBar.push(
        <NavItemToolBar className={item.className} key={i} />
      );
    });
    return itemsToolBar;
  },
  render: function(){
    var items = this.buildItemList(this.props.menuItems);
    var itemsToolBar = this.buildItemsToolBar(this.props.menuBarTool); 
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="menu-bar">
          <div className="title-bar">
            <h1>Diagram E-R</h1>
          </div>
            <div className="btn-toolbar" role="group">
                <div className="btn-group">
                    {items}
                </div>
            </div>
            <div className="btn-toolbar" role="group">
                <div className="btn-group btn-group-lg">
                    {itemsToolBar}
                </div>
            </div>
        </div>
      </nav>
    );
  }
  
});
var ItemToolBar = React.createClass({
  drag: function(e){
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  render: function(){
    return(
      <div id="cuadrado1" className="draggable" draggable="true" onClick={this.drag} onDragStart={this.drag}></div>
    );
  }
});
var ToolBox = React.createClass({
  render:function(){
    return(
      <div className="gui-left-container">
        <div className = "tool-box-container">
          <div className="tool-box">
                <div className="panel">
                  <h3 title="Entity Relationship"><span>Diagramas</span></h3>
                </div>
              <ItemToolBar />
                <div></div>
          </div>
        </div>
      </div>
    );
  }
});
var Rectangle = React.createClass({
    render: function() {
        return <rect className="draggable" x="30" y="30" stroke-width="2" stroke="black" width="29" height="29" fill="blue" transform="matrix(1 0 0 1 0 0)" />;
    }
});
var Drawer = React.createClass({
  getInitialState: function() {
    return {
      items:[]
    };
  },
  selectElement: function (evt) {
    selectedElement = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
    for(var i=0; i<currentMatrix.length; i++) {
      currentMatrix[i] = parseFloat(currentMatrix[i]);
    }
    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
  },
  moveElement:function (evt) {
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentMatrix[4] += dx;
    currentMatrix[5] += dy;
    selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
    currentX = evt.clientX;
    currentY = evt.clientY;
    },
  deselectElement:function (evt) {
    if(selectedElement != 0){
      selectedElement.removeAttributeNS(null, "onmousemove");
      selectedElement.removeAttributeNS(null, "onmouseout");
      selectedElement.removeAttributeNS(null, "onmouseup");
      selectedElement = 0;
    }
  },

drop: function(ev){
    ev.preventDefault();
    var newitem = this.state.items.slice();
    var i=newitem.length;
    var newx=ev.clientX-200;
    var newy=ev.clientY-200;
    var newRect=<rect className="draggable" x={newx} y={newy} strokeWidth="2" stroke="black"   key={i}  width="79" height="79" fill="white" transform="matrix(1 0 0 1 0 0)" onMouseDown={this.selectElement} />;
    var newitem = this.state.items.slice();
    newitem.push(newRect);
    this.setState({items: newitem});
  },
  allowDrop:function(ev){
    ev.preventDefault();
  },
  render: function(){
     return(
      <div className="gui-bottom-container">
        <div className="viewport-container" >
          <div className="viewport-scrollable" >
            <svg id="areaTrabajo" height="300" width="400" onDrop={this.drop} onDragOver={this.allowDrop} >
            </svg>
          </div>
        </div>
      </div>
    );
 } 
});
var AppViewer = React.createClass({
 render: function() {
  return ( 
    <div>
      <div id="content" className="window window-full">
        <div className="row">
          <Drawer />
          <ToolBox />
        </div>
        <NavBar menuItems={this.props.menuItems} menuBarTool={this.props.menuBarTool} />
      </div> 
    </div>
  );
 }
});
var menuItems = [
  {name: "Archivo"},
  {name: "Editar"},
  {name: "Ver"},
  {name: "Pagina"},
  {name: "Compartir"},
  {name: "Ayuda"}
]
var menuBarTool = [
  {className: "glyphicon glyphicon-file"},
  {className: "glyphicon glyphicon-time"},
  {className: "glyphicon glyphicon-euro"},
  {className: "glyphicon glyphicon-pencil"},
  {className: "glyphicon glyphicon-search"},
  {className: "glyphicon glyphicon-glass"}
]
ReactDOM.render(
  <AppViewer  menuItems={menuItems} menuBarTool={menuBarTool} />,
  document.getElementById('app')
);