// storage controlller
// item controlller
const itemctrl = (function () {
    console.log('item controller');
    // item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // datastructure/state
    const data = {
        items: [
            // { id: 0, name: 'Steak Dinner', calories: 1200 },
            // { id: 1, name: 'cookie', calories: 400 },
            // { id: 3, name: 'eggs', calories: 300 },
        ],
        currentitem: null,
        totalcalories: 0,
    }
    // public methods
    return {
        getitems: function () {
            return data.items;
        },
        addItem: function (name, calorie) {
            // console.log(name, calorie);
            let ID;
            // create id 
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // calories to number
            calories = parseInt(calorie);
            newItem = new Item(ID, name, calorie);
            // add items to the array
            data.items.push(newItem);
            return newItem;
        },
        getitembyid: function (a) {
            console.log(a);
            let found = null;
            // loop through the items
            data.items.forEach(function (item) {
                console.log(item.id);
                if (item.id === a) {
                    found = item;
                }
            });
            return found;
        },
        updateitem: function (name, calories) {
            calories = parseInt(calories, 10);
            let found = null;
            data.items.forEach(function (item) {
                if (item.id === data.currentitem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        setcurrentitem: function (item) {
            data.currentitem = item;
        },
        getcurrentitem: function () {
            console.log(data.currentitem);
            return data.currentitem;
        },
        gettotalcalories: function () {
            let total = 0;
            // loop through the items and add cal
            data.items.forEach(function (item) {
                console.log(item.calories);
                total = total + parseInt(item.calories);
                console.log(total);
            });
            data.totalcalories = total;
            return data.totalcalories;
        },
        logdata: function () {
            return data;
        }
    }
})();
// ui controller
const UIctrl = (function () {
    const uiselectors = {
        itemlist: '#item-list',
        listitems: '#item-list-li',
        addbtn: '.add-btn',
        updatebtn: '.update-btn',
        deletebtn: '.delete-btn',
        backbtn: '.back-btn',
        itemnameinput: "#item-name",
        itemcaloriesinput: "#item-calories",
        totalcalories: '.total-calories'
    }
    console.log('item controller');
    return {
        populateitemlist: function (items) {
            console.log(items);
            let html = "";

            items.forEach(function (item) {
                html += ` <li class="collection-item" id="item-${item.id}">
                 <strong>${item.name}: </strong> <em>${item.calories}</em>
                 <a href="#" class="secondary-content">
                   <i class=" edit-item fa fa-pencil"></i>
                 </a>
               </li>`;
            });
            // insert list items
            document.querySelector(uiselectors.itemlist).innerHTML = html;
        },
        getiteminput: function () {
            return {
                name: document.querySelector(uiselectors.itemnameinput).value,
                calorie: document.querySelector(uiselectors.itemcaloriesinput).value,
            }
        },
        addlistitem: function (item) {
            // show the list
            document.querySelector(uiselectors.itemlist).style.display = 'block';
            // create li item
            const li = document.createElement('li');
            // add class
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            console.log(li);
            // add html
            li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories}</em>
<a href="#" class="secondary-content">
  <i class=" edit-item fa fa-pencil"></i>
</a>`;
            // insert item
            document.querySelector(uiselectors.itemlist).insertAdjacentElement('beforeend', li);
        },
        updatelistitem: function (item) {
            
            let Domlistitems = document.querySelector(uiselectors.itemlist);
            // we need to loop through node list so turn node list to arway
            listitems = Array.from(Domlistitems.children);
            listitems.forEach(function (listitem) {
                const itemId = listitem.getAttribute('id');
                if (itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class=" edit-item fa fa-pencil"></i>
        </a>`;
                }
            });
        },
        clearinput: function () {
            document.querySelector(uiselectors.itemnameinput).value = "";
            document.querySelector(uiselectors.itemcaloriesinput).value = "";
        },
        additemtoform: function () {
            document.querySelector(uiselectors.itemnameinput).value = itemctrl.getcurrentitem().name;
            document.querySelector(uiselectors.itemcaloriesinput).value = itemctrl.getcurrentitem().calories;
            UIctrl.showeditstate();
        },
        hidelist: function () {
            document.querySelector(uiselectors.itemlist).style.display = 'none';
        },
        showtotalcalories: function (totalcalories) {
            document.querySelector(uiselectors.totalcalories).textContent = totalcalories;
        },
        cleareditstate: function () {
            UIctrl.clearinput();
            document.querySelector(uiselectors.updatebtn).style.display = 'none';
            document.querySelector(uiselectors.deletebtn).style.display = 'none';
            document.querySelector(uiselectors.backbtn).style.display = 'none';
            document.querySelector(uiselectors.addbtn).style.display = 'inline';
        },
        showeditstate: function () {
            // UIctrl.clearinput();
            document.querySelector(uiselectors.updatebtn).style.display = 'inline';
            document.querySelector(uiselectors.deletebtn).style.display = 'inline';
            document.querySelector(uiselectors.backbtn).style.display = 'inline';
            document.querySelector(uiselectors.addbtn).style.display = 'none';
        },
        getselectors: function () {
            return uiselectors;
        }
    }
})();
// app controller
const Appctrl = (function (itemctrl, UIctrl) {
    // public methods
    // load  all event listners
    const loadeventlistners = function () {
        const uiselectors = UIctrl.getselectors();
        // add item event
        document.querySelector(uiselectors.addbtn).addEventListener('click', function (e) {
            // get form input from ui control
            const input = UIctrl.getiteminput();
            // console.log(input);
            // first check if there is something included
            if (input.name !== '' && input.calorie !== '') {
                // console.log(123);
                // add item
                const newItem = itemctrl.addItem(input.name, input.calorie);

                //  add item to ui list
                UIctrl.addlistitem(newItem);
                // get the total calories
                const totalcalories = itemctrl.gettotalcalories();
                // add total calories to ui
                UIctrl.showtotalcalories(totalcalories);
                // clear fields
                UIctrl.clearinput();
            }
            e.preventDefault();
        });
        // disable the submit on enter
        document.addEventListener('keypress', function (e) {
            if (e.keycode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
        document.querySelector(uiselectors.itemlist).addEventListener('click', function (e) {
            // update add submit
            if (e.target.classList.contains('edit-item')) {
                // get the list item id
                const listid = e.target.parentNode.parentNode.id;
                // break into the array
                const listidarr = listid.split('-');
                console.log(listidarr[1]);
                // get the actual id
                const id = parseInt(listidarr[1]);
                console.log(id);
                // get item
                const itemtoedit = itemctrl.getitembyid(id);
                // console.log(itemtoedit);
                // set current item
                itemctrl.setcurrentitem(itemtoedit);
                // add item to form
                UIctrl.additemtoform();
            }
            e.preventDefault();
        });
        // update item event
        document.querySelector(uiselectors.updatebtn).addEventListener('click', function (e) {
            // update item submit
            // get item input
            const input = UIctrl.getiteminput();
            const updateitem = itemctrl.updateitem(input.name, input.calorie);
            // update ui
            UIctrl.updatelistitem(updateitem);
            e.preventDefault();
        });
    }
    return {
        init: function () {
            // clear the edit state or set initial state
            UIctrl.cleareditstate();
            // console.log('intilizing app');
            // fetch items from data structure
            const items = itemctrl.getitems();
            // check if any items
            if (items.length === 0) {
                UIctrl.hidelist();
            } else {
                UIctrl.populateitemlist(items);
            }
            // populate list with items
            UIctrl.populateitemlist(items);
            console.log(items);
            // load event listners
            loadeventlistners();
        }
    }
})(itemctrl, UIctrl);
Appctrl.init();