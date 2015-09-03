let path = require('path');

export default class Placeholder {

  constructor(size, hex = null, text = null) {
    let sizes = size.split('x');
    this.width = sizes[0];
    this.height = sizes[1];
    this.colour = hex;
    this.textColour = this.getContrastYIQ(this.colour);
    if (typeof text == 'undefined') {
      text = [sizes[0], sizes[1]].join('x');
    }
    this.text = text;
  }

  /**
   * From https://24ways.org/2010/calculating-color-contrast
   * @param  string hexcolor
   * @return 000000 || ffffff
   */
  getContrastYIQ(hexcolor) {
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? '000000' : 'ffffff';
  }

  getFilename() {
    return [this.width + 'x' + this.height, this.colour, Date.now()].join('_') + '.png';
  }

  getFilepath() {
    return path.normalize(__dirname + '/../../..') + '/public/img/output/' + this.getFilename();
  }
}
