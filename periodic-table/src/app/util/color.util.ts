export class ColorUtil {

    // Creddits to https://stackoverflow.com/a/1855903
    public static contrastColor  ( r: number, g: number, b: number ) {
        let d: string = ''
        let luminance: number = (0.299 * r + 0.587 * g + 0.114 * b ) / 255;
        if ( luminance > 0.5 ) {
            d = '#000000'
        } else {
            d = '#FFFFFF'
        }
        return d;
    }
    
    
    // Credits to https://stackoverflow.com/a/5624139
    public static hexToRgb ( hex: string )  {
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
      
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
}