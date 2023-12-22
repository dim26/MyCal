import {gregToPrimary} from './primary.js';
import {gregToSecondary} from './secondary.js';

var date = new Date();

var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();

var primaryReturned = gregToPrimary(d, m, y);
var secondaryReturned = gregToSecondary(d, m, y);

document.getElementById('day').innerHTML = (primaryReturned[3] + "&nbsp");
document.getElementById('fort').innerHTML = ("(" + primaryReturned[4] + ")," + "&nbsp");
document.getElementById('year').innerHTML = (primaryReturned[0] + " AUR &nbsp");
document.getElementById('month').innerHTML = (primaryReturned[1] + " (" + primaryReturned[2] + ") &nbsp");
document.getElementById('zodiac').innerHTML = (primaryReturned[5] + "&nbsp");
document.getElementById('secondary').innerHTML = (secondaryReturned);