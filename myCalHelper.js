export function getMonthName(month) {
  if (month < 1 || month > 13) {
    throw new Error('Invalid month number: ' + month);
  }
  const monthNames = [
    'Ceveka Weneruņiri',
    'Ceveka Nirojygom',
    'Ceveka Ťerojimegon',
    'Ceveka Newānīśori',
    'Ceveka Niťerojimegon',
    'Ceveka Ojygom',
    'Ceveka Idibilāsa',
    'Ceveka Jākuro',
    'Ceveka Dijevāteri',
    'Ceveka Lexoremiri',
    'Ceveka Šogaluri',
    'Ceveka Edamātiri',
    'Ceveka Mīsa Hātonu'
  ];
  return monthNames[month - 1];
}

export function getYearLen(year) {
  if (year < 1924) {
    throw new Error('Year must be greater than 1924');
  }
  const returnArray = [];
  for (let yr = 1924; yr <= year; yr++) {
    const modSeventySix = (yr - 1923) % 76;
    if (
      [3, 6, 11, 14, 17, 22, 25, 27, 30, 33, 41, 46, 49, 55, 63, 65, 71, 74].includes(modSeventySix)
    ) {
      returnArray.push(384);
    } else if ([8, 36, 44, 52, 60, 68].includes(modSeventySix)) {
      returnArray.push(385);
    } else if ([0, 19, 38, 57].includes(modSeventySix)) {
      returnArray.push(383);
    } else if ([4, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72].includes(modSeventySix)) {
      returnArray.push(355);
    } else {
      returnArray.push(354);
    }
  }
  return returnArray;
}

export function getMonthList(currentYrLength) {
  switch (currentYrLength) {
    case 354:
      return [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    case 355:
      return [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30];
    case 383:
      return [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 29];
    case 384:
      return [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30];
    case 385:
      return [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 30];
    default:
      throw new Error('Invalid year length');
  }
}
export function getYearMonthSum(year) {
  if (year < 1924) {
    throw new Error('The year must be greater than 1924');
  }

  const yearLengths = getYearLen(year);
  const monthlyLengths = [];

  for (const yearLength of yearLengths) {
    monthlyLengths.push(...getMonthList(yearLength));
  }

  const groupedArrays = [];
  let group = [];
  for (let i = 0; i < monthlyLengths.length; i++) {
    group.push(monthlyLengths[i]);
    if (group.length === 5 || i === monthlyLengths.length - 1) {
      groupedArrays.push(group);
      group = [];
    }
  }

  const sums = groupedArrays.map((subArray) => subArray.reduce((acc, curr) => acc + curr, 0));

  return sums;
}
