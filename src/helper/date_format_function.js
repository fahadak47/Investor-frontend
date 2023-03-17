export const formatDate = date => {
  let savedDate = new Date(date)
  return `${savedDate.getDate()}-${savedDate.getMonth() +
    1}-${savedDate.getFullYear()}`
}


export const formatDateForExtendValidity = date => {
  // let savedDate = new Date(date)

  if(date){
    // let savedDate = date.indexOf('T')
    let savedDate = date.split('T')
    return savedDate[0]
  }
  else{
    return ''
  }

  // let toStringDate = `${savedDate.getFullYear()}-${savedDate.getMonth() +
  //   1.length < 2 ? }-${savedDate.getDate()}`

 
}
