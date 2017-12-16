const Utils = {
    createCookie : function(cookieName, value, days){
      let date = new Date();
      const expires = date.setTime(date.getTime()+(this.daysToMiliseconds(days)));
      document.cookie = cookieName+"="+value+expires+"; path=/";
    },
    setAnalyticsCookie: function(){
      let cookieName = "__analytics";
      this.createCookie(cookieName, "off", 1024);
    }
};

export default Utils;
