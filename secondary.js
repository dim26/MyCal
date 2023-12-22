import {getYearMonthSum} from './myCalHelper.js';

export function gregToSecondary(day, month, year) {
    
    const inputDate = new Date(year, month - 1, day);
    const epochalDate = new Date(1924, 2, 20);
              
    let daysElapsed = Math.abs((inputDate - epochalDate)/(1000 * 60 * 60 * 24));
  
    const yearLenList = getYearMonthSum(year);
  
    for (let i = 0; i < yearLenList.length; i++) {
      while (daysElapsed >= 147 || daysElapsed >= 148 || daysElapsed >= 149) {
        if (daysElapsed >= yearLenList[i]) {
          daysElapsed -= yearLenList[i];
        } else {
          break;
        }
  
        epochalDate.setDate(epochalDate.getDate() + yearLenList[i]);
        i = (i + 1) % yearLenList.length;
      }
  
      if (daysElapsed < 147 && daysElapsed < 148 && daysElapsed < 149) {
        break;
      }
    }
  
    const numeralList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
    const nameList = ["Ebā", "Gemā", "Cirāji", "Hy", "Sujī", "Pašiśī", "Qajā", "Ygul", "Wājiri", "Māty", "Ǔxā", "Nācim", "Sulā"];
  
    const numeralArrayList = [...numeralList];
    const nameArrayList = [...nameList];
    const dateCombo = ["Xāpawāņa", "Gelyga"];
  
    const maxCombinations = 143;
  
    for (let i = 0; i < maxCombinations; i++) {
      const numeralIndex = i % numeralList.length;
      const nameIndex = i % nameList.length;
      dateCombo.push(`${numeralArrayList[numeralIndex]} ${nameArrayList[nameIndex]}`);
    }
  
    dateCombo.splice((dateCombo.length / 2) + 2, 0, "Negawa");
  
    if (yearLenList[yearLenList.length - 2] === 148) {
      dateCombo.push("Qorizo");
    } else if (yearLenList[yearLenList.length - 2] === 149) {
      dateCombo.push("Pājisāmā");
    }
  
    dateCombo.push("Sepawāņa");
  
    return dateCombo[daysElapsed];
}