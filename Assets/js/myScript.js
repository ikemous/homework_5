 // $(document).ready(function() {


    let toDoList = [];
    let todaysDate = moment().format('ll');
    let currentHour = new Date().getHours();
    let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    console.log(currentHour);

    init();
    

    function init()
    {

        checkLocalStorage();

        //Display Todays Date
        $("#currentDay").text(todaysDate);

        let $newTable = $("<div>");
        $(".container").append($newTable); 
        

        for(let i = 0; i < workHours.length; i++)
        {
            createRow(i, $newTable);
        }

    }//End Init()

    function checkLocalStorage()
    {
        //Grab toDoList From The Local Storage
        toDoList = JSON.parse(localStorage.getItem("toDo"));
        
        //Check If The toDoList is empty
        if(toDoList === null)
        {
            //Make toDoList List An Empty Array
            toDoList = [];  
        }
    }

    function createRow(currentIndex, $newTable)
    {
        //Add new Row
        let $newRow = $("<section>");
        $newRow.addClass("row") 
        $newTable.append($newRow);

        //Add Hour Column To Row
        let $hourCol = $("<article>");
        $hourCol.addClass("time-block col-sm-2");
        $newRow.append($hourCol);

        let $hourText = $("<h2>");
        $hourText.addClass("hour");
        if(workHours[currentIndex] > 12)
        {
            $hourText.text((workHours[currentIndex] - 12)  + "pm");
        }
        else
        {
            $hourText.text(workHours[currentIndex] + "am");
        }
        $hourCol.append($hourText);

        let $textAreaCol = $("<article>");
        $textAreaCol.addClass("col-sm-8");  
        $newRow.append($textAreaCol);

        let $newTextArea = $("<textarea>");
        
        let toDoText;
        let alreadySubmitted = false;

        for(let a = 0; a < toDoList.length; a++)
        {
            if(toDoList[a].time == workHours[currentIndex])
            {
            alreadySubmitted = true;
            toDoText = toDoList[a].task;
            }

        }

        if(alreadySubmitted === true)
        {
            $newTextArea.val(toDoText);
        }


        if(currentHour > workHours[currentIndex])
        {
            $newTextArea.addClass("past");              
        }
        else if(currentHour === workHours[currentIndex])
        {
            $newTextArea.addClass("present");
        }
        else
        {
            $newTextArea.addClass("future");
        }
        $textAreaCol.append($newTextArea);

        let $buttonCol = $("<article>");
        $buttonCol.addClass("col-sm-2");
        $newRow.append($buttonCol);
        
        let $newButton = $("<button>");
        $newButton.addClass("saveBtn")
        $newButton.attr("value", workHours[currentIndex])
        $newButton.text("SAVE");
        $buttonCol.append($newButton);
    }



    $("section").click(function(event){


        if(event.target.matches("button"))
        {
            let content = this.children[1].children[0].value;

            let newObj = {
            time: event.target.value,
            task: content                
            }
            
            let alreadySubmitted = false;

            for(let i = 0; i < toDoList.length; i++)
            {
                if(toDoList[i].time === newObj.time)
                {
                    alreadySubmitted = true;
                    toDoList[i].task = content;
                }
            }

            if(alreadySubmitted === false)
            {
            toDoList.push(newObj);
            }

            
            localStorage.setItem("toDo", JSON.stringify(toDoList));

        }
    });//End tr Click Event




  // });
