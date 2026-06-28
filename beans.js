/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////VARIABLES////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

var DEBUG = true;

//Beans
var beans = 0; //Count in resources
var beansMax = 20; //Max in resources
var beansPS = 0; //Beans per second gain
var beansTime = 5; //Seconds after to finish after button press
var beansWorkers = 0; //Number of workers
var beansMultiBase = 1;  // see search for beans function for full calculation!
var beansMulti = 1; //Multiplier for auto
var beansActive = false;

//Sprouts
var sprouts = 0;
var sproutsMax = 15;
var sproutsPS = 0;
var sproutsTime = 10; //10s base
var sproutsWorkers = 0;
var sproutsMultiBase = 1;
var sproutsMulti = 1;
var sproutsActive = false;

//Water
var water = 0;
var waterMax = 8;
var waterPS = 0;
var waterTime = 15; //15 sec base
var waterWorkers = 0;
var waterMultiBase = 1;
var waterMulti = 1;
var waterActive = false;

//Plants
var plants = 0;
var plantsMax = sproutsMax;
var plantsPS = 0;
var plantsTime = 45; //45 sec base
var plantsWorkers = 0;
var plantsMultiBase = 1;
var plantsMulti = 1;
var plantsActive = false;

//Harvest
var harvestBeanCount = 15; //Number of beans harvested per plant harvested
var harvestTime = 120; //2 min base
var harvestWorkers = 0;
var harvestActive = false;

//Buffs and Upgrades
var fannyPack1 = 5; // +5 beansMax base

//Tabs
var tab;
var tabContent;
var debugMode;
document.getElementById('debugMode').innerHTML = 'DEBUG : NO'
//fast if debug
if (DEBUG) {
    beansTime = 0.1;
    sproutsTime = 0.1;
    waterTime = 0.1;
    plantsTime = 0.1;
    harvestTime = 0.1;
    document.getElementById('debugMode').innerHTML = 'DEBUG : YES'
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////THINGS TO START HIDDEN//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//Progress bars
var pbSprouts = document.getElementById('pbSprouts');
pbSprouts.style.display = 'none';
var pbSproutsFill = document.getElementById('pbSproutsFill');
pbSprouts.style.display = 'none';
var pbSproutsTimer = document.getElementById('pbSproutsTimer');
pbSproutsTimer.style.display = 'none';
var pbSproutsTimerFill = document.getElementById('pbSproutsTimerFill');
pbSproutsTimer.style.display = 'none';

var pbWater = document.getElementById('pbWater');
pbWater.style.display = 'none';
var pbWaterFill = document.getElementById('pbWaterFill');
pbWater.style.display = 'none';
var pbWaterTimer = document.getElementById('pbWaterTimer');
pbWaterTimer.style.display = 'none';
var pbWaterTimerFill = document.getElementById('pbWaterTimerFill');
pbWaterTimer.style.display = 'none';

var pbPlants = document.getElementById('pbPlants');
pbPlants.style.display = 'none';
var pbPlantsFill = document.getElementById('pbPlantsFill');
pbPlants.style.display = 'none';
var pbPlantsTimer = document.getElementById('pbPlantsTimer');
pbPlantsTimer.style.display = 'none';
var pbPlantsTimerFill = document.getElementById('pbPlantsTimerFill');
pbPlantsTimer.style.display = 'none';

var pbHarvestTimer = document.getElementById('pbHarvestTimer');
pbHarvestTimer.style.display = 'none';
var pbHarvestTimerFill = document.getElementById('pbHarvestTimerFill');
pbHarvestTimer.style.display = 'none';

//Tabs
document.getElementById('villageTab').style.visibility = 'hidden';
document.getElementById('upgradesTab').style.visibility = 'hidden';

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////THINGS TO START SHOWN///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('beans').innerHTML = "Beans: " + beans + "/" + beansMax;

/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////TABS CODE/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = function () {
    tabContent = document.getElementsByClassName('tabContent');
    tab = document.getElementsByClassName('tab');
    hideTabsContent(1);
}

