(function(){

  function Compile(obj){

    var num = 0;
    var currentNum = num;
    var arrSelectors = [];


    function genSelectorName(key){

      if(key[0] == '_'){
        return key.slice(1).toLowerCase()
      }
      else if(key[key.length -1] == '_'){
        return '#'+ fromCamelCase(key.slice(0,-1));
      }
      else{
        return '.'+ fromCamelCase(key);
      }
    }
    function fromCamelCase(str) {
      return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
    }

    function gen(_obj, name, selectorContainer){

      var numNested = Number(currentNum);

      var selector = null;
      var selectorName = null;
      var nestingAdded = false;

      if(arguments.length > 1){
        selectorName = selectorContainer ? selectorContainer + ' '+ genSelectorName(name) : genSelectorName(name) ;
        selector = '{ \n';
      }

      for(var key in _obj ){

          if(typeof _obj[key] == 'object'){
              if(!nestingAdded){
                nestingAdded = true;
                currentNum+=1;
              }
              gen(_obj[key],key, selectorName);
          }else{
            selector += ('\t'+ fromCamelCase(key)+':'+_obj[key]+'; \n');
          }

      }
      if(arguments.length > 1){
        selector += '} \n';
        arrSelectors.push({ nesting: numNested, selectorName: selectorName, selector: selector});
      }
      currentNum = Number(numNested);

    }

    gen(obj);

    var resultString = '';

    for(var i=0; i< arrSelectors.length; i++){
      resultString += (arrSelectors[i].selectorName + " "+ arrSelectors[i].selector + '\n');
    }

    return resultString;
  }

  if(window.define != undefined){
    define(Compile)
  }else{
    window.CompileFromJSON = Compile
  }
})()
