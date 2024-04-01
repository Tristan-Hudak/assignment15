const getCrafts = async() => {
    try{
        //return (await (await fetch("http://localhost:3000/api/crafts"))).json();
        let response = await fetch("/api/crafts");
        return await response.json();
    }
    catch(error) {
        console.log("error reciveing data");
        return "";
    }
};



const showCrafts = async() => {

    let craftsJSON = await getCrafts();

    const craftDiv = document.getElementById("json-container");


    //const craftsJSON = await getCrafts();
    //console.log(craftsJSON);
    
    if(craftsJSON == ""){
        console.log("sorry, no Animals");
        return;
    }

   

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const div4 = document.createElement("div");
    const div5 = document.createElement("div");

    const divConstructor = (currentDiv, num) => {
        //console.log(currentDiv);
        currentDiv.setAttribute("id", "div"+num);
        currentDiv.setAttribute("class", "img-size");
        currentDiv.classList.add("class","coll1o5");
        
    }

    const listConstrtor = (arraies) => {
        const modalSecUl = document.createElement("ul");

        arraies.forEach((array)=>{
            const listItem = document.createElement("li");
            listItem.innerHTML = array;
            modalSecUl.append(listItem);
        });

        return modalSecUl;
    }

    divConstructor(div1,1);
    divConstructor(div2,2);
    divConstructor(div3,3);
    divConstructor(div4,4);
    divConstructor(div5,5);


    craftDiv.append(div1);
    craftDiv.append(div2);
    craftDiv.append(div3);
    craftDiv.append(div4);
    craftDiv.append(div5);

    let modalCounter = 0;

    craftsJSON.forEach((craft) => {
        const section = document.createElement("section");
        section.classList.add("spacing");
        section.setAttribute("rel", "modal "+modalCounter);

        const img = document.createElement("img");
        img.setAttribute("id", "img-holder");
        img.setAttribute("rel", "modal "+modalCounter);
        img.src = "/images/" + craft.image;

        

        //modal creation
        const modalDiv = document.createElement("div");
        const modalBody = document.createElement("div");

        modalDiv.classList.add("modal")
        modalDiv.setAttribute("id", "modal "+modalCounter);
        modalDiv.classList.add("class", "show-hide");

        

        modalBody.classList.add("flex-box");
        modalBody.classList.add("modal-content");

        const modalExit = document.createElement("span");
        modalExit.setAttribute("id","far-right")
        modalExit.setAttribute("rel", "modal "+modalCounter);
        modalExit.setAttribute("class","close")
        modalExit.innerHTML =  `&times;`;

        const modalImg = document.createElement("img");
        modalImg.setAttribute("id", "img-modal");
        modalImg.src = "/images/" + craft.image;

        //text area

        const modalSection = document.createElement("section");
        modalSection.setAttribute("id", "sec-space")

        const modalSecTitle = document.createElement("h1");
        const modalSecDescrip = document.createElement("p");
        const modalSecUlTitle = document.createElement("h2");
        

        modalSection.append(modalSecTitle);
        modalSecTitle.innerHTML = craft.name;

        modalSection.append(modalSecDescrip);
        modalSecDescrip.innerHTML = craft.description;

        modalSection.append(modalSecUlTitle);
        modalSecUlTitle.innerHTML = "Supplies";

        modalSection.append(listConstrtor(craft.supplies));

        //order

        const modalContent = document.createElement("div");
        const modalHeader = document.createElement("div");

        modalContent.setAttribute("class", "coll1o2");
        modalContent.setAttribute("class", "flex-box");
        modalHeader.setAttribute("class", "coll1o2");

        modalHeader.append(modalExit);
        modalContent.append(modalImg);
        modalContent.append(modalSection);
        
        modalBody.append(modalContent);
        modalBody.append(modalHeader);
        


        modalDiv.append(modalBody);

        /*
        console.log(craft._id % 1);
        console.log(craft._id % 2);
        console.log(craft._id % 3);
        console.log(craft._id % 4);
        console.log(craft._id % 5);
        entering right div*/

        if(craft._id == 1){
            div1.append(section);
        }
        else if(craft._id == 2){
            div2.append(section);
        }
        else if(craft._id == 3){
            div3.append(section);
        }
        else if(craft._id == 4){
            div4.append(section);
        }
        else if(craft._id == 5){
           div5.append(section);
        }


        craftsJSON.forEach((craft_id) => {
            //console.log(craft_id._id, craft._id);

            if(craft_id._id == craft._id){
                for(let i = craft_id._id; i > 5;){
                    //console.log("match");
                    i = i-5
    
                    if(i == 1){
                        div1.append(section);
                        //console.log(1);
                    }
                    else if(i == 2){
                        div2.append(section);
                        //console.log(2);
                    }
                    else if(i == 3){
                        div3.append(section);
                        //console.log(3);
                    }
                    else if(i == 4){
                        div4.append(section);
                        //console.log(4);
                    }
                    else if(i == 5){
                        div5.append(section);
                        //console.log(5);
                    }
                    else {
                        div1.append(section);
                        //console.log(0);
                    }
                }
            }
            else{
                return;
            }
        });
            

        
        //console.log(img.src);

        section.append(img);
        section.append(modalDiv);

        modalCounter++;
    });

    

    const showThatModal = (e) => {
        

        if( e.target.getAttribute("id") == "img-holder" || e.target.getAttribute("class") == "spacing" ){
            //console.log(e.target.getAttribute("rel"));
            const id = e.target.getAttribute("rel");
            console.log(id + "Open");
            document.getElementById(id).style.display = "block";

        }
        
    };

    const exitModal = (e) => {
        //console.log(e.target.getAttribute("id"));
        const modalsid = e.target.getAttribute("rel");
        //console.log(modalsid + "close");
        document.getElementById(modalsid).style.display = "none";
    }

    
    const container = document.querySelector("#json-container");

    const secMatches = container.querySelectorAll("section");
    const spanMatches = container.querySelectorAll("span");

    //console.log(matches);

    secMatches.forEach((sec)=>{
        //console.log(document.getElementById("exiter"));
        sec.onclick = showThatModal;
        
    });

    spanMatches.forEach((span)=>{
        span.onclick = exitModal;
    })
    

};

