$(document).ready(function() {

    //Local Variables To Be Used
    let toDoList = [];//List to hold rask objects
    let todaysDate = moment().format('ll');//Date For Header
    let currentHour = moment().format('H');//Hour To Help assign classes to text columns
    let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];//Array For business hours
    let $mainCont = $(".container");//Main Container to hold all rows


    init();
    
    /*
        init()
        Purpose: To display page on page start items using various functions
        Parameters: None
        Returns: None
    */
    function init()
    {
        //Check if there are local storage items
        checkLocalStorage();

        //Display Todays Date
        $("#currentDay").text(todaysDate);   
             
        //Create a Row For Each Business Hour
        for(let i = 0; i < workHours.length; i++)
        {
            createRow(i);
        }


    }//End Init()

    /*
        createRow()
        Purpose: Create all elements and attributes for a row for the calendar
        Parameters: currentIndex - Used to go through which hour is being inspected
        Returns: None
    */
    function createRow(currentIndex)
    {
        //Add new Row
        let $newRow = $("<section>");
        $newRow.addClass("row") 
        $mainCont.append($newRow);
        //Add Hour TexT
        let $hourCol = $("<article>");
        $hourCol.addClass("time-block col-sm-2");
        $newRow.append($hourCol);
        let $hourText = $("<h2>");
        $hourText.addClass("hour");
        $hourText.text(checkAmOrPm(workHours[currentIndex]));
        $hourCol.append($hourText);
        //Add TextArea
        let $textAreaCol = $("<article>");
        $textAreaCol.addClass("col-sm-8");  
        $newRow.append($textAreaCol);
        let $newTextArea = $("<textarea>");
        $newTextArea.val(checkForTask(workHours[currentIndex]));
        $newTextArea.addClass(setTextAreaClass(workHours[currentIndex]));
        $textAreaCol.append($newTextArea);
        //Add Button
        let $buttonCol = $("<article>");
        $buttonCol.addClass("col-sm-2");
        $newRow.append($buttonCol);
        let $newButton = $("<button>");
        $newButton.addClass("saveBtn");
        $newButton.attr("value", workHours[currentIndex]);
        $buttonCol.append($newButton);
        let $buttonI = $("<i>");//Icon for the save button
        $buttonI.addClass("far fa-save");
        $newButton.append($buttonI);

    }//End createRow()
    
    /*
        checkLocalStorage()
        Purpose: Check local storage to store values in Our TodoList Arrat
        Parameters: None
        Return: None
    */
   function checkLocalStorage()
   {
       //Grab toDoList From The Local Storage
       toDoList = JSON.parse(localStorage.getItem("toDo"));
       
       //Check If The toDoList is empty
       if(toDoList === null)
       {
           toDoList = [];  
       }
   }//End Check Local Storage

   /*
       checkAmOrPm()
       Purpose: to help set the text of the hours for the calendar
       Parameter: hour - used to set the text and check if the hour is past 12
       Return: text - full text of the hour block
   */
   function checkAmOrPm(hour)
   {
       let text;
       //Hour Is In The PM
       if(hour > 12)
       {
           text = (hour - 12)  + "pm";
       }
       else//Hour is in the AM
       {
           text = hour  + "am";
       }

       return text;
   }//End checkAmOrPm()

    /*
        updateList()
        Purpose: Check if the Object values exist in the current toDoList
        Parameter: theObj - object that the calendar is checking that 
    */
    function updateList(theObj, currentTask)
    {
        //Go through current to do list to see if the obj exists in it
        for(let i = 0; i < toDoList.length; i++)
        {
            //Obj Exists
            if(toDoList[i].time === theObj.time)
            {
                //Update task
                toDoList[i].task = currentTask;
                return;
            }
        }

        toDoList.push(theObj);

    }//End updateList()

    /*
        checkForTask()
        Purpose: Check if there is a task for the current hour being looked at
        Parameter: hour - used to check the toDoList for the task time
        Resturn: toDoText - text to be used for the value of the textarea input
    */
    function checkForTask(hour)
    {
        //empty text to ensure that 
        let toDoText = "";
        //Go through toDoList To check if time has been logged
        for(let a = 0; a < toDoList.length; a++)
        {
            //time is logged for current hour
            if(toDoList[a].time == hour)
            {
                //Grab task text and leave loop
                toDoText = toDoList[a].task;
                break;
            }
        }
        //Return task or empty string
        return toDoText;
    }//End checkForTask()

    /*
        setTextAreaClass()
        Purpose: Set the class of the textarea during its creation
        Parameter: hour - Used to check if the textarea time is in the past, present or future
        Return: "past", "present", or "future" class defined in the CSS
    */
    function setTextAreaClass(hour)
    {
        if(currentHour > hour)
        {
           return "past";              
        }
        else if(currentHour === hour)
        {
            return "present";
        }
        return "future";
    }//End setTextAreaClass()


    /*
        section click event
        Purpose: Determine if button was clicked in a section 
        Parameter: function with the current event
        Return: None
    */
    $("section").click(function(event){
        console.log("clicked");

        //Check If Event was a button and not the last two buttons
        if(event.target.id !== "clear" && event.target.id !== "saveAll" && event.target.matches("button") || event.target.matches("i") )
        {
            //Grab Content from Section El
            let content = this.children[1].children[0].value;
            let taskTime = this.children[2].children[0].value;
            //Create Object for task
            let newObj = {
                time: taskTime,
                task: content                
            }
            //Update Task in the toDoList Array
            updateList(newObj, content);
            //Update Local Storage with toDoList
            localStorage.setItem("toDo", JSON.stringify(toDoList));
        }

    });//End section Click Event

    
});
