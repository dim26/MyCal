import {getYearLen} from './myCalHelper.js';
import {getMonthList} from './myCalHelper.js';
import {getMonthName} from './myCalHelper.js';

export function gregToPrimary(day, month, year) {
  
  const inputDate = new Date(year, month - 1, day);
  const epochalDate = new Date(1924, 2, 20);
            
  let daysElapsed = Math.abs((inputDate - epochalDate)/(1000 * 60 * 60 * 24));

  let gengYr = 1;
  let gengMnth = 1;
  let gengDay = 1;
  let zodCount = 0;
  let currZodiac = 0;
  let gengFort = "Cīvik";

  const yrBasket = getYearLen(year);
  const monBasket = getMonthList(yrBasket[yrBasket.length - 1]);

  while (daysElapsed >= yrBasket.reduce((acc, curr) => acc + curr, 0) ||
         daysElapsed >= monBasket.reduce((acc, curr) => acc + curr, 0)) {
    for (let i = 0; i < yrBasket.length; i++) {
      if (daysElapsed >= yrBasket[i]) {
        daysElapsed -= yrBasket[i];
        gengYr++;
        if (daysElapsed > monBasket[0]) {
          zodCount += monBasket.length;
        }
      } else {
        break;
      }
    }

    for (let i = 0; i < monBasket.length; i++) {
      if (daysElapsed >= monBasket[i]) {
        daysElapsed -= monBasket[i];
        gengMnth++;
        zodCount++;
      } else {
        break;
      }
    }
  }

  gengDay += daysElapsed;

  gengFort = gengDay > 15 ? "Icīvikadār" : gengFort;
  gengDay = gengDay % 15 || 15;

  if (gengMnth > 13) {
    gengYr++;
    gengMnth = 1;
  }

  const gengMnthName = getMonthName(gengMnth);
  const gengDate = gengDay === 1 ? `${gengDay}st` : gengDay === 2 ? `${gengDay}nd` : gengDay === 3 ? `${gengDay}rd` : `${gengDay}th`;

  zodCount *= 2;
  zodCount += gengFort === "Icīvikadār" ? 1 : 0;
  currZodiac = (zodCount % 10) + 1;

  return [String(gengYr), String(gengMnth), gengMnthName, gengDate, gengFort, String(currZodiac)];
}