//addCraft
const addCraft = async(e) => {
    e.preventDefault
    e.preventDefault();
    const form = document.getElementById("submit-craft-form");
    const formData = new FormData(form);
    formData.append("supplies", getSupplies());
    console.log(...formData);

    const response = await fetch("/api/crafts", {
        method:"POST",
        body:formData
    });

    if(response.status != 200){
        console.log("error posting data");
    }

    document.getElementById("add-craft-form").classList.remove("show-hide-form");
    document.getElementById("json-container").innerHTML = "";
    resetForm();
    showCrafts();
}


//show hide adding form
const showCraftForm = (e) => {
    //console.log("should open form")
    document.getElementById("add-craft-form").classList.add("show-hide-form");
}
const hideCraftForm = (e) => {
    //console.log("should close form")
    document.getElementById("add-craft-form").classList.remove("show-hide-form");
}

//reset form
const resetForm = () => {
    const form = document.getElementById("submit-craft-form");
    form.reset();
    document.getElementById("supplies-boxes").innerHTML = "";
    document.getElementById("img-prev").src="";
};

//supplies
const getSupplies = () => {
    const inputs = document.querySelectorAll("#supplies-boxes input");
    const supplies = [];
    inputs.forEach((input) =>{
        supplies.push(input.value);
    });
    return supplies;
}

const addSupplies = (e) => {
    e.preventDefault();
    //console.log("adding the supplie");
    const supplyBoxes = document.getElementById("supplies-boxes");
    const input = document.createElement("input");
    input.type = "text";
    supplyBoxes.append(input);
}


document.getElementById("add-craft").onclick = showCraftForm;
document.getElementById("form-close").onclick = hideCraftForm;



window.onload = () => {
    showCrafts();
    document.getElementById("submit-craft-form").onsubmit = addCraft;
    document.getElementById("add-supply").onclick = addSupplies;

    document.getElementById("img").onchange = (e) => {
        const prev = document.getElementById("img-prev");
        prev.classList.add("fit-box")
    
        //they didn't pick an image
        if(!e.target.files.length){
            prev.src = "";
            return;
        }
    
        prev.src = URL.createObjectURL(e.target.files.item(0));
    }
}


