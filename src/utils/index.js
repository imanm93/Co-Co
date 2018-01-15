import moment from 'moment';

const Utils = {
    createCookie : function(cookieName, value, days){
      let date = new Date();
      const expires = date.setTime(date.getTime()+(this.daysToMiliseconds(days)));
      document.cookie = cookieName+"="+value+expires+"; path=/";
    },
    setAnalyticsCookie: function(){
      let cookieName = "__analytics";
      this.createCookie(cookieName, "off", 1024);
    },
    sortDateTimeV2: function (input) {
      return Object.keys(input).sort(function (i1, i2) {
          return moment(input[i1].timestamp) - moment(input[i2].timestamp);
      });
    },
    isEmpty: function (obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) return false;
        }
        return true;
    }
};

export default Utils;
