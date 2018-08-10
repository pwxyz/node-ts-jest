
const fs = require('fs')

const getType = arg => {
  let type = typeof arg 
  let isArray = Array.isArray(arg)
  switch( type ){
    case 'number':
      return 'integer'
      break
    case 'object':
      return isArray ? 'array' : 'object'
      break
    default:
      return type
  }
}


const getRes = arg => {

}


const getItem = arg => {
  let type = getType(arg) 
  if(!['object', 'array'].includes(type)){
    throw Error('getItem fnc arg expect recived object or array, but recived '+ type)
  }
  else if(type==='object') {
    let obj = {}
    for(let key in arg){
      obj[key] 
    }
  }
}

const getObj = obj => {
  let type = getType(obj) 
  if(!['object'].includes(type)){
    throw Error('getObj fnc arg expect recived object, but recived '+ type)
  }
  let objs = {}
  for(let key in obj){
    let types = getType(obj[key]) 
    if(['string', 'integer', 'boolean'].includes(types)){
      objs[key] = {
        type: types,
        description:  obj[key]
      }
    }
    if(['object'].includes(types)){
      objs[key] = {
        type: types,
        properties:  getObj(obj[key])
      }
    }
    if(['array'].includes(types)){
      objs[key] = {
        type: types,
        items:  getObj(obj[key][0])
      }
    }
  }
  return objs
}

const req = {
  status:1,
  message:'success',
  payload:{
    total:97,
    data:[{
      threate:'asssf',
      name:'das',
      age:12,
      detail:[{
        aa:'cc',
        bb:{
          cc:'xdf'
        }
      }]
    }]
  }
}

let str = JSON.stringify(getObj(req))



fs.writeFile('test.json', str, err =>{
  if(err){
    console.log(err)
  }
  else console.log('success')
})