document.getElementById('tabs').onclick = function (event) {
    var target = event.target;
    if (target.className == 'tab') {
        for (var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('border');
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('border');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////BUTTONS///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//Search for Beans Button
var searchForBeans = document.createElement('button');
searchForBeans.id = 'searchForBeans';
searchForBeans.innerHTML = 'Search for beans (+1 to 5 bean)';
searchForBeans.visible = false;
var mainTab = document.getElementsByClassName('mainTab')[0];
mainTab.appendChild(searchForBeans);

//Plant Beans Button
var plantBeans = document.createElement('button');
plantBeans.id = 'plantBeans';
plantBeans.innerHTML = 'Plant beans (-1 bean, +1 sprout)';
plantBeans.visible = false;

//Gather Water Button
var gatherWater = document.createElement('button');
gatherWater.id = 'gatherWater';
gatherWater.innerHTML = 'Gather water (+1 fl oz water)';
gatherWater.visible = false;

//Water Sprouts Button
var waterSprouts = document.createElement('button');
waterSprouts.id = 'waterSprouts';
waterSprouts.innerHTML = 'Water sprouts (-1 sprout, -1 fl oz water, +1 plant)';
waterSprouts.visible = false;

//Harvest Plants Button
var harvest = document.createElement('button');
harvest.id = 'harvest';
harvest.innerHTML = 'Harvest plants (-1 plant, +15 beans)';
harvest.visible = false;

//Hire Villager's Son Button
var hireVillagerSon = document.createElement('button');
hireVillagerSon.id = 'hireVillagerSon';
hireVillagerSon.innerHTML = 'Hire Villager\'s Son';
hireVillagerSon.visible = false;

var villageTab = document.getElementsByClassName('villageTab')[0];
villageTab.appendChild(hireVillagerSon);

//Hire Villager's Brother Button
var hireVillagerBrother = document.createElement('button');
hireVillagerBrother.id = 'hireVillagerBrother';
hireVillagerBrother.innerHTML = 'Hire Villager\'s Brother';
hireVillagerBrother.visible = false;

//Upgrade fanny pack
var upgradeBeansMax = document.createElement('button');
upgradeBeansMax.id = 'upgradeBeansMax';
upgradeBeansMax.innerHTML = '+5 Max beans, Cost: 15 beans';
upgradeBeansMax.visible = false;
var upgradesTab = document.getElementsByClassName('upgradesTab')[0];
upgradesTab.appendChild(upgradeBeansMax);

//What happens when buttons are clicked
searchForBeans.addEventListener('click', updateBeans);
plantBeans.addEventListener('click', updateSprouts);
gatherWater.addEventListener('click', updateWater);
waterSprouts.addEventListener('click', updatewaterSprouts);
harvest.addEventListener('click', updateHarvestPlants);
hireVillagerSon.addEventListener('click', turnOnAutoBeans);
hireVillagerBrother.addEventListener('click', turnOnAutoSprouts);
upgradeBeansMax.addEventListener('click', updateMaxQty(beansMax, fannyPack1, 15, beans));

//Function to disable buttons for X time
function disableButton(buttonId, seconds) {
    document.getElementById(buttonId).disabled = true;
    setTimeout(function () {
        document.getElementById(buttonId).disabled = false;
    }, seconds * 1000);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////TICK///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

//Master Clock
var x = 1;
var masterClock = setInterval(tick, 10);

//Tick function
function tick() {
    document.getElementById('masterClock').innerHTML = "Seconds since starting: " + x.toFixed(2);
    x += .01;

    if (plants > 1 && hireVillagerSon.visible == false) {
        villageTab.appendChild(hireVillagerSon);
        hireVillagerSon.visible = true;
        document.getElementById('villageTab').style.visibility = 'visible';
    }

    // always check if requirements are met, and if the button is disabled, re-enable it
    if (beans < beansMax && beansActive == false && document.getElementById('searchForBeans').disabled == true) {
        document.getElementById('searchForBeans').disabled = false;
    }
    if (beans > 0 && sproutsActive == false && document.getElementById('plantBeans').disabled == true  || 
    sprouts <= sproutsMax && document.getElementById('plantBeans').disabled == true && sproutsActive == false) {
        document.getElementById('plantBeans').disabled = false;
    }
    if (water < waterMax && waterActive == false && document.getElementById('gatherWater').disabled == true) {
        document.getElementById('gatherWater').disabled = false;
    }
    if (water > 0 && sprouts > 0 && plants < plantsMax && plantsActive == false && document.getElementById('waterSprouts').disabled == true) {  
        document.getElementById('waterSprouts').disabled = false;
    }
    if (plants > 0 && (beans + harvestBeanCount) <= beansMax && harvestActive == false && document.getElementById('harvest').disabled == true) {
        document.getElementById('harvest').disabled = false;
    }
    
}
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////PROGRESS BARS////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Function for progress bars
function updatePbFill(qty, maxQty, pbId) {
    if (qty >= 0 && qty <= maxQty) {
        document.getElementById(pbId).style.width = (qty / maxQty) * 100 + "%";
    }
}

//Function for progress bar TIMERS
function updatePbTimerFill(pbId, seconds) {
    var progress = 0;
    var progressInterval = setInterval(function () {
        progress += 1;
        document.getElementById(pbId).style.width = progress + '%';
        if (progress == 100) {
            clearInterval(progressInterval);
            document.getElementById(pbId).style.width = 0 + '%';
        }
    }, seconds * 10);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////MAIN TAB//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

//Function to add 1 bean per button click
function updateBeans() {
    if (beans < beansMax) {

        //Disable button and run timer pb
        disableButton('searchForBeans', beansTime);
        updatePbTimerFill('pbBeansTimerFill', beansTime);
        beansActive = true;

        //Add bean AFTER TIMER
        setTimeout(function () {
            foo = beans + Math.floor(Math.random()*10/2) + beansMultiBase * beansMulti; // beans calculation | ex. 0 = 0 + 1 + 1 * 1 = 2, or 0 = 0 + 0 + 1 * 1 = 1
            if (foo > beansMax) {
                foo2 = foo - beansMax;
                foo = foo - foo2;
                // if beans is above beansMax, limit it
            }
            beans = foo;

            document.getElementById('beans').innerHTML = "Beans: " + beans + "/" + beansMax;
            updatePbFill(beans, beansMax, 'pbBeansFill');

            if (beans >= beansMax && document.getElementById('searchForBeans').disabled == false) {
                document.getElementById('searchForBeans').disabled = true;
            }
            beansActive = false;

            //Display updates
            if (beans > 2 & searchForBeans.visible == false) {
                mainTab.appendChild(plantBeans);
                document.getElementById('sprouts').innerHTML = "Sprouts: " + sprouts + "/" + sproutsMax;
                pbSprouts.style.display = 'block';
                pbSproutsTimer.style.display = 'block';
                searchForBeans.visible = true;
                narrativeEventLog(narrative1, narrative2);
            }
        }, beansTime * 1000)
    }
};

//Function to add 1 sprout and remove 1 bean per button click
function updateSprouts() {
    if (beans > 0) {
        if (sprouts < sproutsMax) {

            //Disable button and run timer pb
            disableButton('plantBeans', sproutsTime);
            updatePbTimerFill('pbSproutsTimerFill', sproutsTime);
            sproutsActive = true;

            //Remove bean immediately
            beans--;
            updatePbFill(beans, beansMax, 'pbBeansFill');
            document.getElementById('beans').innerHTML = "Beans: " + beans + "/" + beansMax;

            //Add sprout AFTER TIMER
            setTimeout(function () {
                sprouts++;
                updatePbFill(sprouts, sproutsMax, 'pbSproutsFill');
                document.getElementById('sprouts').innerHTML = "Sprouts: " + sprouts + "/" + sproutsMax;

                //disable button if you dont have enough beans OR if sprouts are full AFTER TIMER
                if (beans < 1 && document.getElementById('plantBeans').disabled == false || sprouts >= sproutsMax) {
                    document.getElementById('plantBeans').disabled = true;
                }

                sproutsActive = false;

                //Display updates 
                if (sprouts > 1 && plantBeans.visible == false) {
                    mainTab.appendChild(gatherWater);
                    plantBeans.visible = true;
                    pbWater.style.display = 'block';
                    pbWaterTimer.style.display = 'block';
                    document.getElementById('water').innerHTML = "Water: " + water + "/" + waterMax + " fl oz";
                    narrativeEventLog(narrative2, narrative3);
                }
            }, sproutsTime * 1000)
        }
    }
};

//Function to add 1 water per button click
function updateWater() {
    if (water < waterMax) {

        //Disable button and run timer pb
        disableButton('gatherWater', waterTime);
        updatePbTimerFill('pbWaterTimerFill', waterTime);
        waterActive = true;

        //Add water AFTER TIMER
        setTimeout(function () {
            water++;

            if (water >= waterMax && document.getElementById('gatherWater').disabled == false) {
                document.getElementById('gatherWater').disabled = true;
            }
            updatePbFill(water, waterMax, 'pbWaterFill');
            document.getElementById('water').innerHTML = "Water: " + water + "/" + waterMax + " fl oz";

            waterActive = false;

            //Display Updates
            if (sprouts > 1 && water > 1 && waterSprouts.visible == false) {
                mainTab.appendChild(waterSprouts);
                waterSprouts.visible = true;
                pbPlants.style.display = 'block';
                pbPlantsTimer.style.display = 'block';
                document.getElementById('sprouts').innerHTML = "Sprouts: " + sprouts + "/" + sproutsMax;
                document.getElementById('plants').innerHTML = "Plants: " + plants + "/" + plantsMax;
                narrativeEventLog(narrative3, narrative4);
            }
        }, waterTime * 1000)
    }
};

//Function to remove 1 water, remove one sprout, and add one plant
function updatewaterSprouts() {
    if (sprouts > 0 && plants < plantsMax && water > 0) {

        //Disable button and run timer pb
        disableButton('waterSprouts', plantsTime);
        updatePbTimerFill('pbPlantsTimerFill', plantsTime);
        plantsActive = true;

        //Remove water and sprouts IMMEDIATELY
        water--;
        sprouts--;
        updatePbFill(water, waterMax, 'pbWaterFill');
        updatePbFill(sprouts, sproutsMax, 'pbSproutsFill');
        document.getElementById('water').innerHTML = "Water: " + water + "/" + waterMax + " fl oz";
        document.getElementById('sprouts').innerHTML = "Sprouts: " + sprouts + "/" + sproutsMax;
        

        //Add plants AFTER TIMER
        setTimeout(function () {
            plants++;
            
            if ((water <= 0 || sprouts <= 0 || plants >= plantsMax) && document.getElementById('waterSprouts').disabled == false) {
                document.getElementById('waterSprouts').disabled = true;
            }  

            updatePbFill(plants, sproutsMax, 'pbPlantsFill');
            document.getElementById('plants').innerHTML = "Plants: " + plants + "/" + plantsMax;
            plantsActive = false;

            //Display updates
            mainTab.appendChild(harvest);
            harvest.visible = true;
            pbHarvestTimer.style.display = 'block';
            document.getElementById('harvest').innerHTML = "Harvest"
            if (plants > 1 && hireVillagerSon.visible == false) {
                villageTab.appendChild(hireVillagerSon);
                hireVillagerSon.visible = true;
                document.getElementById('villageTab').style.visibility = 'visible';
            }
        }, plantsTime * 1000)
    }
}

//Function to remove 1 plant and add 5 beans
function updateHarvestPlants() {
    if (plants > 0 && (beans + harvestBeanCount) <= beansMax) {

        //Disable button and run timer pb
        disableButton('harvest', harvestTime);
        updatePbTimerFill('pbHarvestTimerFill', harvestTime);
        document.getElementById('harvest').innerHTML = "Harvesting..."
        harvestActive = true;

        //Remove plant IMMEDIATLEY
        plants--;
        updatePbFill(plants, sproutsMax, 'pbPlantsFill');
        document.getElementById('plants').innerHTML = "Plants: " + plants + "/" + plantsMax;

        //Add beans and remove plants AFTER TIMER
        setTimeout(function () {

            if (plants <= 0 || (beans + harvestBeanCount) > beansMax) {
                document.getElementById('harvest').disabled = true;
            }
            
            beans = beans + harvestBeanCount;
            harvestActive = false;
            updatePbFill(beans, beansMax, 'pbBeansFill');
            document.getElementById('beans').innerHTML = "Beans: " + beans + "/" + beansMax;
            document.getElementById('harvest').innerHTML = "Harvest"
        }, harvestTime * 1000)
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////VILLAGE TAB/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//Function to simulate button clicks for AUTO
function simClick(buttonId) {
    document.getElementById(buttonId).click();
}

//Function when hiring villager's son
function turnOnAutoBeans() {

    //Add worker and update BPS
    beansWorkers++;
    beansPS += 1/beansTime;
    document.getElementById('beansPS').innerHTML = beansPS + "/sec";
    document.getElementById('hireVillagerSon').disabled = true;

    //Automate click of searchForBeans button
    if (beansWorkers > 0) {
        setInterval(function () {
            simClick('searchForBeans'); 
        }, 0);

        //Disable current button after purchase and show next worker button
        if (hireVillagerBrother.visible == false) {
            villageTab.appendChild(hireVillagerBrother);
            hireVillagerBrother.visible = true;
        }
    }
}

//Function when hiring villager's brother
function turnOnAutoSprouts() {

    //Add worker and update SPS
    sproutsWorkers++;
    sproutsPS += 1/sproutsTime;
    document.getElementById('sproutsPS').innerHTML = sproutsPS + "/sec";
    document.getElementById('hireVillagerBrother').disabled = true;

     //Automate click of searchForBeans button
     if (sproutsWorkers > 0) {
        setInterval(function () {
            simClick('plantBeans'); 
        }, 0);

        //Disable current button after purchase and show next worker button
        if (upgradeBeansMax.visible == false) {
            upgradesTab.appendChild(upgradeBeansMax);
            upgradeBeansMax.visible = true;
            document.getElementById('upgradesTab').style.visibility = 'visible';
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////UPGRADES TAB/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//Funtion for PER SECOND upgrades
function updateAutoMulti(multiUpgraded, upgradePurchased) {
    multiUpgraded = multiUpgraded + upgradePurchased;
    return multiUpgraded;
}

//Function for MAX QTY upgrades
function updateMaxQty(maxQty, upgradePurchased, cost, currency) {
    if(currency >= cost) {
    maxQty += upgradePurchased;
    currency -= cost;

    updatePbFill(beans, beansMax, 'pbBeansFill');
    document.getElementById('beans').innerHTML = "Beans: " + beans + "/" + beansMax;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////NARRATIVE//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//Narrative Main Story Events
var narrativeLog = "";
var narrative1 = "Your eyes open. <br /> <br/> Lying on the ground, you look up towards the sky through a dense canopy of trees. Slowly you sit up, a bit confused. You don't know where you are or how you got here. All you know is that your stomach is rumbling. Opening your fanny pack for a snack, all you find is a handful of beans. Better than nothing. There appear to be more in the vicinity...";
var narrative2 = "Stumbling around while looking for beans, you are still very confused and disoriented. Within a short time you come upon a relatively large pond. It catches you off guard and after almost tripping on a root and taking an accidental swim, you notice a small sprout near your foot. A bean sprout. <br /> <br/> “Hey, I can do that!” <br /> <br/> Time to plant some beans."
var narrative3 = "Testing narrative 3"
var narrative4 = "Testing narrative 4"

//Display current event followed by a log of old events
document.getElementById('eventCurrent').innerHTML = narrative1;
document.getElementById('eventLog').innerHTML = narrativeLog;

//Function for Narrative Manipulation
function narrativeEventLog(narrativeCurrent, narrativeNext) {
    document.getElementById('eventCurrent').style.animation = 'none';
    document.getElementById('eventCurrent').offsetHeight; //Trigger animation reflow
    document.getElementById('eventCurrent').style.animation = null;
    document.getElementById('eventCurrent').innerHTML = narrativeNext;
    narrativeLog = narrativeCurrent + "<br /><br />" + narrativeLog;
    document.getElementById('eventLog').innerHTML = narrativeLog;
}




