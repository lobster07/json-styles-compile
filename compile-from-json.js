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

      var options = {
        obj: _obj ? _obj : null,
        selectorName: selectorContainer ? selectorContainer + ' '+ genSelectorName(name) : name ? genSelectorName(name): null,
        selector: null
      }

      var numNested = Number(currentNum);

      var nestingAdded = false;


      if(options.obj && Object.getOwnPropertyNames(options.obj).length){

        options.selector = '{ \n';

        for(var key in _obj ){

            if(typeof _obj[key] == 'object'){
                if(!nestingAdded){
                  nestingAdded = true;
                  currentNum+=1;
                }
                gen(_obj[key], key, options.selectorName);
            }else{
              options.selector += ('\t'+ fromCamelCase(key)+':'+_obj[key]+'; \n');
            }

        }

        options.selector += '} \n';
        if(options.selectorName) arrSelectors.push({ nesting: numNested, selectorName: options.selectorName, selector: options.selector});

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
