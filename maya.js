// Maya Calendar calculator. 
// Source:  https://maya.nmai.si.edu/sites/all/themes/mayatime/js/calendar-converter/calendar-converter-es.js?qoqrf5
//
// R.O.  2021

module.exports = {
    monthLengths: function() {
        var array = [];
        array = {0:31,1:29,2:31,3:30,4:31,5:30,6:31,7:31,8:30,9:31,10:30,11:31};
        return array;
    },
    
    Months: function() {
        var array = [];
	    array = Months = {0:"enero",1:"febrero",2:"marzo",3:"abril",4:"mayo",5:"junio",6:"julio",7:"agosto",8:"septiembre",9:"octubre",10:"noviembre",11:"diciembre"};
	    return array;
	},
	
	haabMonths: function() { 
	    var array = [];
    	array = { 0:"Pop", 1:"Wo'", 2:"Sip", 3:"Sotz'", 4:"Sek", 5:"Xul", 6:"Yaxk'in", 7:"Mol", 8:"Ch'en", 9:"Yax", 10:"Sak'", 11:"Keh", 12:"Mak", 13:"K'ank'in", 14:"Muwan", 15:"Pax", 16:"K'ayab",    17:"kumk'u", 18:"Wayeb" };
    	
    	return array;
     },
     
	 tzolkinMonths: function() {
	    var array =[];
	    array = { 0:"Imix'", 1:"Ik'", 2:"Ak'b'al", 3:"K'an", 4:"Chikchan", 5:"Kimi", 6:"Manik'", 7:"Lamat", 8:"Muluk", 9:"Ok", 10:"Chuwen", 11:"Eb'", 12:"B'en", 13:"Ix", 14:"Men", 15:"k'ib'",16:"kab'an", 17:"Etz'nab'", 18:"Kawak", 19:"Ajaw" };
	    return array;
	 },

    numberWithCommas: function (x) {
        return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ".");
    },

    inty: function (x)
    {
	    return (x > 0) ? Math.floor(x) : Math.ceil(x);
    },

    validateDate: function (m,d,y)
    {

	    //greater than max number days in month
	    if( d > module.exports.monthLengths()[m] ){
		    console.log(module.exports.Months()[m] + " no contiene " + d + " días.");
		    return false;
	    }
	    //negative days
	    if(d < 1){
		    console.log('Días debe ser un número positivo.');
		    return false;
	    }
	
	    //year == 0
	    if(y == 0){
		    console.log("Calendario juliano no tiene un año cero.");
		    return false;
	    }
	
	    //keep valies between -4000 and 4000
	    if(y > 4000 || y < -4000){
		    console.log("Por favor introduzca un año entre -4000 (B.C.) and 4000 (A.D.)");
		    return false;
	    }
	
	    if ((m== 1) && (d == 29)){
            if (y % 4 != 0){
			    console.log(module.exports.Months()[m] + " no contiene " + d + " Día en el año " + y);
			    return false;
		    }
            if ((y > 1582) && (y % 4 == 0) && (y % 100 == 0) && (y % 400 != 0)){
                console.log(module.exports.Months()[m] + " no contiene " + d + " Día en el año " + y);
			    return false;
 		    }
        }
		if (y < 0){
            y += 1;
        }
	
	    return true;
    },


    convertDate: function (m,d,y)
    {
	
	
    	m = parseInt(m);
    	d = parseInt(d);
    	y = parseInt(y);
	
	
    	//validate
    	valid = module.exports.validateDate(m,d,y);
    	if(!valid)
    		return false;
	
    	//quick hack for negative dates
    	if (y < 0){
           y += 1;
        }
	
    	var longCount = module.exports.toLCD(module.exports.toJDN(m,d,y));
    	lcd_string = "";
	

    	//calculate lord of the night
    	var night = module.exports.toLN(parseInt(longCount[3]),parseInt(longCount[4]));
	

    	//calculate tzolkin date

    	var tzolkinDate = module.exports.toTD(module.exports.toJDN(m,d,y));
	    //console.log(tzolkinDate);
    	//calculate haab date
    	var haabDate = module.exports.toHD(module.exports.toJDN(m,d,y));
    	//console.log(haabDate);
	    
	    return tzolkinDate;
    },



    toJDN: function (m,d,y)
    {
	
        m += 1;
        if ((m == 1.0 ) || (m == 2.0 ))
        {
            y -= 1.0 ;
            m += 12.0 ;
        }
        B = 0.0;
        if ((y > 1582.0 ) || ((y == 1582.0 ) && (m > 10.0 )) || ((y == 1582.0 ) && (m == 10.0 ) && (d > 15.0 )))
        {
            A = module.exports.inty(y / 100.0 );
            B = 2.0  - A + module.exports.inty(A / 4.0 );
        }
        jd = module.exports.inty(365.25  * (y + 4716.0 )) + module.exports.inty(30.600100000000001  * (m + 1.0 )) + d + B - 1524.5 ;

        return jd;
    },
    

    toLCD: function (jdn)
    {	
	    console.log("JDN = " + jdn);
	
	    longNumber = new Array(5);
	    longCount = Math.round(jdn - 584282.5);
	
	    console.log("Long Count = " + longCount);
	
	    longNumber[0] = Math.floor(longCount / 144000);
	    longCount %= 144000;
	
	    longNumber[1] = Math.floor(longCount / 7200);
	    longCount %= 7200;
	
	    longNumber[2] = Math.floor(longCount / 360);
	    longCount %= 360;

	    longNumber[3] = Math.floor(longCount / 20);

	    longNumber[4] = Math.floor(longCount % 20);

	    console.log(longNumber);
	    return longNumber;
    },

    toTD: function (jdn)
    {
	    //console.log("JDN = " + jdn);
	    longCount = Math.round(jdn - 584282.5);
	    number = ( ( (longCount + 3) % 13) + 1);
	    //console.log(number);
	    name = ( (longCount + 19) % 20 );
	    tzolkinDate = {numeral:number,symbol:name,month:module.exports.tzolkinMonths()[name]};
	    return tzolkinDate;
    },

    toHD: function (jdn)
    {
	    longCount = Math.round(jdn - 584282.5);
	    dayOfHaab = (longCount -17) % 365;
	    var day = Math.round(dayOfHaab % 20);
	    var month = Math.round(Math.floor(dayOfHaab/20));
	    haabDate = {numeral:day,symbol:month,month:module.exports.haabMonths()[month]};
	    return haabDate;
    },

    toLN: function (x,y)
    {
	    return ( ( 20 * x + y + 8 ) % 9 + 1);
    },
    
    LCToday: function()
    {
        var day, month, year;
        
        today = new Date();
        console.log(today);
        
        day = today.getDate();
        month = today.getMonth();
        year = today.getFullYear();

        return module.exports.convertDate(month, day, year);
    }

}
