
var contacts = [
    {
        id:1,
        name: "Friends",
        type: "Group",
        contacts: [
            {id:2, name: "Udi", type: "Contact"},
            {id:3, name: "Tommy", type: "Contact"},
            {
                id:6,
                name: "Old Friends",
                type: "Group",
                contacts: [
                    {id:7, name: "Itay", type: "Contact"},
                ]
            },
        ]
    },
    {
        id:4,
        name: "Family",
        type: "Group",
        contacts: [
            {id:5, name: "Roni", type: "Contact"},
        ]
    },
    {id: 8, name: "Ori", type: "Contact"},
];

var firstInit= function(){
  for(var i=0; i<contacts.length; i++){
  var newChild  = $('<div></div>')
    .addClass("contact")
    .attr('id', "a"+i)
    .text(contacts[i].name);
    
    if(contacts[i].type=="Group"){
        newChild.addClass('group close');
    }
    $('#tree').append(newChild);
  }
  $('#tree').click(onGroupClick);
}

var onGroupClick= function(event){

  var theGroup= $("#"+event.target.id);
  $(".pick").removeClass("pick");
  theGroup.addClass("pick");

  if(!theGroup.hasClass("group"))
    return;
  if(theGroup.hasClass("open")){
    theGroup.children('.contact').each(function () {
      this.remove(); 
    });
    theGroup.removeClass("open");
    theGroup.addClass("close");

  }
  else{
    var loc=theGroup.attr('id');
    var children=getLocationArray(loc);
    for(var i=0; i<children.length; i++){
      var newChild  = $('<div></div>')
        .addClass("contact")
        .attr('id', ""+loc+"_"+i)
        .text(children[i].name);
    
      if(children[i].type=="Group"){
        newChild.addClass('group close');
      }
      theGroup.append(newChild);
    }
    theGroup.addClass("open");
    theGroup.removeClass("close");
  }

}

var getLocationArray= function(loc){
  var path=loc.slice(1);
  path=path.split("_");
  var res=contacts
  for(var i=0; i<path.length; i++){
    res=res[path[i]].contacts;
  }
  return res;

}


$(document).ready(firstInit);
