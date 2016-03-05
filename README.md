# json-styles-compile

```javascript
  var obj= {
        _body:{ // will be convert to selector 'body'
          margin: 0,
          padding: 0
        },
        ItemContainer:{ //will be convert to selector '.item-container'
          display: 'block',
          boxSizing: 'border-box',
          paddingTop: '20px',

          Item:{ //will be convert to selector '.item-container .item'
            display: 'block',
            boxSizing: 'border-box',
            padding: '0 10px 0 10px',
            height: '30px',
            fontSize: '16px',
            color: 'black',
            textAlign: 'center',
            marginTop: '10px',

            _input: { //will be convert to selector '.item-container .item input'
              display: 'inline-block',
              verticalAlign: 'middle',
              width:'300px',
              height: '100%',
              borderRadius: '30px',
              boxSizing: 'border-box',
              paddingLeft: '20px'

            },
            _label: { //will be convert to selector '.item-container .item label'
              display: 'inline-block',
              verticalAlign: 'middle'
            },
            inputId_:{ //will be convert to selector '.item-container .item #input-id'
              color: 'red'
            }
          }
        }
      };

      var selector = CompileFromJSON(obj);

      $('head').append($('<style></style>').html(selector));
```
