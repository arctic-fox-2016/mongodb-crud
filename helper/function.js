let convertDate = function(date){
  let d = new Date(date)
  month = d.getMonth() +1
  day = d.getDate()
  year = d.getFullYear()
  if(month.toString().length<2){
    month = "0"+ month
  }
  if(day.toString().length<2){
    day = "0"+ day
  }
  let result = [year,month,day].join("-")
  return result
}

module.exports = convertDate
