(function(){
    "use strict";

    var Sayings = function(){

        // SEE ON SINGLETON PATTERN
        if(Sayings.instance){
            return Sayings.instance;
        }
        Sayings.instance = this;

        //CACHE
        this.cache = window.applicationCache;
        this.startCacheListeners();

        //vanasonad failist sayings.js
        this.sayings_list = sayings_list;
        
        this.new = true;

        this.init();
    };

    window.Sayings = Sayings; // Paneme muuutuja külge

    Sayings.prototype = {

        init: function(){

            console.log('Sayings started');

            Sayings.instance.writeRandomSaying();
            //window.setInterval(function(){
            //    Sayings.instance.writeRandomSaying();
            //}, 5000);
            
            window.addEventListener("devicemotion", this.triggerMotion.bind(this));

        },
        triggerMotion: function(event){
	        //console.log(event);
	        var x_gravity = event.accelerationIncludingGravity.x;
	        
	        if(x_gravity > 10 && this.new){
		        this.writeRandomSaying();
		        navigator.vibrate(300);
		        
		        this.new = false;
		        
		        window.setTimeout(function(){
			        Sayings.instance.new = true;
		        }, 1000);
	        }
	        
        },
        startCacheListeners: function(){
            window.applicationCache.addEventListener('updateready',function(){
                window.applicationCache.swapCache();
                console.log('swap cache has been called');
            },false);

            setInterval(function(){
                Sayings.instance.cache.update();
                //kontrollib cache'i iga 10s tagant
            }, 10000);
        },
        writeRandomSaying: function(){
            //leia random indeksiga vanasona
            var random_saying = this.sayings_list[parseInt(Math.random()*this.sayings_list.length)];
            document.querySelector("#content").innerHTML = random_saying;
        }
    }; // Sayings LÕPP

    // kui leht laetud käivitan rakenduse
    window.onload = function(){
        var app = new Sayings();
    };

})();
