


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

// import getType from './getType'


const Item = {
  type:'',
  description:''
}

const getItem = arg => {
  let type = getType(arg)
  
  if(['string', 'boolean', 'integer'].includes(type)){
    return {
      type,
      description:arg
    }
  }
  let obj = {}
  if(type='object'){
    
    for(let key in arg){
      let  types = getType(arg[key])
      if(types==='object'){
        obj[key] = {
          type,
          properties: getItem(arg[key])
        }
        return obj
      }
      if(types==='array'){
        obj[key] = {
          type,
          items: getItem(arg[key][0])
        }
        return obj
      }
      else return  obj = getItem(arg[key])
    }
  }
}
console.log(getItem({ pwd:{ name:'pwdss', age:28 }  }))

export default getItem
