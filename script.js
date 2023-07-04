//The following elements that  will be used
const container = document.createElement("div");
container.setAttribute("class", "container-fluid");
const fullstack = document.querySelector("#fullstack");
const home = document.querySelector("#home");
const jobs = document.querySelector("#jobs");
const saved = document.querySelector("#saved");

//Local storage
const saveDataInLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
const getDataFromLS = (key) => {
    const response = localStorage.getItem(key);
    const data = response ? JSON.parse(response) : [];
    return data;
};



const saved_jobs = getDataFromLS("saved_jobs");
const saved_jobs_ids = getDataFromLS("saved_jobs_ids");


//Url for fetching jobs

const url_jobs = "https://remotive.com/api/remote-jobs?limit=30";
const url_categories = "https://remotive.com/api/remote-jobs/categories";

// Creating Fullstack button  function
fullstack.addEventListener("click", () => {
    container.textContent = " ";
    const h1 = document.createElement("h1");
    const span = document.createElement("span");
    const hr = document.createElement("hr");
    const h3 = document.createElement("h3");
    span.textContent = "To use our service all you need is LOVE💚"
    h1.textContent = " Welcome to our jobs search engine";
    h3.textContent = "Enjoy your visit";
    h1.style = " margin-left: 15%;";
    h3.style = " margin-left: 15%;";
    span.style = " margin-left: 15%;";
    container.append(h1, span, hr, h3);
    document.body.appendChild(container);
});


// Creating home button function
home.addEventListener("click", () => {
    container.textContent = " ";
    const h1 = document.createElement("h1");
    const span = document.createElement("span");
    const hr = document.createElement("hr");
    const h3 = document.createElement("h3");
    span.textContent = "To use our service all you need is LOVE💚"
    h1.textContent = " Welcome to our jobs search engine";
    h3.textContent = "Enjoy your visit and feel at HOME";
    h1.style = " margin-left: 15%;";
    h3.style = " margin-left: 15%;";
    span.style = "margin-left: 15%;";
    container.append(h1, span, hr, h3);
    document.body.appendChild(container);
});

//Create all element function
const cards = (obj) => {
    
    const row = document.createElement("div");
    const col = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h6");
    const div_2 = document.createElement("div");
    const text = document.createElement("p");
    const a_1 = document.createElement("a");
    const save_btn = document.createElement("a");
    const remove_btn = document.createElement("a");
    const salary = document.createElement("p");
    const header = document.createElement("div");
    const footer = document.createElement("div");
    const span_1 = document.createElement("span");
    const span_2 = document.createElement("span");
    row.setAttribute("class", "card d-inline-block");
    col.setAttribute("class", "flex-sm-column");
    div_2.setAttribute("class", "card-body");

    row.style = "width: 26rem";
    img.setAttribute("class", "mx-auto d-block");
    img.style = "width: 9rem"; "margin-left: 10rem";
    title.setAttribute("class", "card-title");
    header.setAttribute("class", "new_div");
    footer.setAttribute("class", "new_div");

    text.setAttribute("class", "overflow-auto");
    a_1.setAttribute("class", "btn btn-success btn-sm");
    a_1.style = "margin-right:2rem";
    save_btn.setAttribute("class", "btn btn-danger btn-sm");
    remove_btn.setAttribute("class", "btn btn-danger btn-sm");
    remove_btn.setAttribute("id", obj.id);
    salary.style = "color:gray;";
    text.style = "overflow:scroll; height:250px;font-family: 'Courier New', Courier, monospace; border: 2px solid lightblue;";
    header.style = "text-align:center;";
    //adding the content
    // row.setAttribute("id");
    span_1.innerHTML = `<b>Company Name:</b> ${obj.company_name}`;
    span_2.innerHTML = `<b>Type:</b> ${obj.job_type}`;
    img.setAttribute("src", obj.company_logo);
    a_1.setAttribute("href", obj.url)

    a_1.textContent = "See this JOB";
    save_btn.textContent = "Save this JOB";
    title.textContent = obj.title;
    text.innerHTML = obj.description;
    salary.innerHTML = `<b>Salary:</b> ${obj.salary}`;
    //appending the content to the document
    header.append(span_1);
    footer.append(span_2);
    div_2.append(title, salary, text, a_1);
    if (saved_jobs_ids?.includes(obj.id)) {
        div_2.append(remove_btn)
    }
    else {
        div_2.append(save_btn)
    }
    row.append(col);
    col.append(header, img, div_2, footer);
    remove_btn.textContent = "Remove this JOB"
    container.appendChild(row, col);
    document.body.append(container);


    //  saving the card on saved jobs
    save_btn.addEventListener("click", () => {
        // Check if the item with the given id exists in local storage
        let savedJobsIds = JSON.parse(localStorage.getItem("saved_jobs_ids")) || [];
        if (savedJobsIds.includes(obj.id)) {
            // If the item exists, show a message to the user
            alert("This job has already been saved");
        } else {
            // If the item does not exist, add it to local storage
            let savedJobs = JSON.parse(localStorage.getItem("saved_jobs")) || [];
            savedJobs.push(obj);
            savedJobsIds.push(obj.id);

            localStorage.setItem("saved_jobs", JSON.stringify(savedJobs));
            localStorage.setItem("saved_jobs_ids", JSON.stringify(savedJobsIds));
        }
        div_2.replaceChild(remove_btn, save_btn);
    });

    remove_btn.addEventListener("click", (e) => {
        // Remove the job from local storage
        let savedJobs = JSON.parse(localStorage.getItem("saved_jobs")) || [];
        savedJobs = savedJobs.filter(x => x.id !== obj.id);
        localStorage.setItem("saved_jobs", JSON.stringify(savedJobs));

        let savedJobsIds = JSON.parse(localStorage.getItem("saved_jobs_ids")) || [];
        savedJobsIds = savedJobsIds.filter(x => x.id !== e.target.id);
        localStorage.setItem("saved_jobs_ids", JSON.stringify(saved_jobs_ids));

        div_2.replaceChild(save_btn, remove_btn);
    });
}


