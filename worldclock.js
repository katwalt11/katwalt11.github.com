// Coding for this world clock is based on the code available on NIPR
// at www.prologic.com/code/javascript/time/worldclock.php on 03 JUNE 2013
// Made adjustments to automatically correct daylight savings dates as well as fractional hour
// time zones like Kabul, AFG and India

function worldClock(zone, region, location){
  var dst = 0
  var loc = location
  var time = new Date()
  var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
  var gmtTime = new Date(gmtMS)
  var day = gmtTime.getDate()
  var month = gmtTime.getMonth()
  var year = gmtTime.getYear()

  if(year < 1000){
    year += 1900
  }

  var monthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
  var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")

  if (year%4 == 0){
    monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
  }

  if(year%100 == 0 && year%400 != 0){
    monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
  }

  var hr = gmtTime.getHours() + zone
  var hrRND

  if (hr>=0) {
    hrRND=Math.floor(hr)
  }
  else if (hr<0) {
    hrRND=Math.ceil(hr)
  }

  var minDIFF=(hr-hrRND)*60
  var min=gmtTime.getMinutes()+(minDIFF)
  
  if (min>60){
    min=min-60
    hrRND=hrRND+1
    hr=hrRND
  }
  else if (min<0) {
    min=min+60
    hrRND=hrRND-1
    hr=hrRND
  }
  else {
    hr=hrRND
  }

  var sec = gmtTime.getSeconds()
  
  if (hr >= 24){
    hr = hr-24
    day -= -1
  }

  if (hr < 0){
    hr -= -24
    day -= 1
  }

  if (hr < 10){
    hr = " " + hr
  }

  if (min < 10){
    min = "0" + min
  }

  if (sec < 10){
    sec = "0" + sec
  }

  if (day <= 0){
    if (month == 0){
      month = 11
      year -= 1
    }
    else{
      month = month -1
    }
    day = monthDays[month]
  }

  if(day > monthDays[month]){
    day = 1
    if(month == 11){
      month = 0
      year -= -1
    }
    else{
      month -= -1
    }
  }

  if (region == "NAmerica"){
    var startDST = new Date()
    var endDST = new Date()
    startDST.setMonth(2)
    startDST.setHours(2)
    startDST.setDate(1)
    var dayDST = startDST.getDay()
    
    if (dayDST != 0){
      startDST.setDate(15-dayDST)
    }
    else{
      startDST.setDate(8)
    }
    
    endDST.setMonth(10)
    endDST.setHours(2)
    endDST.setDate(1)
    dayDST = endDST.getDay()

    if (dayDST != 0){
      endDST.setDate(8-dayDST)
    }
    else{
      endDST.setDate(1)
    }

    var currentTime = new Date()
    currentTime.setMonth(month)
    currentTime.setYear(year)
    currentTime.setDate(day)
    currentTime.setHours(hr)

    if(currentTime >= startDST && currentTime < endDST){
      dst = 1
    }
  }

  if (region == "Europe"){
    var startDST = new Date()
    var endDST = new Date()
    startDST.setMonth(2)
    startDST.setHours(1)
    startDST.setDate(31)
    var dayDST = startDST.getDay()
    startDST.setDate(31-dayDST)
    endDST.setMonth(9)
    endDST.setHours(0)
    endDST.setDate(31)
    dayDST = endDST.getDay()
    endDST.setDate(31-dayDST)
    var currentTime = new Date()
    currentTime.setMonth(month)
    currentTime.setYear(year)
    currentTime.setDate(day)
    currentTime.setHours(hr)

    if(currentTime >= startDST && currentTime < endDST){
      dst = 1
    }
  }

  if (region == "Israel"){
    var startDST = new Date()
    var endDST = new Date()
    startDST.setMonth(2)
    startDST.setHours(1)
    startDST.setDate(31)
    var dayDST = startDST.getDay()
    startDST.setDate(31-dayDST)
    endDST.setMonth(9)
    endDST.setHours(0)
    endDST.setDate(31)
    dayDST = endDST.getDay()
    endDST.setDate(29-dayDST) //to convert to Friday before the last Sunday of the month
    var currentTime = new Date()
    currentTime.setMonth(month)
    currentTime.setYear(year)
    currentTime.setDate(day)
    currentTime.setHours(hr)

    if(currentTime >= startDST && currentTime < endDST){
      dst = 1
    }
  }

  if (region == "Australia"){
    var startDST = new Date()
    var endDST = new Date()
    startDST.setMonth(9)
    startDST.setHours(2)
    startDST.setDate(1)
    var dayDST = startDST.getDay()

    if (dayDST != 0){
      startDST.setDate(8-dayDST)
    }
    else{
      startDST.setDate(1)
    }
    
    endDST.setMonth(3)
    endDST.setHours(2)
    endDST.setDate(1)
    dayDST = endDST.getDay()

    if (dayDST != 0){
      endDST.setDate(8-dayDST)
    }
    else{
      endDST.setDate(1)
    }

    var currentTime = new Date()
    currentTime.setMonth(month)
    currentTime.setYear(year)
    currentTime.setDate(day)
    currentTime.setHours(hr)

    if(currentTime >= startDST || currentTime < endDST){
      dst = 1
    }
  }

  if (dst == 1){
    hr -= -1

    if (hr >= 24){
      hr = hr-24
      day -= -1
    }

    if (hr < 10){
      hr = " " + hr
    }

    if(day > monthDays[month]){
      day = 1

      if(month == 11){
        month = 0
        year -= -1
      }
      else{
        month -= -1
      }
    }
    return "<b>" + loc + ": </b>" + hr + ":" + min + ":" + sec + " DST <br> " + (month+1) + "/" + day
  }
  
  else{
    return "<b>" + loc + ": </b>" + hr + ":" + min + ":" + sec + " <br> " + (month+1) + "/" + day
  }
}

function worldClockZone(){
  document.getElementById("est").innerHTML = worldClock(-5, "NAmerica", "NYC/DC")
  document.getElementById("cst").innerHTML = worldClock(-6, "NAmerica", "St Louis")
  document.getElementById("afghanistan").innerHTML = worldClock(4.5, "Kabul", "AFG")
  document.getElementById("australia").innerHTML = worldClock(10, "Australia", "Sydney")
  document.getElementById("germany").innerHTML = worldClock(1, "Europe", "Germany")
  document.getElementById("hawaii").innerHTML = worldClock(-10, "Honolulu", "Hawaii")
  document.getElementById("israel").innerHTML = worldClock(2, "Israel", "Israel")
  document.getElementById("japan").innerHTML = worldClock(9, "Tokyo", "Japan")
  document.getElementById("uk").innerHTML = worldClock(0, "Europe", "London")

  setTimeout("worldClockZone()", 1000)
}
