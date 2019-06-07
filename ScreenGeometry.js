// ScreenGeometry.js
// Jonathan Revell H
import {throttle, reduce} from "lodash";

export var ScreenGeometry = {
  sizeClasses: [
      { 
          name: "mobile", conditions: [
              {maxWidth: 700}
          ]
      },
      {
         name: "desktop", conditions: [
             {minWidth: 701}
         ]
      }
  ],
  width: window.innerWidth,
  height: window.innerHeight,
  sizeClass: "mobile",
  calculateSizeClass() {
      var sizeClass;
      for(var i = 0; i < this.sizeClasses.length; i++) {
          sizeClass = this.sizeClasses[i];
          var matchCount = reduce(sizeClass.conditions, (count, c) => {
              if(c.maxWidth && this.width <= c.maxWidth) {
                  return count + 1;
              }
              if(c.minWidth && this.width >= c.minWidth) {
                  return count + 1;
              }
              if(c.maxHeight && this.height <= c.maxHeight) {
                  return count + 1;
              }
              if(c.minHeight && this.height >= c.minHeight) {
                  return count + 1;
              }       
          }, 0);

          if(matchCount === sizeClass.conditions.length) {
              break;
          }
      }
      this.sizeClass = sizeClass.name;
      return sizeClass;
  },
  start() {
      this.calculateSizeClass();
      window.addEventListener("resize", throttle(() => {
          this.width = parseInt(window.innerWidth);
          this.height = parseInt(window.innerHeight);
          this.calculateSizeClass();
      }, 200));
  }
}
ScreenGeometry.start();

export default ScreenGeometry;