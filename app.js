//
//important structure of this project 
//
//var budgetcontroller = (function(){
//    
//    var x = 4;
//    
//    var add = function(a){
//        return x + a;
//        
//    }
//    
//        return {
//            publicTestofone: function(b) {
//                return add(b);
//            }
//        }
//    
//})();
//
//
//var UIController = (function(){
//    
//    var y = 5;
//    
//    var add1 = function(c) {
//        return y + c;
//    }
//    
//    return {
//        publicTestoftwo: function(d){
//            return add1(d);
//        }
//    }
//    
//})();
//
//var controller = (function(bc, UIc){
//    
//    var output = bc.publicTestofone(4);
//    var output1 = UIc.publicTestoftwo(5);
//    
//    return {
//        anotherpublic: function(){
//            console.log(output);
//            console.log(output1);
//        }
//    }
//    
//})(budgetcontroller, UIController); 
//
//
//



//  main content //


//////////////////////////////////// BUDGET CONTROLLER ///////////////////////

var budgetcontroller = (function(){

   var Income = function(id, des, val) {
        
        this.id = id;
        this.des = des;
        this.val = val;
          
    };
    
   var Expense = function(id, des, val) {
       
       this.id = id;
        this.des = des;
        this.val = val;
       this.percentage = -1;
    
   };
   
    
    Expense.prototype.calPercentage = function(totalincome) {
        if(totalincome > 0){
            this.percentage = Math.round((this.val / totalincome) * 100);
        } else {
            this.percentage = -1;
        }
    }
    
    Expense.prototype.gtPercentage = function() {
        return this.percentage;
    }
    
    
    
   var calculateBudget = function(type) {
       
       var sum = 0;
       data.allItems[type].forEach(function(cur) {
           sum += cur.val;
         
       });
       
       data.totals[type] = sum;
       
   };
    
    var  data = {
           allItems: {
               inc: [],
               exp: []
           },
           totals: {
               inc: 0,
               exp: 0
           },
            budget: 0,
            percentage: -1
           
       };


    return {

        
        addItems: function(type, des, val) {
            var ID, newitems;
            
            // create id for number of ids //
            //inc - 2 item - 
            if (data.allItems[type].length > 0){
                    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
          
            // create inc or exp by if statement
            
            if(type === 'inc') {
                newitems =  new Income(ID, des, val);
            } else if(type === 'exp') {
                newitems = new Expense(ID, des, val);
            }
            
            data.allItems[type].push(newitems);
            return newitems;
        }, 

        deletItemson: function(type, id) {
            var ids, index;
            // [1.3.6.8]
            // id = 6
            // index = 2
             ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        calculations: function() {
            
            // calculate the nudget //
            
            calculateBudget('exp');
            calculateBudget('inc');
            
            
            
            
            // calculate the budeget income - expenses //
            data.budget = data.totals.inc - data.totals.exp;
        
            
            //calculate the percentage of income we spent //
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
                
            } else {
                data.percentage = -1;
            }
            
            
        }, 
        
        getbudget: function() {
            
            return {
                
                budget: data.budget,
                totalINC: data.totals.inc,
                totalEXP: data.totals.exp,
                percentage: data.percentage
            };
        }, 
        
        calculatePercentage: function() {
        
            data.allItems.exp.forEach(function(cur) {
                cur.calPercentage(data.totals.inc);
            })
    },
        
        getPercentage: function() {
            
           var getperc = data.allItems.exp.map(function(cur) {
                cur.gtPercentage();
            })
            return getperc;
    },
        
        
        testing: function() {
            console.log(data);
        }
 
    };
    
})();

//////////////////////////////////// UI CONTROLLER //////////////////////////

var UIController = (function(){
    
    var DOM = {
        inputtype:  '.add__type',
        inputdescription:  '.add__description',
        inputvalue:  '.add__value',
        inputbutton: '.add__btn',
        incomecontroller: '.income__list',
        expensecontroller: '.expenses__list',
        budgetoverall: '.budget__value',
        incomefinal: '.budget__income--value',
        expensefinal: '.budget__expenses--value',
        percentagelabel: '.budget__expenses--percentage',
        container: '.container',
        percentitemLabel: '.item__percentage',
        monthLabel: '.budget__title--month'
        
    }
    
    var nodeLIstForEach = function(list, callback) {
        
        for(var i = 0; i    < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    
     return {
        getinput: function() {
           
            return {
            type: document.querySelector(DOM.inputtype).value,  // will be wether inc or exp //
           discription: document.querySelector(DOM.inputdescription).value,
           value: parseFloat(document.querySelector(DOM.inputvalue).value)
            
        }
        },
                
//            var type = document.querySelector('add__type').value;  // will be wether inc or exp //
//            var discription = document.querySelector('.add__description').value;
//            var value = document.querySelector('.add__value').value;
           
         
         addListItem: function(obj, type){
           
             var html, newHtml, element;
             
             if(type === 'inc') {
                 
                 element = DOM.incomecontroller;
                 
                 html =   '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                 
             } else if(type === 'exp') {
                 
                element = DOM.expensecontroller;
                 
                 html =   '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                 
             }
             
             // replace the place holder into the actual code //
             
             newHtml = html.replace('%id%', obj.id);
             newHtml = newHtml.replace('%description%', obj.des);
             newHtml = newHtml.replace('%value%', obj.val);

             
             // insert html into input on UI //
             
             document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
             
             
             
         },
         
         
         deletListItem: function(SelectID) {
             
             var elment = document.getElementById(SelectID);
             elment.parentNode.removeChild(elment);
         },
         
         clearFields: function() {
                var fields, fieldarr;
             
             fields = document.querySelectorAll(DOM.inputdescription + ', ' + DOM.inputvalue);
             
             fieldarr = Array.prototype.slice.call(fields);
             
             fieldarr.forEach(function(current, index, array) {
                 current.value = '';
                 
             });
             
             fieldarr[0].focus();
         },
         
         displayUIoftop: function(obj) {
             
             document.querySelector(DOM.budgetoverall).textContent = obj.budget;
             document.querySelector(DOM.incomefinal).textContent =  obj.totalINC;
             document.querySelector(DOM.expensefinal).textContent = obj.totalEXP;
             if(obj.totalINC > 0) {
                document.querySelector(DOM.percentagelabel).textContent =   obj.percentage + "%";
             } else {
                document.querySelector(DOM.percentagelabel).textContent =  "--"
             }
         },
         
         displayPercentage: function() {
            var percent = document.querySelectorAll(DOM.percentitemLabel);
         },
         
         
         displayMonth: function() {
           
             var now, year;
             
             now = new Date();
             
             months = ['January', 'February', 'March', 'Apirl', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
             
             month = now.getMonth();
             
             year = now.getFullYear();
             
             document.querySelector(DOM.monthLabel).textContent = months[month] + ' ' + year;
            
         },
         
         changetypecolor: function() {
           
             var fields = document.querySelectorAll (DOM.inputtype + ',' + DOM.inputdescription + ',' + DOM.inputvalue);
             
             nodeLIstForEach(fields, function(cur) {
                 cur.classList.toggle('red-focus');
             });
             
             document.querySelector(DOM.inputbutton).classList.toggle('red');
             
         },
         
         
            getDOM: function(){
            return DOM;
        }
        
       

    };
    
    
})();




//////////////////////////////////////////  CONTROLLER  /////////////////////////




var controller = (function(bc, UIc){
    

           
var DOMworking = UIc.getDOM();
    
    var updatePercentage = function(){
        
//        1.    calculate percentage
        bc.calculatePercentage();
        
//        2.    read percentage from the budget controller
        
        var percentages = bc.getPercentage();
        
        
//        3. update the UI with new percentage
        
         
    }
    
var budgetfunction = function() {
        
        // 4. calculate the budget 
      
        bc.calculations();
          
        
        // return budget //
        
       var budgetfix = bc.getbudget();
        
          
      // 5. display the budget to UI

        UIc.displayUIoftop(budgetfix);
        
    }
    
    
 var ctrlAddItem = function() {
        
            
      // 1. Get the input field data
      
        var input = UIc.getinput();
    
    
    
    if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
        
   
       
          
      // 2. add the item to thr budget controller
      
          var newITEMS = bc.addItems(input.type, input.discription, input.value);
          
          
      // 3. add the item to UI
      
         UIc.addListItem(newITEMS, input.type);
       
      // clear fields //
          
          UIc.clearFields();
          
          
      // calling function 
          
          budgetfunction();
        
        // update percentages for each
          
            updatePercentage();
    }
       
    };

    var ctrldeletitem = function(event) {

        var Itemid, splitid, type, ID;
        Itemid = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(Itemid) {
           

          splitid = Itemid.split('-');
          type = splitid[0];
          ID = parseInt(splitid[1]);
            
         
          // delet the iteam when we clicked
            bc.deletItemson(type, ID);

          // removing from the UI
            UIc.deletListItem(Itemid);

          //update the budget after remove  called from top
            budgetfunction();
            
            
            // update percentages for each
            
            updatePercentage();
        }
    }

    var setupeventlisteners = function(){  
    document.querySelector(DOMworking.inputbutton).addEventListener('click', ctrlAddItem);  
    document.addEventListener('keypress', function(event) {
       
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
        
    });
      document.querySelector(DOMworking.container).addEventListener('click', ctrldeletitem);
        document.querySelector(DOMworking.inputtype).addEventListener('change', UIc.changetypecolor())
    };
    
    return {
        
        
        init: function() {
            
              console.log('Application started');
            UIc.displayMonth();
           UIc.displayUIoftop({
                budget: 0,
                totalINC: 0,
                totalEXP: 0,
                percentage: -1
           });
                setupeventlisteners();
            }
              
        };
  
    
})(budgetcontroller, UIController); 


controller.init();