const getData = async () => {
    try {
        const response = await fetch(url_jobs)
        const data = await response.json();

        for (let x of data.jobs) {
            cards(x);
        }

    } catch (error) {
        console.log(error);
    } finally {
        console.log("Fetch request done");
    }
};

const Categories = async () => {
    try {

        const response = await fetch(url_categories);
        const data = await response.json();

        data.jobs.forEach(category => {
            const li = document.createElement("li");
            const c_href = document.createElement("a");
            const menu = document.querySelector("#menu");
            li.setAttribute("class", "dropdown-item");
            c_href.style = "color: black;";
            c_href.textContent = category.name;
            li.append(c_href);
            menu.append(li);

            li.addEventListener("click", (event) => {


                container.innerHTML = '<div id="wifi-loader"> \
                <svg class="circle-outer" viewBox="0 0 86 86"> \
                    <circle class="back" cx="43" cy="43" r="40"></circle> \
                    <circle class="front" cx="43" cy="43" r="40"></circle> \
                    <circle class="new" cx="43" cy="43" r="40"></circle> \
                </svg> \
                <svg class="circle-middle" viewBox="0 0 60 60"> \
                    <circle class="back" cx="30" cy="30" r="27"></circle> \
                    <circle class="front" cx="30" cy="30" r="27"></circle> \
                </svg> \
                <svg class="circle-inner" viewBox="0 0 34 34"> \
                    <circle class="back" cx="17" cy="17" r="14"></circle> \
                    <circle class="front" cx="17" cy="17" r="14"></circle> \
                </svg> \
                <div class="text" data-text="Finding you a JOb"></div> \
            </div>';

                setTimeout(async () => {
                    container.innerHTML = " ";
                    const result = (event.target.innerHTML);
                    const c_page = await fetch(`https://remotive.com/api/remote-jobs?category=${result}`);
                    const response = await c_page.json();
                    c_href.setAttribute("href", response);
                    for (let x of response.jobs) {
                        cards(x);
                    }
                }, 2500);


            });
        });
    } catch (error) {
        console.error(error);
    }

    finally {
        console.log("categories fetch request done");
    }
};
Categories();


//loop through jobs
jobs.addEventListener("click", () => {

    container.innerHTML = '<div id="wifi-loader"> \
        <svg class="circle-outer" viewBox="0 0 86 86"> \
            <circle class="back" cx="43" cy="43" r="40"></circle> \
            <circle class="front" cx="43" cy="43" r="40"></circle> \
            <circle class="new" cx="43" cy="43" r="40"></circle> \
        </svg> \
        <svg class="circle-middle" viewBox="0 0 60 60"> \
            <circle class="back" cx="30" cy="30" r="27"></circle> \
            <circle class="front" cx="30" cy="30" r="27"></circle> \
        </svg> \
        <svg class="circle-inner" viewBox="0 0 34 34"> \
            <circle class="back" cx="17" cy="17" r="14"></circle> \
            <circle class="front" cx="17" cy="17" r="14"></circle> \
        </svg> \
        <div class="text" data-text="Finding you a JOb"></div> \
    </div>';

    setTimeout(() => {
        container.innerHTML = " ";

        getData();
    }, 3000);

});
getData();






// save jobs button
saved.addEventListener("click", () => {


    if (saved_jobs.length === 0) {
        container.innerHTML = "<h3>You didn't save jobs yet<h3>"
    }

    else {

        container.innerHTML = " "
        for (let x of saved_jobs) {
            cards(x);
        }


    }
});




//search engine
const url_search = "https://remotive.com/api/remote-jobs?search=";
const search_btn = document.querySelector("#search_btn");
const search_form = document.querySelector("#search_form");
const search_val = document.querySelector("#search");


search_btn.addEventListener("click", () => {
    try {
       
        const search_term = search_val.value.trim();

        if (search_term === "") {
            alert('Please enter a search term.');
        } else {
         

            setTimeout(async () => {
                container.innerHTML = "";

                try {
                    const search_page = await fetch(`${url_search}${search_term}`);
                    const response = await search_page.json();
                    console.log(response);
                    for (let x of response.jobs) {
                        cards(x);
                    }
                } catch (error) {
                    console.log("Search failed: ", error);
                } finally {
                    console.log("Search succeeded");
                }
            }, 2500);
        }
    } catch (error) {
        console.log("Error occurred: ", error);
    }
});
